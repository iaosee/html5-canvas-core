import { GUI } from 'lil-gui';
import { Point } from '../geometry/Point';
import { Rubberband } from '../base/Rubberband';

/**
 * @description 剪辑区域 —— 实现橡皮檫
 */
export class Demo extends Rubberband {
  public name: string = '剪辑区域-实现橡皮檫';
  public mouseLastPos: Point;
  public config = {
    eraser: false,
    eraserSize: 20,
    fillStyle: [255, 0, 0, 0.8],
    eraserShape: 'circle',

    ERASER_LINE_WIDTH: 1,
    ERASER_SHADOW_COLOR: 'rgb(0,0,0)',
    ERASER_SHADOW_STYLE: 'blue',
    ERASER_STROKE_STYLE: 'rgb(0,0,255)',
    ERASER_SHADOW_OFFSET: -5,
    ERASER_SHADOW_BLUR: 20,
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl().listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid().drawText();
  }

  public draw() {
    return this;
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'eraser');
    gui.add(config, 'eraserShape', ['circle', 'rect']);
    gui.add(config, 'eraserSize').min(20).max(150).step(10);
    gui.addColor(config, 'fillStyle');

    return this;
  }

  public drawText() {
    const { context } = this;

    context.save();

    context.shadowColor = 'rgba(100, 100, 150, 0.8)';
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;

    context.font = '160px Palatino';
    context.fillStyle = 'cornflowerblue';

    const text = 'HTML5 Canvas 😋';
    const textInfo = context.measureText(text);
    context.fillText(text, this.centerX - textInfo.width / 2, this.centerY);

    context.strokeStyle = 'yellow';
    context.strokeText(text, this.centerX - textInfo.width / 2, this.centerY);

    context.restore();

    return this;
  }

  public drawRubberbandShape(loc: Point) {
    const { context, config, mousedownPos, rubberbandRect } = this;

    const radius = Math.sqrt(Math.pow(rubberbandRect.width, 2) + Math.pow(rubberbandRect.height, 2));
    context.fillStyle = this.rgbaFromArr(config.fillStyle) || this.randomRgba();

    context.beginPath();
    context.arc(mousedownPos.x, mousedownPos.y, radius, 0, Math.PI * 2, false);
    context.stroke();
    context.fill();

    return this;
  }

  public eraseLast() {
    const { context } = this;
    context.save();

    this.setErasePathForEraser().clearScreen().drawGrid();

    context.restore();

    return this;
  }

  public drawEraser(loc: Point) {
    const { context } = this;

    context.save();

    this.setEraserAttributes();
    this.setDrawPathForEraser(loc);
    context.stroke();

    context.restore();

    return this;
  }

  public setEraserAttributes() {
    const { context, config } = this;

    context.lineWidth = config.ERASER_LINE_WIDTH;
    context.shadowColor = config.ERASER_SHADOW_STYLE;
    context.shadowOffsetX = config.ERASER_SHADOW_OFFSET;
    context.shadowOffsetY = config.ERASER_SHADOW_OFFSET;
    context.shadowBlur = config.ERASER_SHADOW_BLUR;
    context.strokeStyle = config.ERASER_STROKE_STYLE;

    return this;
  }

  public setDrawPathForEraser(loc: Point) {
    const { context, config } = this;

    context.beginPath();
    if (config.eraserShape === 'circle') {
      context.arc(loc.x, loc.y, config.eraserSize / 2, 0, Math.PI * 2, false);
    } else {
      context.rect(loc.x - config.eraserSize / 2, loc.y - config.eraserSize / 2, config.eraserSize, config.eraserSize);
    }

    context.clip();
    return this;
  }

  public setErasePathForEraser() {
    const { context, config, mouseLastPos } = this;

    context.beginPath();

    if (config.eraserShape === 'circle') {
      context.arc(
        mouseLastPos.x,
        mouseLastPos.y,
        config.eraserSize / 2 + config.ERASER_LINE_WIDTH,
        0,
        Math.PI * 2,
        false
      );
    } else {
      context.rect(
        mouseLastPos.x - config.eraserSize / 2 - config.ERASER_LINE_WIDTH,
        mouseLastPos.y - config.eraserSize / 2 - config.ERASER_LINE_WIDTH,
        config.eraserSize + config.ERASER_LINE_WIDTH * 2,
        config.eraserSize + config.ERASER_LINE_WIDTH * 2
      );
    }

    context.clip();

    return this;
  }

  protected onMousedownHandler(event: MouseEvent) {
    const { context, config } = this;
    event.preventDefault();

    if (!config.eraser) {
      this.saveDrawingSurface();
    }

    this.mousedownPos = this.coordinateTransformation(event.clientX, event.clientY);
    this.mouseLastPos = this.mousemovePos;
    this.dragging = true;
  }

  protected onMousemoveHandler(event: MouseEvent) {
    const { config } = this;

    if (!this.dragging) {
      return;
    }

    event.preventDefault();
    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);

    if (config.eraser) {
      this.eraseLast().drawEraser(this.mousemovePos);
    } else {
      this.restoreDrawingSurface();
      this.updateRubberband(this.mousemovePos);
      this.guidewires && this.drawBandGuidelines();
    }

    this.mouseLastPos = this.mousemovePos;
  }

  protected onMouseupHandler(event: MouseEvent) {
    const { config } = this;

    if (!this.dragging) {
      return;
    }

    event.preventDefault();
    this.mousemovePos = this.coordinateTransformation(event.clientX, event.clientY);

    if (config.eraser) {
      this.eraseLast();
    }

    if (!config.eraser) {
      this.restoreDrawingSurface().updateRubberband(this.mousemovePos);
    }

    this.dragging = false;
  }
}
