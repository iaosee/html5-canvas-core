import { Point } from './Point';

export interface ShapeConfig {
  x: number;
  y: number;
  fillStyle: string;
  strokeStyle: string;
}

export class Shape {
  public fillStyle = 'rgba(147, 197, 114, 0.8)';
  public strokeStyle = 'rgba(255, 253, 208, 0.9)';

  public constructor(protected position: Point) {}

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

  public getPosition() {
    return this.position;
  }

  public setPosition(p: Point) {
    return (this.position = p);
  }

  public move(p: Point) {
    this.setPosition(p);
  }
}
