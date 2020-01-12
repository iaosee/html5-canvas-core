import { Rubberband } from './Rubberband';

/**
 * @description 编辑贝塞尔曲线
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
}
