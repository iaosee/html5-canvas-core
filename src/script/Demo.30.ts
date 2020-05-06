import { BaseDemo } from './BaseDemo';

/**
 * @description 裁剪动画
 */
export class Demo extends BaseDemo {
  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid().drawText();
  }

  public draw() {
    return this;
  }

  public drawText() {
    const { context } = this;

    context.save();

    context.shadowColor = 'rgba(100, 100, 150, 0.8)';
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;

    context.font = '180px Palatino';
    context.fillStyle = 'cornflowerblue';

    const text = 'HTML5 Canvas';
    const textInfo = context.measureText(text);
    context.fillText(text, this.centerX - textInfo.width / 2, this.centerY);

    context.strokeStyle = 'yellow';
    context.strokeText(text, this.centerX - textInfo.width / 2, this.centerY);

    context.restore();

    return this;
  }

  public setClippingRegion(radius: number) {
    const { context, canvas } = this;
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2, false);
    context.clip();

    return this;
  }

  public fillCanvas(color: string) {
    const { context, canvas } = this;

    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return this;
  }

  public drawAnimationFrame(radius: number) {
    this.setClippingRegion(radius);
    this.fillCanvas('lightgray');
    this.drawText();
    return this;
  }

  public endAnimation(loop: number) {
    const { context, canvas } = this;
    clearInterval(loop);

    setTimeout(() => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.drawText();
    }, 1000);
  }

  public animate() {
    const { context, canvas } = this;

    let radius = canvas.width / 2;
    let loop: number;

    loop = window.setInterval(() => {
      radius -= canvas.width / 100;

      this.fillCanvas('charcoal');

      if (radius > 0) {
        context.save();
        this.drawAnimationFrame(radius);
        context.restore();
      } else {
        this.endAnimation(loop);
      }
    }, 16);
  }

  protected listenEvents() {
    const { canvas } = this;

    canvas.addEventListener('click', () => this.animate());

    return this;
  }
}
