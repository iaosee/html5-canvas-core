import DemoBase from './DemoBase';
import { Point, Rectangle } from './declare';


export default class Demo extends DemoBase {

  public dragging: Boolean = false;
  public rectangles: Array<Rectangle> = [];
  public mousedownPosition: Point = { x: 0, y: 0 };
  public draggingRect: Rectangle = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: this.randomRgba(),
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.draw()
               .drawRectangles();
  }

  protected draw() {
    return this.clearScreen()
               .drawGrid();
  }

  private drawRectangles() {
    for ( let i = 0, len = this.rectangles.length; i < len; i++ ) {
      this.drawRectangleFill(this.rectangles[i]);
    }

    return this;
  }

  private drawRectangleLine(rect: Rectangle) {
    const { context } = this;

    context.strokeStyle = rect.color;
    context.strokeRect(
      rect.x,
      rect.y,
      rect.width,
      rect.height
    );
    context.stroke();

    return this;
  }

  private drawRectangleFill(rect: Rectangle) {
    const { context } = this;

    context.fillStyle = rect.color;
    context.fillRect(
      rect.x,
      rect.y,
      rect.width,
      rect.height
    );
    context.fill();

    return this;
  }

  private listenEvents() {
    const { context, canvas } = this;

    canvas.addEventListener('mousedown', this.mousedownHandler(), false);
    document.addEventListener('mousemove', this.mousemoveHandler(), false);
    document.addEventListener('mouseup', this.mouseupHandler(), false);
    window.addEventListener('keyup', this.keyupHandler(), false);
  }

  private draggingStart(x: number, y: number) {

    this.dragging = true;
    this.draggingRect.x = this.mousedownPosition.x = x;
    this.draggingRect.y = this.mousedownPosition.y = y;
    this.draggingRect.color = this.randomRgba();

    return this;
  }

  private draggingMove(x: number, y: number) {

    this.draggingRect.x = x < this.mousedownPosition.x ? x : this.mousedownPosition.x;
    this.draggingRect.y = y < this.mousedownPosition.y ? y : this.mousedownPosition.y;
    this.draggingRect.width  = Math.abs(x - this.mousedownPosition.x),
    this.draggingRect.height = Math.abs(y - this.mousedownPosition.y);

    return this;
  }

  private draggingEnd() {

    this.dragging = false;
    this.drawRectangleFill(this.draggingRect);
    this.rectangles.push(Object.assign({}, this.draggingRect));

    return this;
  }

  private mousedownHandler() {
    return (e: MouseEvent) => {
      const x = e.x || e.clientX;
      const y = e.y || e.clientY;
      const coordinate: Point = this.coordinateTransformation(x, y);

      e.preventDefault();
      this.draggingStart(coordinate.x, coordinate.y);
    }
  }

  private mousemoveHandler() {
    return (e: MouseEvent) => {
      const x = e.x || e.clientX;
      const y = e.y || e.clientY;
      const coordinate: Point = this.coordinateTransformation(x, y);

      e.preventDefault();
      if ( !this.dragging ) {
        return;
      }

      this.draggingMove(coordinate.x, coordinate.y);
      this.clearScreen()
          .drawGrid()
          .drawRectangles()
          .drawRectangleFill(this.draggingRect)
          .drawGuidelines(coordinate.x, coordinate.y);
    }
  }

  private mouseupHandler() {
    return (e: MouseEvent) => {

      e.preventDefault();
      this.clearScreen().drawGrid().draggingEnd().drawRectangles();
    }
  }

  private keyupHandler() {
    return (e: KeyboardEvent) => {
      e.preventDefault();
      this.rectangles.splice(0, this.rectangles.length);
      this.clearScreen().drawGrid().drawRectangles();
    }
  }

}
