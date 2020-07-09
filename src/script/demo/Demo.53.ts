import * as dat from 'dat.gui';
import { BaseDemo } from '../base/BaseDemo';
import { AnimationTimer } from '../sprite/AnimationTimer';
import {
  Behavior,
  ImagePainter,
  SheetCell,
  Sprite,
  SpriteSheetPainter,
  Painter,
  SpriteAnimator
} from '../sprite/Sprite';

/**
 * @description 精灵绘制器 —— 精灵表绘制器
 */
export class Demo extends BaseDemo {
  public ball: Sprite;
  public ledge: Sprite;

  public pushAnimationTimer = new AnimationTimer();
  public fallingAnimationTimer = new AnimationTimer();

  public config = {
    BALL_RADIUS: 30,
    GRAVITY_FORCE: 9.81,
    moveToLeft: () => this.pushBallLeft(),
    moveToRight: () => this.pushBallRight()
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
    const gui = new dat.GUI();

    gui.add(config, 'moveToLeft');

    return this;
  }

  public draw(timestamp: number) {
    return this.clearScreen()
      .drawGrid()
      .drawScene(timestamp);
  }

  public initSprite() {
    const { config } = this;

    this.ledge = new Sprite('ledge', {
      paint(sprite, context) {
        context.save();
        context.shadowColor = 'rgba(0,0,0,0.5)';
        context.shadowBlur = 8;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;

        context.fillStyle = 'rgba(255,255,0,0.6)';
        context.strokeStyle = 'rgba(0,0,0,0.6)';
        context.beginPath();
        context.rect(sprite.x, sprite.y, sprite.width, sprite.height);
        context.fill();
        context.stroke();
        context.restore();
      }
    });
    this.ball = new Sprite(
      'ball',
      {
        paint(sprite, context) {
          context.save();
          context.beginPath();
          context.arc(
            sprite.x + sprite.width / 2,
            sprite.y + sprite.height / 2,
            config.BALL_RADIUS,
            0,
            Math.PI * 2,
            false
          );
          context.clip();

          context.shadowColor = 'rgba(0,0,255,0.7)';
          context.shadowOffsetX = -4;
          context.shadowOffsetY = -4;
          context.shadowBlur = 8;

          context.lineWidth = 2;
          context.strokeStyle = 'rgba(100,100,195,0.8)';
          context.stroke();

          context.beginPath();
          context.arc(
            sprite.x + sprite.width / 2,
            sprite.y + sprite.height / 2,
            config.BALL_RADIUS / 2,
            0,
            Math.PI * 2,
            false
          );
          context.clip();

          context.shadowColor = 'rgba(255,255,0,1.0)';
          context.shadowOffsetX = -4;
          context.shadowOffsetY = -4;
          context.shadowBlur = 8;
          context.stroke();

          context.restore();
        }
      },
      []
    );

    const ballBehavior = new MoveBallBehavior(
      this.pushAnimationTimer,
      this.fallingAnimationTimer,
      this.ball,
      this.ledge
    );
    this.ball.addBehavior(ballBehavior);

    this.ball.width = config.BALL_RADIUS * 2;
    this.ball.height = config.BALL_RADIUS * 2;
    this.ball.x = this.center.x - this.ball.width / 2;
    this.ball.y = 50;
    this.ball.velocityX = 100;
    this.ball.velocityY = 0;

    this.ledge.width = 200;
    this.ledge.x = this.center.x - this.ledge.width / 2;
    this.ledge.y = this.ball.y + this.ball.height;

    return this;
  }

  public pushBallLeft() {
    const { pushAnimationTimer } = this;

    if (pushAnimationTimer.isRunning()) {
      pushAnimationTimer.stop();
    }
    pushAnimationTimer.start();
  }

  public pushBallRight() {}

  public drawScene(timestamp: number) {
    const { context, config, ball, ledge } = this;

    ball.update(context, timestamp);
    ledge.update(context, timestamp);

    ledge.paint(context);
    ball.paint(context);

    return this;
  }
}

export class MoveBallBehavior implements Behavior {
  public lastFrameTime: number;

  public constructor(
    private pushAnimationTimer: AnimationTimer,
    private fallingAnimationTimer: AnimationTimer,
    private ball: Sprite,
    private ledge: Sprite
  ) {}

  public isBallOnLedge() {
    const { ball, ledge } = this;
    return ball.x + ball.width > ledge.x && ball.y < ledge.x + ledge.width;
  }

  public startFalling() {
    this.fallingAnimationTimer.start();
    this.ball.velocityY = 0;
  }

  public stopFalling() {
    this.fallingAnimationTimer.stop();
    this.pushAnimationTimer.stop();
    this.ball.x = this.ledge.x + this.ledge.width / 2 - this.ball.width / 2;
    this.ball.y = this.ledge.y - (this.ball.width / 2) * 2;
    this.ball.velocityY = 0;
  }

  public execute(sprite: Sprite, context: CanvasRenderingContext2D, time: number) {
    const { pushAnimationTimer, fallingAnimationTimer } = this;
    const now = +new Date();
    const fps = 1000 / (now - this.lastFrameTime);
    // TODO
    const GRAVITY_FORCE = 9.81;
    const pixelsPerMeter = (context.canvas.height - this.ledge.y) / 10;

    if (pushAnimationTimer.isRunning()) {
      sprite.x -= sprite.velocityX / fps;
      console.log('execute');

      if (this.isBallOnLedge()) {
        if (pushAnimationTimer.getElapsedTime() > 200) {
          pushAnimationTimer.stop();
        }
      } else if (!fallingAnimationTimer.isRunning()) {
        this.startFalling();
        this.lastFrameTime = now;
      }
    }

    if (fallingAnimationTimer.isRunning()) {
      sprite.y += sprite.velocityY / fps;
      sprite.velocityY = GRAVITY_FORCE * (fallingAnimationTimer.getElapsedTime() / 1000) * pixelsPerMeter;

      if (sprite.y > context.canvas.height) {
        this.stopFalling();
      }
    }
    this.lastFrameTime = now;
  }
}
