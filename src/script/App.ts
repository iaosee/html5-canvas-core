import { Demo } from './Demo.13';

export class App {
  public constructor() {}
  public static instance: App;
  public canvas: HTMLCanvasElement;
  public demo: Demo;

  static init() {
    return App.instance ? App.instance : (App.instance = new App());
  }

  run() {
    this.createCanvas()
      .initMenuList()
      .initDemo();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    const setSize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.demo && this.demo.start();
    };
    setSize();
    document.body.appendChild(this.canvas);
    window.addEventListener('resize', setSize, false);

    return this;
  }

  initDemo() {
    this.demo = Demo.init(this.canvas).start();
    console.log(this.demo);
    (window as any).demo = this.demo;

    return this;
  }

  initMenuList() {
    return this;
  }
}
