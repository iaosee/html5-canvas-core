export class Point {
  public x: number;
  public y: number;

  public constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  public move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
    return this;
  }

  public equals(p: Point) {
    return this.x === p.x && this.y === p.y;
  }

  public distance(p: Point) {
    return Math.abs(Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2)));
  }
}
