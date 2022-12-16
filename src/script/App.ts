import { Random } from './tools/Random';
import { BaseDemo } from './base/BaseDemo';
import { DemoConfigMap } from './DemoConfig';

const getDefaultDemo = () => {
  const reg = /#\/(.+)$/;
  const matchs = window.location.hash.match(reg);
  const randIndex = Random.init(0, [...DemoConfigMap.keys()].length - 1).getOne();
  const numStr = randIndex.toString().padStart(2, '0');
  return matchs ? matchs[1] : `Demo.${numStr}`;
};

export class App {
  public static instance: App;

  public canvas: HTMLCanvasElement;
  public demo: BaseDemo;

  public constructor() {}

  public static init() {
    return App.instance ? App.instance : (App.instance = new App());
  }

  public run() {
    (window as any).app = this;
    this.initMenuList().listenEvent().initDemo();
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

    // this.createCanvas();
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
    DemoConfigMap.forEach((value, key) => {
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
    window.addEventListener('hashchange', (e) => this.renderScene());
    return this;
  }

  public async renderScene(name: string = getDefaultDemo()) {
    console.log(name);

    const getDemoAsyncFn = DemoConfigMap.get(name);
    if (!getDemoAsyncFn) {
      alert(`${name} doesn't exist !`);
      throw new Error(`${name} doesn't exist !`);
    }

    const module = await getDemoAsyncFn();
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
    document.title = this.demo.name || 'Canvas Demo';
    (window as any).demo = this.demo;

    return this;
  }
}
