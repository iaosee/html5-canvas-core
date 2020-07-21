import { Point } from '../interfaces';
import { Rubberband } from '../base/Rubberband';

/**
 * @description 基础橡皮筋
 */
export class Demo extends Rubberband {
  public name: string = '基础橡皮筋';
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
