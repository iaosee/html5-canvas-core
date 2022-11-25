import { GUI } from 'lil-gui';
import { Rubberband } from '../base/Rubberband';

import { Point } from '../geometry/Point';
import { RegularPolygon } from '../geometry/RegularPolygon';

/**
 * @description 拖拽绘制的物体
 */
export class Demo extends Rubberband {
  public name: string = '拖拽绘制的物体';
  public polygons: RegularPolygon[] = [];
  public draggingPolygon: RegularPolygon;
  public draggingOffsetPos: Point = new Point();

  public config = {
    sides: 5,
    startAngle: 0,
    fillStyle: [71, 163, 56, 0.2],
    strokeStyle: [0, 128, 255, 0.8],
    filled: true,
    editing: false,
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
    gui.addColor(config, 'fillStyle');
    gui.addColor(config, 'strokeStyle');

    gui.add(config, 'redraw');
    gui.add(config, 'editing');

    return this;
  }

  public drawRubberbandShape(loc: Point) {
    const { context, config, mousedownPos, mousemovePos, rubberbandRect } = this;
    const radius = Math.sqrt(Math.pow(rubberbandRect.width, 2) + Math.pow(rubberbandRect.height, 2));

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

    this.drawPolygon(polygon);

    if (!this.dragging && !mousedownPos.equals(loc)) {
      this.polygons.push(polygon);
    }
    return this;
  }

  public drawPolygon(polygon: RegularPolygon) {
    const { context, config, dpr } = this;

    polygon.createPath(context);
    polygon.stroke(context);
    polygon.filled && polygon.fill(context);
    return this;
  }

  public drawPolygons() {
    this.polygons.forEach((polygon) => this.drawPolygon(polygon));
    return this;
  }

  public listenEvents() {
    super.listenEvents();
    window.addEventListener('keydown', (e) => e.key === 'c' && (this.polygons = []));

    return this;
  }

  protected onMousedownHandler(event: MouseEvent) {
    const { context, config, dpr } = this;

    event.preventDefault();
    this.dragging = true;
    this.mousemovePos = this.mousedownPos = this.coordinateTransformation(event.clientX, event.clientY);
    context.fillStyle = this.rgbaFromArr(config.fillStyle) || this.randomRgba();

    if (config.editing) {
      // this.drawPolygons();
      this.polygons.forEach((polygon) => {
        if (!polygon.isPointInPath(context, event.clientX * dpr, event.clientY * dpr)) {
          return;
        }

        // console.log('dragging', polygon);
        this.draggingPolygon = polygon;
        this.draggingOffsetPos = new Point(this.mousedownPos.x - polygon.x, this.mousedownPos.y - polygon.y);
      });
    } else {
      this.saveDrawingSurface();
    }
  }

  protected onMousemoveHandler(event: MouseEvent) {
    const { context, config } = this;

    event.preventDefault();
    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);

    if (config.editing && this.dragging) {
      this.draggingPolygon &&
        this.draggingPolygon.move(
          this.mousemovePos.x - this.draggingOffsetPos.x,
          this.mousemovePos.y - this.draggingOffsetPos.y
        );

      this.clearScreen().drawGrid().drawPolygons();
    } else if (this.dragging) {
      this.restoreDrawingSurface();
      this.updateRubberband(this.mousemovePos);
      this.guidewires && this.drawBandGuidelines();
    }
  }

  protected onMouseupHandler(event: MouseEvent) {
    const { config } = this;

    event.preventDefault();
    this.dragging = false;
    this.draggingPolygon = null;
    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);
    if (config.editing) {
      return;
    }
    this.restoreDrawingSurface();
    this.updateRubberband(this.mousemovePos);
  }
}
