import DemoBase from './DemoBase';

/**
 * @description Hello World
 */
export default class Demo extends DemoBase {
  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.draw();
  }
}
