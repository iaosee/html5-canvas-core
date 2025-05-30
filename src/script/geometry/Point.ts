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

  /** @description clockwise rotation */
  public rotate(rotationPoint: Point, angle: number) {
    const tx = this.x - rotationPoint.x; // tx = translated X
    const ty = this.y - rotationPoint.y; // ty = translated Y

    const rx =
      tx * Math.cos(-angle) - // rx = rotated X
      ty * Math.sin(-angle);
    const ry =
      tx * Math.sin(-angle) + // ry = rotated Y
      ty * Math.cos(-angle);
    return new Point(rx + rotationPoint.x, ry + rotationPoint.y);
  }

  /** @description clockwise rotation */
  public rotateFromOrigin(angle: number) {
    const { x, y } = this;
    const rCos = Math.cos(-angle);
    const rSin = Math.sin(-angle);
    return new Point(x * rCos - y * rSin, y * rCos + x * rSin);
  }

  public slope(p: Point) {
    return Math.abs(p.x - this.x) === 0 ? Infinity : (p.y - this.y) / (p.x - this.x);
  }

  /**
   * @description
   * @return {Number} degrees
   */
  public azimuth(p: Point): number {
    return Math.atan2(p.y - this.y, p.x - this.x) / (Math.PI / 180);
  }
}
