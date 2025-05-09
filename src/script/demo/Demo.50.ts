import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { Random } from '../tools/Random';
import { Circle, Point } from '../interfaces';

/**
 * @description 拖拽交互 —— 鼠标路径跟随
 */
export class Demo extends BaseDemo {
  public override name: string = '拖拽交互 —— 鼠标路径跟随';

  public lastTime = 0;
  public circles: Array<Circle> = [];
  public random: Random = Random.init(-5, 5);
  public mousePosition: Point = {
    x: this.centerX,
    y: this.centerY,
  };
  public config = {
    quantity: 50,
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    const pos: Point = {
      x: this.centerX,
      y: this.centerY,
    };

    this.createControl().drawGrid().createCircle(50).listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  // public override start() {
  //   return this.draw();
  // }

  public override draw() {
    return this.clearScreen().drawGrid().drawCircles().updateCircle();
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui
      .add(config, 'quantity')
      .min(5)
      .max(300)
      .step(5)
      .onFinishChange((v: any) => {
        config.quantity = Number(v);
        this.createCircle(config.quantity, true);
      });

    return this;
  }

  public createCircle(quantity: number = 50, clean: boolean = false) {
    clean && this.circles.splice(0, this.circles.length);
    for (let i = 0; i < quantity; i++) {
      const radius = Math.random() * 30;

      const point: Point = {
        x: this.random
          .min(radius)
          .max(this.width - radius)
          .getOne(),
        y: this.random
          .min(radius)
          .max(this.height - radius)
          .getOne(),
      };

      this.circles.push({
        position: point,
        velocityX: Math.random() * (this.random.range(-5, 5).getOne() || 5),
        velocityY: Math.random() * (this.random.range(-5, 5).getOne() || 5),
        radius: radius,
        color: this.randomRgba(),
      });
    }

    return this;
  }

  private drawCircles() {
    const { context, config } = this;
    this.circles.forEach((circle) => {
      context.beginPath();
      context.arc(circle.position.x, circle.position.y, circle.radius, 0, Math.PI * 2, false);

      // context.lineWidth = 1.5;
      context.fillStyle = circle.color;
      context.fill();
      // context.strokeStyle = circle.color;
      // context.stroke();
    });

    return this;
  }

  public updateCircle() {
    this.circles.forEach((circle) => this.updatePosition(circle));

    return this;
  }

  private updatePosition(circle: Circle) {
    const { canvas } = this;

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

  public moveFollow() {
    const { canvas, circles, mousePosition } = this;

    circles.forEach((circle, index) => {
      setTimeout(() => {
        if (mousePosition.x >= this.width - circle.radius || mousePosition.x <= circle.radius) {
          circle.position.x = mousePosition.x <= circle.radius ? circle.radius : this.width - circle.radius;
        } else {
          circle.position.x = mousePosition.x;
        }

        if (mousePosition.y > this.height - circle.radius || mousePosition.y <= circle.radius) {
          circle.position.y = mousePosition.y <= circle.radius ? circle.radius : this.height - circle.radius;
        } else {
          circle.position.y = mousePosition.y;
        }
      }, index * 10);

      // this.updatePosition(circle);
    });

    return this;
  }

  public animateFollw() {
    this.moveFollow();
    this.clearScreen().drawGrid().drawCircles();
    this.player = requestAnimationFrame(this.animateFollw.bind(this));
  }

  private listenEvents() {
    const { canvas } = this;
    const onMouseenterHandler = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      this.stop();
      this.animateFollw();
    };
    const onMousemoveHandler = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      console.log(e);
      if (e instanceof MouseEvent) {
        this.mousePosition = this.coordinateTransformation(e.clientX, e.clientY);
      } else if (e instanceof TouchEvent) {
        const event: Touch = e.touches[0];
        this.mousePosition = this.coordinateTransformation(event.clientX, event.clientY);
      }
    };
    const onMouseleaveHandler = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      this.start();
    };

    canvas.addEventListener('mouseenter', onMouseenterHandler, false);
    canvas.addEventListener('touchstart', onMouseenterHandler, false);
    canvas.addEventListener('mousemove', onMousemoveHandler, false);
    canvas.addEventListener('touchmove', onMousemoveHandler, false);
    canvas.addEventListener('mouseleave', onMouseleaveHandler, false);
    canvas.addEventListener('touchend', onMouseleaveHandler, false);
    document.addEventListener('contextmenu', (e) => e.preventDefault(), false);

    return this;
  }
}
