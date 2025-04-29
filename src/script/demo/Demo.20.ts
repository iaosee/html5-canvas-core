import { BaseDemo } from '../base/BaseDemo';

/**
 * @description arcTo 绘制圆角矩形
 */
export class Demo extends BaseDemo {
  public override name: string = '绘制圆角矩形';
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public override start() {
    return this.drawGrid().draw();
  }

  public override draw() {
    const { context } = this;

    context.beginPath();
    context.moveTo(this.centerX - 100, this.centerY);
    context.arcTo(this.centerX, this.centerY, this.centerX + 100, this.centerY + 100, 50);
    context.stroke();
    // context.fill();

    return this.drawCircularBead()
      .drawRoundedRect(this.randomRgba(), this.randomRgba(), 200, 200, 100, 100, 10)
      .drawRoundedRect(this.randomRgba(), this.randomRgba(), this.centerX, 50, 300, 300, 20);
  }

  public drawCircularBead() {
    const { context } = this;

    context.fillStyle = 'orange';
    context.strokeStyle = 'gray';
    // base point
    context.fillRect(150, 20, 10, 10);
    context.fillText('A', 160, 20);

    context.fillStyle = 'red';
    // control point one
    context.fillRect(150, 100, 10, 10);
    context.fillText('B', 160, 120);
    // control point two
    context.fillRect(50, 20, 10, 10);
    context.fillText('C', 40, 40);

    context.setLineDash([5, 5]);
    context.moveTo(150, 20);
    context.lineTo(150, 100);
    context.lineTo(50, 20);
    context.stroke();
    context.beginPath();
    context.arc(120, 38, 30, 0, 2 * Math.PI);
    context.stroke();

    context.strokeStyle = 'blue';
    context.setLineDash([]);
    context.beginPath();
    context.moveTo(150, 20);
    context.arcTo(150, 100, 50, 20, 30);
    context.stroke();

    return this;
  }

  public roundedRect(cornerX: number, cornerY: number, width: number, height: number, cornerRadius: number) {
    const { context } = this;

    width > 0 ? context.moveTo(cornerX + cornerRadius, cornerY) : context.moveTo(cornerX - cornerRadius, cornerY);

    context.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, cornerRadius);
    context.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, cornerRadius);
    context.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius);

    width > 0
      ? context.arcTo(cornerX, cornerY, cornerX + cornerRadius, cornerY, cornerRadius)
      : context.arcTo(cornerX, cornerY, cornerX - cornerRadius, cornerY, cornerRadius);

    return this;
  }

  public drawRoundedRect(
    strokeStyle: string,
    fillStyle: string,
    cornerX: number,
    cornerY: number,
    width: number,
    height: number,
    cornerRadius: number,
  ) {
    const { context } = this;

    context.beginPath();
    this.roundedRect(cornerX, cornerY, width, height, cornerRadius);
    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
    context.stroke();
    context.fill();

    return this;
  }
}
