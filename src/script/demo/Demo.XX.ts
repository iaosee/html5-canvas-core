import { BaseDemo } from '../base/BaseDemo';
import { Canvas2DContext } from '../base/Canvas2DContext';

export class Demo extends BaseDemo {
  public ctx: Canvas2DContext;

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    this.ctx = new Canvas2DContext(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid().drawScene();
  }

  public draw() {
    return this;
  }

  public drawScene() {
    const { ctx } = this;

    console.log(ctx);
    const c = (ctx as any)
      .lineWidth(5)
      .lineJoin('round')
      .strokeStyle(this.randomRgba())
      .fillStyle(this.randomRgba())
      .beginPath()
      .moveTo(25, 25)
      .lineTo(150, 150)
      .lineTo(150, 25)
      .closePath()
      .stroke()
      .fill().context;

    const strokeStyle = (ctx as any)
      .strokeStyle(this.randomRgba())
      .fillStyle(this.randomRgba())
      .fillRect(this.centerX, this.centerY, 100, 100)
      .strokeStyle();

    console.log(c);
    console.log(strokeStyle);

    return this;
  }
}
