import { Demo } from './Demo.53';

export class App {
  public constructor() {}
  public static instance: App;
  public canvas: HTMLCanvasElement;
  public demo: Demo;

  public static init() {
    return App.instance ? App.instance : (App.instance = new App());
  }

  public run() {
    this.createCanvas()
      .initMenuList()
      .initDemo();
  }

  public createCanvas() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    return this;
  }

  public initDemo() {
    (window as any).demo = this.demo = Demo.init(this.canvas).start();
    // this.setViewport();
    // this.demo.start();
    // window.addEventListener('resize', () => this.setViewport(), false);
    return this;
  }

  public initMenuList() {
    return this;
  }

  public setViewport() {
    const { canvas } = this;
    const context = this.demo.context;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = (context as any).webkitBackingStorePixelRatio || 1;
    const ratio = devicePixelRatio / backingStoreRatio;
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    if (ratio !== 1) {
      console.log(devicePixelRatio, backingStoreRatio, ratio);
      canvas.width = innerWidth * ratio;
      canvas.height = innerHeight * ratio;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      context.scale(ratio, ratio);
    }

    this.demo.start();

    return this;
  }
}
