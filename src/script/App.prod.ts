import { BaseDemo } from './base/BaseDemo';
import { Demo } from './demo/Demo.18';

export class App {
  public constructor() {}
  public static instance: App;
  public canvas: HTMLCanvasElement;
  public demo: BaseDemo;

  public static init() {
    return App.instance ? App.instance : (App.instance = new App());
  }

  public run() {
    this.createCanvas()
      .initMenuList()
      .initDemo()
      .listenEvent();
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

  public listenEvent() {
    this.canvas.addEventListener('click', () => this.changeScene());
    return this;
  }

  public async changeScene() {
    this.demo.stop();
    this.demo = null;

    this.demo = (await import('./demo/Demo.50')).Demo.init(this.canvas).start();

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
