import DemoBase from "./DemoBase";
import { Point } from './declare';
const IMG_URL = require('../asset/images/presta_illustration_20.jpg');

export default class Demo extends DemoBase {

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    return this.clearScreen()
               .drawGrid();
  }

}
