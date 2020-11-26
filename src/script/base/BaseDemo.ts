import { Point } from '../geometry/Point';
import { GUI } from 'dat.gui';

/**
 * @description BaseDemo
 */
export class BaseDemo {
  public name: string = 'Canvas Demo';
  public config: any = {};
  public player: number = null;
  public context: CanvasRenderingContext2D;

  public gui: GUI;
  public stats: Stats;

  constructor(public canvas: HTMLCanvasElement) {
    if (!canvas) {
      throw new Error('Occur Error');
    }

    this.context = this.canvas.getContext('2d');
    this.context.save();
    this.setViewport();
  }

  get center(): Point {
    return new Point(this.centerX, this.centerY);
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

  public destroy() {
    this.stop();
    this.context.restore();
    // do clearn
    if (this.gui) {
      this.gui.destroy();
    }
    if (this.stats) {
      this.stats.dom.remove();
    }
  }

  public setViewport() {
    const { canvas, context } = this;
    const dpr = window.devicePixelRatio || 1;
    const boundingRect = canvas.getBoundingClientRect();
    const width = boundingRect.width;
    const height = boundingRect.height;

    // 适配高分辨率 https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    if (dpr !== 1) {
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.scale(dpr, dpr);
    } else {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }

    return this;
  }

  public draw(timestamp?: number) {
    const { context } = this;

    this.clearScreen();

    context.font = '50px Palatino';
    context.textAlign = 'center';
    context.fillStyle = 'rgba(64,158,255,1.0)';
    context.fillText('Hello World, Hello Canvas !', this.centerX, this.centerY);

    return this;
  }

  public clearScreen() {
    const { context, canvas } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
    return this;
  }

  public drawFpsLabel(fps: number) {
    const { context } = this;

    context.save();
    context.font = '20px Palatino';
    context.fillStyle = 'cornflowerblue';
    context.fillText(fps.toFixed() + ' fps', 20, this.canvas.height - 20);
    context.restore();

    return this;
  }

  public startPlay() {
    let lastTime = 0;

    console.log('play animate.');
    const animate = (timestamp: number) => {
      const now = +new Date();
      const deltaTime = timestamp - lastTime; // 每一帧的间隔 正常 16.6 左右
      const fps = 1000 / deltaTime;

      this.draw(timestamp);

      lastTime = timestamp;
      this.player = requestAnimationFrame(animate);
    };

    this.player && this.stopPlay();
    this.player = requestAnimationFrame(animate);

    return this;
  }

  public stopPlay() {
    cancelAnimationFrame(this.player);
    return this;
  }

  public drawGrid(stepX: number = 20, stepY: number = 20, color: string = 'rgba(0,0,0,0.1)') {
    const { context, canvas } = this;

    context.save();
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
    context.restore();

    return this;
  }

  public loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const spritesheet = new Image();
      spritesheet.src = url;
      spritesheet.onload = (event: Event) => {
        resolve(event.target as HTMLImageElement);
      };
    });
  }

  public drawGuidelines(x: number, y: number, color: string = 'rgba(43,134,66,0.6)') {
    const { context } = this;
    context.strokeStyle = color;
    context.lineWidth = 1;

    return this.drawVerticalLine(x).drawHorizontalLine(y);
  }

  public drawVerticalLine(x: number) {
    const { context } = this;
    context.save();
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, context.canvas.height);
    context.stroke();
    context.restore();

    return this;
  }

  public drawHorizontalLine(y: number) {
    const { context } = this;
    context.save();
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(context.canvas.width, y + 0.5);
    context.stroke();
    context.restore();
    return this;
  }

  public coordinateTransformation(x: number, y: number): Point {
    const { canvas } = this;
    const bbox = canvas.getBoundingClientRect();
    return new Point(x - bbox.left * (canvas.width / bbox.width), y - bbox.top * (canvas.height / bbox.height));
    // return {
    //   x: x - bbox.left * (canvas.width / bbox.width),
    //   y: y - bbox.top * (canvas.height / bbox.height)
    // };
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
      (Math.random() + 0.0).toFixed(1) +
      ')'
    );
  }

  public rgbaFormArr(rgba: number[]) {
    return rgba && rgba.length ? `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})` : null;
  }

  public degreesToRadian(degrees: number) {
    // 1° = (π/180)rad
    return degrees * (Math.PI / 180);
  }

  public radianToDegrees(radian: number) {
    // 1rad = (180/π)°
    return radian / (Math.PI / 180);
  }
}
