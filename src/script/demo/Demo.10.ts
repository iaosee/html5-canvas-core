import { BaseDemo } from '../base/BaseDemo';

/**
 * @description 创建渐变 - 径向渐变
 */
export class Demo extends BaseDemo {
  public name: string = '创建渐变 - 径向渐变';
  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    return this.clearScreen().createGradient();
  }

  public createGradient() {
    const { context, canvas } = this;

    const gradient1 = context.createRadialGradient(
      this.centerX / 2,
      canvas.height / 4,
      10,
      this.centerX / 2,
      canvas.height / 4,
      200
    );
    gradient1.addColorStop(0.0, 'blue');
    gradient1.addColorStop(0.25, 'white');
    gradient1.addColorStop(0.5, 'purple');
    gradient1.addColorStop(0.75, 'red');
    gradient1.addColorStop(1.0, 'yellow');
    context.fillStyle = gradient1;
    context.fillRect(0, 0, this.centerX, canvas.height / 2);

    const gradient2 = context.createRadialGradient(this.centerX, canvas.height / 2, 20, canvas.width, 0, 200);
    gradient2.addColorStop(0.0, 'blue');
    gradient2.addColorStop(0.25, 'white');
    gradient2.addColorStop(0.5, 'yellow');
    gradient2.addColorStop(0.75, 'red');
    gradient2.addColorStop(1.0, 'purple');
    context.fillStyle = gradient2;
    context.fillRect(this.centerX, 0, canvas.width / 2, canvas.height / 2);

    const gradient3 = context.createRadialGradient(
      this.centerX / 2,
      (canvas.height / 2) * 1.5,
      20,
      this.centerX / 2,
      (canvas.height / 2) * 1.5,
      200
    );
    gradient3.addColorStop(0.0, 'blue');
    // gradient3.addColorStop(0.25, 'purple');
    // gradient3.addColorStop(0.5, 'yellow');
    // gradient3.addColorStop(0.75, 'red');
    gradient3.addColorStop(1.0, 'white');
    context.fillStyle = gradient3;
    context.fillRect(0, this.centerY, canvas.width / 2, canvas.height / 2);

    const gradient4 = context.createRadialGradient(
      this.centerX * 1.5,
      (canvas.height / 2) * 1.5,
      200,
      this.centerX * 1.5,
      (canvas.height / 2) * 1.5,
      20
    );
    gradient4.addColorStop(0.0, 'blue');
    // gradient4.addColorStop(0.25, 'purple');
    gradient4.addColorStop(0.5, 'white');
    // gradient4.addColorStop(0.75, 'red');
    gradient4.addColorStop(1.0, 'yellow');
    context.fillStyle = gradient4;
    context.fillRect(this.centerX, this.centerY, canvas.width / 2, canvas.height / 2);

    return this;
  }
}
