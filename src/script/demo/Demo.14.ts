import { Point } from '../interfaces';
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

    context.fillStyle = 'rgba(100, 140, 230, 0.5)';
    context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    context.shadowOffsetX = 10;
    context.shadowOffsetY = 10;
    context.shadowBlur = 15;

    this.drawAnnulus(
      {
        ...this.center,
        y: this.centerY / 2
      },
      'rgba(19, 160, 223, 0.5)'
    )
      .drawAnnulus(
        {
          x: this.centerX / 2,
          y: this.centerY / 2
        },
        'rgba(86, 129, 178, 0.5)'
      )
      .drawAnnulus(
        {
          x: this.centerX * 1.5,
          y: this.centerY / 2
        },
        'rgba(229, 79, 119, 0.5)'
      )
      .drawCutouts();

    return this;
  }

  public drawAnnulus(center: Point, fillColor: string = 'rgba(100, 140, 230, 0.5)') {
    const { context } = this;

    context.lineWidth = 2;
    context.fillStyle = fillColor || context.fillStyle;
    context.strokeStyle = context.fillStyle;
    context.shadowColor = fillColor;
    context.beginPath();
    context.arc(center.x, center.y, 200, 0, Math.PI * 2, false);
    context.arc(center.x, center.y, 150, 0, Math.PI * 2, true);
    context.fill();
    context.stroke();
    context.closePath();

    return this;
  }

  public drawCutouts() {
    const { context } = this;

    context.beginPath();
    context.rect(this.centerX - 150, this.centerY, 300, 300);
    context.strokeStyle = 'green';
    context.stroke();

    context.arc(this.centerX - 80, this.centerY + 80, 40, 0, Math.PI * 2, true);
    context.closePath();
    context.arc(this.centerX + 80, this.centerY + 80, 40, 0, Math.PI * 2, true);
    context.closePath();
    context.moveTo(this.centerX, this.centerY + 120);
    context.lineTo(this.centerX - 50, this.centerY + 120 + 50);
    context.lineTo(this.centerX + 50, this.centerY + 120 + 50);
    this.rect(this.centerX - 50, this.centerY + 220, 100, 20, true);

    // context.moveTo(this.centerX, this.centerY)
    context.closePath();

    context.fill();

    return this;
  }

  public rect(x: number, y: number, w: number, h: number, direction?: boolean) {
    const { context } = this;

    if (direction) {
      context.moveTo(x, y);
      context.lineTo(x, y + h);
      context.lineTo(x + w, y + h);
      context.lineTo(x + w, y);
    } else {
      context.moveTo(x, y);
      context.lineTo(x + w, y);
      context.lineTo(x + w, y + h);
      context.lineTo(x, y + h);
    }
    context.closePath();
  }
}
