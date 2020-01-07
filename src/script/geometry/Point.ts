export class Point {
  public x: number;
  public y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public equals(p: Point) {
    return this.x === p.x && this.y === p.y;
  }

  public distance(p: Point) {
    return Math.abs(Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2)));
  }
}
