import { Point } from '../geometry/Point';
import { Shape } from '../geometry/Shape';
import { Polygon } from '../geometry/Polygon';
import { BaseDemo } from '../base/BaseDemo';

/**
 * @description Hello World
 */
export class Demo extends BaseDemo {
  public name: string = '碰撞检测 —— 分离轴定理';

  public shapes: Shape[] = [];
  public shapeBeingDragged: Shape;

  protected mousedownPos: Point = new Point(0, 0);
  protected mousemovePos: Point = new Point(0, 0);

  public polygonPoints = [
    [new Point(250, 150), new Point(250, 250), new Point(350, 250)],

    [new Point(100, 100), new Point(100, 200), new Point(200, 200), new Point(200, 100)],

    [new Point(400, 100), new Point(380, 150), new Point(500, 150), new Point(520, 100)],
  ];

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    this.createControl().initShapes().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public createControl() {
    return this;
  }

  public start() {
    return this.draw();
  }

  public draw() {
    return this.clearScreen().drawGrid().drawScene();
  }

  public initShapes() {
    const { polygonPoints } = this;
    const len = this.polygonPoints.length;

    for (let i = 0; i < len; ++i) {
      const polygon = new Polygon();

      const points = polygonPoints[i];

      polygon.name = `Polygon ${i}`;
      polygon.setPoints(points);
      polygon.strokeStyle = this.randomRgba();
      polygon.fillStyle = this.randomRgba();

      this.shapes.push(polygon);
    }

    return this;
  }

  public drawShapes() {
    const { context } = this;
    this.shapes.forEach(function (shape) {
      shape.stroke(context);
      shape.fill(context);
    });
  }

  public drawScene() {
    const { context } = this;

    this.drawShapes();

    return this;
  }

  public detectCollisions() {
    const { context, shapes, shapeBeingDragged } = this;
    let textY = 30;

    if (!shapeBeingDragged) {
      return;
    }

    context.font = '20px Palatino';
    shapes.forEach(function (shape) {
      if (shape === shapeBeingDragged) {
        return;
      }
      if (shapeBeingDragged.collidesWith(shape)) {
        context.fillStyle = 'red';
        context.fillText(`${shapeBeingDragged.name} Collision with ${shape.name}`, 20, textY);
        textY += 40;
      }
    });

    return this;
  }

  public listenEvents() {
    const { canvas, context, dpr, mousedownPos, mousemovePos, shapes } = this;

    canvas.addEventListener('mousedown', (e: MouseEvent) => {
      const location = this.coordinateTransformation(e.clientX, e.clientY);

      shapes.forEach((shape) => {
        if (shape.isPointInPath(context, location.x * dpr, location.y * dpr)) {
          this.shapeBeingDragged = shape;
          mousedownPos.x = location.x;
          mousedownPos.y = location.y;
          mousemovePos.x = location.x;
          mousemovePos.y = location.y;
        }
      });
    });
    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      const location = this.coordinateTransformation(e.clientX, e.clientY);
      if (!this.shapeBeingDragged) {
        return;
      }

      const dragVector = {
        x: location.x - mousemovePos.x,
        y: location.y - mousemovePos.y,
      };

      this.shapeBeingDragged?.move(dragVector.x, dragVector.y);

      mousemovePos.x = location.x;
      mousemovePos.y = location.y;

      this.draw();
      this.detectCollisions();
    });
    canvas.addEventListener('mouseup', (e: MouseEvent) => {
      this.shapeBeingDragged = null;
    });

    return this;
  }
}
