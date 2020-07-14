import * as dat from 'dat.gui';
import { BaseDemo } from '../base/BaseDemo';
import { Point } from '../geometry/Point';
import { Rectangle } from '../interfaces';

/**
 * @description 图像淡入淡出动画
 */
export class Demo extends BaseDemo {
  public image: HTMLImageElement;
  public originalImageData: ImageData;
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
    this.loadImage(require('../../../asset/images/flower.jpg'))
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
    this.gui = new dat.GUI();
    const { gui } = this;

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

  public drawMagnifyingGlass(pos: Point) {
    const { context, config } = this;

    this.magnifyingGlassPos.x = pos.x;
    this.magnifyingGlassPos.x = pos.y;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    this.drawScene();

    context.save();

    context.lineWidth = config.zoomRadius * 0.1;
    context.strokeStyle = `rgba(100,255,255,0.5)`;

    context.beginPath();

    context.arc(pos.x, pos.y, config.zoomRadius, 0, Math.PI * 2, false);
    context.clip();

    context.drawImage(
      context.canvas,
      pos.x - config.zoomRadius,
      pos.y - config.zoomRadius,
      config.zoomRadius * 2,
      config.zoomRadius * 2,
      pos.x - config.zoomRadius - (config.zoomRadius * 2 * config.zoomScale - config.zoomRadius * 2) / 2,
      pos.y - config.zoomRadius - (config.zoomRadius * 2 * config.zoomScale - config.zoomRadius * 2) / 2,
      config.zoomRadius * 2 * config.zoomScale,
      config.zoomRadius * 2 * config.zoomScale
    );
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
