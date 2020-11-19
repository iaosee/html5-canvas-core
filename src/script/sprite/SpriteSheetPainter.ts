import { Sprite, SheetCell, Painter } from './Sprite';

export class SpriteSheetPainter implements Painter {
  public cells: SheetCell[] = [];
  public cellIndex: number = 0;
  public spriteSheet = new Image();

  public constructor(spriteSheetImageUrl: string, cells: SheetCell[] = []) {
    this.cells = cells;
    this.spriteSheet.src = spriteSheetImageUrl;
  }

  public advance() {
    if (this.cellIndex === this.cells.length - 1) {
      this.cellIndex = 0;
    } else {
      this.cellIndex++;
    }
  }

  public paint(sprite: Sprite, context: CanvasRenderingContext2D) {
    if (!this.spriteSheet) {
      return;
    }

    const cell = this.cells[this.cellIndex];
    if (!this.spriteSheet.complete) {
      this.spriteSheet.onload = e => {
        context.drawImage(
          this.spriteSheet,
          cell.x,
          cell.y,
          cell.width,
          cell.height,
          sprite.x,
          sprite.y,
          cell.width,
          cell.height
        );
      };
    } else {
      context.drawImage(
        this.spriteSheet,
        cell.x,
        cell.y,
        cell.width,
        cell.height,
        sprite.x,
        sprite.y,
        cell.width,
        cell.height
      );
    }
  }
}
