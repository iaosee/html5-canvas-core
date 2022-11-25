import { Point } from './Point';

export class BezierCurve {
  public CONTROL_POINT_RADIUS: number = 5;

  public constructor(
    public context: CanvasRenderingContext2D,
    public anchorPoints: Point[] = [],
    public controlPoints: Point[] = [],
    public lineWidth: number = 1,
    public controlVisible: boolean = true
  ) {}

  public drawPoint(points: Point[]) {
    const { context, CONTROL_POINT_RADIUS } = this;

    context.save();
    points.forEach((point) => {
      context.beginPath();
      context.arc(point.x, point.y, CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
      context.stroke();
      context.fill();
    });
    context.restore();

    return this;
  }

  public strokeBezier() {
    const { context, anchorPoints, controlPoints } = this;
    context.save();
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(anchorPoints[0].x, anchorPoints[0].y);
    context.bezierCurveTo(
      controlPoints[0].x,
      controlPoints[0].y,
      controlPoints[1].x,
      controlPoints[1].y,
      anchorPoints[1].x,
      anchorPoints[1].y
    );
    context.stroke();
    context.restore();
    return this;
  }

  public draw() {
    const { context, anchorPoints, controlPoints } = this;

    this.controlVisible && this.drawPoint(anchorPoints).drawPoint(controlPoints);
    this.strokeBezier();

    return this;
  }
}
