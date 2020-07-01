import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import { BaseDemo } from './BaseDemo';
import { Random } from './tools/Random';
import { Point, Circle } from './declare';

/**
 * @description 动画 —— 基于时间的运动
 */
export class Demo extends BaseDemo {
  public stats: Stats;
  public circles: Array<Circle> = [];
  public random: Random = Random.init(-5, 5);
  public lastTime = 0;
  public elapsedTime = 0;
  public lastFpsUpdate = 0;
  public lastFpsUpdateTime = 0;

  public fps = 0;
  public config = {
    timeBased: false
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    const pos: Point = {
      x: this.centerX,
      y: this.centerY
    };

    this.createControl()
      .initStats()
      .createCircle(pos, 50)
      .listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw(timestamp: number) {
    const now = +new Date();
    this.elapsedTime = timestamp - this.lastTime;
    const fps = 1000 / (timestamp - this.lastTime);
    this.fps = fps;

    if (now - this.lastFpsUpdateTime > 1000) {
      this.lastFpsUpdate = fps;
      this.lastFpsUpdateTime = now;
    }

    this.clearScreen()
      .drawGrid()
      .drawCircles()
      .drawFpsLabel(this.lastFpsUpdate);

    this.stats.update();
    this.lastTime = timestamp;

    return this;
  }

  public initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
    return this;
  }

  private createControl() {
    const { config } = this;
    const gui = new dat.GUI();

    gui.add(config, 'timeBased');

    return this;
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
    const { context, config } = this;
    this.circles.forEach(circle => {
      context.beginPath();
      context.arc(circle.position.x, circle.position.y, circle.radius, 0, Math.PI * 2, false);

      // context.lineWidth = 1.5;
      context.fillStyle = circle.color;
      context.fill();
      // context.strokeStyle = circle.color;
      // context.stroke();

      config.timeBased ? this.updatePositionByTime(circle) : this.updatePosition(circle);
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

  public updatePositionByTime(circle: Circle) {
    const { canvas } = this;
    let deltaX = (circle.velocityX / this.fps) * 10;
    let deltaY = (circle.velocityY / this.fps) * 10;
    // let deltaX = circle.velocityX * (this.elapsedTime / 1000);
    // let deltaY = circle.velocityY * (this.elapsedTime / 1000);

    if (circle.position.x + deltaX + circle.radius > canvas.width || circle.position.x + deltaX - circle.radius < 0) {
      circle.velocityX = -circle.velocityX;
      deltaX = -deltaX;
    }

    if (circle.position.y + deltaY + circle.radius > canvas.height || circle.position.y + deltaY - circle.radius < 0) {
      circle.velocityY = -circle.velocityY;
      deltaY = -deltaY;
    }

    circle.position.x += deltaX;
    circle.position.y += deltaY;

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
