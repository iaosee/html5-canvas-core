import { BaseDemo } from '../base/BaseDemo';
import { Random } from '../tools/Random';
import { Point, Circle } from '../interfaces';

/**
 * @description 好多泡泡
 */
export class Demo extends BaseDemo {
  public name: string = '圆形泡泡';
  private circles: Array<Circle> = [];
  private random: Random = Random.init(-5, 5);

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    const pos: Point = {
      x: this.centerX,
      y: this.centerY
    };
    this.createCircle(pos, 50).listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    return this.clearScreen()
      .drawGrid()
      .drawCircles();
  }

  private createCircle(position: Point, quantity: number = 100, clean: boolean = false) {
    clean && this.circles.splice(0, this.circles.length);
    for (let i = 0; i < quantity; i++) {
      const point: Point = {
        x: position.x || this.centerX,
        y: position.y || this.centerY
      };

      this.circles.push({
        position: point,
        velocityX: Math.random() * (this.random.range(-8, 8).getOne() || 8),
        velocityY: Math.random() * (this.random.range(-8, 8).getOne() || 8),
        radius: Math.random() * 20,
        color: this.randomRgba()
      });
    }

    return this;
  }

  private drawCircles() {
    const { context } = this;
    this.circles.forEach(circle => {
      context.beginPath();
      context.arc(circle.position.x, circle.position.y, circle.radius, 0, Math.PI * 2, false);

      // context.lineWidth = 1.5;
      context.fillStyle = circle.color;
      context.fill();
      // context.strokeStyle = circle.color;
      // context.stroke();

      this.updatePosition(circle);
    });

    return this;
  }

  private updatePosition(circle: Circle) {
    if (
      circle.position.x + circle.velocityX + circle.radius > this.width ||
      circle.position.x + circle.velocityX - circle.radius < 0
    ) {
      circle.velocityX = -circle.velocityX;
    }
    if (
      circle.position.y + circle.velocityY + circle.radius > this.height ||
      circle.position.y + circle.velocityY - circle.radius < 0
    ) {
      circle.velocityY = -circle.velocityY;
    }

    circle.position.x += circle.velocityX;
    circle.position.y += circle.velocityY;

    return this;
  }

  private listenEvents() {
    const { canvas } = this;
    const mouseHandler = (e: MouseEvent) => {
      const coordinate: Point = this.coordinateTransformation(e.clientX, e.clientY);
      e.type === 'click' && this.circles.splice(0, Math.floor(this.circles.length / 2));
      this.createCircle(coordinate, 100, false);
    };

    canvas.addEventListener('mousemove', this.throttle(mouseHandler, 100), false);
    canvas.addEventListener('click', mouseHandler, false);
  }
}
