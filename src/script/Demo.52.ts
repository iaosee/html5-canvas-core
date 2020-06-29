import { BaseDemo } from './BaseDemo';
import { Sprite, Painter } from './sprite/Sprite';

/**
 * @description 精灵绘制器 —— 描边与填充
 */
export class Demo extends BaseDemo {
  public ball1: Sprite;

  public config = {};

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.initSprite();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public initSprite() {
    return this;
  }

  public draw() {
    return this.clearScreen()
      .drawGrid()
      .drawScene();
  }

  public drawScene() {
    const { context } = this;

    return this;
  }
}
