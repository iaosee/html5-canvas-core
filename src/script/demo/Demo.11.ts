import { BaseDemo } from '../base/BaseDemo';

/**
 * @description 创建图案
 */
export class Demo extends BaseDemo {
  public name: string = '创建图案';
  public image: HTMLImageElement;

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    this.loadAssets().then(image => {
      this.image = image;
      this.draw();
    });
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this;
  }

  public draw() {
    return this.drawScene(this.image, 'repeat');
  }

  public async loadAssets() {
    const image = await this.loadImage(require('../../../asset/images/redball.png'));
    return image;
  }

  public drawScene(
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
