import { GUI } from 'lil-gui';
import { Point } from '../geometry/Point';
import { Rubberband } from '../base/Rubberband';

/**
 * @description 拖拽绘制二/三次次贝塞尔曲线
 */
export class Demo extends Rubberband {
  public override name: string = '拖拽绘制二/三次次贝塞尔曲线';
  public config = {
    fillStyle: [71, 163, 56, 0.2],
    strokeStyle: [0, 128, 255, 0.8],
    curveType: 'QuadraticCurve',
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

    gui.add(config, 'curveType', ['QuadraticCurve', 'CubeBezier']);
    gui.addColor(config, 'fillStyle', 255);
    gui.addColor(config, 'strokeStyle', 255);

    return this;
  }

  public drawRubberbandShape(loc: Point) {
    const { context, config, mousedownPos, mousemovePos, rubberbandRect } = this;
    const radius = Math.sqrt(Math.pow(rubberbandRect.width, 2) + Math.pow(rubberbandRect.height, 2));

    context.lineWidth = 2;
    context.strokeStyle = this.rgbaFromArr(config.strokeStyle);
    config.curveType === 'QuadraticCurve' ? this.drawQuadraticCurve() : this.drawCubeBezier();

    return this;
  }

  public drawQuadraticCurve() {
    const { context, rubberbandRect } = this;
    context.beginPath();
    context.moveTo(rubberbandRect.x, rubberbandRect.y);
    context.quadraticCurveTo(
      rubberbandRect.x + rubberbandRect.width,
      rubberbandRect.y,
      rubberbandRect.x + rubberbandRect.width,
      rubberbandRect.y + rubberbandRect.height,
    );
    context.stroke();
  }

  public drawCubeBezier() {
    const { context, rubberbandRect } = this;

    context.beginPath();
    context.moveTo(rubberbandRect.x, rubberbandRect.y);
    context.bezierCurveTo(
      rubberbandRect.x,
      rubberbandRect.y + rubberbandRect.height,
      rubberbandRect.x + rubberbandRect.width,
      rubberbandRect.y,
      rubberbandRect.x + rubberbandRect.width,
      rubberbandRect.y + rubberbandRect.height,
    );
    context.stroke();
  }
}
