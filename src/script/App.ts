import { Demo } from './Demo.23';

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
    const setSize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.demo && this.demo.start();
    };
    setSize();
    window.addEventListener('resize', () => setSize(), false);

    return this;
  }

  public initDemo() {
    this.demo = Demo.init(this.canvas).start();
    console.log(this.demo);
    (window as any).demo = this.demo;

    // this.setViewport();
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

    if (ratio === 1) {
      return;
    }

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    console.log(devicePixelRatio, backingStoreRatio, ratio);
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    context.scale(ratio, ratio);
    this.demo.start();

    return this;
  }
}
