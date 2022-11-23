export class Vector {
  public x: number;
  public y: number;

  public constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }

  public getMagnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  public add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  public subtract(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  public dotProduct(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }

  public edge(v: Vector) {
    return this.subtract(v);
  }

  public perpendicular() {
    return new Vector(this.y, 0 - this.x);
  }

  public normalize() {
    const m = this.getMagnitude();
    return new Vector(this.x / m, this.y / m);
  }

  public normal() {
    const p = this.perpendicular();
    return p.normalize();
  }
}
