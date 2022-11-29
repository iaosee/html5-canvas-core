import { BaseDemo } from '../base/BaseDemo';
import { Random } from '../tools/Random';
import { Progressbar } from '../game/Progressbar';

export class Demo extends BaseDemo {
  public progressbar: Progressbar;

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.progressbar = new Progressbar({
      w: 300,
      h: 10,
      strokeStyle: 'rgba(0,255,0,0.5)',
      red: 100,
      green: 130,
      blue: 250,
    });

    this.progressbar.domElement.style.position = 'absolute';
    this.progressbar.domElement.style.top = '20px';
    this.progressbar.domElement.style.left = '20px';

    document.body.appendChild(this.progressbar.domElement);
    this.progressbar.draw(Random.init(0, 100).getOne());
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  // public start() {
  //   return this.draw();
  // }

  public draw() {
    return this.clearScreen().drawGrid().drawScene();
  }

  public drawScene() {
    const { context } = this;

    return this;
  }
}
