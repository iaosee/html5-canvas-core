import { Point } from './Point';
import { Sprite } from '../sprite';
import { Circle, CircleConfig } from './Circle';
import { Polygon, PolygonConfig } from './Polygon';

export interface CircleImageConfig extends CircleConfig {
  imageSource: string;
}

export class CircleImage extends Circle {
  public image: HTMLImageElement;
  public imageLoaded = false;

  public constructor(config: CircleImageConfig) {
    super(config);

    this.image = new Image();
    this.image.src = config.imageSource;
    this.image.addEventListener(
      'load',
      (e) => {
        this.imageLoaded = true;
        this.radius = this.image.width / 2;
      },
      false,
    );
  }

  public drawImage(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x - this.radius, this.y - this.radius);
  }

  /** @override */
  public override move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  public override fill(context: CanvasRenderingContext2D) {
    return this;
  }

  public override stroke(context: CanvasRenderingContext2D) {
    super.stroke(context);

    if (this.imageLoaded) {
      this.drawImage(context);
    } else {
      this.image.addEventListener('load', (e) => this.drawImage(context), false);
    }

    return this;
  }
}
