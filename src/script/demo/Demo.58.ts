import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { Colorable, Point, Velocity } from '../interfaces';

/**
 * @description 绘制练习 —— 绘制动态三角网格
 * @reference https://generativeartistry.com/tutorials/triangular-mesh/
 */
export class Demo extends BaseDemo {
  public name: string = '绘制动态三角网格';

  public pointOfLine: MeshPoint[][] = [];
  public triangleOfLine: MeshPoint[][] = [];

  public config = {
    animation: true,
    drawBoundary: false,
    count: 10,
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    this.createControl().initDotLine().initTriangleLine();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'animation');
    gui.add(config, 'drawBoundary');
    gui
      .add(config, 'count')
      .min(5)
      .max(30)
      .onFinishChange((value: string) => {
        this.pointOfLine = [];
        this.triangleOfLine = [];
        this.initDotLine().initTriangleLine();
      });

    return this;
  }

  public draw(timestamp: number) {
    // const now = +new Date();
    // console.log(timestamp);

    return this.clearScreen().drawGrid().updatePosition().drawScene(timestamp);
  }

  public initDotLine() {
    const { context, config } = this;
    const width = this.width;
    const height = this.height;
    const gap = height / config.count;
    let odd = false;

    for (let y = gap / 2; y <= height; y += gap) {
      const line: MeshPoint[] = [];
      odd = !odd;
      for (let x = gap / 2; x <= width - 50; x += gap) {
        const boundary = {
          left: x + (odd ? gap / 2 : 0) - gap / 2,
          top: y - gap / 2,
          right: x + (odd ? gap / 2 : 0) + gap / 2,
          bottom: y + gap / 2,
        };
        const point1: MeshPoint = {
          x: x + (odd ? gap / 2 : 0),
          y: y,
          boundary,
          velocityX: Math.random() * 0.8 - 0.4,
          velocityY: Math.random() * 0.8 - 0.4,
        };
        const point2: MeshPoint = {
          boundary,
          x: x + (odd ? gap / 2 : 0) + (Math.random() * 0.8 - 0.4) * gap,
          y: y + (Math.random() * 0.8 - 0.4) * gap,
          velocityX: Math.random() * 0.8 - 0.4,
          velocityY: Math.random() * 0.8 - 0.4,
        };
        const point = point2;
        line.push(point);
      }
      this.pointOfLine.push(line);
    }

    return this;
  }

  public initTriangleLine() {
    const { context, pointOfLine } = this;
    let odd = true;

    for (let y = 0; y < pointOfLine.length - 1; y++) {
      odd = !odd;
      const dotLine = [];
      for (let i = 0; i < pointOfLine[y].length; i++) {
        const p1 = odd ? pointOfLine[y][i] : pointOfLine[y + 1][i];
        const p2 = odd ? pointOfLine[y + 1][i] : pointOfLine[y][i];
        p1.color = this.randomRgba();
        p2.color = this.randomRgba();
        dotLine.push(p1, p2);
      }
      this.triangleOfLine.push(dotLine);
    }

    return this;
  }

  public drawScene(timestamp?: number) {
    this.triangleOfLine.map((dotLine) => {
      for (let i = 0; i < dotLine.length - 2; i++) {
        this.drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
      }
    });

    return this;
  }

  public updatePosition() {
    const { config, context, pointOfLine } = this;

    if (!config.animation) {
      return this;
    }

    for (let i = 0; i < pointOfLine.length; i++) {
      for (let j = 0; j < pointOfLine[i].length; j++) {
        const point = pointOfLine[i][j];
        if (point.x + point.velocityX > point.boundary.right || point.x + point.velocityX < point.boundary.left) {
          point.velocityX = -point.velocityX;
        }
        if (point.y + point.velocityY > point.boundary.bottom || point.y + point.velocityY < point.boundary.top) {
          point.velocityY = -point.velocityY;
        }

        point.x += point.velocityX;
        point.y += point.velocityY;

        if (!config.drawBoundary) {
          continue;
        }
        context.save();
        context.beginPath();
        context.strokeStyle = 'rgba(255,0,0,0.6)';
        context.moveTo(point.boundary.left, point.boundary.top);
        context.lineTo(point.boundary.left, point.boundary.bottom);
        context.lineTo(point.boundary.right, point.boundary.bottom);
        context.lineTo(point.boundary.right, point.boundary.top);
        context.lineTo(point.boundary.left, point.boundary.top);
        context.stroke();
        context.closePath();
        context.restore();
      }
    }

    return this;
  }

  public drawTriangle(p1: MeshPoint, p2: MeshPoint, p3: MeshPoint, color?: string) {
    const { context, config } = this;

    context.save();
    context.fillStyle = color || p3.color;
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.lineTo(p1.x, p1.y);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();

    return this;
  }
}

interface MeshPoint extends Colorable, Point, Velocity {
  boundary: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
}
