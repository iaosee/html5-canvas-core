import { BaseDemo } from './BaseDemo';

/**
 * @description 时钟
 */
export class Demo extends BaseDemo {
  public config = {
    FONT_HEIGHT: 15,
    MARGIN: 40,
    NUMERAL_SPACING: 20
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    return this.clearScreen()
      .drawCircle()
      .drawNumerals()
      .drawCenter()
      .drawHands();
  }

  private drawCircle() {
    const { canvas, context, config } = this;
    const radius = this.viewMin / 2 - config.MARGIN;
    const startRadian = 0;
    const endRadian = Math.PI * 2;
    const anticlockwise = true;

    context.strokeStyle = 'rgba(61, 126, 154, 0.8)';
    context.beginPath();
    context.arc(this.centerX, this.centerY, radius, startRadian, endRadian, anticlockwise);
    context.stroke();

    return this;
  }

  private drawNumerals() {
    const { context, config } = this;
    const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    context.font = '20px Palatino';
    context.fillStyle = 'rgba(35, 154, 59, 1.0)';
    numerals.map(numeral => {
      const radian = (Math.PI / 6) * (numeral - 3);
      const textNumeral = numeral.toString();
      const numeralWidth = context.measureText(textNumeral).width;
      const viewMinHalf = this.viewMin / 2 - 20;
      const textOffsetX = Math.cos(radian) * viewMinHalf - numeralWidth / 2;
      const textOffsetY = Math.sin(radian) * viewMinHalf + config.FONT_HEIGHT / 3;

      context.fillText(textNumeral, this.centerX + textOffsetX, this.centerY + textOffsetY);
    });

    return this;
  }

  private drawCenter() {
    const { context } = this;

    context.beginPath();
    context.arc(this.centerX, this.centerY, 5, 0, Math.PI * 2, true);
    context.fill();

    return this;
  }

  private drawHand(loc: number, isHour: boolean = false) {
    const { context, canvas, config } = this;
    const radian = Math.PI * 2 * (loc / 60) - Math.PI / 2;
    const radius = this.viewMin / 2 - config.MARGIN;
    const handRadius = isHour ? radius - canvas.width / 25 - canvas.width / 10 : radius - canvas.width / 25;

    context.lineCap = 'round';
    context.strokeStyle = isHour ? 'rgba(61, 126, 154, 1.0)' : 'rgba(61, 126, 154, 0.5)';
    context.moveTo(this.centerX, this.centerY);
    context.lineWidth = isHour ? 4 : 2;
    context.lineTo(this.centerX + Math.cos(radian) * handRadius, this.centerY + Math.sin(radian) * handRadius);
    context.stroke();

    return this;
  }

  private drawHands() {
    const date = new Date();
    const hour = date.getHours();
    const h = hour > 12 ? hour - 12 : hour;

    this.drawHand(h * 5 + (date.getMinutes() / 60) * 5, true);
    this.drawHand(date.getMinutes(), false);
    this.drawHand(date.getSeconds(), false);

    return this;
  }
}
