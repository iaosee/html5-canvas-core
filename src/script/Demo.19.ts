import { Point, Rectangle } from './declare';
import { BaseDemo } from './BaseDemo';

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

  public config: any = {
    radius: 20
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

  public updateRubberband(loc: Point) {
    this.updateRubberbandRectangle(loc);
    this.drawRubberbandShape(loc);
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

  public drawRubberbandShape(loc: Point) {
    const { context, mousedownPos, mousemovePos, rubberbandRect } = this;
    let angle;
    let radius;

    // For horizontal lines
    if (mousedownPos.y === mousemovePos.y) {
      radius = Math.abs(loc.x - mousedownPos.x);
    } else {
      // The if block above catches horizontal lines.
      angle = Math.atan(rubberbandRect.height / rubberbandRect.width);
      radius = rubberbandRect.height / Math.sin(angle);
    }

    context.beginPath();
    context.arc(mousedownPos.x, mousedownPos.y, radius, 0, Math.PI * 2, false);
    // context.fillRect(rubberbandRect.x, rubberbandRect.y, rubberbandRect.width, rubberbandRect.height);
    context.stroke();
    context.fill();

    return this;
  }

  public listenEvents() {
    const { canvas } = this;
    canvas.addEventListener('mousedown', this.onMousedownHandler.bind(this));
    canvas.addEventListener('mousemove', this.onMousemoveHandler.bind(this));
    canvas.addEventListener('mouseup', this.onMouseupHandler.bind(this));
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    window.addEventListener('keydown', e => e.key === 'c' && this.clearScreen().drawGrid());
  }

  public onMousedownHandler(event: MouseEvent) {
    const { context } = this;

    this.mousemovePos = this.mousedownPos = this.coordinateTransformation(event.clientX, event.clientY);

    context.fillStyle = this.randomRgba();
    event.preventDefault();
    this.saveDrawingSurface();
    this.dragging = true;
  }

  public onMousemoveHandler(event: MouseEvent) {
    if (!this.dragging) {
      return;
    }
    const { context } = this;

    event.preventDefault();
    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);
    this.restoreDrawingSurface();
    this.updateRubberband(this.mousemovePos);

    if (this.guidewires) {
      context.setLineDash([4, 2]);
      this.drawGuidelines(this.mousemovePos.x, this.mousemovePos.y, 'green');
      context.setLineDash([]);
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
