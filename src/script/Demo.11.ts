import { BaseDemo } from './BaseDemo';

/**
 * @description 创建图案
 */
export class Demo extends BaseDemo {
  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    this.loadAssets();
    return this;
  }

  public draw() {
    return this; // .createPattern();
  }

  public async loadAssets() {
    const image = await this.loadImage(require('../asset/images/redball.png'));
    this.createPattern(image, 'repeat');
  }

  public createPattern(
    image: HTMLImageElement,
    repeatString: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' = 'repeat-x'
  ) {
    const { context, canvas } = this;
    const pattern = context.createPattern(image, repeatString);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();

    return this;
  }
}
