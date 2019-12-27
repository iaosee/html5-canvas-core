import { Point, Rectangle } from './declare';
import { BaseDemo } from './BaseDemo';

/**
 * @description 线条
 */
export class Demo extends BaseDemo {
  public dragging: boolean = false;
  public guidewires: boolean = true;

  public mousedownPos: Point = { x: 0, y: 0 };
  public mousemovePos: Point = { x: 0, y: 0 };

  public drawingSurfaceImageData: ImageData;
  public rubberbandRect: Rectangle = {
    width: 0,
    height: 0,
    x: 0,
    y: 0
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid();
  }

  public draw() {
    return this;
  }

  public saveDrawingSurface() {
    const { canvas, context } = this;
    this.drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.width);
    return this;
  }

  public restoreDrawingSurface() {
    const { context } = this;
    context.putImageData(this.drawingSurfaceImageData, 0, 0);
    return this;
  }

  public updateRubberbandRectangle(loc: Point) {
    const { rubberbandRect, mousedownPos } = this;

    rubberbandRect.width = Math.abs(loc.x - mousedownPos.x);
    rubberbandRect.height = Math.abs(loc.y - mousedownPos.y);
    rubberbandRect.x = loc.x > mousedownPos.x ? mousedownPos.x : loc.x;
    rubberbandRect.y = loc.y > mousedownPos.y ? mousedownPos.y : loc.y;

    return this;
  }

  public updateRubberband(loc: Point) {
    this.updateRubberbandRectangle(loc);
    this.drawRubberbandShape(loc);
    return this;
  }

  public drawRubberbandShape(loc: Point) {
    const { context, mousedownPos } = this;

    context.strokeStyle = 'blue';
    context.beginPath();
    context.moveTo(mousedownPos.x, mousedownPos.y);
    context.lineTo(loc.x, loc.y);
    context.stroke();
    context.closePath();

    return this;
  }

  public listenEvents() {
    const { canvas } = this;

    canvas.addEventListener('mousedown', this.onMousedownHandler.bind(this));
    canvas.addEventListener('mousemove', this.onMousemoveHandler.bind(this));
    canvas.addEventListener('mouseup', this.onMouseupHandler.bind(this));
    canvas.addEventListener('contextmenu', event => event.preventDefault());
    window.addEventListener('keydown', event => event.key === 'c' && this.clearScreen().drawGrid());

    return this;
  }

  public onMousedownHandler(event: MouseEvent) {
    const { mousedownPos } = this;

    event.preventDefault();

    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);
    this.saveDrawingSurface();
    mousedownPos.x = this.mousemovePos.x;
    mousedownPos.y = this.mousemovePos.y;
    this.dragging = true;
  }

  public onMousemoveHandler(event: MouseEvent) {
    if (!this.dragging) {
      return;
    }
    event.preventDefault();
    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);
    this.restoreDrawingSurface();
    this.updateRubberband(this.mousemovePos);

    if (this.guidewires) {
      this.drawGuidelines(this.mousemovePos.x, this.mousemovePos.y, 'green');
    }
  }

  public onMouseupHandler(event: MouseEvent) {
    if (!this.dragging) {
      return;
    }
    event.preventDefault();
    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);
    this.restoreDrawingSurface();
    this.updateRubberband(this.mousemovePos);
    this.dragging = false;
  }
}
