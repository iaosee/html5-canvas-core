import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { Point } from '../geometry/Point';
import image_flower_url from '../../../asset/images/flower.jpg';

/**
 * @description 图像绘制
 */
export class Demo extends BaseDemo {
  public override name: string = '图像绘制';

  public image: HTMLImageElement;
  public config = {
    scale: 1.0,
    minScale: 0.1,
    maxScale: 5.0,
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.loadImage(image_flower_url)
      .then((image) => (this.image = image))
      .then(() => this.clearScreen().drawScene());

    this.createControl().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public override start() {
    return this;
  }

  public override draw() {
    return this;
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
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
    const { context, config } = this;

    // 画布宽高
    const w = this.width;
    const h = this.height;

    // 缩放后的图像宽高
    const sw = w * config.scale;
    const sh = h * config.scale;

    // 绘制到画布中心
    context.clearRect(0, 0, this.width, this.height);
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
