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

  public getOverlap(projection: Projection) {
    if (!this.overlaps(projection)) {
      return 0;
    }

    let overlap;
    if (this.max > projection.max) {
      overlap = projection.max - this.min;
    } else {
      overlap = this.max - projection.min;
    }

    return overlap;
  }
}
