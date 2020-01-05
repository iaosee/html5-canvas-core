import * as dat from 'dat.gui';

import { Random } from './tools/Random';
import { BaseDemo } from './BaseDemo';
import { Point, Circle } from './declare';

/**
 * @description 小球连接
 */
export class Demo extends BaseDemo {
  private circles: Array<Circle> = [];
  private random: Random = Random.init(-5, 5);
  private mousePosition: Point = { x: 0, y: 0 };
  public config: any = {
    circleQuantity: 50,
    lineType: 1
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
      .drawCircles()
      .drawLines();
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
    gui.add(config, 'lineType', { none: 0, ligature: 1, breaking: 2, connection: 3 }).onFinishChange((v: any) => {
      config.lineType = Number(v);
    });

    return this;
  }

  private createCircle(position: Point, quantity: number = 50, clean: boolean = false) {
    clean && this.circles.splice(0, this.circles.length);
    for (let i = 0; i < quantity; i++) {
      const point: Point = {
        x: position.x || this.centerX,
        y: position.y || this.centerY
      };

      this.circles.push({
        position: point,
        velocityX: Math.random() * (this.random.range(-4, 4).getOne() || 4),
        velocityY: Math.random() * (this.random.range(-4, 4).getOne() || 4),
        radius: this.random.range(5, 10).getOne(),
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

  private drawLines() {
    const { config, context, circles } = this;

    switch (config.lineType) {
      case 1:
        context.beginPath();
        context.moveTo(circles[0].position.x, circles[0].position.y);
        for (let i = 1, iLen = circles.length; i < iLen; i++) {
          context.strokeStyle = circles[i].color;
          context.lineTo(circles[i].position.x, circles[i].position.y);
        }
        context.closePath();
        context.stroke();

        break;
      case 2:
        context.beginPath();
        for (let i = 0, iLen = circles.length; i < iLen; i++) {
          context.strokeStyle = circles[i].color;
          for (let j = i + 1, jLen = circles.length; j < jLen; j++) {
            const xDistance = Math.pow(circles[j].position.x - circles[i].position.x, 2);
            const yDistance = Math.pow(circles[j].position.y - circles[i].position.y, 2);
            const distance = Math.sqrt(xDistance + yDistance);
            if (Math.abs(distance) > 100) {
              continue;
            }
            context.moveTo(circles[i].position.x, circles[i].position.y);
            context.lineTo(circles[j].position.x, circles[j].position.y);
          }

          if (this.mousePosition.x === 0 && this.mousePosition.y === 0) {
            continue;
          }
          const xMouseDistance = Math.pow(this.mousePosition.x - circles[i].position.x, 2);
          const yMouseDistance = Math.pow(this.mousePosition.y - circles[i].position.y, 2);
          const mDistance = Math.sqrt(xMouseDistance + yMouseDistance);
          if (Math.abs(mDistance) > 150) {
            continue;
          }
          context.moveTo(this.mousePosition.x, this.mousePosition.y);
          context.lineTo(circles[i].position.x, circles[i].position.y);
        }
        context.closePath();
        context.stroke();

        break;

      case 3:
        context.beginPath();
        for (let i = 0, iLen = circles.length; i < iLen; i++) {
          context.strokeStyle = circles[i].color;
          for (let j = i + 1, jLen = circles.length; j < jLen; j++) {
            context.moveTo(circles[i].position.x, circles[i].position.y);
            context.lineTo(circles[j].position.x, circles[j].position.y);
          }
        }
        context.closePath();
        context.stroke();
        break;

      case 0:
      default:
        break;
    }

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

  private listenEvents() {
    const { canvas } = this;
    const clickHandler = (e: MouseEvent) => {
      const coordinate: Point = this.coordinateTransformation(e.clientX, e.clientY);
      this.createCircle(coordinate, 20, false);
    };
    const moveHandler = (e: MouseEvent) => {
      const coordinate: Point = this.coordinateTransformation(e.clientX, e.clientY);
      this.mousePosition = coordinate;
    };

    canvas.addEventListener('mousemove', moveHandler, false);
    canvas.addEventListener('click', clickHandler, false);
  }
}
