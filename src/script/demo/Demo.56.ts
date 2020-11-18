import * as dat from 'dat.gui';
import { BaseDemo } from '../base/BaseDemo';
import { AnimationTimer } from '../sprite/AnimationTimer';
import { Behavior, Sprite } from '../sprite/Sprite';

/**
 * @description 时间扭曲动画
 */
export class Demo extends BaseDemo {
  public name: string = '时间扭曲动画函数';

  public ball: Sprite;
  public ledge: Sprite;
  public pushAnimationTimer = new AnimationTimer(3000); // 2s

  public animationFnMap: { [key: string]: (percent: number) => number } = {
    linear: AnimationTimer.linear(),
    easeIn: AnimationTimer.easeIn(1),
    easeOut: AnimationTimer.easeOut(1),
    easeInOut: AnimationTimer.easeInOut(),
    elastic: AnimationTimer.elastic(4),
    bounce: AnimationTimer.bounce(2)
  };

  public config = {
    animationFn: 'linear',
    restartAnimation: () => this.restartAnimationTimer()
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    this.pushAnimationTimer.setTimeWarp(this.animationFnMap[this.config.animationFn]);
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
      this.pushAnimationTimer.setTimeWarp(this.animationFnMap[value]);
    });
    gui.add(config, 'restartAnimation');

    return this;
  }

  public draw(timestamp: number) {
    // const now = +new Date();

    return this.clearScreen()
      .drawGrid()
      .drawScene(timestamp);
  }

  public initSprite() {
    const { canvas, pushAnimationTimer } = this;

    this.ball = new Sprite('ball', {
      paint(sprite: Sprite, context: CanvasRenderingContext2D) {
        context.save();
        context.beginPath();
        context.arc(sprite.x, sprite.y, sprite.width / 2, 0, Math.PI * 2, false);
        context.clip();

        context.shadowColor = 'rgb(0,0,255)';
        context.shadowOffsetX = -4;
        context.shadowOffsetY = -4;
        context.shadowBlur = 8;
        context.lineWidth = 2;
        context.strokeStyle = 'rgb(100,100,195)';
        context.stroke();

        context.beginPath();
        context.arc(sprite.x, sprite.y, sprite.width / 2 / 2, 0, Math.PI * 2, false);
        context.clip();

        context.shadowColor = 'rgb(255,255,0)';
        context.shadowOffsetX = -4;
        context.shadowOffsetY = -4;
        context.shadowBlur = 8;
        context.stroke();

        context.restore();
      }
    });

    this.ledge = new Sprite('ledge', {
      paint(sprite: Sprite, context: CanvasRenderingContext2D) {
        context.save();
        context.shadowColor = 'rgba(0,0,0,0.8)';
        context.shadowBlur = 8;
        context.shadowOffsetX = 4;
        context.shadowOffsetY = 4;

        context.fillStyle = 'rgba(255,255,0,0.6)';
        context.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
        context.restore();
      }
    });

    this.ball.addBehavior(new MoveBallBehavior(this.ball, this.ledge, pushAnimationTimer));

    this.ledge.x = 200;
    this.ledge.y = canvas.height / 2;
    this.ledge.height = 5;
    this.ledge.width = canvas.width - this.ledge.x * 2;

    this.ball.width = 50;
    this.ball.height = 50;
    this.ball.x = this.ledge.x + this.ball.width / 2;
    this.ball.y = this.ledge.y - this.ball.width / 2;
    this.ball.velocityX = 100;
    this.ball.velocityY = 0;

    return this;
  }

  public drawScene(timestamp: number) {
    const { context, ball, ledge } = this;

    ball.update(context, timestamp);
    ball.paint(context);
    ledge.update(context, timestamp);
    ledge.paint(context);

    return this;
  }

  public restartAnimationTimer() {
    const { pushAnimationTimer } = this;
    if (pushAnimationTimer.isRunning()) {
      pushAnimationTimer.stop();
    }
    pushAnimationTimer.start();
  }
}

export class MoveBallBehavior implements Behavior {
  public lastTime: number;

  public constructor(private ball: Sprite, private ledge: Sprite, private pushAnimationTimer: AnimationTimer) {}

  public isBallOnLedge() {
    const { ball, ledge } = this;
    return ball.x + ball.width > ledge.x && ball.x < ledge.x + ledge.width;
  }

  public resetBall() {
    this.ball.x = this.ledge.x + this.ball.width / 2;
    this.ball.y = this.ledge.y - this.ball.width / 2;
  }

  public updateBallPosition(elapsed: number) {
    const { ball } = this;
    ball.x += ball.velocityX * (elapsed / 1000);
  }

  public execute(ball: Sprite, context: CanvasRenderingContext2D, time: number) {
    const { ledge, pushAnimationTimer } = this;
    const animationElapsed = pushAnimationTimer.getElapsedTime();
    let elapsed = 0;

    if (pushAnimationTimer.isRunning()) {
      if (this.lastTime !== undefined) {
        elapsed = animationElapsed - this.lastTime;

        this.updateBallPosition(elapsed);
        // ballLocations.push(ball.left);

        if (this.isBallOnLedge()) {
          if (pushAnimationTimer.isOver()) {
            pushAnimationTimer.stop();
          }
        } else {
          // ball fell off the ledge
          pushAnimationTimer.stop();
          this.resetBall();
        }
      }
    }
    this.lastTime = animationElapsed;
  }
}
