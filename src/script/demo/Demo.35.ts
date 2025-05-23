import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';

enum ShapeStyle {
  Linellae = 'linellae',
  Circle = 'circle',
}

/**
 * @description 文本 — 绕圈绘制
 */
export class Demo extends BaseDemo {
  public override name: string = '文字路径环绕';
  public config = {
    radius: 300,
    fontSize: 50,
    text: "Hello canvas, hello world. It's so funny. ",
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public override start() {
    return this.clearScreen().drawGrid().drawScene();
  }

  public override draw() {
    return this;
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'text').onFinishChange(() => this.start());
    gui
      .add(config, 'radius')
      .min(100)
      .max(500)
      .step(10)
      .onFinishChange(() => this.start());

    return this;
  }

  public drawScene() {
    const { config } = this;

    this.drawCircularText(config.text, Math.PI * 2, Math.PI / 8);

    return this;
  }

  public drawCircularText(text: string, startAngle: number, endAngle: number) {
    const { context, config } = this;
    const angleDecrement = (startAngle - endAngle) / (text.length - 1);
    let index = 0;
    let character;
    const styleColor = this.randomRgba();

    context.save();
    context.fillStyle = styleColor;
    context.strokeStyle = styleColor;
    context.font = config.fontSize + 'px Lucida Sans';

    while (index < text.length) {
      character = text.charAt(index);
      context.save();
      context.beginPath();

      context.translate(
        this.center.x + Math.cos(startAngle) * config.radius,
        this.center.y - Math.sin(startAngle) * config.radius,
      );
      context.rotate(Math.PI / 2 - startAngle);

      context.fillText(character, 0, 0);
      context.strokeText(character, 0, 0);

      startAngle -= angleDecrement;
      index++;
      context.restore();
    }
    context.restore();

    return this;
  }
}
