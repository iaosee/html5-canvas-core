import * as dat from 'dat.gui';
import { BaseDemo } from '../base/BaseDemo';
import { Point } from '../geometry/Point';

/**
 * @description 图像绘制
 */
export class Demo extends BaseDemo {
  public image: HTMLImageElement;

  public config = {
    scale: 1.0,
    minScale: 0.1,
    maxScale: 5.0
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.loadImage(require('../../../asset/images/flower.jpg'))
      .then(image => (this.image = image))
      .then(() => this.clearScreen().drawScene());

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

  public drawScene() {
    const { context, canvas, config } = this;

    // 画布宽高
    const w = canvas.width;
    const h = canvas.height;

    // 缩放后的图像宽高
    const sw = w * config.scale;
    const sh = h * config.scale;

    // 绘制到画布中心
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(this.image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);

    return this;
  }

  public listenEvents() {
    const { canvas } = this;

    canvas.addEventListener('wheel', this.onWheelHandler.bind(this));

    return this;
  }

  public drawRubberbandShape(loc: Point) {
    console.log(loc);

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
