import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { Random } from '../tools/Random';
import { Point } from '../geometry/Point';
import { Vector } from '../geometry/Vector';
import { Shape } from '../geometry/Shape';
import { Circle } from '../geometry/Circle';
import { Polygon } from '../geometry/Polygon';
import { CircleImage } from '../geometry/CircleImage';
import { RandomConvexPolygon } from '../geometry/RandomConvexPolygon';
import { MinimumTranslationVector } from '../geometry/MinimumTranslationVector';

import golfball from '../../../asset/images/golfball.png';

/**
 * @description 碰撞检测 — 分离轴定理
 */
export class Demo extends BaseDemo {
  public override name: string = '碰撞检测 — 最小平移向量';

  public shapes: Shape[] = [];

  public lastTime = 0;
  public isStuck: boolean = false;
  public shapeMoving: Shape;
  public velocity = { x: 350, y: 250 };
  public lastVelocity = { x: 350, y: 250 };

  public mousedownPos = new Point(0, 0);
  public mousemovePos = new Point(0, 0);
  public randomPolygon = new RandomConvexPolygon({
    maxWidth: 200,
    maxHeight: 200,
  });

  public polygonPoints = [
    [new Point(100, 100), new Point(100, 200), new Point(200, 200)],
    [new Point(300, 100), new Point(300, 200), new Point(400, 200), new Point(400, 100)],
    [new Point(500, 100), new Point(475, 200), new Point(600, 200), new Point(625, 100)],
    // this.randomPolygon.getConvex(5),
  ];

  public config = {
    boundingBox: false,
    count: 10,
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl().initShapes().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public createControl() {
    const { velocity, config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'boundingBox').onFinishChange((value: string) => this.drawScene());
    gui
      .add(velocity, 'x')
      .min(10)
      .max(1500)
      .onFinishChange((v: number) => (this.velocity.x = Number(v)));
    gui
      .add(velocity, 'y')
      .min(10)
      .max(1500)
      .onFinishChange((v: number) => (this.velocity.y = Number(v)));

    return this;
  }

  public override draw(timestamp: number = 0) {
    const { shapeMoving, velocity } = this;

    if (!this.lastTime) {
      this.lastTime = timestamp;
    }

    if (shapeMoving) {
      const elapsedTime = timestamp - this.lastTime;
      const dx = velocity.x * (elapsedTime / 1000);
      const dy = velocity.y * (elapsedTime / 1000);
      shapeMoving.move(dx, dy);

      this.handleEdgeCollisions().handleShapeCollisions();
    }

    this.drawScene();

    this.lastTime = timestamp;
    return this;
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
      for (let j = 0; j < 3; j++) {
        const points = this.randomPolygon.getConvex(Random.init(4, 10).random());
        const polygon = new Polygon();
        polygon.setPoints(points);
        polygon.move(j * 300, (i + 1) * 300);
        polygon.name = `Polygon ${i}-${j}`;
        polygon.strokeStyle = this.randomRgba();
        polygon.fillStyle = this.randomRgba();
        this.shapes.push(polygon);
      }
    }

    this.shapes.push(new Circle({ name: 'circle 1', x: 100, y: 50, radius: 30 }));
    this.shapes.push(new Circle({ name: 'circle 2', x: 250, y: 50, radius: 50 }));

    this.shapes.push(
      new CircleImage({
        name: 'circleImage',
        x: 800,
        y: 100,
        radius: 72,
        strokeStyle: 'red',
        imageSource: golfball,
      }),
    );
    return this;
  }

  public drawShapes() {
    const { context, config } = this;

    this.shapes.forEach((shape) => {
      shape.stroke(context);
      shape.fill(context);
      if (config.boundingBox) {
        const rect = shape.getBoundingBox();
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      }
    });

    return this;
  }

  public drawScene() {
    const { context } = this;

    this.clearScreen().drawGrid().drawShapes();
    // .detectCollisions();

    return this;
  }

  public detectCollisions() {
    const { context, shapes, shapeMoving, velocity } = this;
    let textY = 30;

    if (!shapeMoving) {
      return this;
    }

    context.save();
    context.font = '20px Palatino';
    shapes.forEach((shape) => {
      if (shape === shapeMoving) {
        return;
      }
      const mtv = shapeMoving.collidesMTVWith(shape);
      if (mtv.axis || mtv.overlap) {
        // collided
        context.lineWidth = 10;
        context.fillStyle = 'red';
        context.strokeStyle = 'red';
        context.fillText(`${shapeMoving.name} Collision with ${shape.name}`, 20, textY);
        context.strokeRect(0, 0, this.width, this.height);
        textY += 40;
        !this.isStuck && this.stick(mtv);
      }
    });
    context.restore();

    const bBox = shapeMoving?.getBoundingBox();
    if (bBox.x + bBox.width > this.width || bBox.x < 0) {
      velocity.x = -velocity.x;
    }
    if (bBox.y + bBox.height > this.height || bBox.y < 0) {
      velocity.y = -velocity.y;
    }

    return this;
  }

