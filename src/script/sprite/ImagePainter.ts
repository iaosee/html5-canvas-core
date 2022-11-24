import { Sprite, IPainter } from './Sprite';

export class ImagePainter implements IPainter {
  public image = new Image();

  public constructor(imageUrl: string) {
    this.image.src = imageUrl;
  }

  public paint(sprite: Sprite, context: CanvasRenderingContext2D) {
    if (!this.image) {
      return;
    }

    const x = sprite.x || sprite.left;
    const y = sprite.y || sprite.top;

    if (!this.image.complete) {
      this.image.onload = (e) => {
        sprite.width = this.image.width;
        sprite.height = this.image.height;

        context.drawImage(this.image, x, y, sprite.width, sprite.height);
      };
    } else {
      context.drawImage(this.image, x, y, sprite.width, sprite.height);
    }
  }
}
