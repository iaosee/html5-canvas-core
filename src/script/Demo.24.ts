import * as dat from 'dat.gui';
import { Rubberband } from './Rubberband';

import { Point } from './geometry/Point';
import { Polygon } from './geometry/Polygon';

/**
 * @description 使用多边形对象保存绘制
 */
export class Demo extends Rubberband {
  public polygons: Polygon[] = [];

  public config = {
    sides: 5,
    startAngle: 0,
    fillStyle: [71, 163, 56, 0.2],
    strokeStyle: [0, 128, 255, 0.8],
    filled: true,
    redraw: () => {
      console.log('redraw');
      this.clearScreen()
        .drawGrid()
        .drawPolygons();
    }
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
    const gui = new dat.GUI();

    gui
      .add(config, 'sides')
      .min(3)
      .max(50)
      .step(1);

    gui
      .add(config, 'startAngle')
      .min(0)
      .max(180)
      .step(15);

    gui.add(config, 'filled');
    gui.addColor(config, 'fillStyle');
    gui.addColor(config, 'strokeStyle');

    gui.add(config, 'redraw');

    return this;
  }

  public drawRubberbandShape(loc: Point) {
    const { context, config, mousedownPos, mousemovePos, rubberbandRect } = this;
    let radius = rubberbandRect.width > rubberbandRect.height ? rubberbandRect.width : rubberbandRect.height;

    if (mousedownPos.y === mousemovePos.y) {
      radius = Math.abs(loc.x - mousedownPos.x);
    } else {
      // The if block above catches horizontal lines.
      const angle = Math.atan(rubberbandRect.height / rubberbandRect.width);
      radius = rubberbandRect.height / Math.sin(angle);
    }

    const r = Math.sqrt(Math.pow(rubberbandRect.width, 2) + Math.pow(rubberbandRect.height, 2));

    const polygon = new Polygon(
      context,
      new Point(mousedownPos.x, mousedownPos.y),
      radius,
      config.sides,
      this.angle2radian(config.startAngle),
      this.rgbaFormArr(config.fillStyle),
      this.rgbaFormArr(config.strokeStyle),
      config.filled
    );

    polygon.createPath();
    polygon.stroke();
    polygon.fill();

    const _this = this;
    if (!this.dragging && !mousedownPos.equals(loc)) {
      console.log(radius);
      console.log(r);

      polygon.on('click', function(e: MouseEvent) {
        console.log(this);
        console.log(e);
        this.fillStyle = _this.randomRgba();
        _this
          .clearScreen()
          .drawGrid()
          .drawPolygons();
      });

      this.polygons.push(polygon);
    }
    return this;
  }

  public drawPolygons() {
    const { context } = this;
    this.polygons.forEach(polygon => {
      polygon.stroke();
      if (polygon.filled) {
        polygon.fill();
      }
    });

    return this;
  }

  public listenEvents() {
    super.listenEvents();
    window.addEventListener('keydown', e => e.key === 'c' && (this.polygons = []));
  }
}
