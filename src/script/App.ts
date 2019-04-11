
import Demo from './Demo.08';

export default class App {

  public canvas: HTMLCanvasElement;
  public static instance: App;
  public demo: Demo;

  public constructor() {

  }

  static init() {
    return App.instance ? App.instance : App.instance = new App();
  }

  run() {

    this.canvas = document.createElement('canvas');
    const setSize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.demo && this.demo.start();
    };
    setSize();
    document.body.appendChild(this.canvas);
    window.addEventListener('resize', setSize, false);

    this.demo = Demo.init(this.canvas).start();
    console.log(this.demo);
    (window as any).demo = this.demo;
  }

}
