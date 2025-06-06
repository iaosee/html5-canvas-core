import { Point } from '../interfaces';
import { BaseDemo } from '../base/BaseDemo';

import '../base/Extension';

/**
 * @description 绘制虚线
 */
export class Demo extends BaseDemo {
  public override name: string = '绘制虚线';
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
    const { canvas, context } = this;

    context.lineWidth = 2;
    context.lineCap = 'butt'; // default

    context.beginPath();
    context.strokeStyle = this.randomRgba();
    this.drawDashLine(
      {
        x: 0,
        y: 0,
      },
      {
        x: this.width,
        y: this.height,
      },
    );
    context.closePath();

    context.lineCap = 'round';

    context.beginPath();
    context.strokeStyle = this.randomRgba();
    this.drawDashLine(
      {
        x: 0,
        y: this.height,
      },
      {
        x: this.width,
        y: 0,
      },
    );
    context.closePath();

    context.lineCap = 'square';

    context.strokeStyle = this.randomRgba();
    context.beginPath();
    context.moveTo(0, this.centerY);
    context.dashedLineTo(this.centerX, this.centerY, 10);
    context.closePath();
    context.stroke();

    context.strokeStyle = this.randomRgba();
    context.beginPath();
    context.moveTo(this.centerX, this.centerY);
    context.dashedLineTo(this.centerX, this.height, 10);
    context.closePath();
    context.stroke();

    // Canvas 规范中绘制虚线
    context.setLineDash([10, 20]);
    context.strokeStyle = this.randomRgba();
    context.beginPath();
    context.moveTo(this.centerX, 0);
    context.lineTo(this.centerX, this.centerY);
    context.stroke();
    context.closePath();

    return this;
  }

  public drawDashLine(start: Point, end: Point, dashLength: number = 5, space: number = 5) {
    const { context } = this;
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

    for (let i = 0; i < numDashes; i++) {
      const x = start.x + (deltaX / numDashes) * i;
      const y = start.y + (deltaY / numDashes) * i;
      // console.log(x, y);
      i % 2 === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
    }

    context.stroke();

    return this;
  }
}
