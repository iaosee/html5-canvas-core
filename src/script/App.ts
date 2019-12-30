import { Demo } from './Demo.17';

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

  public initDemo() {
    this.demo = Demo.init(this.canvas).start();
    console.log(this.demo);
    (window as any).demo = this.demo;

    return this;
  }

  public initMenuList() {
    return this;
  }
}
