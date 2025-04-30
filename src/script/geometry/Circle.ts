import { Point } from './Point';
import { Vector } from './Vector';
import { Polygon } from './Polygon';
import { Projection } from './Projection';
import { Shape, ShapeConfig } from './Shape';
import {
  getCircleAxis,
  getPolygonPointClosestToCircle,
  circleCollidesWithCircle,
  polygonCollidesWithCircle,
} from './Util';

export interface CircleConfig extends ShapeConfig {
  radius: number;
}

export class Circle extends Shape {
  public radius: number;

  public constructor(config?: CircleConfig) {
    super(config);
    this.radius = config?.radius;
  }

  /** @override */
  public override collidesWith(shape: Shape) {
    const axes = shape.getAxes();
    if (axes === undefined && shape instanceof Circle) {
      // circle
      const distance = Math.sqrt(Math.pow(shape.x - this.x, 2) + Math.pow(shape.y - this.y, 2));
      return distance < Math.abs(this.radius + shape.radius);
    }

    return polygonCollidesWithCircle(shape as Polygon, this);
  }

  /** @implements */
  public collidesMTVWith(shape: Shape, displacement?: number) {
    if (shape instanceof Polygon) {
      // return polygonCollidesWithCircle(shape, this, displacement);
      const axes = shape.getAxes();
      const closestPoint = getPolygonPointClosestToCircle(shape, this);
      axes.push(getCircleAxis(this, closestPoint, shape));
      return shape.minimumTranslationVector(axes, this, displacement);
    }

    return circleCollidesWithCircle(this, shape as Circle);
  }

  /** @override */
  public getAxes(): Vector[] {
    return undefined;
  }

  /** @override */
  public project(axis: Vector): Projection {
    const scalars = [];
    const point = new Point(this.x, this.y);
    const dotProduct = new Vector(point.x, point.y).dotProduct(axis);

    scalars.push(dotProduct);
    scalars.push(dotProduct + this.radius);
    scalars.push(dotProduct - this.radius);

    return new Projection(Math.min.apply(Math, scalars), Math.max.apply(Math, scalars));
  }

  /** @override */
  public move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  /** @override */
  public createPath(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  }

  /** @implements */
  public centroid() {
    return new Point(this.x, this.y);
  }

  /** @implements */
  public getBoundingBox() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    };
  }
}
