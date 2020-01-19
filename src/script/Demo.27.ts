import * as dat from 'dat.gui';
import { Rubberband } from './Rubberband';
import { Point } from './geometry/Point';
import { BezierCurve } from './geometry/BezierCurve';

/**
 * @description 编辑贝塞尔曲线
 */
export class Demo extends Rubberband {
  public endPoints: Point[] = [new Point(), new Point()];
  public controlPoints: Point[] = [new Point(), new Point()];
  public draggingPoint: Point;

  public config = {
    editing: false,
    lineWidth: 5,
    endPointFillStyle: [255, 124, 3, 0.5],
    ctrlPointFillStyle: [30, 130, 13, 0.5],
    strokeStyle: [0, 128, 255, 0.8],
    CONTROL_POINT_RADIUS: 5
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl().listenEvents();
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

  private createControl() {
    const { config } = this;
    const gui = new dat.GUI();

    // gui.add(config, 'curveType', ['QuadraticCurve', 'CubeBezier']);
    gui
      .add(config, 'lineWidth')
      .min(1)
      .max(20)
      .step(1);
    gui.addColor(config, 'strokeStyle');
    gui.addColor(config, 'endPointFillStyle');
    gui.addColor(config, 'ctrlPointFillStyle');

    return this;
  }

  /** ******************************** */

  public drawRubberbandShape(loc: Point) {
    const { context, config, mousedownPos, mousemovePos, rubberbandRect } = this;
    this.updateEndAndControlPoints().drawBezierCurve();
    return this;
  }

  public updateEndAndControlPoints() {
    const { endPoints, controlPoints, rubberbandRect } = this;
    endPoints[0].x = rubberbandRect.x;
    endPoints[0].y = rubberbandRect.y;

    endPoints[1].x = rubberbandRect.x + rubberbandRect.width;
    endPoints[1].y = rubberbandRect.y + rubberbandRect.height;

    controlPoints[0].x = rubberbandRect.x;
    controlPoints[0].y = rubberbandRect.y + rubberbandRect.height;

    controlPoints[1].x = rubberbandRect.x + rubberbandRect.width;
    controlPoints[1].y = rubberbandRect.y;

    return this;
  }

  public drawBezierCurve() {
    const { context, config, endPoints, controlPoints, rubberbandRect } = this;

    context.lineWidth = config.lineWidth || 5;
    context.strokeStyle = this.rgbaFormArr(config.strokeStyle);
    context.beginPath();
    context.moveTo(endPoints[0].x, endPoints[0].y);
    context.bezierCurveTo(
      controlPoints[0].x,
      controlPoints[0].y,
      controlPoints[1].x,
      controlPoints[1].y,
      endPoints[1].x,
      endPoints[1].y
    );
    context.stroke();

    return this;
  }

  public drawControlPoint(index: number) {
    const { context, config, endPoints, controlPoints } = this;
    context.beginPath();

    context.save();
    context.lineWidth = 1;
    context.setLineDash([8, 4]);
    context.lineDashOffset = 5;
    context.strokeStyle = 'rgba(0,0,0,0.2)';
    context.moveTo(endPoints[index].x, endPoints[index].y);
    context.lineTo(controlPoints[index].x, controlPoints[index].y);
    context.stroke();
    context.restore();

    context.beginPath();
    context.arc(controlPoints[index].x, controlPoints[index].y, config.CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
    context.stroke();
    context.fill();
    return this;
  }

  public drawControlPoints() {
    const { context, config } = this;
    const color = this.rgbaFormArr(config.ctrlPointFillStyle);

    context.save();
    context.fillStyle = color;
    context.strokeStyle = color;
    this.drawControlPoint(0);
    this.drawControlPoint(1);
    context.stroke();
    context.fill();
    context.restore();

    return this;
  }

  public drawEndPoint(index: number) {
    const { context, config, endPoints } = this;
    context.beginPath();
    context.arc(endPoints[index].x, endPoints[index].y, config.CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
    context.stroke();
    context.fill();
    return this;
  }

  public drawEndPoints() {
    const { context, config, endPoints } = this;
    const color = this.rgbaFormArr(config.endPointFillStyle);
    context.save();

    context.strokeStyle = color;
    context.fillStyle = color;

    this.drawEndPoint(0);
    this.drawEndPoint(1);

    context.stroke();
    context.fill();
    context.restore();
  }

  public drawControlAndEndPoints() {
    this.drawControlPoints();
    this.drawEndPoints();
  }

  public cursorInEndPoint(loc: Point) {
    const { context, config, endPoints } = this;
    let pt: Point;

    endPoints.forEach(point => {
      context.beginPath();
      context.arc(point.x, point.y, config.CONTROL_POINT_RADIUS + config.lineWidth, 0, Math.PI * 2, false);

      if (context.isPointInPath(loc.x, loc.y)) {
        pt = point;
      }
    });

    return pt;
  }

  public cursorInControlPoint(loc: Point) {
    const { context, config, controlPoints } = this;
    let pt: Point;

    controlPoints.forEach(function(point) {
      context.beginPath();
      context.arc(point.x, point.y, config.CONTROL_POINT_RADIUS + config.lineWidth, 0, Math.PI * 2, false);

      if (context.isPointInPath(loc.x, loc.y)) {
        pt = point;
      }
    });

    return pt;
  }

  public updateDraggingPoint(loc: Point) {
    this.draggingPoint.x = loc.x;
    this.draggingPoint.y = loc.y;
  }

  protected onMousedownHandler(event: MouseEvent) {
    const { context, config } = this;

    this.mousemovePos = this.mousedownPos = this.coordinateTransformation(event.clientX, event.clientY);

    event.preventDefault();

    if (!config.editing) {
      this.saveDrawingSurface();
      this.updateRubberbandRectangle(this.mousemovePos);
      this.dragging = true;
    } else {
      this.draggingPoint = this.cursorInControlPoint(this.mousemovePos);

      if (!this.draggingPoint) {
        this.draggingPoint = this.cursorInEndPoint(this.mousemovePos);
      }
    }
  }

  protected onMousemoveHandler(event: MouseEvent) {
    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);

    if (this.dragging || this.draggingPoint) {
      event.preventDefault();
      this.restoreDrawingSurface();
    }

    if (this.dragging) {
      this.updateRubberband(this.mousemovePos);
      this.drawControlAndEndPoints();
    } else if (this.draggingPoint) {
      this.updateDraggingPoint(this.mousemovePos);
      this.drawControlAndEndPoints();
      this.drawBezierCurve();
    }
  }

  protected onMouseupHandler(event: MouseEvent) {
    const { context, config } = this;

    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);
    this.restoreDrawingSurface();

    if (!config.editing) {
      this.updateRubberband(this.mousemovePos);
      this.drawControlAndEndPoints();
      this.dragging = false;
      config.editing = true;
    } else {
      if (this.draggingPoint) {
        this.drawControlAndEndPoints();
      } else {
        config.editing = false;
      }

      this.drawBezierCurve();
      this.draggingPoint = null;
    }
  }
}
