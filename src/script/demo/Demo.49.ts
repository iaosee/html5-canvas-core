import { BaseDemo } from '../base/BaseDemo';
import { Circle } from '../interfaces';
import { Point } from '../geometry/Point';

/**
 * @description 拖拽交互 —— 扔球/惯性
 */
export class Demo extends BaseDemo {
  public name: string = '拖拽交互 —— 扔球/惯性运动';

  public lastTime = 0;
  public ball: Circle = {
    position: this.center,
    velocityX: 5,
    velocityY: 5,
    radius: 100,
    color: this.randomRgba(),
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.listenEvents();

    this.drawGrid().drawCircle();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this;
  }

  public draw() {
    return this.clearScreen().drawGrid().drawCircle();
  }

  public drawCircle() {
    const { context, ball } = this;

    context.lineWidth = 1.5;
    context.fillStyle = ball.color;
    context.strokeStyle = ball.color;

    context.beginPath();
    context.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();

    return this;
  }

  public setCirclePosition(pos: Point) {
    const { context, ball } = this;

    ball.position = pos;

    if (ball.position.x + ball.radius > this.width) {
      ball.position.x = this.width - ball.radius;
    }
    if (ball.position.x - ball.radius < 0) {
      ball.position.x = ball.radius;
    }
    if (ball.position.y + ball.radius > this.height) {
      ball.position.y = this.height - ball.radius;
    }
    if (ball.position.y - ball.radius < 0) {
      ball.position.y = ball.radius;
    }

    return this;
  }

  private updatePosition() {
    const { ball } = this;

    if (
      ball.position.x + ball.velocityX + ball.radius > this.width ||
      ball.position.x + ball.velocityX - ball.radius < 0
    ) {
      ball.velocityX = -ball.velocityX * 0.8;
    }
    if (
      ball.position.y + ball.velocityY + ball.radius > this.height ||
      ball.position.y + ball.velocityY - ball.radius < 0
    ) {
      ball.velocityY = -ball.velocityY * 0.8;
    }

    ball.position.x += ball.velocityX;
    ball.position.y += ball.velocityY;

    return this;
  }

  public isPointInCirclePath(pos: Point): boolean {
    const { context, dpr, ball } = this;
    context.beginPath();
    context.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2, false);
    context.closePath();
    return context.isPointInPath(pos.x * dpr, pos.y * dpr);
  }

  public animate() {
    this.updatePosition().draw();
    this.player = requestAnimationFrame(this.animate.bind(this));
  }

  private listenEvents() {
    const { canvas, ball } = this;
    let draggingCircle = false;
    let mousedownPos: Point = null;
    let mouseupPos: Point = null;
    let draggingOffsetPos: Point = null;
    let mousedownTime = 0;
    let mouseupTime = 0;

    const didThrow = () => {
      const elapsedTime = mouseupTime - mousedownTime;
      const elapsedMotion = Math.abs(mouseupPos.x - mousedownPos.x) + Math.abs(mouseupPos.y - mousedownPos.y);
      return (elapsedMotion / elapsedTime) * 10 > 10;
    };
    const onMousedownHandler = (e: MouseEvent) => {
      mousedownPos = this.coordinateTransformation(e.clientX, e.clientY);
      mousedownTime = Date.now();
      if (this.isPointInCirclePath(mousedownPos)) {
        this.stop();
        draggingCircle = true;
        draggingOffsetPos = new Point(mousedownPos.x - ball.position.x, mousedownPos.y - ball.position.y);
      }
    };
    const onMousemoveHandler = (e: MouseEvent) => {
      if (!draggingCircle) {
        return;
      }
      const mousemovePos: Point = this.coordinateTransformation(e.clientX, e.clientY);
      this.setCirclePosition(new Point(mousemovePos.x - draggingOffsetPos.x, mousemovePos.y - draggingOffsetPos.y));
      this.draw();
    };
    const onMouseupHandler = (e: MouseEvent) => {
      mouseupTime = Date.now();
      mouseupPos = this.coordinateTransformation(e.clientX, e.clientY);
      if (draggingCircle && didThrow()) {
        console.log('didThrow');
        ball.velocityX = (mouseupPos.x - mousedownPos.x) / 20;
        ball.velocityY = (mouseupPos.y - mousedownPos.y) / 20;
        this.player = requestAnimationFrame(this.animate.bind(this));
      }
      draggingCircle = false;
    };

    canvas.addEventListener('mousedown', onMousedownHandler, false);
    canvas.addEventListener('mousemove', onMousemoveHandler, false);
    document.addEventListener('mouseup', onMouseupHandler, false);
    document.addEventListener('contextmenu', (e) => e.preventDefault(), false);

    return this;
  }
}
