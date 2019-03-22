import { Point } from './declare';

export default class DemoBase {

  public player: any = null;
  public context: CanvasRenderingContext2D;

  constructor(public canvas: HTMLCanvasElement) {
    if ( !canvas ) {
      throw new Error('Occur Error');
    }

    this.context = this.canvas.getContext('2d');
  }

  get centerX() {
    return this.canvas.width / 2;
  }

  get centerY() {
    return this.canvas.height / 2;
  }

  get viewMin() {
    const {  canvas } = this;
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
    context.fillText(
      'Hello World, Hello Canvas !',
      this.centerX,
      this.centerY,
    );

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
    }

    this.player && this.stopPlay();
    this.player = requestAnimationFrame(tick);

    return this;
  }

  protected stopPlay() {
    cancelAnimationFrame(this.player);
    return this;
  }

  protected drawGrid(
    color: string = 'rgba(0,0,0,0.2)',
    stepx: number = 10,
    stepy: number = 10
  ) {
    const { context, canvas } = this;

    context.strokeStyle = color;
    context.lineWidth = 0.5;

    for ( let i = stepx + 0.5, len = canvas.width; i < len; i += stepx ) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, canvas.height);
      context.stroke();
    }

    for ( let i = stepy + 0.5, len = canvas.height; i < len; i += stepy ) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(canvas.width, i);
      context.stroke();
    }

    return this;
  }

  protected loadImage(url: string) {
    return new Promise((resolve, reject) => {
      const spritesheet = new Image();
      spritesheet.src = url;
      spritesheet.onload = (event: Event) => {
        resolve(event.target);
      }
    });
  }

  /** ******* Utils ******* */

  public CoordinateTransformation(x: number, y: number): Point {
    const { canvas } = this;
    const bbox = canvas.getBoundingClientRect();
    return {
      x: x - bbox.left * (canvas.width  / bbox.width),
      y: y - bbox.top  * (canvas.height / bbox.height)
    };
  }

  public throttle(fn: Function, gapTime: number) {
    let _lastTime: any = null;
    return function () {
      let _nowTime = + new Date()
      if (!_lastTime || _nowTime - _lastTime > gapTime ) {
        fn.apply(this, arguments);
        _lastTime = _nowTime
      }
    }
  }

  public randomRgba() {
    return 'rgba(' +
    (Math.random()*255).toFixed(0) + ', ' +
    (Math.random()*255).toFixed(0) + ', ' +
    (Math.random()*255).toFixed(0) + ', ' +
    (Math.random()).toFixed(1) + ')';
  }

}
