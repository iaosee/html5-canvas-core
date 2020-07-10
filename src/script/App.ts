import { BaseDemo } from './base/BaseDemo';
import { Demo } from './demo/Demo.00';
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

  public initMenuList() {
    const menuContianer = document.querySelector('.menu-bar-container');
    const menuList = document.createElement('div');
    menuList.classList.add('menu-list-container');

    const parseDOM = (str: string) => {
      const o = document.createElement('div');
      o.innerHTML = str;
      return o.childNodes[0];
    };

    console.log(MenuConfigMap);
    MenuConfigMap.forEach((value, key) => {
      const menuItem = `<div class="menu-item">
                          <a href="#/${key}">
                            ${key}
                          </a>
                        </div>`;
      menuList.appendChild(parseDOM(menuItem));
    });

    menuContianer.appendChild(menuList);

    return this;
  }

  public listenEvent() {
    window.addEventListener('hashchange', e => this.changeScene());
    return this;
  }

  public async changeScene() {
    console.log(location.hash);
    const reg = /#\/(.+)$/;
    const matchs = location.hash.match(reg);
    const name = matchs ? matchs[1] : 'Demo.01';

    const module = await MenuConfigMap.get(name);

    // tslint:disable-next-line: no-shadowed-variable
    const Demo = module.Demo;
    if (this.demo) {
      this.demo.destroy();
      this.demo = null;
    }
    this.demo = Demo.init(this.canvas)
      .draw()
      .start();

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
