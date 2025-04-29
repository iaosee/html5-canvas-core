import { GUI } from 'lil-gui';
import { Point } from '../interfaces';
import { Rubberband } from '../base/Rubberband';

/**
 * @description 拖拽画多边形
 */
export class Demo extends Rubberband {
  public override name: string = '拖拽画多边形';
  public config = {
    sides: 5,
    startAngle: 0,
    fillStyle: [71, 163, 56, 0.2],
    strokeStyle: [0, 128, 255, 0.8],
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public override start() {
    return this.drawGrid();
  }

  public override draw() {
    return this;
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'sides').min(3).max(50).step(1);

    gui.add(config, 'startAngle').min(0).max(180).step(15);

    gui.addColor(config, 'fillStyle', 255);
    gui.addColor(config, 'strokeStyle', 255);

    return this;
  }

  public drawRubberbandShape(loc: Point) {
    const { context, config, mousedownPos, rubberbandRect } = this;

    context.fillStyle = this.rgbaFromArr(config.fillStyle);
    context.strokeStyle = this.rgbaFromArr(config.strokeStyle);
    this.drawPolygonPath(mousedownPos, rubberbandRect.width, config.sides, this.degreesToRadian(config.startAngle));
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
        y: center.y - Math.cos(startAngle) * radius,
      });
      startAngle += (2 * Math.PI) / sides;
    }

    return points;
  }
}
