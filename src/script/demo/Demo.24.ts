import { GUI } from 'lil-gui';
import { Rubberband } from '../base/Rubberband';

import { Point } from '../geometry/Point';
import { RegularPolygon } from '../geometry/RegularPolygon';

/**
 * @description 使用多边形对象保存绘制
 */
export class Demo extends Rubberband {
  public name: string = '多边形对象-保存绘制';
  public polygons: RegularPolygon[] = [];

  public config = {
    sides: 5,
    startAngle: 0,
    fillStyle: [71, 163, 56, 0.2],
    strokeStyle: [0, 128, 255, 0.8],
    filled: true,
    redraw: () => {
      console.log('redraw');
      this.clearScreen().drawGrid().drawPolygons();
    },
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid().drawPolygons();
  }

  public draw() {
    return this;
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'sides').min(3).max(50).step(1);

    gui.add(config, 'startAngle').min(0).max(180).step(15);

    gui.add(config, 'filled');
    gui.addColor(config, 'fillStyle', 255);
    gui.addColor(config, 'strokeStyle', 255);

    gui.add(config, 'redraw');

    return this;
  }

  public drawRubberbandShape(loc: Point) {
    const { context, config, mousedownPos, mousemovePos, rubberbandRect } = this;
    const radius =
      mousedownPos.y === mousemovePos.y
        ? Math.abs(loc.x - mousedownPos.x)
        : rubberbandRect.height / Math.sin(Math.atan(rubberbandRect.height / rubberbandRect.width));
    const radius2 = Math.sqrt(Math.pow(rubberbandRect.width, 2) + Math.pow(rubberbandRect.height, 2));

    const polygon = new RegularPolygon({
      x: mousedownPos.x,
      y: mousedownPos.y,
      radius,
      sides: config.sides,
      startAngle: this.degreesToRadian(config.startAngle),
      fillStyle: this.rgbaFromArr(config.fillStyle),
      strokeStyle: this.rgbaFromArr(config.strokeStyle),
      filled: config.filled,
    });

    polygon.createPath(context);
    polygon.stroke(context);
    polygon.filled && polygon.fill(context);

    if (!this.dragging && !mousedownPos.equals(loc)) {
      console.log(radius);
      console.log(radius2);
      this.polygons.push(polygon);
    }
    return this;
  }

  public drawPolygons() {
    const { context } = this;
    this.polygons.forEach((polygon) => {
      polygon.stroke(context);
      if (polygon.filled) {
        polygon.fill(context);
      }
    });

    return this;
  }

  public listenEvents() {
    super.listenEvents();
    window.addEventListener('keydown', (e) => e.key === 'c' && (this.polygons = []));

    return this;
  }
}
