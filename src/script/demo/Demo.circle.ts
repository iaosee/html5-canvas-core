import { BaseDemo } from '../base/BaseDemo';
import { Random } from '../tools/Random';
import { Point, Circle } from '../interfaces';

/**
 * @description 好多泡泡
 */
export class Demo extends BaseDemo {
  private circles: Array<Circle> = [];
  private random: Random = Random.init(-5, 5);
  private mousePosition: Point = null;

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

  private createCircle(position: Point, quantity: number = 100) {
    const { canvas } = this;
    const stepX = 20;
    const stepY = 20;
    const row_count = (canvas.width - 20) / stepX;
    const col_count = (canvas.height - 20) / stepY;

    for (let row = 0; row < row_count; row++) {
      for (let col = 0; col < col_count; col++) {
        const point = {
          x: (row + 1) * stepX,
          y: (col + 1) * stepY
        };

        this.circles.push({
          position: point,
          velocityX: Math.random() * (this.random.range(-1, 1).getOne() || 1),
          velocityY: Math.random() * (this.random.range(-1, 1).getOne() || 1),
          radius: 10,
          color: this.randomRgba()
        });
      }
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

      // this.updatePosition(circle);
      this.updateRadius(circle);
    });

    return this;
  }

  private updatePosition(circle: Circle) {
    const { canvas } = this;

    if (
      circle.position.x + circle.velocityX + circle.radius > canvas.width ||
      circle.position.x + circle.velocityX - circle.radius < 0
    ) {
      circle.velocityX = -circle.velocityX;
    }
    if (
      circle.position.y + circle.velocityY + circle.radius > canvas.height ||
      circle.position.y + circle.velocityY - circle.radius < 0
    ) {
      circle.velocityY = -circle.velocityY;
    }

    circle.position.x += circle.velocityX;
    circle.position.y += circle.velocityY;

    return this;
  }

  public updateRadius(circle: Circle) {
    if (!this.mousePosition) {
      return this;
    }

    const xMouseDistance = Math.pow(this.mousePosition.x - circle.position.x, 2);
    const yMouseDistance = Math.pow(this.mousePosition.y - circle.position.y, 2);
    const mDistance = Math.sqrt(xMouseDistance + yMouseDistance);
    if (Math.abs(mDistance) < 100) {
      if (circle.radius < 20) {
        circle.radius += 1;
      }
    } else if (circle.radius > 10) {
      circle.radius -= 1;
    }

    return this;
  }

  private listenEvents() {
    const { canvas } = this;
    const mouseHandler = (e: MouseEvent) => {
      const coordinate: Point = this.coordinateTransformation(e.clientX, e.clientY);
      this.mousePosition = coordinate;
    };
    canvas.addEventListener('mousemove', mouseHandler, false);
  }
}
