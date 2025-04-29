import { BaseDemo } from '../base/BaseDemo';

/**
 * @description Hello World
 */
export class Demo extends BaseDemo {
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }
}
