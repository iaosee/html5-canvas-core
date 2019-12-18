import * as dat from 'dat.gui';
import { BaseDemo } from './BaseDemo';
import { Random } from './tools/Random';
import { Point, Circle } from './declare';

/**
 * @description 好多泡泡
 */
export class Demo extends BaseDemo {
  private circles: Array<Circle> = [];
  private random: Random = Random.init(-5, 5);
  public config: any = {
    circleQuantity: 5,
    circleMaxRadius: 100,
    throttleValue: 100
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    const pos: Point = {
      x: this.centerX,
      y: this.centerY
    };

    this.createControl()
      .createCircle(pos, this.config.circleQuantity)
      .listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    return this.clearScreen()
      .drawGrid()
      .drawCircles();
  }

  private createControl() {
    const { config } = this;
    const gui = new dat.GUI();

    gui
      .add(config, 'circleQuantity')
      .min(5)
      .max(500)
      .step(5)
      .onFinishChange((v: any) => {
        config.circleQuantity = Number(v);
        this.createCircle(this.center, config.circleQuantity, true);
      });

    gui
      .add(config, 'circleMaxRadius')
      .min(5)
      .max(50)
      .step(1)
      .onFinishChange((v: any) => {
        config.circleMaxRadius = Number(v);
      });

    gui
      .add(config, 'throttleValue')
      .min(0)
      .max(1000)
      .step(10)
      .onFinishChange((v: any) => {
        config.throttleValue = Number(v);
      });

    return this;
  }

  private createCircle(position: Point, quantity: number = 100, clean: boolean = false) {
    const { config } = this;

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
        radius: Math.random() * config.circleMaxRadius,
        color: this.randomRgba(),
        gravity: Math.random() * 5
      });
    }

    return this;
  }

  protected drawGrid(stepX: number = 10, stepY: number = 10, color: string = 'rgba(0,0,0,0.2)') {
    const { context, canvas } = this;

    context.lineWidth = 0.5;
    context.strokeStyle = color;

    for (let i = stepX + 0.5, len = canvas.width; i < len; i += stepX) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, canvas.height);
      context.stroke();
    }

    for (let i = stepY + 0.5, len = canvas.height; i < len; i += stepY) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(canvas.width, i);
      context.stroke();
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
    const { canvas } = this;

    /*
    if (
      circle.position.x + circle.velocityX + circle.radius >= canvas.width ||
      circle.position.x + circle.velocityX - circle.radius <= 0
    ) {
      circle.velocityX = -circle.velocityX;
    }
    if (
      circle.position.y + circle.velocityY + circle.radius >= canvas.height ||
      circle.position.y + circle.velocityY - circle.radius <= 0
    ) {
      circle.velocityY = -circle.velocityY;
    }
*/

    if (circle.position.x + circle.velocityX - circle.radius <= 0) {
      circle.position.x = 0;
      circle.velocityX = -circle.velocityX * 0.8;
    }
    if (circle.position.x + circle.velocityX + circle.radius >= canvas.width) {
      circle.velocityX = -circle.position.x + circle.velocityX + circle.radius;
      circle.velocityX = -circle.velocityX * 0.8;
    }

    circle.position.x += circle.velocityX;
    circle.position.y += circle.velocityY;
    circle.velocityY += circle.gravity || 0;

    return this;
  }

  private listenEvents() {
    const { canvas, config } = this;
    const mouseHandler = (e: MouseEvent) => {
      const coordinate: Point = this.coordinateTransformation(e.clientX, e.clientY);
      e.type === 'click' && this.circles.splice(0, Math.floor(this.circles.length / 2));
      this.createCircle(coordinate, config.circleQuantity, false);
    };

    canvas.addEventListener('mousemove', this.throttle(mouseHandler, config.throttleValue), false);
    canvas.addEventListener('click', mouseHandler, false);
  }
}
