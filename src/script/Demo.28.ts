import * as dat from 'dat.gui';
import { BaseDemo } from './BaseDemo';

/**
 * @description 图像合成
 */
export class Demo extends BaseDemo {
  public config = {
    globalAlpha: 1.0,
    compositeMode: 'source-over',
    coverColor: [255, 0, 0, 0.8]
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
    const gui = new dat.GUI();

    gui.addColor(config, 'coverColor');
    gui
      .add(config, 'globalAlpha')
      .min(0.1)
      .max(1.0)
      .step(0.1);
    gui.add(config, 'compositeMode', [
      'source-over',
      'source-in',
      'source-out',
      'source-atop',
      'destination-over',
      'destination-in',
      'destination-out',
      'destination-atop',
      'lighter',
      'copy',
      'xor',
      'multiply',
      'screen',
      'overlay',
      'darken',
      'lighten',
      'color-dodge',
      'color-burn',
      'soft-light',
      'difference',
      'exclusion',
      'hue',
      'saturation',
      'color',
      'luminosity'
    ]);

    return this;
  }

  public drawText() {
    const { context } = this;

    context.save();

    context.shadowColor = 'rgba(100, 100, 150, 0.8)';
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;

    context.font = '180px Palatino';
    context.fillStyle = 'cornflowerblue';

    const text = 'HTML5 Canvas';
    const textInfo = context.measureText(text);
    context.fillText(text, this.centerX - textInfo.width / 2, this.centerY);

    context.strokeStyle = 'yellow';
    context.strokeText(text, this.centerX - textInfo.width / 2, this.centerY);

    context.restore();

    return this;
  }

  public drawCover(e: MouseEvent) {
    const { context, config } = this;

    const loc = this.coordinateTransformation(e.clientX, e.clientY);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    this.drawGrid().drawText();

    context.save();

    context.globalAlpha = config.globalAlpha;
    context.globalCompositeOperation = config.compositeMode;
    context.beginPath();
    context.arc(loc.x, loc.y, 100, 0, Math.PI * 2, false);
    context.fillStyle = this.rgbaFormArr(config.coverColor);
    context.stroke();
    context.fill();

    context.restore();
  }

  public listenEvents() {
    const { canvas } = this;

    canvas.addEventListener('mousemove', e => this.drawCover(e));

    return this;
  }
}
