import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { Random } from '../tools/Random';
import { Point } from '../geometry/Point';
import { Vector } from '../geometry/Vector';
import { Shape } from '../geometry/Shape';
import { Circle } from '../geometry/Circle';
import { Polygon } from '../geometry/Polygon';
import { RandomConvexPolygon } from '../geometry/RandomConvexPolygon';
import { MinimumTranslationVector } from '../geometry/MinimumTranslationVector';

interface MotionShape {
  shape: Shape;
  velocityX: number;
  velocityY: number;
}

/**
 * @description 碰撞检测 — 分离轴定理
 */
export class Demo extends BaseDemo {
  public override name: string = '碰撞检测 — 多物体运动检测';

  // public shapes: Shape[] = [];
  public shapes: MotionShape[] = [];

  public lastTime = 0;

  public random: Random = Random.init(-5, 5);
  public randomPolygon = new RandomConvexPolygon({
    maxWidth: 100,
    maxHeight: 100,
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

    this.createControl().initShapes(); //.listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    // gui.add(config, 'boundingBox').onFinishChange((value: string) => this.drawScene());

    return this;
  }

  // public override start() {
  //   return this.draw();
  // }

  public override draw(timestamp: number = 0) {
    if (!this.lastTime) {
      this.lastTime = timestamp;
    }

    this.drawScene(timestamp);

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

      this.shapes.push({
        shape: polygon,
        velocityX: this.random.range(-400, 400).getOne(),
        velocityY: this.random.range(-400, 400).getOne(),
      });
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 10; j++) {
        const points = this.randomPolygon.getConvex(Random.init(4, 10).random());
        const polygon = new Polygon();
        polygon.setPoints(points);
        polygon.move(j * 200, (i + 1) * 200);
        polygon.name = `Polygon ${i}-${j}`;
        polygon.strokeStyle = this.randomRgba();
        polygon.fillStyle = this.randomRgba();

        this.shapes.push({
          shape: polygon,
          velocityX: this.random.range(-400, 400).getOne(),
          velocityY: this.random.range(-400, 400).getOne(),
        });
      }
    }

    this.shapes.push({
      shape: new Circle({ name: 'circle 1', x: 100, y: 50, radius: 30 }),
      velocityX: this.random.range(-400, 400).getOne(),
      velocityY: this.random.range(-400, 400).getOne(),
    });
    this.shapes.push({
      shape: new Circle({ name: 'circle 2', x: 250, y: 50, radius: 50 }),
      velocityX: this.random.range(-400, 400).getOne(),
      velocityY: this.random.range(-400, 400).getOne(),
    });

    return this;
  }

  public drawShapes() {
    const { context, config } = this;

    this.shapes.forEach((item) => {
      const shape = item.shape;

      shape.stroke(context);
      shape.fill(context);
      if (config.boundingBox) {
        const rect = shape.getBoundingBox();
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      }
    });

    return this;
  }

  public drawScene(timestamp: number = 0) {
    const { context } = this;

    this.clearScreen().drawGrid().drawShapes();

    this.update(timestamp);

    return this;
  }

  public update(timestamp: number) {
    const elapsedTime = timestamp - this.lastTime;

    this.shapes.forEach((item) => {
      const shape = item.shape;
      const dx = item.velocityX * (elapsedTime / 1000);
      const dy = item.velocityY * (elapsedTime / 1000);

      shape.move(dx, dy);

      this.handleEdgeCollisions(item).handleShapeCollisions(item);
    });
  }

  public handleEdgeCollisions(motionObj: MotionShape) {
    const shape = motionObj.shape;
    const bBox = shape.getBoundingBox();
    const right = bBox.x + bBox.width;
    const bottom = bBox.y + bBox.height;

    if (right > this.width || bBox.x < 0) {
      motionObj.velocityX = -motionObj.velocityX;
      if (right > this.width) shape.move(0 - (right - this.width), 0);
      if (bBox.x < 0) shape.move(-bBox.x, 0);
    }

    if (bottom > this.height || bBox.y < 0) {
      motionObj.velocityY = -motionObj.velocityY;
      if (bottom > this.height) shape.move(0, 0 - (bottom - this.height));
      if (bBox.y < 0) shape.move(0, -bBox.y);
    }

    return this;
  }

  public handleShapeCollisions(motionObj: MotionShape) {
    const detectShape = motionObj.shape;

    this.shapes.forEach((item) => {
      const shape = item.shape;

      if (shape !== detectShape) {
        const mtv = detectShape.collidesMTVWith(shape);
        if (mtv.axis || mtv.overlap) {
          this.bounce(mtv, motionObj, item);
        }
      }
    });

    return this;
  }

  public bounce(mtv: MinimumTranslationVector, collider: MotionShape, collided: MotionShape) {
    const velocityX = collider.velocityX;
    const velocityY = collider.velocityY;

    const velocityVector = new Vector(velocityX, velocityY);
    const velocityUnitVector = velocityVector.normalize();
    const velocityVectorMagnitude = velocityVector.getMagnitude();

    this.checkMTVAxisDirection(mtv, collider.shape, collided.shape);

    const point = new Point();
    const perpendicular = mtv.axis ? mtv.axis.perpendicular() : new Vector(-velocityUnitVector.y, velocityUnitVector.x);

    const vdotl = velocityUnitVector.dotProduct(perpendicular);
    const ldotl = perpendicular.dotProduct(perpendicular);
    const dotProductRatio = vdotl / ldotl;

    point.x = 2 * dotProductRatio * perpendicular.x - velocityUnitVector.x;
    point.y = 2 * dotProductRatio * perpendicular.y - velocityUnitVector.y;

    this.separate(mtv, collider);

    collider.velocityX = point.x * velocityVectorMagnitude;
    collider.velocityY = point.y * velocityVectorMagnitude;
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

  public separate(mtv: MinimumTranslationVector, collider: MotionShape) {
    const velocityX = collider.velocityX;
    const velocityY = collider.velocityY;
    let dx, dy, velocityMagnitude, point;

    if (!mtv.axis) {
      point = new Point();
      velocityMagnitude = Math.sqrt(Math.pow(velocityX, 2) + Math.pow(velocityY, 2));
      point.x = velocityX / velocityMagnitude;
      point.y = velocityY / velocityMagnitude;
      mtv.axis = new Vector(point.x, point.y);
    }

    dy = mtv.axis.y * mtv.overlap;
    dx = mtv.axis.x * mtv.overlap;

    if ((dx < 0 && velocityX < 0) || (dx > 0 && velocityX > 0)) {
      dx = -dx;
    }
    if ((dy < 0 && velocityY < 0) || (dy > 0 && velocityY > 0)) {
      dy = -dy;
    }

    collider.shape.move(dx, dy);
  }
}
