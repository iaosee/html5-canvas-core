import { Point } from '../geometry/Point';
import { Shape } from '../geometry/Shape';
import { Polygon } from '../geometry/Polygon';
import { BaseDemo } from '../base/BaseDemo';
import { Random } from '../tools/Random';
import { Circle } from '../geometry/Circle';
import { Sprite, ImagePainter } from '../sprite';
import { ImageShape } from '../geometry/ImageShape';
import { SpriteShape } from '../geometry/SpriteShape';
import { RandomConvexPolygon } from '../geometry/RandomConvexPolygon';

import golfball from '../../../asset/images/golfball.png';
import tennisBall from '../../../asset/images/tennis-ball.png';

/**
 * @description 碰撞检测 — 分离轴定理
 */
export class Demo extends BaseDemo {
  public name: string = '碰撞检测 — 分离轴定理';

  public shapes: Shape[] = [];
  public shapeBeingDragged: Shape;

  private mousedownPos = new Point(0, 0);
  private mousemovePos = new Point(0, 0);
  private randomPolygon = new RandomConvexPolygon({
    maxWidth: 200,
    maxHeight: 200,
  });

  public polygonPoints = [
    [new Point(100, 100), new Point(100, 200), new Point(200, 200)],
    [new Point(300, 100), new Point(300, 200), new Point(400, 200), new Point(400, 100)],
    [new Point(500, 100), new Point(475, 200), new Point(600, 200), new Point(625, 100)],
    // this.randomPolygon.getConvex(5),
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
      polygon.setPoints(points);

      polygon.name = `Polygon ${i}`;
      polygon.strokeStyle = this.randomRgba();
      polygon.fillStyle = this.randomRgba();
      this.shapes.push(polygon);
    }

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 5; j++) {
        const points = this.randomPolygon.getConvex(Random.init(4, 10).random());
        const polygon = new Polygon();
        polygon.setPoints(points);
        polygon.move(j * 200, (i + 1) * 200);
        polygon.name = `Polygon ${i}-${j}`;
        polygon.strokeStyle = this.randomRgba();
        polygon.fillStyle = this.randomRgba();
        this.shapes.push(polygon);
      }
    }

    const ballSprite = new Sprite('ball', new ImagePainter(tennisBall));
    ballSprite.left = 200;
    ballSprite.top = 200;
    ballSprite.width = 79;
    ballSprite.height = 79;

    this.shapes.push(new ImageShape({ name: 'golfball', imageSource: golfball, x: 50, y: 300 }));
    this.shapes.push(
      new SpriteShape({ name: 'spriteBall', sprite: ballSprite, x: ballSprite.left, y: ballSprite.top })
    );

    this.shapes.push(new Circle({ name: 'circle 1', x: 150, y: 50, radius: 30 })),
      this.shapes.push(new Circle({ name: 'circle 2', x: 300, y: 50, radius: 50 }));

    return this;
  }

  public drawShapes() {
    const { context } = this;

    this.shapes.forEach((shape) => {
      shape.stroke(context);
      shape.fill(context);
      const rect = shape.getClientRect();
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
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

    context.save();
    context.font = '20px Palatino';
    shapes.forEach((shape) => {
      if (shape === shapeBeingDragged) {
        return;
      }
      if (shapeBeingDragged.collidesWith(shape)) {
        context.lineWidth = 10;
        context.fillStyle = 'red';
        context.strokeStyle = 'red';
        context.fillText(`${shapeBeingDragged.name} Collision with ${shape.name}`, 20, textY);
        context.strokeRect(0, 0, this.width, this.height);
        textY += 40;
      }
    });
    context.restore();

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
