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

  /******************** 常用动画函数 ********************/
  public static linear() {
    return (percent: number) => {
      return percent;
    };
  }

  public static easeIn(strength: number = 1) {
    return (percent: number) => {
      return Math.pow(percent, strength * 2);
    };
  }

  public static easeOut(strength: number = 1) {
    return (percent: number) => {
      return 1 - Math.pow(1 - percent, strength * 2);
    };
  }

  public static easeInOut() {
    return (percent: number) => {
      return percent - Math.sin(percent * Math.PI * 2) / (2 * Math.PI);
    };
  }

  public static elastic(passes: number = 3) {
    return (percent: number) => {
      return (1 - Math.cos(percent * Math.PI * passes)) * (1 - percent) + percent;
    };
  }

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
    const percent = elapsedTime / this.duration;

    if (!this.stopwatch.running) {
      return undefined;
    }
    if (this.timeWarp === undefined) {
      return elapsedTime;
    }

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
