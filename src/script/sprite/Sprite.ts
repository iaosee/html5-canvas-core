export interface SheetCell {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Painter {
  paint(sprite: Sprite, context: CanvasRenderingContext2D): void;
}

export interface Behavior {
  execute(sprite: Sprite, context: CanvasRenderingContext2D, time: number): void;
}

/**
 * @description Sprite
 * 精灵无需自己完成绘制，将绘制操作代理给另一个对象，这即使用策略模式
 * 各个不同 Painter 对象实现了不同的绘制算法，由使用者自己指定 Painter
 * 精灵的各种行为运用命令模式，将各种行为命令 Behavior 封装，使用者自行指定行为
 */
export class Sprite<P extends Painter = Painter> {
  public name: string;
  public x = 0;
  public y = 0;
  public width = 10;
  public height = 10;
  public velocityX = 0;
  public velocityY = 0;
  public visible = true;
  public animating = false;
  public painter: P = null;
  public behaviors: Behavior[] = [];

  public constructor(name: string, painter: P, behaviors: Behavior[] = []) {
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

  public addBehavior(behavior: Behavior) {
    if (this.behaviors.includes(behavior)) {
      return this;
    }
    this.behaviors.push(behavior);
    return this;
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

export class SpriteAnimator {
  public painters: Painter[] = [];
  public duration: number = 1000;
  public startTime: number = 0;
  public index: number = 0;
  public elapsedCallback: (sprite: Sprite) => void = () => {};

  public constructor(painters: Painter[] = [], callback?: () => void) {
    this.painters = painters;
    this.elapsedCallback = callback || this.elapsedCallback;
  }

  public end(sprite: Sprite, originalPainter: Painter) {
    sprite.animating = false;

    if (this.elapsedCallback) {
      this.elapsedCallback(sprite);
    } else {
      sprite.painter = originalPainter;
    }
  }

  public start(sprite: Sprite, duration: number) {
    const endTime = +new Date() + duration;
    const period = duration / this.painters.length;
    const originalPainter = sprite.painter;
    let interval: any = null;

    this.index = 0;
    sprite.animating = true;
    sprite.painter = this.painters[this.index];

    interval = setInterval(() => {
      if (+new Date() < endTime) {
        sprite.painter = this.painters[++this.index];
      } else {
        this.end(sprite, originalPainter);
        clearInterval(interval);
      }
    }, period);
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
export class SpriteSheetPainter implements Painter {
  public cells: SheetCell[] = [];
  public cellIndex: number = 0;
  public spriteSheet = new Image();

  public constructor(spriteSheetImageUrl: string, cells: SheetCell[] = []) {
    this.cells = cells;
    this.spriteSheet.src = spriteSheetImageUrl;
  }

  public advance() {
    if (this.cellIndex === this.cells.length - 1) {
      this.cellIndex = 0;
    } else {
      this.cellIndex++;
    }
  }

  public paint(sprite: Sprite, context: CanvasRenderingContext2D) {
    if (!this.spriteSheet) {
      return;
    }

    const cell = this.cells[this.cellIndex];
    if (!this.spriteSheet.complete) {
      this.spriteSheet.onload = e => {
        context.drawImage(
          this.spriteSheet,
          cell.x,
          cell.y,
          cell.width,
          cell.height,
          sprite.x,
          sprite.y,
          cell.width,
          cell.height
        );
      };
    } else {
      context.drawImage(
        this.spriteSheet,
        cell.x,
        cell.y,
        cell.width,
        cell.height,
        sprite.x,
        sprite.y,
        cell.width,
        cell.height
      );
    }
  }
}
