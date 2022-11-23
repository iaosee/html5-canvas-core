import { Point } from './Point';
import { Shape } from './Shape';

export class RegularPolygon extends Shape {
  private dpr = window.devicePixelRatio || 1;
  public constructor(
    public context: CanvasRenderingContext2D,
    public position: Point,
    public radius: number,
    public sides: number,
    public startAngle: number,
    public fillStyle: string,
    public strokeStyle: string,
    public filled: boolean
  ) {
    super({
      x: position.x,
      y: position.y,
      fillStyle,
      strokeStyle,
    });
  }

  public getPoints(): Point[] {
    const points = [];
    let angle = this.startAngle || 0;

    for (let i = 0; i < this.sides; ++i) {
      points.push(new Point(this.x + this.radius * Math.sin(angle), this.y - this.radius * Math.cos(angle)));
      angle += (2 * Math.PI) / this.sides;
    }

    return points;
  }

  public createPath() {
    const { context } = this;

    const points = this.getPoints();
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < this.sides; ++i) {
      context.lineTo(points[i].x, points[i].y);
    }
    context.closePath();
  }

  public stroke(strokeStyle?: string) {
    const { context } = this;
    context.save();
    this.createPath();
    context.strokeStyle = strokeStyle || this.strokeStyle;
    context.stroke();
    context.restore();
  }

  public fill(fillStyle?: string) {
    const { context } = this;

    if (!this.filled) {
      return;
    }

    context.save();
    this.createPath();
    context.fillStyle = fillStyle || this.fillStyle;
    context.fill();
    context.restore();
  }

  public on<K extends keyof CanvasEventMap>(
    eventType: K,
    listener: (this: RegularPolygon, ev: CanvasEventMap[K]) => any
  ): void {
    const { context, dpr } = this;
    context.canvas.addEventListener(eventType, (event: MouseEvent) => {
      this.createPath();
      if (context.isPointInPath(event.clientX * dpr, event.clientY * dpr)) {
        listener.call(this, event);
      }
    });
  }

  public pointInPath(p: Point) {
    const { context } = this;
    this.createPath();
    return context.isPointInPath(p.x, p.y);
  }
}

export interface CanvasEventMap {
  click: MouseEvent;
  dblclick: MouseEvent;
  mousedown: MouseEvent;
  mousemove: MouseEvent;
  mouseover: MouseEvent;
  mouseup: MouseEvent;
  mouseout: MouseEvent;
  mouseenter: MouseEvent;
  mouseleave: MouseEvent;
}
