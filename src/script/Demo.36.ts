import * as dat from 'dat.gui';
import { BaseDemo } from './BaseDemo';

/**
 * @description 鼠标跟随，带拖尾效果
 */
export class Demo extends BaseDemo {
  public config = {
    scale: 1.0,
    minScale: 0.1,
    maxScale: 5.0
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.clearScreen().drawScene();
  }

  public draw() {
    return this;
  }

  private createControl() {
    const { config } = this;
    const gui = new dat.GUI();

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
    const w = canvas.width;
    const h = canvas.height;
    const sw = w * config.scale;
    const sh = h * config.scale;

    this.loadImage(require('../asset/images/flower.jpg')).then(image => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
    });

    return this;
  }

  public listenEvents() {
    const { canvas, config } = this;

    canvas.addEventListener('wheel', (event: WheelEvent) => {
      const scaleFactor = -event.deltaY / 2000;
      console.log(config.scale);

      config.scale += scaleFactor;
      if (config.scale <= config.minScale) {
        config.scale = config.minScale;
      } else if (config.scale > config.maxScale) {
        config.scale = config.maxScale;
      }

      this.drawScene();
    });

    return this;
  }
}
