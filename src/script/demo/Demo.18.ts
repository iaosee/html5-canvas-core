import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { Random } from '../tools/Random';
import { Point, Circle } from '../interfaces';

/**
 * @description 小球 简单弹跳 与 简单碰撞检测
 */
export class Demo extends BaseDemo {
  public name: string = '简单弹跳 与 简单碰撞检测';
  private circles: Array<Circle> = [];
  private random: Random = Random.init(-5, 5);
  public config = {
    circleQuantity: 100,
    circleMinRadius: 5,
    circleMaxRadius: 50,
    throttleValue: 100,
    collisionDetection: false,
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    const pos: Point = {
      x: this.centerX,
      y: this.centerY,
    };

    this.createControl().createCircle().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    return this.clearScreen().drawGrid().drawCircles();
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'circleQuantity').min(0).max(100).step(1);

    gui.add(config, 'circleMinRadius').min(1).max(50).step(1);

    gui.add(config, 'circleMaxRadius').min(5).max(100).step(1);

    gui.add(config, 'throttleValue').min(0).max(1000).step(10);

    gui.add(config, 'collisionDetection');

    return this;
  }

  private createCircle(
    position: Point = this.center,
    quantity: number = this.config.circleQuantity,
    clean: boolean = false
  ) {
    const { config } = this;

    clean && this.circles.splice(0, this.circles.length);
    for (let i = 0; i < quantity; i++) {
      const point: Point = {
        x: position.x || Math.random() * this.width,
        y: position.y || Math.random() * this.height,
      };

      const radius = Random.init(config.circleMinRadius, config.circleMaxRadius).getOne();
      this.circles.push({
        position: point,
        color: this.randomRgba(),
        velocityX: Math.random() * (this.random.range(-20, 20).getOne() || 20),
        velocityY: Math.random() * (this.random.range(-20, 20).getOne() || 20),
        radius: radius,
        gravity: Math.random() * (radius / config.circleMaxRadius),
      });
    }

    return this;
  }

  private drawCircles() {
    const { context } = this;
    this.circles.forEach((circle) => {
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
    const { config } = this;

    if (
      circle.position.x + circle.velocityX + circle.radius > this.width ||
      circle.position.x + circle.velocityX - circle.radius < 0
    ) {
      circle.velocityX = -circle.velocityX * 0.8;
    }
    if (
      circle.position.y + circle.velocityY + circle.radius > this.height ||
      circle.position.y + circle.velocityY - circle.radius < 0
    ) {
      circle.velocityY = -circle.velocityY * 0.8;
    }

    config.collisionDetection && this.collisionDetection(circle);

    circle.position.x += circle.velocityX;
    circle.position.y += circle.velocityY;
    circle.velocityY += circle.gravity || 0;

    return this;
  }

  public collisionDetection(circle: Circle) {
    const { circles } = this;

    for (let i = 0, len = circles.length; i < len; i++) {
      if (circles[i] === circle) {
        break;
      }

      if (
        Math.pow(circle.position.x - circles[i].position.x, 2) +
          Math.pow(circle.position.y - circles[i].position.y, 2) <=
        Math.pow(circle.radius + circles[i].radius, 2)
      ) {
        circle.velocityX = -circle.velocityX;
        circle.velocityY = -circle.velocityY;
        circles[i].velocityX = -circles[i].velocityX;
        circles[i].velocityY = -circles[i].velocityY;
      }
    }

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
