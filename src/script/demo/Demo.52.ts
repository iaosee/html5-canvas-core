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

class RunInPlaceBehavior implements Behavior {
  public lastAdvance: number = 0;
  public PAGEFLIP_INTERVAL: number = 100;

  public constructor(interval?: number) {
    this.PAGEFLIP_INTERVAL = interval || this.PAGEFLIP_INTERVAL;
  }

  public execute(sprite: Sprite<SpriteSheetPainter>, context: CanvasRenderingContext2D, time: number) {
    if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
      sprite.painter.advance();
      this.lastAdvance = time;
    }
  }
}

class MoveLeftToRightBehavior implements Behavior {
  public lastMove: number = 0;

  public execute(sprite: Sprite<SpriteSheetPainter>, context: CanvasRenderingContext2D, time: number) {
    if (this.lastMove !== 0) {
      sprite.x -= sprite.velocityX * ((time - this.lastMove) / 1000);
      sprite.x = sprite.x < 0 ? context.canvas.width : sprite.x;
    }
    this.lastMove = time;
  }
}

class JumpBehavior implements Behavior {
  public lastJump: number = 0;
  public jumpHeight: number = 50;

  public constructor(height?: number) {
    this.jumpHeight = height || this.jumpHeight;
  }

  public execute(sprite: Sprite<SpriteSheetPainter>, context: CanvasRenderingContext2D, time: number) {
    if (time - this.lastJump < 1000) {
      return;
    }

    sprite.y -= this.jumpHeight;
    if (sprite.y < 0) {
      sprite.y = context.canvas.height;
    }
    this.lastJump = time;
  }
}

export class MoveBehavior implements Behavior {
  public lastTime: number = 0;

  public constructor(private pushTimer: AnimationTimer) {}

  public reset(sprite: Sprite) {
    console.log('reset');
    // sprite.x = LEDGE_LEFT + LEDGE_WIDTH/2 - BALL_RADIUS;
    // sprite.y  = LEDGE_TOP - BALL_RADIUS*2;
  }

  public execute(sprite: Sprite<SpriteSheetPainter>, context: CanvasRenderingContext2D, time: number) {
    const { pushTimer } = this;
    const timerElapsed = pushTimer.getElapsedTime();
    let frameElapsed;

    if (pushTimer.isRunning() && this.lastTime) {
      frameElapsed = timerElapsed - this.lastTime;
      sprite.x -= sprite.velocityX * (frameElapsed / 1000);
      // sprite.x -= sprite.velocityX * ((time - this.lastTime) / 1000);
      sprite.x = sprite.x < 0 ? context.canvas.width : sprite.x;
      // if ( sprite.x <= sprite.width ) {
      //   pushTimer.stop();
      // }
    }
    this.lastTime = timerElapsed;
  }
}

/**
 * @description 精灵绘制器 —— 精灵表绘制器
 */
export class Demo extends BaseDemo {
  public name: string = '精灵绘制器 —— 精灵表绘制器/帧动画';

  public sprite: Sprite<SpriteSheetPainter>;
  public sprite2: Sprite<SpriteSheetPainter>;
  public sprite3: Sprite<SpriteSheetPainter>;
  public sprite4: Sprite<SpriteSheetPainter>;
  public pushTimer: AnimationTimer = new AnimationTimer();
  public lastAdvance: number = 0;

  // bomb
  public bomb: Sprite;
  public bombPainter: ImagePainter;
  public bombNoFusePainter: ImagePainter;
  public fuseBurningPainters: Painter[] = [];
  public explosionPainters: Painter[] = [];
  public fuseBurningAnimator: SpriteAnimator;
  public explosionAnimator: SpriteAnimator;

