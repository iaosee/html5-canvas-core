import { BaseDemo } from './BaseDemo';
import { Rectangle } from './declare';
import { Point } from './geometry/Point';

export abstract class Rubberband extends BaseDemo {
  protected dragging: boolean = false;
  protected guidewires: boolean = true;

  protected mousedownPos: Point = new Point(0, 0);
  protected mousemovePos: Point = new Point(0, 0);

  protected drawingSurfaceImageData: ImageData;
  protected rubberbandRect: Rectangle = {
    width: 0,
    height: 0,
    x: 0,
    y: 0
  };

  protected saveDrawingSurface() {
    const { canvas, context } = this;
    this.drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.width);
    return this;
  }

  protected restoreDrawingSurface() {
    const { context } = this;
    context.putImageData(this.drawingSurfaceImageData, 0, 0);
    return this;
  }

  protected updateRubberband(loc: Point) {
    this.updateRubberbandRectangle(loc);
    this.drawRubberbandShape(loc);
    return this;
  }

  protected updateRubberbandRectangle(loc: Point) {
    const { rubberbandRect, mousedownPos } = this;

    rubberbandRect.width = Math.abs(loc.x - mousedownPos.x);
    rubberbandRect.height = Math.abs(loc.y - mousedownPos.y);
    rubberbandRect.x = loc.x > mousedownPos.x ? mousedownPos.x : loc.x;
    rubberbandRect.y = loc.y > mousedownPos.y ? mousedownPos.y : loc.y;

    return this;
  }

  protected drawRubberbandShape(loc: Point) {
    const { context, mousedownPos } = this;

    context.save();
    context.strokeStyle = 'blue';
    context.beginPath();
    context.moveTo(mousedownPos.x, mousedownPos.y);
    context.lineTo(loc.x, loc.y);
    context.stroke();
    context.closePath();
    context.restore();

    return this;
  }

  protected listenEvents() {
    const { canvas } = this;
    canvas.addEventListener('mousedown', this.onMousedownHandler.bind(this));
    canvas.addEventListener('mousemove', this.onMousemoveHandler.bind(this));
    canvas.addEventListener('mouseup', this.onMouseupHandler.bind(this));
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    window.addEventListener('keydown', e => e.key === 'c' && this.clearScreen().drawGrid());
  }

  protected onMousedownHandler(event: MouseEvent) {
    const { context, config } = this;

    this.mousemovePos = this.mousedownPos = this.coordinateTransformation(event.clientX, event.clientY);

    context.fillStyle = this.rgbaFormArr(config.fillStyle) || this.randomRgba();
    event.preventDefault();
    this.saveDrawingSurface();
    this.dragging = true;
  }

  protected onMousemoveHandler(event: MouseEvent) {
    const { context } = this;

    if (!this.dragging) {
      return;
    }

    event.preventDefault();
    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);
    this.restoreDrawingSurface();
    this.updateRubberband(this.mousemovePos);

    if (this.guidewires) {
      this.drawGuidelines(this.mousedownPos.x, this.mousedownPos.y, 'rgba(0,0,255,0.2)');
      context.setLineDash([4, 2]);
      this.drawGuidelines(this.mousemovePos.x, this.mousemovePos.y);
      context.setLineDash([]);
    }
  }

  protected onMouseupHandler(event: MouseEvent) {
    if (!this.dragging) {
      return;
    }

    event.preventDefault();
    this.dragging = false;
    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);
    this.restoreDrawingSurface();
    this.updateRubberband(this.mousemovePos);
  }
}