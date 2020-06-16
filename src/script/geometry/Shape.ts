import { Point } from './Point';

export class Shape {
  public constructor(public position: Point) {}

  public set x(v: number) {
    this.position.x = v;
  }

  public get x() {
    return this.position.x;
  }

  public set y(v: number) {
    this.position.y = v;
  }

  public get y() {
    return this.position.y;
  }

  public getPposition() {
    return this.position;
  }

  public setPposition(p: Point) {
    return (this.position = p);
  }

  public move(p: Point) {
    this.setPposition(p);
  }
}
