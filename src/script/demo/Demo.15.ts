import { BaseDemo } from '../base/BaseDemo';

/**
 * @description 坐标轴
 */
export class Demo extends BaseDemo {
  public name: string = '坐标轴';
  public config = {
    AXIS_COLOR: 'blue',
    AXIS_LINEWIDTH: 1.0,
    TICK_WIDTH: 5,
    TICK_SPACING: 10,
    TICKS_COLOR: 'navy',
    TICKS_LINEWIDTH: 0.5,
    AXIS_ORIGIN: {
      x: 100,
      y: this.height - 100
    },
    AXIS_TOP: 100,
    AXIS_RIGHT: this.width - 100,
    AXIS_WIDTH: this.width - 100 - 100,
    AXIS_HEIGHT: this.height - 100 - 100
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.drawGrid().drawCoordinateAxis();
  }

  public draw() {
    return this;
  }

  public drawCoordinateAxis() {
    const { context, config } = this;

    context.save();
    context.lineWidth = config.AXIS_LINEWIDTH;
    context.fillStyle = context.strokeStyle = config.AXIS_COLOR;

    this.drawHorizontalAxis().drawVerticalAxis();

    context.lineWidth = config.TICKS_LINEWIDTH;
    context.fillStyle = context.strokeStyle = config.TICKS_COLOR;

    this.drawHorizontalTicks().drawVerticalTicks();

    context.lineWidth = config.TICKS_LINEWIDTH;
    context.fillStyle = context.strokeStyle = config.TICKS_COLOR;

    this.drawHorizontalLabels().drawVerticalLabels();

    context.restore();
    return this;
  }

  public drawHorizontalAxis() {
    const { context, config } = this;

    context.beginPath();
    context.moveTo(config.AXIS_ORIGIN.x, config.AXIS_ORIGIN.y);
    context.lineTo(config.AXIS_RIGHT, config.AXIS_ORIGIN.y);
    context.stroke();

    context.moveTo(config.AXIS_RIGHT + 10, config.AXIS_ORIGIN.y);
    context.lineTo(config.AXIS_RIGHT, config.AXIS_ORIGIN.y + 5);
    context.lineTo(config.AXIS_RIGHT, config.AXIS_ORIGIN.y - 5);
    context.closePath();
    context.fill();

    return this;
  }

  public drawVerticalAxis() {
    const { context, config } = this;

    context.beginPath();
    context.moveTo(config.AXIS_ORIGIN.x, config.AXIS_ORIGIN.y);
    context.lineTo(config.AXIS_ORIGIN.x, config.AXIS_TOP);
    context.stroke();

    context.moveTo(config.AXIS_ORIGIN.x, config.AXIS_TOP - 10);
    context.lineTo(config.AXIS_ORIGIN.x + 5, config.AXIS_TOP);
    context.lineTo(config.AXIS_ORIGIN.x - 5, config.AXIS_TOP);
    context.closePath();
    context.fill();

    return this;
  }

  public drawHorizontalTicks() {
    const { context, config } = this;

    for (let i = 1; i < config.AXIS_WIDTH / config.TICK_SPACING; i++) {
      context.beginPath();
      const delta = i % 5 === 0 ? config.TICK_WIDTH : config.TICK_WIDTH / 2;
      context.moveTo(config.AXIS_ORIGIN.x + i * config.TICK_SPACING, config.AXIS_ORIGIN.y - delta);
      context.lineTo(config.AXIS_ORIGIN.x + i * config.TICK_SPACING, config.AXIS_ORIGIN.y + delta);
      context.stroke();
    }

    return this;
  }

  public drawVerticalTicks() {
    const { context, config } = this;

    for (let i = 1; i < config.AXIS_HEIGHT / config.TICK_SPACING; i++) {
      context.beginPath();
      const delta = i % 5 === 0 ? config.TICK_WIDTH : config.TICK_WIDTH / 2;
      context.moveTo(config.AXIS_ORIGIN.x - delta, config.AXIS_ORIGIN.y - i * config.TICK_SPACING);
      context.lineTo(config.AXIS_ORIGIN.x + delta, config.AXIS_ORIGIN.y - i * config.TICK_SPACING);
      context.stroke();
    }

    return this;
  }

  public drawHorizontalLabels() {
    const { context, config } = this;
    context.textAlign = 'center';
    context.textBaseline = 'top';

    for (let i = 0; i <= config.AXIS_WIDTH / config.TICK_SPACING; i++) {
      context.beginPath();
      if (i % 5 === 0) {
        context.fillText(i.toString(), config.AXIS_ORIGIN.x + i * config.TICK_SPACING, config.AXIS_ORIGIN.y + 20);
      }
    }

    return this;
  }

  public drawVerticalLabels() {
    const { context, config } = this;
    context.textAlign = 'right';
    context.textBaseline = 'middle';

    for (let i = 0; i <= config.AXIS_HEIGHT / config.TICK_SPACING; i++) {
      context.beginPath();
      if (i % 5 === 0) {
        context.fillText(i.toString(), config.AXIS_ORIGIN.x - 20, config.AXIS_ORIGIN.y - i * config.TICK_SPACING);
      }
    }

    return this;
  }
}
