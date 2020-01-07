import { Point } from './Point';
import { Geometry } from './Geometry';

export class Polygon extends Geometry {
  public constructor(
    public position: Point,
    public radius: number,
    public sides: number,
    public startAngle: number,
    public fillStyle: string,
    public strokeStyle: string,
    public filled: boolean
  ) {
    super(position);
  }

  public getPoints(): Point[] {
    const points = [];
    let angle = this.startAngle || 0;

    for (let i = 0; i < this.sides; ++i) {
      points.push(
        new Point(this.position.x + this.radius * Math.sin(angle), this.position.y - this.radius * Math.cos(angle))
      );
      angle += (2 * Math.PI) / this.sides;
    }

    return points;
  }

  public createPath(context: CanvasRenderingContext2D) {
    const points = this.getPoints();
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < this.sides; ++i) {
      context.lineTo(points[i].x, points[i].y);
    }
    context.closePath();
  }

  public stroke(context: CanvasRenderingContext2D) {
    context.save();
    this.createPath(context);
    context.strokeStyle = this.strokeStyle;
    context.stroke();
    context.restore();
  }

  public fill(context: CanvasRenderingContext2D) {
    if (!this.filled) {
      return;
    }
    context.save();
    this.createPath(context);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.restore();
  }
}
