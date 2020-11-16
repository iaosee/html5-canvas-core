import { BaseDemo } from '../base/BaseDemo';
import { Point } from '../interfaces';
import { renderStyle } from '../tools/util';
const IMG_URL = require('../../../asset/images/presta_illustration_20.jpg');

/**
 * @description 图像选区
 */
export class Demo extends BaseDemo {
  public name: string = '图像选区';
  public dragging: boolean = false;
  public mousedownPosition: Point = { x: 0, y: 0 };
  public rubberbandDiv: HTMLElement = document.createElement('div');
  public rubberbandRectangle: any = {};
  public image: HTMLImageElement;

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.addRubberbandToScene().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    return this;
    // return this.clearScreen()
    //            .drawGrid();
  }

  public destroy() {
    super.destroy();
    this.rubberbandDiv.remove();
  }

  private addRubberbandToScene() {
    renderStyle(this.rubberbandDiv, {
      position: 'absolute',
      zIndex: '5',
      border: '2px solid red',
      cursor: 'crosshair'
    });
    document.body.appendChild(this.rubberbandDiv);
    return this;
  }

  private rubberbandStart(x: number, y: number) {
    this.rubberbandRectangle.left = this.mousedownPosition.x = x;
    this.rubberbandRectangle.top = this.mousedownPosition.y = y;

    this.moveRubberbandDiv();
    this.showRubberbandDiv();

    this.dragging = true;
  }

  private moveRubberbandDiv() {
    this.rubberbandDiv.style.top = this.rubberbandRectangle.top + 'px';
    this.rubberbandDiv.style.left = this.rubberbandRectangle.left + 'px';
    return this;
  }

  private resizeRubberbandDiv() {
    this.rubberbandDiv.style.width = this.rubberbandRectangle.width + 'px';
    this.rubberbandDiv.style.height = this.rubberbandRectangle.height + 'px';
    return this;
  }

  private showRubberbandDiv() {
    this.rubberbandDiv.style.display = 'block';
    return this;
  }

  private hideRubberbandDiv() {
    this.rubberbandDiv.style.display = 'none';
  }

  private rubberbandStretch(x: number, y: number) {
    this.rubberbandRectangle.left = x < this.mousedownPosition.x ? x : this.mousedownPosition.x;
    this.rubberbandRectangle.top = y < this.mousedownPosition.y ? y : this.mousedownPosition.y;

    (this.rubberbandRectangle.width = Math.abs(x - this.mousedownPosition.x)),
      (this.rubberbandRectangle.height = Math.abs(y - this.mousedownPosition.y));

    this.moveRubberbandDiv();
    this.resizeRubberbandDiv();
  }

  private rubberbandEnd() {
    const { context, canvas } = this;
    const bbox = canvas.getBoundingClientRect();

    try {
      context.drawImage(
        canvas,
        this.rubberbandRectangle.left - bbox.left,
        this.rubberbandRectangle.top - bbox.top,
        this.rubberbandRectangle.width,
        this.rubberbandRectangle.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    } catch (e) {
      console.log(e);
    }

    this.rubberbandDiv.style.width = String(0);
    this.rubberbandDiv.style.height = String(0);
    this.resetRubberbandRectangle();
    this.hideRubberbandDiv();

    this.dragging = false;
  }

  private resetRubberbandRectangle() {
    this.rubberbandRectangle = { top: 0, left: 0, width: 0, height: 0 };
    return this;
  }

  public drawImage() {
    const { canvas, context } = this;
    context.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    return this;
  }

  private async listenEvents() {
    const { canvas, context } = this;

    try {
      this.image = await this.loadImage(IMG_URL);
      this.drawImage();
    } catch (e) {
      console.log(e);
    }

    canvas.addEventListener('mousedown', this.mousedownHandler(), false);
    document.addEventListener('mousemove', this.mousemoveHandler(), false);
    document.addEventListener('mouseup', this.mouseupHandler(), false);
    window.addEventListener('keyup', this.keyupHandler(), false);

    return this;
  }

  private mousedownHandler() {
    return (e: MouseEvent) => {
      const x = e.x || e.clientX;
      const y = e.y || e.clientY;

      e.preventDefault();
      this.rubberbandStart(x, y);
    };
  }

  private mousemoveHandler() {
    return (e: MouseEvent) => {
      const x = e.x || e.clientX;
      const y = e.y || e.clientY;

      e.preventDefault();
      this.dragging && this.rubberbandStretch(x, y);
    };
  }

  private mouseupHandler() {
    return (e: MouseEvent) => {
      e.preventDefault();
      this.rubberbandEnd();
    };
  }

  private keyupHandler() {
    return (e: KeyboardEvent) => {
      if (!e || e.keyCode !== 32) {
        return;
      }
      this.clearScreen().drawImage();
    };
  }
}
