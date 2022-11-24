import { Point } from './Point';
import { Vector } from './Vector';
import { Polygon } from './Polygon';
import { Projection } from './Projection';
import { Shape, ShapeConfig } from './Shape';
import { polygonCollidesWithCircle } from './Util';

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
  public collidesWith(shape: Shape) {
    const axes = shape.getAxes();
    if (axes === undefined && shape instanceof Circle) {
      // circle
      const distance = Math.sqrt(Math.pow(shape.x - this.x, 2) + Math.pow(shape.y - this.y, 2));
      return distance < Math.abs(this.radius + shape.radius);
    }

    return polygonCollidesWithCircle(shape as Polygon, this);
  }

  public getAxes(): Vector[] {
    return undefined;
  }

  public project(axis: Vector): Projection {
    const scalars = [];
    const point = new Point(this.x, this.y);
    const dotProduct = new Vector(point.x, point.y).dotProduct(axis);

    scalars.push(dotProduct);
    scalars.push(dotProduct + this.radius);
    scalars.push(dotProduct - this.radius);

    return new Projection(Math.min.apply(Math, scalars), Math.max.apply(Math, scalars));
  }

  public move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  public createPath(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  }
}
