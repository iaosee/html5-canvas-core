import { Point } from './Point';
import { Vector } from './Vector';
import { Circle } from './Circle';
import { Shape, ShapeConfig } from './Shape';
import { Projection } from './Projection';
import {
  getCircleAxis,
  getPolygonPointClosestToCircle,
  polygonCollidesWithCircle,
  polygonCollidesWithPolygon,
} from './Util';

export interface PolygonConfig extends ShapeConfig {
  points?: Point[];
}

export class Polygon extends Shape {
  public points: Point[] = [];

  public constructor(config?: PolygonConfig) {
    super(config);
    this.points = config?.points || [];
  }

  public addPoint(x: number, y: number) {
    this.points.push(new Point(x, y));

    return this;
  }

  public setPoints(points: Point[]) {
    this.points = [].concat(points);

    return this;
  }

  /** @override */
  public move(dx: number, dy: number) {
    const len = this.points.length;

    for (var i = 0; i < len; ++i) {
      const point = this.points[i];
      point.move(dx, dy);
    }

    return this;
  }

  /** @override */
  public createPath(context: CanvasRenderingContext2D) {
    if (this.points.length === 0) {
      return;
    }

    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);

    for (var i = 0; i < this.points.length; ++i) {
      context.lineTo(this.points[i].x, this.points[i].y);
    }

    context.closePath();
    return this;
  }

  /** @override */
  public collidesWith(shape: Shape) {
    const axes = shape.getAxes();
    if (axes === undefined && shape instanceof Circle) {
      return polygonCollidesWithCircle(this, shape);
    }

    return super.collidesWith(shape);
  }

  /** @implements */
  public collidesMTVWith(shape: Shape, displacement?: number) {
    if (shape instanceof Circle) {
      // return polygonCollidesWithCircle(this, shape, displacement);
      const axes = this.getAxes();
      const closestPoint = getPolygonPointClosestToCircle(this, shape);
      axes.push(getCircleAxis(shape, closestPoint, this));
      return this.minimumTranslationVector(axes, shape, displacement);
    }

    return polygonCollidesWithPolygon(this, shape, displacement);
  }

  /** @override */
  public getAxes(): Vector[] {
    const axes = [];
    const len = this.points.length;

    for (let i = 0; i < len - 1; i++) {
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const v1 = new Vector(p1.x, p1.y);
      const v2 = new Vector(p2.x, p2.y);
      axes.push(v1.edge(v2).normal());
    }

    const v1 = new Vector(this.points[len - 1].x, this.points[len - 1].y);
    const v2 = new Vector(this.points[0].x, this.points[0].y);
    axes.push(v1.edge(v2).normal());

    return axes;
  }

  /** @override */
  public project(axis: Vector): Projection {
    const scalars: number[] = [];

    this.points.forEach((p) => {
      const v = new Vector(p.x, p.y);
      scalars.push(v.dotProduct(axis));
    });

    return new Projection(Math.min.apply(Math, scalars), Math.max.apply(Math, scalars));
  }

  /** @implements */
  public centroid() {
    const pointSum = new Point(0, 0);

    for (let i = 0; i < this.points.length; ++i) {
      const point = this.points[i];
      pointSum.x += point.x;
      pointSum.y += point.y;
    }

    return new Point(pointSum.x / this.points.length, pointSum.y / this.points.length);
  }

  /** @implements */
  public getBoundingBox() {
    let minX: number, minY: number, maxX: number, maxY: number;
    this.points.forEach((point) => {
      if (minX === undefined) {
        minX = maxX = point.x;
        minY = maxY = point.y;
      }
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    });

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }
}