  public config = {
    RUN_INTERVAL: 100,
    move4: () => {
      this.pushTimer.start();
    },
    stop4: () => {
      this.pushTimer.stop();
    },
    explode: () => this.bombExplode()
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl()
      .initSprite()
      .initBombSprite();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  private createControl() {
    const { config } = this;
    this.gui = new dat.GUI();
    const { gui } = this;

    gui
      .add(config, 'RUN_INTERVAL')
      .min(10)
      .max(1000)
      .step(1);
    gui.add(config, 'move4');
    gui.add(config, 'stop4');
    gui.add(config, 'explode');

    return this;
  }

  public draw(timestamp: number) {
    return this.clearScreen()
      .drawGrid()
      .drawScene(timestamp);
  }

  public initSprite() {
    const runnerCells: SheetCell[] = [
      { x: 0, y: 0, width: 47, height: 64 },
      { x: 55, y: 0, width: 44, height: 64 },
      { x: 107, y: 0, width: 39, height: 64 },
      { x: 150, y: 0, width: 46, height: 64 },
      { x: 208, y: 0, width: 49, height: 64 },
      { x: 265, y: 0, width: 46, height: 64 },
      { x: 320, y: 0, width: 42, height: 64 },
      { x: 380, y: 0, width: 35, height: 64 },
      { x: 425, y: 0, width: 35, height: 64 }
    ];
    this.sprite = new Sprite(
      'Sprite 1',
      new SpriteSheetPainter(require('../../../asset/images/running-sprite-sheet.png'), runnerCells)
    );
    this.sprite2 = new Sprite(
      'Sprite 2',
      new SpriteSheetPainter(require('../../../asset/images/running-sprite-sheet.png'), runnerCells),
      [new RunInPlaceBehavior(), new MoveLeftToRightBehavior()]
    );
    this.sprite3 = new Sprite(
      'Sprite 3',
      new SpriteSheetPainter(require('../../../asset/images/running-sprite-sheet.png'), runnerCells),
      [new RunInPlaceBehavior(), new MoveLeftToRightBehavior(), new JumpBehavior()]
    );
    this.sprite4 = new Sprite(
      'Sprite 4',
      new SpriteSheetPainter(require('../../../asset/images/running-sprite-sheet.png'), runnerCells),
      [new RunInPlaceBehavior(), new MoveBehavior(this.pushTimer)]
    );

    this.sprite.setX(200);
    this.sprite.setY(200);
    this.sprite2.setX(400);
    this.sprite2.setY(200);
    this.sprite3.setX(600);
    this.sprite3.setY(200);
    this.sprite4.setX(800);
    this.sprite4.setY(200);

    this.sprite2.velocityX = 60; // pixels/second
    this.sprite3.velocityX = 60; // pixels/second
    this.sprite4.velocityX = 60; // pixels/second

    return this;
  }

  public initBombSprite() {
    const NUM_FUSE_PAINTERS = 9;
    const NUM_EXPLOSION_PAINTERS = 9;

    this.bombPainter = new ImagePainter(require('../../../asset/images/bomb/bomb.png'));
    this.bombNoFusePainter = new ImagePainter(require('../../../asset/images/bomb/bomb-no-fuse.png'));
    this.bomb = new Sprite('bomb', this.bombPainter);

    this.bomb.setX(500);
    this.bomb.setY(500);

    for (let i = 0; i < NUM_FUSE_PAINTERS; ++i) {
      this.fuseBurningPainters.push(new ImagePainter(require('../../../asset/images/bomb/fuse-0' + i + '.png')));
    }

    for (let i = 0; i < NUM_EXPLOSION_PAINTERS; ++i) {
      this.explosionPainters.push(new ImagePainter(require('../../../asset/images/bomb/explosion-0' + i + '.png')));
    }

    this.fuseBurningAnimator = new SpriteAnimator(this.fuseBurningPainters, () => {
      this.bomb.painter = this.bombNoFusePainter;
    });
    this.explosionAnimator = new SpriteAnimator(this.explosionPainters, () => {
      this.bomb.painter = this.bombNoFusePainter;
    });
  }

  public bombExplode() {
    const { bomb, bombPainter, fuseBurningAnimator, explosionAnimator } = this;
    if (bomb.animating) {
      return;
    }

    fuseBurningAnimator.start(bomb, 2000);

    setTimeout(() => {
      explosionAnimator.start(bomb, 1000);
      setTimeout(() => {
        bomb.painter = bombPainter;
      }, 2000);
    }, 3000);
  }

  public drawScene(timestamp: number) {
    const { context, config, sprite, sprite2, sprite3, sprite4, bomb } = this;

    // Update in two ways

    // Update sprite
    if (timestamp - this.lastAdvance > config.RUN_INTERVAL) {
      sprite.painter.advance();
      this.lastAdvance = timestamp;
    }
    sprite.paint(context);
    context.fillText(sprite.name, sprite.x, sprite.y);

    // Update sprite 2
    sprite2.update(context, timestamp);
    sprite2.paint(context);
    context.fillText(sprite2.name, sprite2.x, sprite2.y);

    sprite3.update(context, timestamp);
    sprite3.paint(context);
    context.fillText(sprite3.name, sprite3.x, sprite3.y);

    sprite4.update(context, timestamp);
    sprite4.paint(context);
    context.fillText(sprite4.name, sprite4.x, sprite4.y);

    bomb.update(context, timestamp);
    bomb.paint(context);

    return this;
  }
}
