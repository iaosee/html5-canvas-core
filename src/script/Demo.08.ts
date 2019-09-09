import DemoBase from './DemoBase';
import { Point, Polyline } from './declare';

/**
 * @description 线条连接
 */
export default class Demo extends DemoBase {
  private polylineList: Array<Polyline> = [];
  private paths: Polyline = [];
  private mousePosition: Point = { x: 0, y: 0 };
  private lineColor: string = 'rgba(0,0,255,0.9)';
  private pointColor: string = this.randomRgba();
  private startDraw: boolean = false;

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    return this.clearScreen()
      .drawGrid()
      .drawLines()
      .drawPoint();
  }

  private drawPoint() {
    const { paths, context } = this;

    for (let i = 0, len = paths.length; i < len; i++) {
      context.beginPath();
      context.arc(paths[i].x, paths[i].y, 5, 0, Math.PI * 2, false);
      context.fillStyle = this.pointColor;
      context.fill();
    }

    return this;
  }

  private drawLines() {
    const { paths, mousePosition, context } = this;

    if (!paths.length) {
      return this;
    }

    context.beginPath();
    context.moveTo(paths[0].x, paths[0].y);
    for (let i = 1, len = paths.length; i < len; i++) {
      context.lineTo(paths[i].x, paths[i].y);
    }
    this.startDraw && context.lineTo(mousePosition.x, mousePosition.y);
    context.strokeStyle = this.lineColor;
    context.stroke();

    return this;
  }

  private listenEvents() {
    const { canvas, context } = this;
    const clickHandler = (e: MouseEvent) => {
      const coordinate: Point = this.coordinateTransformation(e.clientX, e.clientY);
      this.paths.push(coordinate);
      this.startDraw = true;
    };
    const doubleClickHandler = (e: MouseEvent) => {
      const coordinate: Point = this.coordinateTransformation(e.clientX, e.clientY);
      console.log(coordinate);
      this.startDraw = false;
    };
    const moveHandler = (e: MouseEvent) => {
      const coordinate: Point = this.coordinateTransformation(e.clientX, e.clientY);
      this.mousePosition = coordinate;
    };

    canvas.addEventListener('click', clickHandler, false);
    canvas.addEventListener('dblclick', doubleClickHandler, false);
    canvas.addEventListener('mousemove', moveHandler, false);
  }
}
