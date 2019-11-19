import { Point } from './declare';
import { BaseDemo } from './BaseDemo';

/**
 * @description 线条
 */
export class Demo extends BaseDemo {
  public dragging: boolean = false;
  public guidewires: boolean = true;
  public mousedown: Point = { x: 0, y: 0 };
  public drawingSurfaceImageData: ImageData;
  public rubberbandRect = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
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
    const { context, rubberbandRect, mousedown } = this;

    rubberbandRect.width = Math.abs(loc.x - mousedown.x);
    rubberbandRect.height = Math.abs(loc.y - mousedown.y);
    rubberbandRect.left = loc.x > mousedown.x ? mousedown.x : loc.x;
    rubberbandRect.top = loc.y > mousedown.y ? mousedown.y : loc.y;
    context.strokeStyle = 'blue';

    return this;
  }

  public drawRubberbandShape(loc: Point) {
    const { context, mousedown } = this;

    context.beginPath();
    context.moveTo(mousedown.x, mousedown.y);
    context.lineTo(loc.x, loc.y);
    context.stroke();
    context.closePath();

    return this;
  }

  public updateRubberband(loc: Point) {
    this.updateRubberbandRectangle(loc);
    this.drawRubberbandShape(loc);
    return this;
  }

  public listenEvents() {
    const { canvas, mousedown } = this;
    let pos: Point = { x: 0, y: 0 };

    const mousedownHandler = (e: MouseEvent) => {
      pos = this.coordinateTransformation(e.clientX, e.clientY);
      e.preventDefault();

      this.saveDrawingSurface();
      mousedown.x = pos.x;
      mousedown.y = pos.y;
      this.dragging = true;
    };

    const mousemoveHandler = (e: MouseEvent) => {
      if (this.dragging) {
        e.preventDefault();
        pos = this.coordinateTransformation(e.clientX, e.clientY);
        this.restoreDrawingSurface();
        this.updateRubberband(pos);

        if (this.guidewires) {
          this.drawGuidelines(pos.x, pos.y, 'green');
        }
      }
    };

    const mouseupHandler = (e: MouseEvent) => {
      if (this.dragging) {
        e.preventDefault();
        pos = this.coordinateTransformation(e.clientX, e.clientY);
        this.restoreDrawingSurface();
        this.updateRubberband(pos);
        this.dragging = false;
      }
    };

    canvas.addEventListener('mousedown', mousedownHandler);
    canvas.addEventListener('mousemove', mousemoveHandler);
    canvas.addEventListener('mouseup', mouseupHandler);
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    window.addEventListener('keydown', e => e.key === 'c' && this.clearScreen());

    return this;
  }
}
