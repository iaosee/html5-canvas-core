import DemoBase from "./DemoBase";

export default class Demo extends DemoBase {

  constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    const { context, canvas } = this;

    return super.draw();
  }

}
