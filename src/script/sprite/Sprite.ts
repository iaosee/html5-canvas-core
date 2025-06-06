export interface SheetCell {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IPainter {
  paint(sprite: Sprite, context: CanvasRenderingContext2D): void;
}

export interface IBehavior {
  execute(sprite: Sprite, context: CanvasRenderingContext2D, time: number): void;
}

/**
 * @description Sprite
 * 精灵无需自己完成绘制，将绘制操作代理给另一个对象，这即使用策略模式
 * 各个不同 IPainter 对象实现了不同的绘制算法，由使用者自己指定 IPainter
 * 精灵的各种行为运用命令模式，将各种行为命令 IBehavior 封装，使用者自行指定行为
 */
export class Sprite<P extends IPainter = IPainter> {
  public name: string;
  public x: number = 0;
  public y: number = 0;
  public left: number = 0;
  public top: number = 0;
  public width: number = 0;
  public height: number = 0;
  public velocityX: number = 0;
  public velocityY: number = 0;
  public visible: boolean = true;
  public animating: boolean = false;
  public painter: P = null;
  public behaviors: IBehavior[] = [];

  public constructor(name: string, painter: P = null, behaviors: IBehavior[] = []) {
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

  public addBehavior(behavior: IBehavior) {
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