  public stick(mtv: MinimumTranslationVector) {
    const { shapeMoving, velocity, lastVelocity } = this;

    if (!mtv.axis) {
      // The object that's moving is a circle.
      const point = new Point();
      const velocityMagnitude = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2));
      // Point the mtv axis in the direction of the circle's velocity.
      point.x = velocity.x / velocityMagnitude;
      point.y = velocity.y / velocityMagnitude;
      mtv.axis = new Vector(point.x, point.y);
    }

    let dx = mtv.axis.x * (mtv.overlap + 2);
    let dy = mtv.axis.y * (mtv.overlap + 2);

    if ((dx < 0 && velocity.x < 0) || (dx > 0 && velocity.x > 0)) {
      dx = -dx;
    }

    if ((dy < 0 && velocity.y < 0) || (dy > 0 && velocity.y > 0)) {
      dy = -dy;
    }

    setTimeout(() => {
      shapeMoving.move(dx, dy);
    }, 500);

    lastVelocity.x = velocity.x;
    lastVelocity.y = velocity.y;
    velocity.x = velocity.y = 0;

    this.isStuck = true;
  }

  public separate(mtv: MinimumTranslationVector) {
    const { shapeMoving, velocity, lastVelocity } = this;

    let dx, dy, velocityMagnitude, point;

    if (!mtv.axis) {
      point = new Point();
      velocityMagnitude = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2));
      point.x = velocity.x / velocityMagnitude;
      point.y = velocity.y / velocityMagnitude;
      mtv.axis = new Vector(point.x, point.y);
    }

    dy = mtv.axis.y * mtv.overlap;
    dx = mtv.axis.x * mtv.overlap;

    if ((dx < 0 && velocity.x < 0) || (dx > 0 && velocity.x > 0)) {
      dx = -dx;
    }
    if ((dy < 0 && velocity.y < 0) || (dy > 0 && velocity.y > 0)) {
      dy = -dy;
    }

    shapeMoving.move(dx, dy);
  }

  public checkMTVAxisDirection(mtv: MinimumTranslationVector, collider: Shape, collided: Shape) {
    if (!mtv.axis) {
      return;
    }

    const centroid1 = Vector.fromPoint(collider.centroid());
    const centroid2 = Vector.fromPoint(collided.centroid());
    const centroidVector = centroid2.subtract(centroid1);
    const centroidUnitVector = new Vector(centroidVector.x, centroidVector.y).normalize();

    if (centroidUnitVector.dotProduct(mtv.axis) > 0) {
      mtv.axis.x = -mtv.axis.x;
      mtv.axis.y = -mtv.axis.y;
    }
  }

  public bounce(mtv: MinimumTranslationVector, collider: Shape, collided: Shape) {
    const { shapeMoving, velocity, lastVelocity } = this;
    const velocityVector = new Vector(velocity.x, velocity.y);
    const velocityUnitVector = velocityVector.normalize();
    const velocityVectorMagnitude = velocityVector.getMagnitude();

    if (!shapeMoving) {
      return;
    }

    this.checkMTVAxisDirection(mtv, collider, collided);

    const point = new Point();
    const perpendicular = mtv.axis ? mtv.axis.perpendicular() : new Vector(-velocityUnitVector.y, velocityUnitVector.x);

    const vdotl = velocityUnitVector.dotProduct(perpendicular);
    const ldotl = perpendicular.dotProduct(perpendicular);
    const dotProductRatio = vdotl / ldotl;

    point.x = 2 * dotProductRatio * perpendicular.x - velocityUnitVector.x;
    point.y = 2 * dotProductRatio * perpendicular.y - velocityUnitVector.y;

    this.separate(mtv);

    velocity.x = point.x * velocityVectorMagnitude;
    velocity.y = point.y * velocityVectorMagnitude;
  }

  public handleEdgeCollisions() {
    const { shapeMoving, velocity } = this;
    const bBox = shapeMoving.getBoundingBox();
    const right = bBox.x + bBox.width;
    const bottom = bBox.y + bBox.height;

    if (right > this.width || bBox.x < 0) {
      velocity.x = -velocity.x;
      if (right > this.width) shapeMoving.move(0 - (right - this.width), 0);
      if (bBox.x < 0) shapeMoving.move(-bBox.x, 0);
    }
    if (bottom > this.height || bBox.y < 0) {
      velocity.y = -velocity.y;
      if (bottom > this.height) shapeMoving.move(0, 0 - (bottom - this.height));
      if (bBox.y < 0) shapeMoving.move(0, -bBox.y);
    }

    return this;
  }

  public handleShapeCollisions() {
    const { shapeMoving } = this;

    this.shapes.forEach((shape) => {
      if (shape !== shapeMoving) {
        const mtv = shapeMoving.collidesMTVWith(shape);
        if (mtv.axis || mtv.overlap) {
          this.bounce(mtv, shapeMoving, shape);
        }
      }
    });

    return this;
  }

  public listenEvents() {
    const { canvas, context, dpr, shapes, velocity, lastVelocity } = this;

    canvas.addEventListener('mousedown', (e: MouseEvent) => {
      const location = this.coordinateTransformation(e.clientX, e.clientY);

      // velocity.x = lastVelocity.x;
      // velocity.y = lastVelocity.y;

      this.isStuck = false;
      this.shapeMoving = undefined;

      shapes.forEach((shape) => {
        if (shape.isPointInPath(context, location.x * dpr, location.y * dpr)) {
          this.shapeMoving = shape;
        }
      });
    });

    return this;
  }
}
