import { Point } from './declare';
import { Rubberband } from './Rubberband';

/**
 * @description 拖拽画圆
 */
export class Demo extends Rubberband {
  public config: any = {
    radius: 20
  };

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
    const { context, mousedownPos, mousemovePos, rubberbandRect } = this;
    let angle;
    let radius;

    // For horizontal lines
    if (mousedownPos.y === mousemovePos.y) {
      radius = Math.abs(loc.x - mousedownPos.x);
    } else {
      // The if block above catches horizontal lines.
      angle = Math.atan(rubberbandRect.height / rubberbandRect.width);
      radius = rubberbandRect.height / Math.sin(angle);
    }

    context.beginPath();
    context.arc(mousedownPos.x, mousedownPos.y, radius, 0, Math.PI * 2, false);
    // context.fillRect(rubberbandRect.x, rubberbandRect.y, rubberbandRect.width, rubberbandRect.height);
    context.stroke();
    context.fill();

    return this;
  }
}
