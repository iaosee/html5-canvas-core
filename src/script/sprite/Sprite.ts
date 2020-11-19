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

  public constructor(name: string, painter: P = null, behaviors: Behavior[] = []) {
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

  public setPainter(painter: P) {
    this.painter = painter;
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
