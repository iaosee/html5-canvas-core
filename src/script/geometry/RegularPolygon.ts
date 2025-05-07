import { Point } from './Point';
import { Shape } from './Shape';
import { Polygon, PolygonConfig } from './Polygon';

export interface RegularPolygonConfig extends PolygonConfig {
  sides: number;
  radius: number;
  startAngle: number;
  filled?: boolean;
}

export class RegularPolygon extends Polygon {
  public sides: number;
  public radius: number;
  public startAngle: number;
  public filled: boolean;

  public constructor(config: RegularPolygonConfig) {
    super(config);

    this.sides = config.sides;
    this.radius = config.radius;
    this.startAngle = config.startAngle;
    this.filled = config.filled;
    this.points = this.generatePoints();
  }

  public generatePoints(): Point[] {
    const points = [];
    let angle = this.startAngle || 0;

    for (let i = 0; i < this.sides; ++i) {
      points.push(new Point(this.x + this.radius * Math.sin(angle), this.y - this.radius * Math.cos(angle)));
      angle += (2 * Math.PI) / this.sides;
    }

    this.points = points;
    return points;
  }

  public override move(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.generatePoints();
    return this;
  }
}
