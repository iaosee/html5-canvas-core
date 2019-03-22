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

  public draw() {
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

    return this.startPlay();
  }

  public clearScreen() {
    const { context, canvas } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
    return this;
  }

  public startPlay() {
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

  public stopPlay() {
    cancelAnimationFrame(this.player);
    return this;
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

}
