import { AnimationTimer } from './AnimationTimer';
import { Sprite, SheetCell, IBehavior } from './Sprite';
import { SpriteSheetPainter } from './SpriteSheetPainter';

export class RunnerSprite extends Sprite<SpriteSheetPainter> {
  private runnerCells: SheetCell[] = [
    { x: 0, y: 0, width: 47, height: 64 },
    { x: 55, y: 0, width: 44, height: 64 },
    { x: 107, y: 0, width: 39, height: 64 },
    { x: 152, y: 0, width: 46, height: 64 },
    { x: 208, y: 0, width: 49, height: 64 },
    { x: 265, y: 0, width: 46, height: 64 },
    { x: 320, y: 0, width: 42, height: 64 },
    { x: 380, y: 0, width: 35, height: 64 },
    { x: 425, y: 0, width: 35, height: 64 }
  ];

  public constructor(name: string = 'RunnerSprite') {
    super(name);
    this.painter = new SpriteSheetPainter(require('../../../asset/images/running-sprite-sheet.png'), this.runnerCells);
    const cell = this.runnerCells[this.painter.cellIndex];
    this.width = cell.width;
    this.height = cell.height;
  }
}

/**
 * @description 跑动行为
 */
export class RunInPlaceBehavior implements IBehavior {
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

/**
 * @description 向右跑行为
 */
export class MoveLeftToRightBehavior implements IBehavior {
  public lastMove: number = 0;

  public constructor(private startX?: number, private endX?: number) {}

  public execute(sprite: Sprite<SpriteSheetPainter>, context: CanvasRenderingContext2D, time: number) {
    if (this.lastMove !== 0) {
      sprite.x -= sprite.velocityX * ((time - this.lastMove) / 1000);
      const startX = this.startX || 0;
      const endX = this.endX || context.canvas.width;
      sprite.x = sprite.x < startX ? endX : sprite.x;
    }
    this.lastMove = time;
  }
}

/**
 * @description 跳跃行为
 */
export class JumpBehavior implements IBehavior {
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

export class MoveBehavior implements IBehavior {
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
