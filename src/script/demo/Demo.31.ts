import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';

/**
 * @description 实现波浪效果
 */
export class Demo extends BaseDemo {
  public override name: string = '波浪效果';
  public points: any[] = [];
  public config = {
    fluctuateRange: 10, // 波动幅度
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.createControl().createPoints();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public override draw() {
    return this.clearScreen().drawGrid().update().drawScene();
  }
  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'fluctuateRange').min(5).max(50).step(1);

    return this;
  }

  public createPoints() {
    const { points } = this;
    console.log(this.width);
    for (let i = 0; i < this.width; i++) {
      // 初始化点，角度（弧度）
      points.push({ x: i, y: this.height - 150, angle: (i * Math.PI) / 180 });
    }

    return this;
  }

  public update() {
    const { config, points } = this;

    points.forEach((p, i) => {
      // 每次递增 4 弧度
      // 计算新的 y 值，正弦值，
      p.angle += (Math.PI / 180) * 4;
      p.y = this.height - 150 + Math.sin(p.angle) * config.fluctuateRange;
    });

    return this;
  }

  public drawScene() {
    const { points, context, config } = this;

    context.strokeStyle = 'rgba(0, 170, 255, 0.8)';
    context.fillStyle = 'rgba(0, 170, 255, 0.8)';
    context.beginPath();
    points.forEach((p, i) => (i === 0 ? context.moveTo(p.x, p.y) : context.lineTo(p.x, p.y)));
    context.lineTo(this.width, this.height);
    context.lineTo(0, this.height);
    context.closePath();
    context.stroke();
    context.fill();

    const height = this.height - 200;
    // this.drawWave(height + 10, -2, 5, 'rgba(0, 170, 255, 0.2)');
    // this.drawWave(height + 20, 4, 10, 'rgba(0, 170, 255, 0.4)');
    // this.drawWave(height + 30, 8, 15, 'rgba(0, 170, 255, 0.2)');

    return this;
  }

  public drawWave(y: number, space: number = 0, fluctuate: number = 10, color: string) {
    const { context, points, config } = this;
    context.save();

    context.strokeStyle = color;
    context.fillStyle = color;
    context.beginPath();
    points.forEach((p, i) => {
      p.angle += (Math.PI / 180) * space;
      p.y = y + Math.sin(p.angle) * fluctuate;

      i === 0 ? context.moveTo(p.x, p.y) : context.lineTo(p.x, p.y);
    });
    context.lineTo(this.width, this.height - 50);
    context.lineTo(0, this.height - 50);
    context.fill();
    context.stroke();
    context.restore();

    return this;
  }
}
