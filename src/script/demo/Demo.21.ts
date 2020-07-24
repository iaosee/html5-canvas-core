import { Point } from '../interfaces';
import { BaseDemo } from '../base/BaseDemo';

/**
 * @description 仪表盘
 */
export class Demo extends BaseDemo {
  public name: string = '绘制仪表盘';
  public config = {
    circle: {
      radius: 250,
      x: this.centerX,
      y: this.centerY
    },
    CENTROID_RADIUS: 10,
    CENTROID_STROKE_STYLE: 'rgba(0, 0, 0, 0.5)',
    CENTROID_FILL_STYLE: 'rgba(80, 190, 240, 0.6)',

    RING_INNER_RADIUS: 35,
    RING_OUTER_RADIUS: 55,

    ANNOTATIONS_FILL_STYLE: 'rgba(0, 0, 230, 0.9)',
    ANNOTATIONS_TEXT_SIZE: 12,

    TICK_WIDTH: 10,
    TICK_LONG_STROKE_STYLE: 'rgba(100, 140, 230, 0.9)',
    TICK_SHORT_STROKE_STYLE: 'rgba(100, 140, 230, 0.7)',

    TRACKING_DIAL_STROKING_STYLE: 'rgba(100, 140, 230, 0.5)',

    GUIDEWIRE_STROKE_STYLE: 'goldenrod',
    GUIDEWIRE_FILL_STYLE: 'rgba(250, 250, 0, 0.6)',
    pointer: Math.PI / 2
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this.clearScreen()
      .drawGrid()
      .draw();
  }

  public draw() {
    const { context } = this;

    // Initialization
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowBlur = 4;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    return this.drawDial();
  }

  public drawDial() {
    const { config } = this;
    const pos = {
      x: config.circle.x,
      y: config.circle.y
    };

    return this.drawCentroid()
      .drawCentroidGuidewire(pos)
      .drawRing()
      .drawTickInnerCircle()
      .drawTicks()
      .drawAnnotations();
  }

  public drawCentroid() {
    const { context, config } = this;

    context.beginPath();
    context.save();
    context.strokeStyle = config.CENTROID_STROKE_STYLE;
    context.fillStyle = config.CENTROID_FILL_STYLE;
    context.arc(config.circle.x, config.circle.y, config.CENTROID_RADIUS, 0, Math.PI * 2, false);
    context.stroke();
    context.fill();
    context.restore();

    return this;
  }

  public drawCentroidGuidewire(position: Point) {
    const { context, config } = this;
    let radius;
    let endpt;
    const angle = config.pointer;

    radius = config.circle.radius + config.RING_OUTER_RADIUS;

    endpt =
      position.x >= config.circle.x
        ? {
            x: config.circle.x + radius * Math.cos(angle),
            y: config.circle.y + radius * Math.sin(angle)
          }
        : {
            x: config.circle.x - radius * Math.cos(angle),
            y: config.circle.y - radius * Math.sin(angle)
          };

    context.save();

    context.strokeStyle = config.GUIDEWIRE_STROKE_STYLE;
    context.fillStyle = config.GUIDEWIRE_FILL_STYLE;

    context.beginPath();
    context.moveTo(config.circle.x, config.circle.y);
    context.lineTo(endpt.x, endpt.y);
    context.stroke();

    context.beginPath();
    context.strokeStyle = config.TICK_LONG_STROKE_STYLE;
    context.arc(endpt.x, endpt.y, 5, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();

    context.restore();

    return this;
  }

  public drawRing() {
    const { context, config } = this;

    this.drawRingOuterCircle();

    context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    context.arc(
      config.circle.x,
      config.circle.y,
      config.circle.radius + config.RING_INNER_RADIUS,
      0,
      Math.PI * 2,
      false
    );

    context.fillStyle = 'rgba(100, 140, 230, 0.1)';
    context.fill();
    context.stroke();
    return this;
  }

  public drawTickInnerCircle() {
    const { context, config } = this;
    context.save();
    context.beginPath();
    context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    context.arc(
      config.circle.x,
      config.circle.y,
      config.circle.radius + config.RING_INNER_RADIUS - config.TICK_WIDTH,
      0,
      Math.PI * 2,
      false
    );
    context.stroke();
    context.restore();
    return this;
  }

  public drawTicks() {
    const { context, config } = this;
    const radius = config.circle.radius + config.RING_INNER_RADIUS;
    const radian_max = 2 * Math.PI;
    const radian_delta = Math.PI / 64;

    context.save();

    for (let radian = 0, cnt = 0; radian < radian_max; radian += radian_delta, cnt++) {
      this.drawTick(radian, radius, cnt++);
    }

    context.restore();

    return this;
  }

  public drawTick(radian: number, radius: number, cnt: number) {
    const { context, config } = this;
    const tickWidth = cnt % 4 === 0 ? config.TICK_WIDTH : config.TICK_WIDTH / 2;

    context.beginPath();
    context.moveTo(
      config.circle.x + Math.cos(radian) * (radius - tickWidth),
      config.circle.y + Math.sin(radian) * (radius - tickWidth)
    );
    context.lineTo(config.circle.x + Math.cos(radian) * radius, config.circle.y + Math.sin(radian) * radius);
    context.strokeStyle = config.TICK_SHORT_STROKE_STYLE;
    context.stroke();

    return this;
  }

  public drawAnnotations() {
    const { context, config } = this;
    const radius = config.circle.radius + config.RING_INNER_RADIUS;

    context.save();
    context.fillStyle = config.ANNOTATIONS_FILL_STYLE;
    context.font = config.ANNOTATIONS_TEXT_SIZE + 'px Helvetica';

    for (let radian = 0; radian < 2 * Math.PI; radian += Math.PI / 8) {
      context.beginPath();
      context.fillText(
        ((radian * 180) / Math.PI).toFixed(0),
        config.circle.x + Math.cos(radian) * (radius - config.TICK_WIDTH * 2),
        config.circle.y - Math.sin(radian) * (radius - config.TICK_WIDTH * 2)
      );
    }
    context.restore();
    return this;
  }

  public drawRingOuterCircle() {
    const { context, config } = this;

    context.shadowColor = 'rgba(0, 0, 0, 0.7)';
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowBlur = 6;
    context.strokeStyle = config.TRACKING_DIAL_STROKING_STYLE;
    context.beginPath();
    context.arc(
      config.circle.x,
      config.circle.y,
      config.circle.radius + config.RING_OUTER_RADIUS,
      0,
      Math.PI * 2,
      true
    );
    context.stroke();
    return this;
  }
}
