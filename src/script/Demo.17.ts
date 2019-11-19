import { BaseDemo } from './BaseDemo';
import { Point } from './declare';

const moveToFucntion = CanvasRenderingContext2D.prototype.moveTo;

CanvasRenderingContext2D.prototype.moveTo = function(x, y) {
  moveToFucntion.apply(this, [x, y]);
  this.lastMoveToLocation.x = x;
  this.lastMoveToLocation.y = y;
};

Object.defineProperty(CanvasRenderingContext2D.prototype, 'lastMoveToLocation', {
  configurable: true,
  enumerable: true,
  value: {},
  writable: true
});

Object.defineProperty(CanvasRenderingContext2D.prototype, 'dashedLineTo', {
  configurable: true,
  enumerable: true,
  value: function(x: number, y: number, dashLength: number = 5) {
    const startX = this.lastMoveToLocation.x;
    const startY = this.lastMoveToLocation.y;
    const deltaX = x - startX;
    const deltaY = y - startY;
    const numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

    for (let i = 0; i < numDashes; i++) {
      const px = startX + (deltaX / numDashes) * i;
      const py = startY + (deltaY / numDashes) * i;
      i % 2 === 0 ? this.moveTo(px, py) : this.lineTo(px, py);
    }

    this.moveTo(x, y);
  },
  writable: false
});

/**
 * @description 绘制虚线
 */
export class Demo extends BaseDemo {
  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    const { canvas, context } = this;

    context.beginPath();
    context.strokeStyle = this.randomRgba();
    this.drawDashLine(
      {
        x: 0,
        y: 0
      },
      {
        x: canvas.width,
        y: canvas.height
      }
    );
    context.closePath();

    context.beginPath();
    context.strokeStyle = this.randomRgba();
    this.drawDashLine(
      {
        x: 0,
        y: canvas.height
      },
      {
        x: canvas.width,
        y: 0
      }
    );
    context.closePath();

    return this;
  }

  public drawDashLine(start: Point, end: Point, dashLength: number = 5, space: number = 5) {
    const { context } = this;
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

    for (let i = 0; i < numDashes; i++) {
      const x = start.x + (deltaX / numDashes) * i;
      const y = start.y + (deltaY / numDashes) * i;
      // console.log(x, y);
      i % 2 === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
    }

    context.stroke();

    return this;
  }
}
