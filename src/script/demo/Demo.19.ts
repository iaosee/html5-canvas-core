import { Point } from '../interfaces';
import { Rubberband } from '../base/Rubberband';

/**
 * @description 拖拽画圆
 */
export class Demo extends Rubberband {
  public name: string = '橡皮筋式拖拽画圆';
  public config: any = {
    radius: 20
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.context.fillStyle = this.randomRgba();
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

    // For horizontal lines
    const radius =
      mousedownPos.y === mousemovePos.y
        ? Math.abs(loc.x - mousedownPos.x)
        : rubberbandRect.height / Math.sin(Math.atan(rubberbandRect.height / rubberbandRect.width));

    // 以上代码等价于：
    // const radius = Math.sqrt(Math.pow(rubberbandRect.width, 2) + Math.pow(rubberbandRect.height, 2));

    context.beginPath();
    context.arc(mousedownPos.x, mousedownPos.y, radius, 0, Math.PI * 2, false);
    // context.fillRect(rubberbandRect.x, rubberbandRect.y, rubberbandRect.width, rubberbandRect.height);
    context.stroke();
    context.fill();

    return this;
  }
}
