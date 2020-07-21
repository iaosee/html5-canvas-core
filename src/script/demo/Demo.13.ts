import { BaseDemo } from '../base/BaseDemo';

/**
 * @description 路径、描边、填充
 */
export class Demo extends BaseDemo {
  public name: string = '路径、描边、填充';
  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid().drawScene();
  }

  public draw() {
    return this;
  }

  public drawScene() {
    const { context } = this;
    const rectWidth = 150;
    const rectHeight = 100;
    const marginTop = 100;
    const gapSize = 100;

    context.font = '48pt Helvetica';
    context.strokeStyle = 'blue';
    context.fillStyle = 'red';
    context.lineWidth = 2;

    // text

    context.strokeText('Stroke', this.centerX / 2, marginTop);
    context.fillText('Fill', this.centerX, marginTop);

    context.strokeText('Stroke & Fill', this.centerX * 1.5, marginTop);
    context.fillText('Stroke & Fill', this.centerX * 1.5, marginTop);

    // rectangle

    context.lineWidth = 5;
    context.beginPath();
    context.rect(this.centerX / 2, marginTop + gapSize, rectWidth, rectHeight);
    context.stroke();

    context.lineWidth = 5;
    context.beginPath();
    context.rect(this.centerX, marginTop + gapSize, rectWidth, rectHeight);
    context.fill();

    context.lineWidth = 5;
    context.beginPath();
    context.rect(this.centerX * 1.5, marginTop + gapSize, rectWidth, rectHeight);
    context.stroke();
    context.fill();

    // arc

    context.beginPath();
    context.arc(this.centerX / 2, marginTop + gapSize * 4, 60, 0, (Math.PI * 3) / 2);
    context.stroke();

    context.beginPath();
    context.arc(this.centerX * 1, marginTop + gapSize * 4, 60, 0, (Math.PI * 3) / 2);
    context.fill();

    context.beginPath();
    context.arc(this.centerX * 1.5, marginTop + gapSize * 4, 60, 0, (Math.PI * 3) / 2);
    context.stroke();
    context.fill();

    // arc

    context.beginPath();
    context.arc(this.centerX / 2, marginTop + gapSize * 6, 60, 0, (Math.PI * 3) / 2);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.arc(this.centerX * 1, marginTop + gapSize * 6, 60, 0, (Math.PI * 3) / 2);
    context.closePath();
    context.fill();

    context.beginPath();
    context.arc(this.centerX * 1.5, marginTop + gapSize * 6, 60, 0, (Math.PI * 3) / 2);
    context.closePath();
    context.stroke();
    context.fill();

    return this;
  }
}
