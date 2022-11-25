import { Vector } from './Vector';

export class MinimumTranslationVector {
  public axis: Vector;
  public overlap: number;

  public constructor(axis: Vector, overlap: number) {
    this.axis = axis;
    this.overlap = overlap;
  }
}
