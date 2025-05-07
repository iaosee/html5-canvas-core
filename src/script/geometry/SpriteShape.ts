import { Point } from './Point';
import { Sprite } from '../sprite';
import { Polygon, PolygonConfig } from './Polygon';

export interface SpriteShapeConfig extends PolygonConfig {
  sprite: Sprite;
}

export class SpriteShape extends Polygon {
  public sprite: Sprite;

  public constructor(config: SpriteShapeConfig) {
    super(config);

    this.sprite = config.sprite;
    this.sprite.left = this.x;
    this.sprite.top = this.y;

    this.setPolygonPoints();
  }

  public setPolygonPoints() {
    this.points.push(new Point(this.x, this.y));
    this.points.push(new Point(this.x + this.sprite.width, this.y));
    this.points.push(new Point(this.x + this.sprite.width, this.y + this.sprite.height));
    this.points.push(new Point(this.x, this.y + this.sprite.height));
  }

  public override move(dx: number, dy: number) {
    for (var i = 0; i < this.points.length; ++i) {
      const point = this.points[i];
      point.x += dx;
      point.y += dy;
    }
    this.sprite.left = this.points[0].x;
    this.sprite.top = this.points[0].y;

    return this;
  }

  public override fill(context: CanvasRenderingContext2D) {
    return this;
  }

  public override stroke(context: CanvasRenderingContext2D) {
    this.sprite.paint(context);
    return this;
  }
}
