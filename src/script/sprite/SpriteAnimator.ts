import { IPainter, Sprite } from './Sprite';

export class SpriteAnimator {
  public painters: IPainter[] = [];
  public duration: number = 1000;
  public startTime: number = 0;
  public index: number = 0;
  public elapsedCallback: (sprite: Sprite) => void = () => {};

  public constructor(painters: IPainter[] = [], callback?: () => void) {
    this.painters = painters;
    this.elapsedCallback = callback || this.elapsedCallback;
  }

  public end(sprite: Sprite, originalPainter: IPainter) {
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
