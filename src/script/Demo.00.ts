import DemoBase from './BaseDemo';

/**
 * @description Hello World
 */
export class Demo extends DemoBase {
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
