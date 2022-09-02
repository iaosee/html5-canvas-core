/**
 * @description 计时器
 */
export class Stopwatch {
  public startTime: number = 0;
  public running: boolean = false;
  public elapsed: number = 0;
  public elapsedTime: number = 0;

  public start() {
    this.startTime = +new Date();
    this.elapsedTime = null;
    this.running = true;
  }

  public stop() {
    this.elapsed = +new Date() - this.startTime;
    this.running = false;
  }

  public getElapsedTime() {
    if (this.running) {
      return +new Date() - this.startTime;
    } else {
      return this.elapsed;
    }
  }

  public isRunning() {
    return this.running;
  }

  public reset() {
    this.elapsed = 0;
  }
}

export class AnimationTimer {
  private duration: number = 1000;
  private stopwatch = new Stopwatch();
  private timeWarp: (percent: number) => number;

  public constructor(duration: number = 1000, timeFunc: (percent: number) => number = AnimationTimer.linear()) {
    this.duration = duration;
    this.timeWarp = timeFunc;
  }

  /**
   * 几个基本缓动函数 linear/easeIn/easeOut/easeInOut/elastic/bounce
   * 通过基本函数的组合，可以实现更复杂的复合缓动函数
   */
  /******************** 常见基本缓动函数参考 https://easings.net/ ********************/
  /**
   * @description 没有加速度的线性运动 linear
   * linear 未做任何扭曲，线性运动
   * - f(x) = x
   */
  public static linear() {
    return (percent: number) => {
      return percent;
    };
  }

  /**
   * @description 逐渐加速的缓入运动 easeIn
   * - f(x) = Math.pow(x, 2)
   */
  public static easeIn(strength: number = 1) {
    return (percent: number) => {
      return Math.pow(percent, strength * 2);
    };
  }

  /**
   * @description 逐渐减速的缓出运动 easeOut
   * - f(x) = 1 - Math.pow(1 - x, 2)
   */
  public static easeOut(strength: number = 1) {
    return (percent: number) => {
      return 1 - Math.pow(1 - percent, strength * 2);
    };
  }

  /**
   * @description 逐渐加速后又逐渐减速，先加速后减速 的缓入缓出运动 easeInOut
   * - f(x) = x - Math.sin(x * 2 * Math.PI) / (2 * Math.PI)
   */
  public static easeInOut() {
    return (percent: number) => {
      return percent - Math.sin(percent * Math.PI * 2) / (2 * Math.PI);
    };
  }

  /**
   * @description 弹簧运动，弹出去收回来  elastic
   * - passes  弹动次数
   * - f(x) = (1 - Math.cos(x * passes * Math.PI)) * (1 - x) + percent
   */
  public static elastic(passes: number = 2) {
    return (percent: number) => {
      return (1 - Math.cos(percent * Math.PI * passes)) * (1 - percent) + percent;
    };
  }

  /**
   * @description 弹跳运动，弹回去  bounce
   * - bounces 弹起次数
   * - f(x) = (1 - Math.cos(x * passes * Math.PI)) * (1 - x) + percent
   * - f(x) = 2 - ((1 - Math.cos(x * passes * Math.PI)) * (1 - x) + percent)
   */
  public static bounce(bounces: number) {
    const fn = AnimationTimer.elastic(bounces);
    return (percent: number) => {
      percent = fn(percent);
      return percent <= 1 ? percent : 2 - percent;
    };
  }

  /******************** / ********************/

  public start() {
    this.stopwatch.start();
  }

  public stop() {
    this.stopwatch.stop();
  }

  public setTimeWarp(timeFunc: (percent: number) => number = AnimationTimer.linear()) {
    this.timeWarp = timeFunc;
    return this;
  }

  public getRealElapsedTime() {
    return this.stopwatch.getElapsedTime();
  }

  public getElapsedTime() {
    const elapsedTime = this.stopwatch.getElapsedTime();
    // 当前进度： 过去的时间 / 总时间
    const percent = elapsedTime / this.duration;

    if (!this.stopwatch.running) {
      return undefined;
    }
    if (this.timeWarp === undefined) {
      return elapsedTime;
    }

    // 返回通过缓动函数处理后的值
    const time = elapsedTime * (this.timeWarp(percent) / percent);
    return time || 0; // FIX: time is NaN when percent equals 0
  }

  public isRunning() {
    return this.stopwatch.running;
  }

  public isOver() {
    return this.stopwatch.getElapsedTime() > this.duration;
  }

  public reset() {
    this.stopwatch.reset();
  }
}
