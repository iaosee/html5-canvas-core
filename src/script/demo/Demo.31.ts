import { BaseDemo } from '../base/BaseDemo';

/**
 * @description 实现波浪效果
 */
export class Demo extends BaseDemo {
  public points: any[] = [];

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    this.createPoints();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    return this.clearScreen()
      .drawGrid()
      .update()
      .drawScene();
  }

  public createPoints() {
    const { canvas, points } = this;
    for (let i = 0; i < canvas.width; i++) {
      points.push({ x: i, y: canvas.height - 150, angle: (i * Math.PI) / 180 });
    }
  }

  public update() {
    const { context, canvas, points } = this;

    points.forEach((p, i) => {
      if (i > 0) {
        p.angle += Math.PI / 45;
        p.y = canvas.height - 150 + Math.sin(p.angle) * 15;
      }
    });

    return this;
  }

  public drawScene() {
    const { canvas, context, points } = this;

    context.strokeStyle = 'rgba(0, 170, 255, 0.8)';
    context.fillStyle = 'rgba(0, 170, 255, 0.8)';

    context.beginPath();
    points.forEach((p, i) => (i === 0 ? context.moveTo(p.x, p.y) : context.lineTo(p.x, p.y)));
    context.lineTo(canvas.width, canvas.height);
    context.lineTo(0, canvas.height);
    context.closePath();
    context.stroke();
    context.fill();

    return this;
  }
}
