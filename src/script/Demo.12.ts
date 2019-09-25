import { BaseDemo } from './BaseDemo';

/**
 * @description 创建阴影
 */
export class Demo extends BaseDemo {
  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid().createShadow();
  }

  public draw() {
    return this;
  }

  public createShadow() {
    const { context } = this;
    const rectWidth = 500;
    const rectHeight = 500;

    context.shadowColor = 'rgba(0,0,0,0.5)';
    context.shadowOffsetX = 10;
    context.shadowOffsetY = 10;
    context.shadowBlur = 10;
    context.fillStyle = 'rgba(38, 85, 131, 0.8)';
    context.fillRect(this.centerX - rectWidth / 2, this.centerY - rectHeight / 2, rectWidth, rectHeight);
    context.fill();

    return this;
  }
}
