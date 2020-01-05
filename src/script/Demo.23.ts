import { Point } from './declare';
import { Rubberband } from './Rubberband';

/**
 * @description 拖拽画多边形
 */
export class Demo extends Rubberband {
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

  public drawRubberbandShape(loc: Point) {
    const { context, mousedownPos, rubberbandRect } = this;

    context.strokeStyle = 'blue';
    this.drawPolygonPath(mousedownPos, rubberbandRect.width, 7, (Math.PI / 180) * 0);
    context.stroke();
    context.fill();

    return this;
  }

  public drawPolygonPath(center: Point, radius: number, sides: number, startAngle: number = 0) {
    const { context } = this;

    const points = this.getPolygonPoints(center, radius, sides, startAngle);
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < sides; ++i) {
      context.lineTo(points[i].x, points[i].y);
    }
    context.closePath();

    return this;
  }

  public getPolygonPoints(center: Point, radius: number, sides: number, startAngle: number = 0) {
    const points: Point[] = [];

    for (let i = 0; i < sides; i++) {
      points.push({
        x: center.x + Math.sin(startAngle) * radius,
        y: center.y - Math.cos(startAngle) * radius
      });
      startAngle += (2 * Math.PI) / sides;
    }

    return points;
  }
}
