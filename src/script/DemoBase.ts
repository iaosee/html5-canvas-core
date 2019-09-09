import { Point } from './declare';

/**
 * @description DemoBase
 */
export default class DemoBase {
  public player: any = null;
  public context: CanvasRenderingContext2D;

  constructor(public canvas: HTMLCanvasElement) {
    if (!canvas) {
      throw new Error('Occur Error');
    }

    this.context = this.canvas.getContext('2d');
  }

  get center(): Point {
    return {
      x: this.centerX,
      y: this.centerY
    };
  }

  get centerX() {
    return this.canvas.width / 2;
  }

  get centerY() {
    return this.canvas.height / 2;
  }

  get viewMin() {
    const { canvas } = this;
    return canvas.width < canvas.height ? canvas.width : canvas.height;
  }

  public start() {
    return this.startPlay();
  }

  public stop() {
    return this.stopPlay();
  }

  protected draw() {
    const { context, canvas } = this;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '50px Palatino';
    context.textAlign = 'center';
    context.fillStyle = 'rgba(64,158,255,1.0)';
    context.fillText('Hello World, Hello Canvas !', this.centerX, this.centerY);

    return this;
  }

  protected clearScreen() {
    const { context, canvas } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
    return this;
  }

  protected startPlay() {
    let then = 0;
    const tick = (now: number) => {
      let deltaTime = now - then;
      then = now;
      deltaTime *= 0.001;

      this.draw();
      this.player = requestAnimationFrame(tick);
    };

    this.player && this.stopPlay();
    this.player = requestAnimationFrame(tick);

    return this;
  }

  protected stopPlay() {
    cancelAnimationFrame(this.player);
    return this;
  }

  protected drawGrid(stepX: number = 10, stepY: number = 10, color: string = 'rgba(0,0,0,0.1)') {
    const { context, canvas } = this;

    context.strokeStyle = color;
    context.lineWidth = 0.5;

    for (let i = stepX + 0.5, len = canvas.width; i < len; i += stepX) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, canvas.height);
      context.stroke();
    }

    for (let i = stepY + 0.5, len = canvas.height; i < len; i += stepY) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(canvas.width, i);
      context.stroke();
    }

    return this;
  }

  protected loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const spritesheet = new Image();
      spritesheet.src = url;
      spritesheet.onload = (event: Event) => {
        resolve(event.target as HTMLImageElement);
      };
    });
  }

  protected drawGuidelines(x: number, y: number, color: string = 'rgba(43,134,66,1)') {
    const { context } = this;
    context.strokeStyle = color;
    context.lineWidth = 0.5;

    return this.drawVerticalLine(x).drawHorizontalLine(y);
  }

  protected drawVerticalLine(x: number) {
    const { context } = this;
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, context.canvas.height);
    context.stroke();
    return this;
  }

  protected drawHorizontalLine(y: number) {
    const { context } = this;
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(context.canvas.width, y + 0.5);
    context.stroke();
    return this;
  }

  public coordinateTransformation(x: number, y: number): Point {
    const { canvas } = this;
    const bbox = canvas.getBoundingClientRect();
    return {
      x: x - bbox.left * (canvas.width / bbox.width),
      y: y - bbox.top * (canvas.height / bbox.height)
    };
  }

  public throttle(fn: (...args: any) => void, gapTime: number) {
    let _lastTime: any = null;
    return function() {
      const _nowTime = +new Date();
      if (!_lastTime || _nowTime - _lastTime > gapTime) {
        fn.apply(this, arguments);
        _lastTime = _nowTime;
      }
    };
  }

  public randomRgba(): string {
    return (
      'rgba(' +
      (Math.random() * 255).toFixed(0) +
      ', ' +
      (Math.random() * 255).toFixed(0) +
      ', ' +
      (Math.random() * 255).toFixed(0) +
      ', ' +
      Math.random().toFixed(1) +
      ')'
    );
  }
}
