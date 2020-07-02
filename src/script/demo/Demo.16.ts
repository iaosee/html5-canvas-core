import { Point } from '../interfaces';
import { Rubberband } from '../base/Rubberband';

/**
 * @description 线条
 */
export class Demo extends Rubberband {
  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid();
  }

  public draw() {
    return this;
  }

  public drawRubberbandShape(loc: Point) {
    const { context, mousedownPos } = this;

    context.strokeStyle = 'blue';
    context.beginPath();
    context.moveTo(mousedownPos.x, mousedownPos.y);
    context.lineTo(loc.x, loc.y);
    context.stroke();
    context.closePath();

    return this;
  }
}
