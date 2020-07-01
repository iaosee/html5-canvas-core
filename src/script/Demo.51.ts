import { BaseDemo } from './BaseDemo';
import { Sprite, Painter } from './sprite/Sprite';

export class BallPainter implements Painter {
  public paint(sprite: Sprite, context: CanvasRenderingContext2D) {
    const x = sprite.x + sprite.width / 2;
    const y = sprite.y + sprite.height / 2;
    const width = sprite.width;
    const height = sprite.height;
    const radius = sprite.width / 2;

    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.clip();

    context.shadowColor = 'rgba(0,0,0,0.5)';
    context.shadowOffsetX = -4;
    context.shadowOffsetY = -4;
    context.shadowBlur = 8;

    context.fillStyle = 'rgba(218, 165, 32, 0.1)';
    // context.fillStyle = 'rgba(51,153,255,0.1)';
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = 'rgb(100,100,195)';
    context.stroke();

    context.restore();
  }
}

/**
 * @description 精灵绘制器 —— 描边与填充
 *
 * 一个对象表示多个概念 —— 享元模式
 */
export class Demo extends BaseDemo {
  public ball1: Sprite;
  public ball2: Sprite;

  public ballPainter: Painter = new BallPainter();

  public config = {
    CLOCK_RADIUS: this.viewMin / 2 - 15,
    HOUR_HAND_TRUNCATION: 30
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.initSprite();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public initSprite() {
    this.ball1 = new Sprite('ball1', {
      paint(sprite, context) {
        context.save();
        context.beginPath();
        context.arc(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2, 100, 0, Math.PI * 2, false);
        context.clip();

        context.shadowColor = 'rgba(0,0,0,0.5)';
        context.shadowOffsetX = -4;
        context.shadowOffsetY = -4;
        context.shadowBlur = 8;

        context.lineWidth = 2;
        context.strokeStyle = 'rgb(100,100,195)';
        context.fillStyle = 'rgba(30,144,255,0.15)';

        context.fill();
        context.stroke();
        context.restore();
      }
    });

    this.ball1.setX(100);
    this.ball1.setY(100);

    this.ball2 = new Sprite('ball2', this.ballPainter);

    return this;
  }

  public draw() {
    return this.clearScreen()
      .drawGrid()
      .drawScene();
  }

  public drawScene() {
    const { context } = this;

    this.ball1.paint(context);
    this.drawClock();

    return this;
  }

  public drawClock() {
    this.drawClockFace();
    this.drawHands();
    return this;
  }

  public drawClockFace() {
    const { context, canvas, config } = this;
    context.beginPath();
    context.arc(this.centerX, this.centerY, config.CLOCK_RADIUS, 0, Math.PI * 2, false);
    context.save();
    context.strokeStyle = 'rgba(0,0,0,0.2)';
    context.stroke();
    context.restore();
    return this;
  }

  public drawHands() {
    const { context, canvas, config, ball2 } = this;
    const date = new Date();
    const h = date.getHours();
    const hour = h > 12 ? h - 12 : h;

    ball2.width = 20;
    ball2.height = 20;
    this.drawHand(date.getSeconds(), false);

    ball2.width = 30;
    ball2.height = 30;
    this.drawHand(date.getMinutes(), false);

    ball2.width = 50;
    ball2.height = 50;
    // 5n / 60
    this.drawHand(hour * 5 + (date.getMinutes() / 60) * 5);
    console.log(hour * 5, date.getMinutes() / 60);

    ball2.width = 30;
    ball2.height = 30;
    ball2.x = this.centerX - ball2.width / 2;
    ball2.y = this.centerY - ball2.height / 2;
    context.save();
    this.ballPainter.paint(ball2, context);
    context.restore();

    return this;
  }

  public drawHand(loc: number, isHour?: boolean) {
    const { context, canvas, config, ball2 } = this;
    const angle = Math.PI * 2 * (loc / 60) - Math.PI / 2;
    const handRadius = isHour ? config.CLOCK_RADIUS - config.HOUR_HAND_TRUNCATION : config.CLOCK_RADIUS;
    const lineEnd = {
      x: this.centerX + Math.cos(angle) * (handRadius - ball2.width / 2),
      y: this.centerY + Math.sin(angle) * (handRadius - ball2.width / 2)
    };

    context.strokeStyle = 'rgba(100,100,255,0.5)';
    context.beginPath();
    context.moveTo(this.centerX, this.centerY);
    context.lineTo(lineEnd.x, lineEnd.y);
    context.stroke();

    ball2.x = this.centerX + Math.cos(angle) * handRadius - ball2.width / 2;
    ball2.y = this.centerY + Math.sin(angle) * handRadius - ball2.height / 2;

    ball2.paint(context);

    return this;
  }
}
