import { Point } from '../interfaces';
import { BaseDemo } from '../base/BaseDemo';

/**
 * @description 鼠标坐标
 */
export class Demo extends BaseDemo {
  public name: string = '鼠标位置';

  public spritesheet: HTMLImageElement;
  public tips: HTMLDivElement;

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.loadImage(require('../../../asset/images/presta_illustration_20.jpg')).then((sprite: HTMLImageElement) => {
      this.spritesheet = sprite;
      // this.drawSpritesheet(sprite);
    });
    this.listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid();
  }

  public draw() {
    const { context, canvas } = this;

    this.clearScreen();
    return this.drawGrid();
  }

  private drawBackground() {
    const { context } = this;
    const VERTICAL_LINE_SPACING = 12;
    const HORIZONTAL_LINE_SPACING = 12;
    let i = context.canvas.height;
    let j = context.canvas.width;

    context.lineWidth = 0.2;
    context.strokeStyle = 'rgba(10,10,10,0.5)';
    while (i >= 0) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.width, i);
      context.stroke();
      i -= VERTICAL_LINE_SPACING;
    }
    while (j >= 0) {
      context.beginPath();
      context.moveTo(j, 0);
      context.lineTo(j, context.canvas.height);
      context.stroke();
      j -= HORIZONTAL_LINE_SPACING;
    }

    return this;
  }

  private drawSpritesheet(spritesheet: HTMLImageElement) {
    const { context } = this;
    context.drawImage(spritesheet, 0, 0);
    return this;
  }

  private listenEvents() {
    const { canvas } = this;
    const tips = (this.tips = document.createElement('div'));
    tips.style.position = 'absolute';
    tips.style.zIndex = '-1';
    tips.style.left = '0';
    tips.style.top = '0';
    document.body.appendChild(tips);

    canvas.addEventListener(
      'mousemove',
      this.throttle((e: MouseEvent) => {
        const coordinate: Point = this.coordinateTransformation(e.clientX, e.clientY);
        console.log(coordinate);

        this.clearScreen()
          // .drawSpritesheet(this.spritesheet)
          .drawGrid()
          .drawGuidelines(coordinate.x, coordinate.y);

        tips.innerText = coordinate.x + ', ' + coordinate.y;
      }, 50),
      false
    );
  }

  public destroy() {
    super.destroy();
    this.tips.remove();
  }
}
