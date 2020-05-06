import { BaseDemo } from './BaseDemo';
import { Point } from './geometry/Point';

/**
 * @description 鼠标跟随，带拖尾鲜果
 */
export class Demo extends BaseDemo {
  public stars: Star[] = [];
  public mousePos: Point = new Point(this.centerX, this.centerY);
  public config = {
    pointCount: 500
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    this.context.fillStyle = 'rgba(0,0,0,1)';
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    this.generatePoint().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public clearScreen() {
    const { context, canvas } = this;
    context.globalAlpha = 0.8;
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    return this;
  }

  public draw() {
    return this.clearScreen().drawScene();
  }

  public generatePoint() {
    const { config } = this;

    for (let i = 0; i < config.pointCount; i++) {
      this.stars.push(
        new Star(
          new Point(this.centerX, this.centerY),
          Math.random() * 10,
          this.randomRgba(),
          Math.random() / 100 + 0.001
        )
      );
    }

    return this;
  }

  public drawScene() {
    const { context, stars, mousePos } = this;

    stars.forEach(star => star.draw(context, mousePos));

    return this;
  }

  protected listenEvents() {
    const { canvas } = this;

    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      this.mousePos = this.coordinateTransformation(e.clientX, e.clientY);
    });

    return this;
  }
}

class Star {
  public maxRadius = Math.random() * 500;
  public theta = Math.random() * Math.PI * 2;

  public constructor(
    public position: Point,
    public radius: number,
    public color: string,
    public speed: number = 0.01
  ) {}

  public set x(v: number) {
    this.position.x = v;
  }

  public get x() {
    return this.position.x;
  }

  public set y(v: number) {
    this.position.y = v;
  }

  public get y() {
    return this.position.y;
  }

  public draw(c: CanvasRenderingContext2D, m: Point) {
    const old = { x: this.x, y: this.y };
    this.theta += this.speed;
    this.x = m.x + Math.cos(this.theta) * this.maxRadius;
    this.y = m.y + Math.sin(this.theta) * this.maxRadius;

    c.beginPath();
    c.lineCap = 'round';
    c.lineWidth = this.radius;
    c.strokeStyle = this.color;
    c.moveTo(old.x, old.y);
    c.lineTo(this.x, this.y);
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.stroke();
    c.closePath();
  }
}
