import { Point } from './Point';
import { Polygon, PolygonConfig } from './Polygon';

export interface ImageShapeConfig extends PolygonConfig {
  imageSource: string;
}

export class ImageShape extends Polygon {
  public image: HTMLImageElement;
  public imageLoaded = false;

  public constructor(config: ImageShapeConfig) {
    super(config);

    this.image = new Image();
    this.points = [new Point(config.x, config.y)];

    this.image.src = config.imageSource;
    this.image.addEventListener(
      'load',
      (e) => {
        this.setPolygonPoints();
        this.imageLoaded = true;
      },
      false
    );
  }

  public setPolygonPoints() {
    this.points.push(new Point(this.x + this.image.width, this.y));
    this.points.push(new Point(this.x + this.image.width, this.y + this.image.height));
    this.points.push(new Point(this.x, this.y + this.image.height));
  }

  public drawImage(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.points[0].x, this.points[0].y);
  }

  public fill(context: CanvasRenderingContext2D) {
    return this;
  }

  public stroke(context: CanvasRenderingContext2D) {
    if (this.imageLoaded) {
      context.drawImage(this.image, this.points[0].x, this.points[0].y);
    } else {
      this.image.addEventListener('load', (e) => this.drawImage(context), false);
    }
    return this;
  }
}
