import { BaseDemo } from './BaseDemo';
import { Point } from './declare';

/**
 * @description 贝塞尔曲线
 */
export class Demo extends BaseDemo {
  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid().draw();
  }

  public draw() {
    return this.drawQuadraticBezier().drawCubeBezier();
  }

  public drawQuadraticBezier() {
    const { context } = this;

    context.save();
    context.fillStyle = this.randomRgba();
    context.strokeStyle = this.randomRgba();
    context.shadowColor = this.randomRgba();
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.shadowBlur = 1;
    context.beginPath();
    context.moveTo(120.5, 130);
    context.quadraticCurveTo(150.8, 130, 160.6, 150.5);
    context.quadraticCurveTo(190, 250.0, 210.5, 160.5);
    context.quadraticCurveTo(240, 100.5, 290, 70.5);
    context.stroke();
    context.restore();

    context.save();
    context.fillStyle = this.randomRgba();
    context.strokeStyle = this.randomRgba();
    context.shadowColor = this.randomRgba();
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.centerX, 50);
    context.quadraticCurveTo(this.centerX + 100, 0, this.centerX + 100, 200);
    context.quadraticCurveTo(this.centerX + 200, 0, this.centerX + 100, 100);
    context.stroke();
    context.restore();

    return this;
  }

  public drawCubeBezier() {
    const { context } = this;
    const endPoints = [{ x: this.centerX, y: this.centerY }, { x: 430, y: 270 }];
    const controlPoints = [{ x: this.centerX, y: 250 }, { x: 450, y: this.centerY }];

    context.fillStyle = this.randomRgba();
    context.strokeStyle = this.randomRgba();
    context.lineWidth = 2;
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

    // control
    context.lineWidth = 1;
    context.setLineDash([5, 5]);
    context.strokeStyle = 'rgba(0,0,0,0.5)';
    context.beginPath();
    context.moveTo(endPoints[0].x, endPoints[0].y);
    context.lineTo(controlPoints[0].x, controlPoints[0].y);
    context.moveTo(endPoints[1].x, endPoints[1].y);
    context.lineTo(controlPoints[1].x, controlPoints[1].y);
    context.stroke();

    this.drawPoints(controlPoints, 'yellow', 'blue').drawPoints(endPoints, 'blue', 'red');

    return this;
  }

  public drawPoints(points: Point[], strokeStyle: string = 'yellow', fillStyle: string = 'blue') {
    const { context } = this;

    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;

    points.forEach(point => {
      context.beginPath();
      context.arc(point.x, point.y, 5, 0, Math.PI * 2, false);
      context.stroke();
      context.fill();
    });

    return this;
  }
}
