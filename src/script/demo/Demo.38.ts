import * as dat from 'dat.gui';
import { Point } from '../geometry/Point';
import { Rubberband } from '../base/Rubberband';
import image_flower_url from '../../../asset/images/flower.jpg';

/**
 * @description 图像绘制 —— 选区像素
 */
export class Demo extends Rubberband {
  public name: string = '图像拖动裁剪缩放';

  public image: HTMLImageElement;

  public config = {
    scale: 1.0,
    resetScene: () => this.drawScene()
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.loadImage(image_flower_url)
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

  private createControl() {
    const { config } = this;
    this.gui = new dat.GUI();
    const { gui } = this;

    gui
      .add(config, 'scale')
      .step(0.01)
      .onChange(() => this.drawScene());
    gui.add(config, 'resetScene');

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

  public drawRubberbandShape(loc: Point) {
    const { context, rubberbandRect } = this;
    // context.fillRect(rubberbandRect.x, rubberbandRect.y, rubberbandRect.width, rubberbandRect.height);
    return this;
  }

  public onMouseupHandler(event: MouseEvent) {
    const { canvas, context, rubberbandRect } = this;

    super.onMouseupHandler(event);

    context.drawImage(
      canvas,
      (rubberbandRect.x + context.lineWidth * 2) * this.dpr,
      (rubberbandRect.y + context.lineWidth * 2) * this.dpr,
      (rubberbandRect.width - 4 * context.lineWidth) * this.dpr,
      (rubberbandRect.height - 4 * context.lineWidth) * this.dpr,
      0,
      0,
      this.width,
      this.height
    );
  }

  public onKeydownHander(event: KeyboardEvent) {
    super.onKeydownHander(event);
    event.keyCode === 32 && this.drawScene();
  }
}
