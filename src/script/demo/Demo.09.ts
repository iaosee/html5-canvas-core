import { BaseDemo } from '../base/BaseDemo';

/**
 * @description 创建渐变 - 线性渐变
 */
export class Demo extends BaseDemo {
  public name: string = '创建渐变 - 线性渐变';
  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    return this.createGradient();
  }

  public createGradient() {
    const { context, canvas } = this;

    const gradient1 = context.createLinearGradient(0, 0, this.centerX, 0);
    gradient1.addColorStop(0.0, 'blue');
    gradient1.addColorStop(0.25, 'white');
    gradient1.addColorStop(0.5, 'purple');
    gradient1.addColorStop(0.75, 'red');
    gradient1.addColorStop(1.0, 'yellow');
    context.fillStyle = gradient1;
    context.fillRect(0, 0, this.width / 2, this.height / 2);

    const gradient2 = context.createLinearGradient(this.centerX, 0, this.centerX, this.centerY);
    gradient2.addColorStop(0.0, 'blue');
    gradient2.addColorStop(0.25, 'white');
    gradient2.addColorStop(0.5, 'purple');
    gradient2.addColorStop(0.75, 'red');
    gradient2.addColorStop(1.0, 'yellow');
    context.fillStyle = gradient2;
    context.fillRect(this.centerX, 0, this.width / 2, this.height / 2);

    const gradient3 = context.createLinearGradient(0, this.centerY, this.centerX, this.height);
    gradient3.addColorStop(0.0, 'blue');
    gradient3.addColorStop(0.25, 'white');
    gradient3.addColorStop(0.5, 'purple');
    gradient3.addColorStop(0.75, 'red');
    gradient3.addColorStop(1.0, 'yellow');
    context.fillStyle = gradient3;
    context.fillRect(0, this.centerY, this.width / 2, this.height / 2);

    const gradient4 = context.createLinearGradient(this.centerX, this.height, this.width, this.centerY);
    gradient4.addColorStop(0.0, 'blue');
    gradient4.addColorStop(0.25, 'white');
    gradient4.addColorStop(0.5, 'purple');
    gradient4.addColorStop(0.75, 'red');
    gradient4.addColorStop(1.0, 'yellow');
    context.fillStyle = gradient4;
    context.fillRect(this.centerX, this.centerY, this.width / 2, this.height / 2);

    return this;
  }
}
