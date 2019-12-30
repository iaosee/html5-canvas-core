import { BaseDemo } from './BaseDemo';

export class Demo extends BaseDemo {
  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid().draw();
  }

  public draw() {
    return this.drawRoundedRect('blue', 'yellow', 50, 40, 100, 100, 10);
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
    cornerRadius: number
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
