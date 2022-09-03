import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import { BaseDemo } from '../base/BaseDemo';
import imageSky from '../../../asset/images/sky.png';

/**
 * @description 动画 —— 背景动画
 */
export class Demo extends BaseDemo {
  public name: string = '动画 —— 背景连续动画';

  public lastTime = 0;
  public sky: HTMLImageElement;
  public skyOffset: number = 0;

  public config = {
    SKY_VELOCITY: 100, // pixels/second
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl()
      .initStats()
      .loadImage(imageSky)
      .then((image) => (this.sky = image))
      .then(() => this.startPlay());
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this;
  }

  public draw(timestamp: number) {
    this.clearScreen().drawGrid().drawScene(timestamp);

    this.stats.update();
    this.lastTime = timestamp;

    return this;
  }

  public initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
    return this;
  }

  private createControl() {
    const { config } = this;
    this.gui = new dat.GUI();
    const { gui } = this;

    gui.add(config, 'SKY_VELOCITY').min(10).max(1000).step(10);

    return this;
  }

  public drawScene(timestamp: number) {
    const { context, config, sky } = this;
    const fps = 1000 / (timestamp - this.lastTime);

    this.skyOffset = this.skyOffset < sky.width ? this.skyOffset + config.SKY_VELOCITY / fps : 0;

    context.save();
    context.translate(-this.skyOffset, 0);

    context.drawImage(sky, 0, 0);
    context.drawImage(sky, sky.width - 2, 0);
    context.drawImage(sky, (sky.width - 2) * 2, 0);

    context.drawImage(sky, 0, sky.height + 50);
    context.drawImage(sky, sky.width - 2, sky.height + 50);
    context.drawImage(sky, (sky.width - 2) * 2, sky.height + 50);

    context.restore();
    return this;
  }
}
