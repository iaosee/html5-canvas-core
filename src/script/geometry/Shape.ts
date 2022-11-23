import { Projection } from './Projection';
import { Vector } from './Vector';

export interface ShapeConfig {
  name?: string;
  x?: number;
  y?: number;
  fillStyle?: string;
  strokeStyle?: string;
}

export class Shape {
  public name: string;
  public x: number;
  public y: number;
  public fillStyle = 'rgba(147, 197, 114, 0.8)';
  public strokeStyle = 'rgba(255, 253, 208, 0.9)';

  public constructor(config?: ShapeConfig) {
    this.x = config?.x;
    this.y = config?.y;
    this.fillStyle = config?.fillStyle || this.fillStyle;
    this.strokeStyle = config?.strokeStyle || this.strokeStyle;
  }

  public getPosition() {
    return { x: this.x, y: this.y };
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  public fill(context: CanvasRenderingContext2D) {
    context.save();
    context.fillStyle = this.fillStyle;
    this.createPath(context);
    context.fill();
    context.restore();
  }

  public stroke(context: CanvasRenderingContext2D) {
    context.save();
    context.strokeStyle = this.strokeStyle;
    this.createPath(context);
    context.stroke();
    context.restore();
  }

  public isPointInPath(context: CanvasRenderingContext2D, x: number, y: number) {
    this.createPath(context);
    return context.isPointInPath(x, y);
  }

  public collidesWith(shape: Shape) {
    const axes = this.getAxes().concat(shape.getAxes());
    return !this.separationOnAxes(axes, shape);
  }

  public separationOnAxes(axes: Array<Vector>, shape: Shape) {
    for (let i = 0, len = axes.length; i < len; i++) {
      const axis = axes[i];
      const projection1 = shape.project(axis);
      const projection2 = this.project(axis);
      if (!projection1.overlaps(projection2)) {
        return true;
      }
    }
    return false;
  }

  public move(dx: number, dy: number) {
    throw 'move(dx, dy) not implemented';
  }

  public createPath(context: CanvasRenderingContext2D) {
    throw 'createPath(context) not implemented';
  }

  public getAxes(): Array<Vector> {
    throw 'getAxes() not implemented';
  }

  public project(axis: Vector): Projection {
    throw 'project(axis) not implemented';
  }
}
