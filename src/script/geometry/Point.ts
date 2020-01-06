export class Point {
  public constructor(public x: number, public y: number) {}

  public distance(p: Point) {
    return Math.abs(Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2)));
  }
}
