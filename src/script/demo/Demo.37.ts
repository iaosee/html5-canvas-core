import * as dat from 'dat.gui';
import { BaseDemo } from '../base/BaseDemo';
import image_flower_url from '../../../asset/images/flower.jpg';

/**
 * @description 图像绘制 —— 使用离屏 Canvas 提高性能
 */
export class Demo extends BaseDemo {
  public name: string = '图像缩放';

  public image: HTMLImageElement;
  public offScreenCanvas: HTMLCanvasElement;
  public offScreenContext: CanvasRenderingContext2D;

  public config = {
    scale: 1.0,
    minScale: 0.1,
    maxScale: 5.0
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    const img = image_flower_url;
    console.log(img);

    this.initOffScreenCanvas();
    this.loadImage(img)
      .then(image => (this.image = image))
      .then(() => {
        this.context.drawImage(this.image, 0, 0, this.width, this.height);
        this.offScreenContext.drawImage(this.image, 0, 0, this.width, this.height);
        this.drawWatermark(this.context);
        this.drawWatermark(this.offScreenContext);
        // this.drawScene();
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
    this.offScreenContext.scale(this.dpr, this.dpr);
  }

  private createControl() {
    const { config } = this;
    this.gui = new dat.GUI();
    const { gui } = this;

    gui
      .add(config, 'scale')
      .min(config.minScale)
      .max(config.maxScale)
      .step(0.01)
      .onChange(() => this.drawScene());

    return this;
  }

  public drawWatermark(context: CanvasRenderingContext2D) {
    const { canvas } = this;
    const lineOne = 'Copyright';
    const lineTwo = 'iaosee, Inc.';
    const FONT_HEIGHT = 100;
    let textMetrics = null;

    context.save();
    context.fillStyle = 'rgba(1, 23, 27, 0.5)';
    context.strokeStyle = 'yellow';
    context.shadowColor = 'rgba(50, 50, 50, 1.0)';
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;

    context.font = FONT_HEIGHT + 'px Arial';
    textMetrics = context.measureText(lineOne);
    context.translate(this.width / 2, this.height - this.height / 2);
    context.fillText(lineOne, -textMetrics.width / 2, 0);
    context.strokeText(lineOne, -textMetrics.width / 2, 0);

    textMetrics = context.measureText(lineTwo);
    context.fillText(lineTwo, -textMetrics.width / 2, FONT_HEIGHT);
    context.strokeText(lineTwo, -textMetrics.width / 2, FONT_HEIGHT);
    context.restore();
  }

  public drawScene() {
    const { context, offScreenCanvas, canvas, config } = this;

    // 画布宽高
    const w = this.width;
    const h = this.height;

    // 缩放后的图像宽高
    const sw = w * config.scale;
    const sh = h * config.scale;

    // 绘制到画布中心
    context.clearRect(0, 0, this.width, this.height);
    // context.drawImage(this.image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
    context.drawImage(
      offScreenCanvas,
      0,
      0,
      offScreenCanvas.width,
      offScreenCanvas.height,
      -sw / 2 + w / 2,
      -sh / 2 + h / 2,
      sw,
      sh
    );

    return this;
  }

  public listenEvents() {
    const { canvas } = this;

    canvas.addEventListener('wheel', this.onWheelHandler.bind(this));

    return this;
  }

  public onWheelHandler(event: WheelEvent) {
    const { config } = this;

    const scaleFactor = -event.deltaY / 1000;
    console.log(config.scale);

    config.scale += scaleFactor;
    if (config.scale <= config.minScale) {
      config.scale = config.minScale;
    } else if (config.scale > config.maxScale) {
      config.scale = config.maxScale;
    }

    this.drawScene();
  }
}
