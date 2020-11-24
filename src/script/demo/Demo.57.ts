import * as dat from 'dat.gui';

import { BaseDemo } from '../base/BaseDemo';
import { Sprite, RunnerSprite, AnimationTimer, IBehavior } from '../sprite';

export class Demo extends BaseDemo {
  public name: string = '时间动画-缓动函数控制精灵运动';

  public ledge: Sprite;
  public runner: RunnerSprite;
  public runBehavior: RunInPlaceBehavior;
  public moveBehavior: MoveLeftToRightBehavior;

  public ANIMATION_DURATION: number = 3000;
  public animationTimer = new AnimationTimer(this.ANIMATION_DURATION, AnimationTimer.easeInOut());

  public animationFnMap: { [key: string]: (percent: number) => number } = {
    linear: AnimationTimer.linear(),
    easeIn: AnimationTimer.easeIn(2),
    easeOut: AnimationTimer.easeOut(2),
    easeInOut: AnimationTimer.easeInOut(),
    elastic: AnimationTimer.elastic(4),
    bounce: AnimationTimer.bounce(4)
  };

  public config = {
    animationFn: 'linear',
    startRun: () => this.startAnimation(),
    endRun: () => this.endAnimation()
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl().initSprite();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  private createControl() {
    const { config } = this;
    this.gui = new dat.GUI();
    const { gui } = this;

    gui.add(config, 'animationFn', Object.keys(this.animationFnMap)).onFinishChange(value => {
      this.animationTimer.setTimeWarp(this.animationFnMap[value]);
    });
    gui.add(config, 'startRun');
    gui.add(config, 'endRun');
    return this;
  }

  public draw(timestamp?: number) {
    // const now = +new Date();
    // console.log(timestamp);

    return this.clearScreen()
      .drawGrid()
      .drawScene(timestamp);
  }

  public initSprite() {
    const { canvas, animationTimer } = this;

    this.runner = new RunnerSprite();

    this.ledge = new Sprite('ledge', {
      paint(sprite: Sprite, context: CanvasRenderingContext2D) {
        context.save();
        context.shadowColor = 'rgba(0,0,0,0.8)';
        context.fillStyle = 'rgba(204,204,0,0.6)';
        context.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
        context.restore();
      }
    });

    this.ledge.x = 0;
    this.ledge.y = canvas.height / 2;
    this.ledge.height = 5;
    this.ledge.width = canvas.width;

    this.runner.setX(this.ledge.x + this.ledge.width - this.runner.width);
    this.runner.setY(this.ledge.y - this.runner.height);

    this.runBehavior = new RunInPlaceBehavior(animationTimer);
    this.moveBehavior = new MoveLeftToRightBehavior(animationTimer);
    this.runner.addBehavior(this.runBehavior);
    this.runner.addBehavior(this.moveBehavior);
    this.runner.velocityX = 100; // pixels/second

    return this;
  }

  public drawScene(timestamp: number) {
    const { context, animationTimer } = this;

    if (animationTimer.isOver()) {
      this.endAnimation();
    }

    this.ledge.update(context, timestamp);
    this.ledge.paint(context);
    this.runner.update(context, timestamp);
    this.runner.paint(context);

    return this;
  }

  public startAnimation() {
    const { context, animationTimer } = this;

    if (!animationTimer.isRunning()) {
      animationTimer.start();
    }

    return this;
  }

  public endAnimation() {
    const { context, animationTimer } = this;

    animationTimer.stop();
    animationTimer.reset();
    this.runBehavior.reset();
    this.moveBehavior.reset();

    return this;
  }
}

class RunInPlaceBehavior implements IBehavior {
  public lastAdvance: number = 0;
  public PAGEFLIP_INTERVAL: number = 100;

  public constructor(private animationTimer: AnimationTimer) {}

  public reset() {
    this.lastAdvance = 0;
  }

  public execute(sprite: RunnerSprite, context: CanvasRenderingContext2D, time: number) {
    const { animationTimer } = this;
    if (!animationTimer.isRunning()) {
      return;
    }
    const elapsed = animationTimer.getElapsedTime();

    if (this.lastAdvance === 0) {
      // skip first time
      this.lastAdvance = elapsed;
    } else if (this.lastAdvance !== 0 && elapsed - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
      sprite.painter.advance();
      this.lastAdvance = elapsed;
    }
  }
}

class MoveLeftToRightBehavior implements IBehavior {
  public lastMove: number = 0;

  public constructor(private animationTimer: AnimationTimer) {}

  public reset() {
    this.lastMove = 0;
  }

  public execute(sprite: RunnerSprite, context: CanvasRenderingContext2D, time: number) {
    const { animationTimer } = this;
    if (!animationTimer.isRunning()) {
      return;
    }
    const elapsed = animationTimer.getElapsedTime();
    const advanceElapsed = elapsed - this.lastMove;

    if (this.lastMove === 0) {
      // skip first time
      this.lastMove = elapsed;
    } else {
      sprite.x -= (advanceElapsed / 1000) * sprite.velocityX;
      sprite.x = sprite.x < 0 ? context.canvas.width : sprite.x;
      this.lastMove = elapsed;
    }
  }
}
