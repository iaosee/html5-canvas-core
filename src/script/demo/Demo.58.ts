import * as dat from 'dat.gui';
import { Point, Velocity } from '../interfaces';
import { Random } from '../tools/Random';
import { BaseDemo } from '../base/BaseDemo';
import { Color } from 'script/tools/Color';

/**
 * @description 绘制练习 —— 绘制三角网格
 * @reference https://generativeartistry.com/tutorials/triangular-mesh/
 */
export class Demo extends BaseDemo {
  public name: string = '绘制三角网格';

  public pointOfLine: MeshPoint[][] = [];
  private random: Random = Random.init(-5, 5);

  public config = {
    animation: false,
    drawBoundary: false
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl()
      .initDotLine()
      .drawGrid()
      .drawScene();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  private createControl() {
    const { config } = this;
    this.gui = new dat.GUI();
    const { gui } = this;

    gui.add(config, 'animation');
    gui.add(config, 'drawBoundary');

    return this;
  }

  public draw(timestamp: number) {
    // const now = +new Date();
    // console.log(timestamp);

    return this.clearScreen()
      .drawGrid()
      .updatePosition()
      .drawScene(timestamp);
  }

  public initDotLine() {
    const { canvas, context, config } = this;
    const width = canvas.width;
    const height = canvas.height;
    const gap = height / 8;
    let odd = false;

    for (let y = gap / 2; y <= height; y += gap) {
      const line: MeshPoint[] = [];
      odd = !odd;
      for (let x = gap / 2; x <= width; x += gap) {
        const boundary = {
          left: x + (odd ? gap / 2 : 0) - gap / 2,
          top: y - gap / 2,
          right: x + (odd ? gap / 2 : 0) + gap / 2,
          bottom: y + gap / 2
        };
        const point1: MeshPoint = {
          x: x + (odd ? gap / 2 : 0),
          y: y,
          boundary,
          velocityX: Math.random() * 0.8 - 0.4,
          velocityY: Math.random() * 0.8 - 0.4
        };
        const point2: MeshPoint = {
          boundary,
          x: x + (odd ? gap / 2 : 0) + (Math.random() * 0.8 - 0.4) * gap,
          y: y + (Math.random() * 0.8 - 0.4) * gap,
          velocityX: Math.random() * 0.8 - 0.4,
          velocityY: Math.random() * 0.8 - 0.4
        };
        const point = point2;
        line.push(point);
      }
      this.pointOfLine.push(line);
    }

    return this;
  }

  public drawScene(timestamp?: number) {
    const { canvas, context, pointOfLine } = this;
    let odd = true;

    for (let y = 0; y < pointOfLine.length - 1; y++) {
      odd = !odd;
      const dotLine = [];
      for (let i = 0; i < pointOfLine[y].length; i++) {
        dotLine.push(odd ? pointOfLine[y][i] : pointOfLine[y + 1][i]);
        dotLine.push(odd ? pointOfLine[y + 1][i] : pointOfLine[y][i]);
      }
      for (let i = 0; i < dotLine.length - 2; i++) {
        this.drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
      }
    }

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

  public drawTriangle(p1: Point, p2: Point, p3: Point, color: string = this.randomRgba()) {
    const { canvas, context, config } = this;

    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.lineTo(p1.x, p1.y);
    context.closePath();
    context.stroke();
    // context.fill();
    context.restore();

    return this;
  }
}

interface MeshPoint extends Point, Velocity {
  boundary: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
}
