import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { AnimationTimer } from '../sprite/AnimationTimer';
import { Sprite, IBehavior } from '../sprite/Sprite';

/**
 * @description 物理效果 —— 物体下落
 *
 * - https://en.wikipedia.org/wiki/Equations_for_a_falling_body
 * - 地球表面物体下坠 加速度 9.81 m/s
 */
export class Demo extends BaseDemo {
  public override name: string = '物理效果 —— 物体下落';

  public ball: Sprite;
  public ledge: Sprite;

  public pushAnimationTimer = new AnimationTimer();
  public fallingAnimationTimer = new AnimationTimer();

  public config = {
    BALL_RADIUS: 30,
    LEDGE_WIDTH: 200,
    GRAVITY_FORCE: 9.81,
    moveToLeft: () => this.pushBallLeft(),
    moveToRight: () => this.pushBallRight(),
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl().initSprite().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui
      .add(config, 'BALL_RADIUS')
      .min(10)
      .max(100)
      .step(10)
      .onFinishChange(() => this.initSprite());
    gui
      .add(config, 'LEDGE_WIDTH')
      .min(100)
      .max(600)
      .step(10)
      .onFinishChange(() => this.initSprite());
    gui.add(config, 'moveToLeft');
    gui.add(config, 'moveToRight');

    return this;
  }

  public override draw(timestamp: number) {
    return this.clearScreen().drawGrid().drawScene(timestamp);
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
      },
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
            false,
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
            false,
          );
          context.clip();

          context.shadowColor = 'rgba(255,255,0,1.0)';
          context.shadowOffsetX = -4;
          context.shadowOffsetY = -4;
          context.shadowBlur = 8;
          context.stroke();

          context.restore();
        },
      },
      [],
    );

    const ballBehavior = new MoveBallBehavior(
      this.pushAnimationTimer,
      this.fallingAnimationTimer,
      this.ball,
      this.ledge,
    );
    this.ball.addBehavior(ballBehavior);

    this.ball.width = config.BALL_RADIUS * 2;
    this.ball.height = config.BALL_RADIUS * 2;
    this.ball.x = this.center.x - this.ball.width / 2;
    this.ball.y = 50;
    this.ball.velocityX = 100;
    this.ball.velocityY = 0;

    this.ledge.width = config.LEDGE_WIDTH;
    this.ledge.x = this.center.x - this.ledge.width / 2;
    this.ledge.y = this.ball.y + this.ball.height;

    return this;
  }

  public pushBall() {
    const { pushAnimationTimer } = this;

    if (pushAnimationTimer.isRunning()) {
      pushAnimationTimer.stop();
    }
    pushAnimationTimer.start();
  }

  public pushBallLeft() {
    const { ball } = this;
    ball.velocityX = ball.velocityX < 0 ? ball.velocityX : -ball.velocityX;
    this.pushBall();
  }

  public pushBallRight() {
    const { ball } = this;
    ball.velocityX = ball.velocityX > 0 ? ball.velocityX : -ball.velocityX;
    this.pushBall();
  }

  public drawScene(timestamp: number) {
    const { context, ball, ledge } = this;

    ledge.update(context, timestamp);
    ball.update(context, timestamp);

    ledge.paint(context);
    ball.paint(context);

    return this;
  }

  public listenEvents() {
    const { canvas } = this;

    addEventListener('keydown', (e) => {
      if (e.keyCode === 37) {
        this.pushBallLeft();
      } else if (e.keyCode === 39) {
        this.pushBallRight();
      }
    });

    return this;
  }
}

export class MoveBallBehavior implements IBehavior {
  public lastFrameTime: number;

  public constructor(
    private pushAnimationTimer: AnimationTimer,
    private fallingAnimationTimer: AnimationTimer,
    private ball: Sprite,
    private ledge: Sprite,
  ) {}

  public isBallOnLedge() {
    const { ball, ledge } = this;
    return ball.x + ball.width / 2 > ledge.x && ball.x + ball.width / 2 < ledge.x + ledge.width;
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
    const PLATFORM_IN_METERS = 10;
    const pixelsPerMeter = (context.canvas.height - this.ledge.y) / PLATFORM_IN_METERS;

    if (pushAnimationTimer.isRunning()) {
      // 速度 / 动画帧率 = 当前帧所移动的距离
      sprite.x += sprite.velocityX / fps;

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

      // 更新速度
      sprite.velocityY = GRAVITY_FORCE * (fallingAnimationTimer.getElapsedTime() / 1000) * pixelsPerMeter;

      if (sprite.y > context.canvas.height) {
        this.stopFalling();
      }
    }
    this.lastFrameTime = now;
  }
}
