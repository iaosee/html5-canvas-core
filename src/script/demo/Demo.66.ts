import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { Random } from '../tools/Random';
import { Sprite } from '../sprite';
import { GifImagePainter, GifPlayBehavior } from '../sprite/GifImagePainter';

import yoda from '../../../asset/images/yoda.gif';
import runRabbit from '../../../asset/images/run-rabbit.gif';

/**
 * @description 管道绘制 — 流动管道
 */
export class Demo extends BaseDemo {
  public override name: string = 'Gif 动画 — Gif 解析与绘制';
  public config = {};
  public sprite1: Sprite;
  public sprite2: Sprite;

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.createSprite();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public override draw(timestamp: number = 0) {
    this.drawScene(timestamp);

    return this;
  }

  public createSprite() {
    const sprite1 = new Sprite('yoda', new GifImagePainter(yoda));
    sprite1.addBehavior(new GifPlayBehavior());
    // sprite1.width = 500;
    // sprite1.height = 300;
    sprite1.x = 100;
    sprite1.y = 100;

    const sprite2 = new Sprite('runRabbit', new GifImagePainter(runRabbit));
    sprite2.addBehavior(new GifPlayBehavior());
    // sprite2.width = 450;
    // sprite2.height = 300;
    sprite2.x = 900;
    sprite2.y = 200;

    this.sprite1 = sprite1;
    this.sprite2 = sprite2;
  }

  public drawScene(timestamp: number = 0) {
    const { context, config } = this;
    this.clearScreen().drawGrid();

    this.sprite1.update(context, timestamp);
    this.sprite1.paint(context);
    this.sprite2.update(context, timestamp);
    this.sprite2.paint(context);

    return this;
  }
}
