import * as dat from 'dat.gui';
import { BaseDemo } from '../base/BaseDemo';
import { Point } from '../interfaces';
import { renderStyle } from '../tools/util';
import { Sprite, Behavior } from '../sprite/Sprite';

const ARENA_LENGTH_IN_METERS = 10;
const INITIAL_LAUNCH_ANGLE = Math.PI / 4;

/**
 * @description 物理效果 —— 抛射物体
 *
 * - https://en.wikipedia.org/wiki/Equations_for_a_falling_body
 * - 地球表面物体下坠 加速度 9.81 m/s
 */
export class Demo extends BaseDemo {
  public name: string = '抛射物体';

  public ball: Sprite;
  public ledge: Sprite;
  public bucket: Sprite;
  public bucketImage: HTMLImageElement;
  public score: number = 0;
  public lastScore: number = 0;
  public lastMouse: Point = { x: 0, y: 0 };
  public launchAngle: number = INITIAL_LAUNCH_ANGLE;
  public launchVelocity: number = 0;
  public pixelsPerMeter: number = this.canvas.width / ARENA_LENGTH_IN_METERS;
  public ballInFlight: boolean = false;
  public threePointer: boolean = false;
  public tipsInfo: HTMLElement = document.createElement('div');

  public config = {
    ledge: {
      X: 100,
      Y: this.canvas.height - 100,
      WIDTH: 100
    },
    ball: {
      RADIUS: 10
    },
    bucket: {
      X: this.canvas.width - 200,
      Y: this.canvas.height - 150
    },
    GRAVITY_FORCE: 9.81,
    launchTime: undefined as any
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl()
      .addTipsToScene()
      .loadImage(require('../../../asset/images/bucket.png'))
      .then(image => {
        this.bucketImage = image;
        this.initSprite()
          .resetSpriteStatus()
          .listenEvents()
          .startPlay();
      });
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  private createControl() {
    const { config } = this;
    this.gui = new dat.GUI();
    const { gui } = this;

    gui
      .add(config.ledge, 'X')
      .min(50)
      .max(this.canvas.width)
      .step(10)
      .onFinishChange(() => this.resetSpriteStatus());
    gui
      .add(config.ledge, 'Y')
      .min(50)
      .max(this.canvas.height)
      .step(10)
      .onFinishChange(() => this.resetSpriteStatus());
    gui
      .add(config.ledge, 'WIDTH')
      .min(50)
      .max(300)
      .step(10)
      .onFinishChange(() => this.resetSpriteStatus());
    gui
      .add(config.ball, 'RADIUS')
      .min(10)
      .max(50)
      .step(5)
      .onFinishChange(() => this.resetSpriteStatus());
    gui
      .add(config.bucket, 'X')
      .min(500)
      .max(this.canvas.width - 100)
      .step(5)
      .onFinishChange(() => this.resetSpriteStatus());
    gui
      .add(config.bucket, 'Y')
      .min(10)
      .max(this.canvas.height - 100)
      .step(5)
      .onFinishChange(() => this.resetSpriteStatus());

    return this;
  }

  public start() {
    return this;
  }

  public draw(timestamp: number) {
    return this.clearScreen()
      .drawGrid()
      .drawScene(timestamp);
  }

  public destroy() {
    super.destroy();
    this.tipsInfo.remove();
  }

  private addTipsToScene() {
    renderStyle(this.tipsInfo, {
      position: 'absolute',
      zIndex: '5',
      cursor: 'crosshair',
      top: '0',
      left: '50%',
      transform: 'translate(-50%, 0)'
    });
    document.body.appendChild(this.tipsInfo);
    return this;
  }

  public initSprite() {
    const { config, bucketImage } = this;

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
            sprite.x, // + sprite.width / 2,
            sprite.y, // + sprite.height / 2,
            config.ball.RADIUS,
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
            sprite.x, // + sprite.width / 2,
            sprite.y, // + sprite.height / 2,
            config.ball.RADIUS / 2,
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

    this.bucket = new Sprite('bucket', {
      paint(sprite, context) {
        context.strokeStyle = 'rgba(100,100,195,0.8)';
        context.rect(sprite.x, sprite.y, sprite.width, sprite.height);
        context.stroke();
        context.drawImage(bucketImage, sprite.x, sprite.y);
      }
    });

    const ballBehavior = new LobBallBehavior(this);
    const bucketBehavior = new CatchBallBehavior(this);
    this.ball.addBehavior(ballBehavior);
    this.bucket.addBehavior(bucketBehavior);

    return this;
  }

  public drawScene(timestamp: number) {
    const { context, ball, ledge, bucket, config } = this;

    if (!this.ballInFlight) {
      this.drawGuidewire();
      this.updateBackgroundText();

      if (this.lastScore !== 0) {
        // just scored
        this.resetScoreLater();
      }
    }

    ledge.update(context, timestamp);
    ball.update(context, timestamp);
    bucket.update(context, timestamp);

    ledge.paint(context);
    ball.paint(context);
    bucket.paint(context);

    return this;
  }

  public resetScoreLater() {
    setTimeout(() => {
      this.lastScore = 0;
    }, 1000);
  }

  public resetSpriteStatus() {
    const { config, bucketImage } = this;

    this.ledge.x = config.ledge.X;
    this.ledge.y = config.ledge.Y;
    this.ledge.width = config.ledge.WIDTH;
    this.ledge.height = 10;

    this.ball.width = config.ball.RADIUS * 2;
    this.ball.height = config.ball.RADIUS * 2;
    this.ball.x = this.ledge.x + this.ledge.width / 2; // - this.ball.width / 2;
    this.ball.y = this.ledge.y - this.ball.height / 2;
    this.ball.velocityX = 0;
    this.ball.velocityY = 0;

    this.bucket.x = config.bucket.X;
    this.bucket.y = config.bucket.Y;
    this.bucket.width = bucketImage.width;
    this.bucket.height = bucketImage.height;

    this.ballInFlight = false;
    return this;
  }

  public drawGuidewire() {
    const { context, lastMouse, ball, bucket } = this;
    context.save();
    context.strokeStyle = 'rgba(200,200,200,0.8)';
    context.beginPath();
    context.setLineDash([4, 4]);
    context.lineDashOffset = 5;
    context.moveTo(ball.x, ball.y);
    context.lineTo(lastMouse.x, lastMouse.y);
    context.stroke();
    context.restore();

    return this;
  }

  public showText(text: string) {
    const { context, canvas, ball, bucket } = this;
    const metrics = context.measureText(text);
    context.font = '42px Helvetica';

    context.save();
    context.shadowColor = undefined;
    context.strokeStyle = 'rgb(80,120,210)';
    context.fillStyle = 'rgba(100,140,230,0.5)';

    context.fillText(text, canvas.width / 2 - metrics.width / 2, canvas.height / 2);

    context.strokeText(text, canvas.width / 2 - metrics.width / 2, canvas.height / 2);
    context.restore();

    return this;
  }

  public updateBackgroundText() {
    if (this.lastScore === 3) {
      this.showText('Three pointer!');
    } else if (this.lastScore === 2) {
      this.showText('Nice shot!');
    }
  }

  public listenEvents() {
    const { canvas, config, lastMouse, ball } = this;

    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.ballInFlight) {
        const loc = this.coordinateTransformation(e.clientX, e.clientY);
        lastMouse.x = loc.x;
        lastMouse.y = loc.y;

        // const deltaX = Math.abs(lastMouse.x - ball.x);
        // const deltaY = Math.abs(lastMouse.y - ball.y);
        const deltaX = lastMouse.x - ball.x;
        const deltaY = Math.abs(lastMouse.y - ball.y);

        // 计算 鼠标与水平面的弧度 、更新加速度
        // 反正切 —— 已知 对边 邻边 比值 求 夹角
        this.launchAngle = Math.atan(deltaY / deltaX);
        this.launchVelocity = (4 * deltaY) / Math.sin(this.launchAngle) / this.pixelsPerMeter || 0;
        // when `this.pixelsPerMeter` equals 0  get NaN

        // console.log(this.launchAngle, this.launchAngle * 180 / Math.PI, this.launchVelocity);
        const angle = (this.launchAngle * 180) / Math.PI;

        const tips = 'Angle: ' + angle.toFixed(2) + ' m/s, Velocity: ' + this.launchVelocity.toFixed(2) + ' degrees';
        this.tipsInfo.innerHTML = tips;
      }
    });

    canvas.addEventListener('mousedown', (e: MouseEvent) => {
      if (!this.ballInFlight) {
        // 计算 对边(y) 邻边(x) 距离，更新加速度
        ball.velocityX = this.launchVelocity * Math.cos(this.launchAngle);
        ball.velocityY = this.launchVelocity * Math.sin(this.launchAngle);
        this.ballInFlight = true;
        this.threePointer = false;
        config.launchTime = undefined;
      }
    });

    return this;
  }
}

