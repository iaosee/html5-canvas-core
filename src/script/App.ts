import { BaseDemo } from './base/BaseDemo';
import { MenuConfigMap } from './MenuConfig';

export class App {
  public constructor() {}
  public static instance: App;
  public canvas: HTMLCanvasElement;
  public demo: BaseDemo;

  public static init() {
    return App.instance ? App.instance : (App.instance = new App());
  }

  public run() {
    this.initMenuList()
      .listenEvent()
      .initDemo();
  }

  public createCanvas() {
    this.canvas = document.createElement('canvas');
    document.body.insertBefore(this.canvas, document.body.firstChild);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    return this;
  }

  public initDemo() {
    this.renderScene();
    // this.setViewport();

    // (window as any).demo = this.demo = Demo.init(this.canvas).start();
    // this.demo.start();
    // window.addEventListener('resize', () => this.setViewport(), false);

    return this;
  }

  public initMenuList() {
    const menuContianer = document.querySelector('.menu-bar-container');
    const menuListContainer = document.createElement('div');
    menuListContainer.classList.add('menu-list-container');

    let menuListString = '';
    MenuConfigMap.forEach((value, key) => {
      menuListString += `<div class="menu-item">
                          <a href="#/${key}">
                            ${key}
                          </a>
                        </div>`;
    });

    menuListContainer.innerHTML = menuListString;
    menuContianer.appendChild(menuListContainer);

    return this;
  }

  public listenEvent() {
    window.addEventListener('hashchange', e => {
      console.log(location.hash);

      const reg = /#\/(.+)$/;
      const matchs = location.hash.match(reg);
      const name = matchs ? matchs[1] : 'Demo.01';

      this.renderScene(name);
    });
    return this;
  }

  public async renderScene(name: string = 'Demo.01') {
    const module = await MenuConfigMap.get(name)();
    const Demo = module.Demo;

    if (this.demo) {
      this.demo.destroy();
      this.demo = null;
    }
    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
    }

    this.createCanvas();
    this.demo = Demo.init(this.canvas).start();
    (window as any).demo = this.demo;

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
