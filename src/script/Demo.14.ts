import BaseDemo from './BaseDemo';
import { Point } from './declare';

/**
 * @description 路径、描边、填充
 */
export class Demo extends BaseDemo {
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

    this.drawAnnulus(this.center, 'rgba(19, 160, 223, 0.5)')
      .drawAnnulus(
        {
          x: this.centerX / 2,
          y: this.centerY
        },
        'rgba(86, 129, 178, 0.5)'
      )
      .drawAnnulus(
        {
          x: this.centerX * 1.5,
          y: this.centerY
        },
        'rgba(229, 79, 119, 0.5)'
      );

    return this;
  }

  public drawAnnulus(center: Point, fillColor: string = 'rgba(100, 140, 230, 0.5)') {
    const { context } = this;

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
}
