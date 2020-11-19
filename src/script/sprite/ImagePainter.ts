import { Sprite, Painter } from './Sprite';

export class ImagePainter implements Painter {
  public image = new Image();

  public constructor(imageUrl: string) {
    this.image.src = imageUrl;
  }

  public paint(sprite: Sprite, context: CanvasRenderingContext2D) {
    if (!this.image) {
      return;
    }

    if (!this.image.complete) {
      this.image.onload = e => {
        sprite.width = this.image.width;
        sprite.height = this.image.height;

        context.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height);
      };
    } else {
      context.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height);
    }
  }
}
