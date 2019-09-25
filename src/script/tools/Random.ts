export class Random {
  private minValue: number;
  private maxValue: number;

  public constructor(min?: number, max?: number) {
    if (!(this instanceof Random)) {
      return new Random(min, max);
    }

    this.minValue = Number.isFinite(min) ? min : this.minValue;
    this.maxValue = Number.isFinite(max) ? max : this.maxValue;
  }

  public static init(min?: number, max?: number): Random {
    if (min > max) {
      throw new Error(`min(${min}) greater than max(${max})`);
    }
    return new Random(min, max);
  }

  public min(min: number) {
    this.minValue = Number.isFinite(min) ? min : this.minValue;
    return this;
  }

  public max(max: number) {
    if (max < this.minValue) {
      throw new Error(`max(${max}) less than min(${this.minValue})`);
    }
    this.maxValue = Number.isFinite(max) ? max : this.maxValue;
    return this;
  }

  public range(min: number, max: number) {
    if (min > max) {
      throw new Error(`min(${min}) greater than max(${max})`);
    }
    return this.min(min).max(max);
  }

  public random() {
    return Math.round(Math.random() * (this.maxValue - this.minValue)) + this.minValue;
  }

  public getOne() {
    return this.random();
  }

  public getGroup(count: number) {
    const numList: Array<number> = [];

    if (count > this.maxValue - this.minValue + 1) {
      throw new Error(`${this.minValue} ~ ${this.maxValue} 范围不能生成 ${count} 个值`);
    }

    let randNum = this.getOne();
    while (numList.length < count) {
      if (numList.includes(randNum)) {
        randNum = this.getOne();
      } else {
        numList.push(randNum);
      }
    }

    return numList;
  }
}
