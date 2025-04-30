import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { Random } from '../tools/Random';
import { Sprite, ImagePainter } from '../sprite';
import { GifImagePainter } from '../sprite/GifImagePainter';

import tennisBall from '../../../asset/images/tennis-ball.png';
import runRabbit from '../../../asset/images/run-rabbit.gif';
import yoda from '../../../asset/images/yoda.gif';

export interface PipeConfig {
  outerWidth: number;
  innerWidth: number;
  innerDash: [number, number];
  segment: Array<[number, number]>;
}

export class Pipe {
  public config: PipeConfig = {
    outerWidth: 10,
    innerWidth: 10,
    innerDash: [10, 20],
    // Point list
    segment: [
      [50, 50],
      [200, 50],
      [200, 200],
      [100, 200],
    ],
  };

  public constructor(
    private ctx: CanvasRenderingContext2D,
    params: PipeConfig,
  ) {
    this.config = { ...this.config, ...params };
  }

  public render() {
    const { innerWidth, outerWidth, segment } = this.config;
    if (!segment?.length) {
      return;
    }

    this.drawOuterPipe();
    this.drawInterPipe();
  }

  public drawOuterPipe() {
    const { ctx } = this;
    const { innerWidth, outerWidth, segment } = this.config;

    ctx.beginPath();
    ctx.moveTo(segment[0][0], segment[0][1]);
    for (let i = 1; i < segment.length; i++) {
      const point = segment[i];

      ctx.lineTo(point[0], point[1]);
    }

    ctx.stroke();
  }

  public drawInterPipe() {
    const { ctx } = this;
    const { innerWidth, outerWidth, segment } = this.config;

    ctx.beginPath();
    ctx.moveTo(segment[0][0], segment[0][1]);
    for (let i = 1; i < segment.length; i++) {
      const point = segment[i];

      ctx.lineTo(point[0], point[1]);
    }

    ctx.stroke();
  }
}

enum BackgroundColor {
  Light = 'light',
  Dark = 'dark',
}

/**
 * @description 管道绘制 — 流动管道
 */
export class Demo extends BaseDemo {
  public override name: string = '管道绘制 — 简单流动管道';

  public lastTime = 0;

  public random: Random = Random.init(-5, 5);

  public config = {
    moveSpeed: 100,
    pipeColor: 'rgba(150,150,150,1)',
    flowColor: 'rgba(0,0,255,0.8)',
  };

  public segment: Array<[number, number]> = [
    [101, 76],
    [475, 77],
    [475, 250],
    [98, 250],
    [100, 402],
    [476, 401],
    [475, 500],
    [97, 500],
    [99, 704],
    [475, 702],
    [475, 877],
    [98, 877],
    [98, 1000],
    [651, 1000],
    [650, 100],
    [850, 100],
    [850, 600],
  ];
  public ballSprite: Sprite;

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl().createSprite();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'moveSpeed', 10, 300);
    gui.addColor(config, 'pipeColor');
    gui.addColor(config, 'flowColor');

    return this;
  }

  public createSprite() {
    const ballSprite = new Sprite('ball', new GifImagePainter(runRabbit));
    ballSprite.addBehavior(new RunningBehavior());
    ballSprite.x = 900;
    ballSprite.y = 200;

    this.ballSprite = ballSprite;
  }

  public override draw(timestamp: number = 0) {
    if (!this.lastTime) {
      this.lastTime = timestamp;
    }

    this.drawScene(timestamp);

    this.ballSprite.update(this.context, timestamp);
    this.ballSprite.paint(this.context);

    this.lastTime = timestamp;
    return this;
  }

  public override clearScreen() {
    const { context, canvas, config } = this;
    context.clearRect(0, 0, this.width, this.height);

    // context.globalAlpha = 0.8;
    // context.fillStyle = 'rgba(255, 255, 255, 0.1)';
    // context.fillRect(0, 0, this.width, this.height);

    return this;
  }

  public offset = 0;
  public drawScene(timestamp: number = 0) {
    const { context, config } = this;
    // this.clearScreen(); //.drawGrid();
    this.clearScreen().drawGrid();

    context.save();
    context.lineWidth = 20;
    context.lineCap = 'round'; // "butt" | "round" | "square"
    context.lineJoin = 'round'; // "bevel" | "miter" | "round"
    context.strokeStyle = config.pipeColor || 'rgba(150,150,150,1)';
    context.beginPath();
    context.moveTo(this.segment[0][0], this.segment[0][1]);
    for (let i = 1; i < this.segment.length; i++) {
      const point = this.segment[i];
      context.lineTo(point[0], point[1]);
    }
    context.stroke();
    context.restore();

    context.save();
    context.lineWidth = 10;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineDashOffset = this.offset;
    context.strokeStyle = config.flowColor || 'rgba(0, 0, 255, 0.8)';

    context.setLineDash([20, 30]);
    context.beginPath();
    context.moveTo(this.segment[0][0], this.segment[0][1]);
    for (let i = 1; i < this.segment.length; i++) {
      const point = this.segment[i];
      context.lineTo(point[0], point[1]);
    }
    context.stroke();
    context.restore();

    this.update(timestamp);

    return this;
  }

  public update(timestamp: number) {
    const { context, config } = this;

    // const fps = 1000 / (timestamp - this.lastTime);
    const elapsedTime = timestamp - this.lastTime;
    const delta = (config.moveSpeed / 1000) * elapsedTime;
    this.offset -= delta;
  }
}

export class RunningBehavior {
  public lastAdvance: number = 0;
  public PAGEFLIP_INTERVAL: number = 70;

  public constructor(interval?: number) {
    this.PAGEFLIP_INTERVAL = interval || this.PAGEFLIP_INTERVAL;
  }

  public execute(sprite: Sprite<GifImagePainter>, context: CanvasRenderingContext2D, time: number) {
    if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
      sprite.painter.advance();
      this.lastAdvance = time;
    }
  }
}
