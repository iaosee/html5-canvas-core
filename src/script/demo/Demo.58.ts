import * as dat from 'dat.gui';
import { Point } from '../interfaces';
import { BaseDemo } from '../base/BaseDemo';

/**
 * @description 绘制练习 —— 绘制三角网格
 * @reference https://generativeartistry.com/tutorials/triangular-mesh/
 */
export class Demo extends BaseDemo {
  public name: string = '绘制三角网格';

  public pointOfLine: Point[][] = [];

  public config = {
    animation: false
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl()
      .initDotLine()
      .drawScene();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  private createControl() {
    const { config } = this;
    this.gui = new dat.GUI();
    const { gui } = this;

    gui.add(config, 'animation').onFinishChange(value => {
      console.log(value);
    });

    return this;
  }

  public start() {
    return this;
  }

  public draw(timestamp: number) {
    // const now = +new Date();
    // console.log(timestamp);

    return this.clearScreen()
      .drawGrid()
      .drawScene(timestamp);
  }

  public initDotLine() {
    const { canvas, context, config } = this;
    const width = canvas.width;
    const height = canvas.height;
    const gap = height / 8;
    let odd = false;

    for (let y = gap / 2; y <= height; y += gap) {
      const line: Point[] = [];
      odd = !odd;
      for (let x = gap / 2; x <= width; x += gap) {
        // const point: Point = {
        //   x: x + (odd ? gap / 2 : 0),
        //   y: y
        // };
        const point: Point = {
          x: x + (Math.random() * 0.8 - 0.4) * gap + (odd ? gap / 2 : 0),
          y: y + (Math.random() * 0.8 - 0.4) * gap
        };
        line.push(point);

        // context.fillStyle = 'rgba(255, 0, 255, 0.8)';
        // context.beginPath();
        // context.arc(point.x, point.y, 5, 0, 2 * Math.PI, true);
        // context.fill();
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

  public drawTriangle(p1: Point, p2: Point, p3: Point) {
    const { canvas, context, config } = this;

    context.save();
    context.fillStyle = this.randomRgba();
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
