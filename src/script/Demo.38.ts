import * as dat from 'dat.gui';
import { Point } from './geometry/Point';
import { Rubberband } from './Rubberband';

/**
 * @description 图像绘制 —— 选区像素
 */
export class Demo extends Rubberband {
  public image: HTMLImageElement;

  public config = {
    scale: 1.0,
    resetScene: () => this.drawScene()
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

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

  private createControl() {
    const { config } = this;
    const gui = new dat.GUI();

    gui
      .add(config, 'scale')
      .step(0.01)
      .onChange(() => this.drawScene());
    gui.add(config, 'resetScene');

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
      rubberbandRect.x + context.lineWidth * 2,
      rubberbandRect.y + context.lineWidth * 2,
      rubberbandRect.width - 4 * context.lineWidth,
      rubberbandRect.height - 4 * context.lineWidth,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
}
