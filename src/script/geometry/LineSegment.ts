import { Point } from './Point';

export class LineSegment {
  public p1: Point;
  public p2: Point;

  public constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  public intersectionPoint(line: LineSegment) {
    let m1,
      m2,
      b1,
      b2,
      ip = new Point();

    if (this.p1.x === this.p2.x) {
      m2 = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
      b2 = line.p1.y - m2 * line.p1.x;
      ip.x = this.p1.x;
      ip.y = m2 * ip.x + b2;
    } else if (line.p1.x === line.p2.x) {
      m1 = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
      b1 = this.p1.y - m1 * this.p1.x;
      ip.x = line.p1.x;
      ip.y = m1 * ip.x + b1;
    } else {
      m1 = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
      m2 = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
      b1 = this.p1.y - m1 * this.p1.x;
      b2 = line.p1.y - m2 * line.p1.x;
      ip.x = (b2 - b1) / (m1 - m2);
      ip.y = m1 * ip.x + b1;
    }
    return ip;
  }
}
