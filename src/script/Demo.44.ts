import * as dat from 'dat.gui';
import { BaseDemo } from './BaseDemo';
import { Point } from './geometry/Point';
import { Rectangle } from './declare';

/**
 * @description 绘制放大镜效果
 */
export class Demo extends BaseDemo {
  public image: HTMLImageElement;
  public originalImageData: ImageData;
  public magnifyRectangleImageData: ImageData;
  public offScreenCanvas: HTMLCanvasElement;
  public offScreenContext: CanvasRenderingContext2D;

  public magnifyRectangle: Rectangle = null;
  public magnifyingGlassPos: Point = new Point();

  public config = {
    scale: 0.2,
    zoomScale: 2,
    zoomRadius: 150,
    resetScene: () => this.drawScene()
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.initOffScreenCanvas();
    this.loadImage(require('../asset/images/flower.jpg'))
      .then(image => (this.image = image))
      .then(() => {
        this.drawScene();
      });

    this.createControl().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this;
  }

  public draw() {
    return this;
  }

  public initOffScreenCanvas() {
    const { canvas } = this;
    this.offScreenCanvas = document.createElement('canvas');
    this.offScreenContext = this.offScreenCanvas.getContext('2d');
    this.offScreenCanvas.width = canvas.width;
    this.offScreenCanvas.height = canvas.height;
  }

  private createControl() {
    const { config } = this;
    const gui = new dat.GUI();

    gui
      .add(config, 'scale')
      .step(0.01)
      .min(0.1)
      .max(1)
      .onChange(() => this.drawScene());

    gui
      .add(config, 'zoomScale')
      .step(1)
      .min(0.5)
      .max(10);
    gui
      .add(config, 'zoomRadius')
      .step(10)
      .min(50)
      .max(1000);

    return this;
  }

  public drawScene() {
    const { context, offScreenContext, canvas, config, image } = this;

    // 画布宽高
    const w = canvas.width;
    const h = canvas.height;

    // 缩放后的图像宽高
    const ratio = (image.width * config.scale) / image.width;
    const sw = image.width * config.scale;
    const sh = image.height * ratio;

    // 绘制到画布中心
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(this.image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
    // offScreenContext.drawImage(this.image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
    this.originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);

    return this;
  }

  /**
   * @description 绘制放大镜
   */
  public drawMagnifyingGlass(pos: Point) {
    const { context, config, magnifyingGlassPos } = this;
    magnifyingGlassPos.x = pos.x;
    magnifyingGlassPos.y = pos.y;

    this.calculateMagnifyRectangle(pos);
    this.magnifyRectangleImageData = context.getImageData(
      this.magnifyRectangle.x,
      this.magnifyRectangle.y,
      this.magnifyRectangle.width,
      this.magnifyRectangle.height
    );
    this.drawScene();

    context.save();

    const scaledMagnifyRectangle = {
      width: this.magnifyRectangle.width * config.zoomScale,
      height: this.magnifyRectangle.height * config.zoomScale
    };

    // context.lineWidth = config.zoomRadius * 0.1;
    // context.strokeStyle = `rgba(100,255,255,0.5)`;

    this.setClip();

    // 绘制放大镜中 缩放的图像，默认为矩形，但经过裁剪所以只绘制出圆形部分
    context.drawImage(
      context.canvas,
      this.magnifyRectangle.x,
      this.magnifyRectangle.y,
      this.magnifyRectangle.width,
      this.magnifyRectangle.height,
      this.magnifyRectangle.x + this.magnifyRectangle.width / 2 - scaledMagnifyRectangle.width / 2,
      this.magnifyRectangle.y + this.magnifyRectangle.height / 2 - scaledMagnifyRectangle.height / 2,
      scaledMagnifyRectangle.width,
      scaledMagnifyRectangle.height
    );
    context.stroke();
    context.restore();

    this.drawMagnifyingGlassCircle(pos);
    return this;
  }

  /**
   * @description 设置裁剪，裁剪为放大镜大小
   */
  public setClip() {
    const { context, config, magnifyingGlassPos } = this;

    context.beginPath();
    context.arc(magnifyingGlassPos.x, magnifyingGlassPos.y, config.zoomRadius, 0, Math.PI * 2, false);
    context.clip();

    return this;
  }

  /**
   * @description 计算最小外接矩形
   */
  public calculateMagnifyRectangle(pos: Point) {
    const { canvas, context, config } = this;

    // 最小外接矩形
    this.magnifyRectangle = {
      x: pos.x - config.zoomRadius,
      y: pos.y - config.zoomRadius,
      width: config.zoomRadius * 2 + 2 * context.lineWidth,
      height: config.zoomRadius * 2 + 2 * context.lineWidth
    };

    const top = this.magnifyRectangle.y;
    const left = this.magnifyRectangle.x;
    const bottom = this.magnifyRectangle.y + this.magnifyRectangle.height;
    const right = this.magnifyRectangle.x + this.magnifyRectangle.width;

    // 处理超出 Canvas 范围
    if (left < 0) {
      this.magnifyRectangle.width += left;
      this.magnifyRectangle.x = 0;
    } else if (right > canvas.width) {
      this.magnifyRectangle.width -= right - canvas.width;
    }
    if (top < 0) {
      this.magnifyRectangle.height += top;
      this.magnifyRectangle.y = 0;
    } else if (bottom > canvas.height) {
      this.magnifyRectangle.height -= bottom - canvas.height;
    }

    return this;
  }

  public drawMagnifyingGlassCircle(pos: Point) {
    const { context, config } = this;
    let gradientThickness = config.zoomRadius / 7;

    gradientThickness = gradientThickness < 10 ? 10 : gradientThickness;
    gradientThickness = gradientThickness > 40 ? 40 : gradientThickness;

    gradientThickness = 10;
    context.save();
    context.lineWidth = gradientThickness;
    context.strokeStyle = 'rgb(0, 0, 255, 0.3)';

    context.beginPath();
    context.arc(pos.x, pos.y, config.zoomRadius, 0, Math.PI * 2, false);
    context.clip();

    const gradient = context.createRadialGradient(
      pos.x,
      pos.y,
      config.zoomRadius - gradientThickness,
      pos.x,
      pos.y,
      config.zoomRadius
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0.2)');
    gradient.addColorStop(0.8, 'rgb(235,237,255)');
    gradient.addColorStop(0.9, 'rgb(235,237,255)');
    gradient.addColorStop(1.0, 'rgba(150,150,150,0.9)');

    context.shadowColor = 'rgba(52, 72, 35, 1.0)';
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowBlur = 20;

    context.strokeStyle = gradient;
    context.stroke();

    context.beginPath();
    context.arc(pos.x, pos.y, config.zoomRadius - gradientThickness / 2, 0, Math.PI * 2, false);
    context.clip();

    context.lineWidth = gradientThickness;
    context.strokeStyle = 'rgba(0,0,0,0.06)';
    context.stroke();

    context.restore();

    return this;
  }

  public listenEvents() {
    const { canvas } = this;

    canvas.addEventListener('mousemove', e => {
      const pos = this.coordinateTransformation(e.clientX, e.clientY);
      this.drawMagnifyingGlass(pos);
    });

    return this;
  }
}
