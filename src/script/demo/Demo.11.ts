import { BaseDemo } from '../base/BaseDemo';
import imgUrl from '../../../asset/images/redball.png';

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
    const image = await this.loadImage(imgUrl);
    return image;
  }

  public drawScene(
    image: HTMLImageElement,
    repeatString: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' = 'repeat-x'
  ) {
    const { context } = this;

    const pattern = context.createPattern(image, repeatString);
    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = pattern;
    context.fillRect(0, 0, this.width, this.height);
    context.fill();

    return this;
  }
}
