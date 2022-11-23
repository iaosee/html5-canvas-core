export class Projection {
  public min: number;
  public max: number;

  public constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  public overlaps(p: Projection) {
    return this.max > p.min && p.max > this.min;
  }
}