export class LobBallBehavior implements Behavior {
  private lastFrameTime: number;
  private GRAVITY_FORCE: number = 9.81; // m/s/s

  public constructor(private demo: Demo) {}

  public applyGravity(elapsed: number) {
    const { demo } = this;
    const { ball, config } = this.demo;
    // Math.sin(demo.launchAngle)  已知角度，求到 x 轴距离
    ball.velocityY = this.GRAVITY_FORCE * elapsed - demo.launchVelocity * Math.sin(demo.launchAngle);
  }

  public updateBallPosition(updateDelta: number) {
    const { demo } = this;
    const { ball } = this.demo;
    ball.x += ball.velocityX * updateDelta * demo.pixelsPerMeter;
    ball.y += ball.velocityY * updateDelta * demo.pixelsPerMeter;
  }

  public checkForThreePointer() {
    const { demo } = this;
    const { ball } = this.demo;
    if (ball.y < 0) {
      demo.threePointer = true;
      console.log('Three pointer if hit');
    }
  }

  public checkBallBounds() {
    const { demo } = this;
    const { ball } = this.demo;
    if (ball.y > demo.canvas.height || ball.x > demo.canvas.width) {
      demo.resetSpriteStatus();
    }
  }

  public execute(sprite: Sprite, context: CanvasRenderingContext2D, time: number) {
    const { demo } = this;
    const { ball, config } = this.demo;
    let elapsedFrameTime = 0;
    let elapsedFlightTime = 0;

    if (demo.ballInFlight) {
      if (config.launchTime === undefined) {
        config.launchTime = time;
      }

      elapsedFrameTime = (time - this.lastFrameTime) / 1000;
      elapsedFlightTime = (time - config.launchTime) / 1000;

      this.applyGravity(elapsedFlightTime);
      this.updateBallPosition(elapsedFrameTime);
      this.checkForThreePointer();
      this.checkBallBounds();
    }

    this.lastFrameTime = time;
  }
}

export class CatchBallBehavior implements Behavior {
  public constructor(private demo: Demo) {}

  public ballInBucket() {
    const { ball, bucket } = this.demo;
    return (
      ball.x > bucket.x + bucket.width / 2 &&
      ball.x < bucket.x + bucket.width &&
      ball.y > bucket.y &&
      ball.y < bucket.y + bucket.height
    );
  }

  public adjustScore() {
    const { demo } = this;

    if (demo.threePointer) {
      demo.lastScore = 3;
    } else {
      demo.lastScore = 2;
    }

    demo.score += demo.lastScore;
    console.log(this.demo.score);
  }

  public execute(bucket: Sprite, context: CanvasRenderingContext2D, time: number) {
    const { demo } = this;
    if (demo.ballInFlight && this.ballInBucket()) {
      demo.resetSpriteStatus();
      this.adjustScore();
    }
  }
}
