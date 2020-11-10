import * as dat from 'dat.gui';
import { BaseDemo } from '../base/BaseDemo';
const IMG_URL = require('../../../asset/images/image-01.jpg');

enum ShapeStyle {
  Linellae = 'linellae',
  Circle = 'circle'
}

/**
 * @description 文本 —— 填充背景
 */
export class Demo extends BaseDemo {
  public name: string = '文字填充';
  public config = {
    text: 'Hello, Canvas'
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.clearScreen()
      .drawGrid()
      .drawScene();
  }

  public draw() {
    return this;
  }

  private createControl() {
    const { config } = this;
    this.gui = new dat.GUI();
    const { gui } = this;

    gui.add(config, 'text').onFinishChange(() => this.start());

    return this;
  }

  public drawScene() {
    const { context } = this;

    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;
    context.font = '256px Palatino';
    context.strokeStyle = 'cornflowerblue';
    context.shadowColor = 'rgba(100, 100, 150, 0.8)';

    this.drawGradientText();
    this.loadImage(IMG_URL).then(image => this.drawPatternText(image));

    return this;
  }

  public drawGradientText() {
    const { context, canvas, config } = this;
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);

    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.25, 'blue');
    gradient.addColorStop(0.5, 'white');
    gradient.addColorStop(0.75, 'red');
    gradient.addColorStop(1.0, 'yellow');

    const fontInfo = context.measureText(config.text);
    context.fillStyle = gradient;
    context.fillText(config.text, this.centerX - fontInfo.width / 2, this.centerY / 1.5);
    context.strokeText(config.text, this.centerX - fontInfo.width / 2, this.centerY / 1.5);

    return this;
  }

  public drawPatternText(image: HTMLImageElement) {
    const { context, canvas, config } = this;
    const pattern = context.createPattern(image, 'repeat');

    const fontInfo = context.measureText(config.text);
    context.fillStyle = pattern;
    context.fillText(config.text, this.centerX - fontInfo.width / 2, this.centerY * 1.5);
    context.strokeText(config.text, this.centerX - fontInfo.width / 2, this.centerY * 1.5);

    return this;
  }
}
