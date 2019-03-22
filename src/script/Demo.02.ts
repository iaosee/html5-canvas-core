import DemoBase from "./DemoBase";
import { Point } from './declare';
const IMG_URL = require('../asset/images/presta_illustration_20.jpg');

export default class Demo extends DemoBase {
  public spritesheet: HTMLImageElement;

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    this.listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    const { context, canvas } = this;

    this.clearScreen();
    this.loadImage(IMG_URL)
        .then((sprite: HTMLImageElement) => {
          // this.drawSpritesheet(sprite);
        });
    return this.drawBackground();
  }

  private loadImage(src: string) {
    this.spritesheet = new Image();
    this.spritesheet.src = src;

    return new Promise((resolve, reject) => {
      this.spritesheet.onload = (event: Event) => {
        resolve(event.target);
      }
    });
  }

  private drawBackground() {
    const { context } = this;
    const VERTICAL_LINE_SPACING  = 12;
    const HORIZONTAL_LINE_SPACING  = 12;
    let i = context.canvas.height;
    let j = context.canvas.width;

    context.lineWidth = 0.2;
    context.strokeStyle = 'rgba(10,10,10,0.5)';
    while ( i >= 0 ) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.width, i);
      context.stroke();
      i -= VERTICAL_LINE_SPACING;
    }
    while (j >= 0 ) {
      context.beginPath();
      context.moveTo(j, 0);
      context.lineTo(j, context.canvas.height)
      context.stroke();
      j -= HORIZONTAL_LINE_SPACING;
    }

    return this;
  }

  private drawGuidelines(x: number, y: number) {
    const { context } = this;
    context.strokeStyle = 'rgba(43,134,66,0.8)';
    context.lineWidth = 0.5;

    return this.drawVerticalLine(x)
               .drawHorizontalLine(y);
  }

  private drawVerticalLine(x: number) {
    const { context } = this;
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, context.canvas.height);
    context.stroke();
    return this;
  }

  private drawHorizontalLine(y: number) {
    const { context } = this;
    context.beginPath();
    context.moveTo(0,y + 0.5);
    context.lineTo(context.canvas.width, y + 0.5);
    context.stroke();
    return this;
  }

  private drawSpritesheet(spritesheet: HTMLImageElement) {
    const { context } = this;
    context.drawImage(spritesheet, 0, 0);
    return this;
  }

  private listenEvents() {
    const { canvas } = this;
    const tips = document.createElement('div');
    tips.style.position = 'absolute';
    tips.style.zIndex = '-1';
    tips.style.left = '0';
    tips.style.top = '0';
    document.body.appendChild(tips);

    canvas.addEventListener('mousemove', this.throttle((e: MouseEvent) => {
      const coordinate: Point = this.CoordinateTransformation(e.clientX, e.clientY);
      console.log(coordinate);

      this.clearScreen()
          // .drawSpritesheet(this.spritesheet)
          .drawBackground()
          .drawGuidelines(coordinate.x, coordinate.y);

      tips.innerText = coordinate.x + ', ' + coordinate.y;
    }, 50), false);

  }

}
