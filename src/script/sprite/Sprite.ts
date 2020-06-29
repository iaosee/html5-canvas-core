export interface Painter {
  paint(sprite: Sprite, context: CanvasRenderingContext2D): void;
}

export interface Behavior {
  execute(sprite: Sprite, context: CanvasRenderingContext2D, time: number): void;
}

export class Sprite {
  public name: string;
  public x = 0;
  public y = 0;
  public width = 10;
  public height = 10;
  public velocityX = 0;
  public velocityY = 0;
  public visible = true;
  public animating = false;
  public painter: Painter = null;
  public behaviors: Behavior[] = [];

  public constructor(name: string, painter: Painter, behaviors: Behavior[] = []) {
    this.name = name;
    this.painter = painter;
    this.behaviors = behaviors;
  }

  public setX(x: number) {
    this.x = x;
  }

  public setY(y: number) {
    this.y = y;
  }

  public paint(context: CanvasRenderingContext2D) {
    if (this.painter && this.visible) {
      this.painter.paint(this, context);
    }
  }

  public update(context: CanvasRenderingContext2D, time: number) {
    for (let i = this.behaviors.length; i > 0; --i) {
      this.behaviors[i - 1].execute(this, context, time);
    }
  }
}

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
