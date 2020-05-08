import * as dat from 'dat.gui';
import { BaseDemo } from './BaseDemo';

enum ShapeStyle {
  Linellae = 'linellae',
  Circle = 'circle'
}

/**
 * @description 鼠标跟随，带拖尾效果
 */
export class Demo extends BaseDemo {
  public K: number = 2;
  public F: number = 6;
  public noise: number = 0.05;
  public speed: number = 0.2;
  public phase: number = 0.1;

  public config = {
    noise: 0.05,
    speed: 0.2,
    phase: 0.1
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    return this.clearScreen()
      .drawGrid()
      .drawScene();
  }

  public clearScreen() {
    const { canvas, context } = this;

    context.globalCompositeOperation = 'destination-out';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = 'source-over';

    return this;
  }

  private createControl() {
    const { config } = this;
    const gui = new dat.GUI();

    gui
      .add(config, 'noise')
      .min(0.01)
      .max(1.0)
      .step(0.01);

    gui
      .add(config, 'speed')
      .min(0.1)
      .max(1.0)
      .step(0.1);

    return this;
  }

  public globalAttenuationFn(x: number) {
    return Math.pow((this.K * 4) / (this.K * 4 + Math.pow(x, 4)), this.K * 2);
  }

  public drawLine(attenuation: number, color: string, width: number = 1) {
    const { canvas, context } = this;

    context.moveTo(0, 0);
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = width;
    for (let i = -this.K; i <= this.K; i += 0.01) {
      const x = canvas.width * ((i + this.K) / (this.K * 2));
      const y =
        canvas.height / 2 +
        this.noise * this.globalAttenuationFn(i) * (1 / attenuation) * Math.sin(this.F * i - this.phase);
      context.lineTo(x, y);
    }

    context.stroke();
    return this;
  }

  public drawScene() {
    this.phase = (this.phase + this.speed) % (Math.PI * 64);

    this.drawLine(-2, 'rgba(0,0,255,0.1)')
      .drawLine(-6, 'rgba(0,0,255,0.2)')
      .drawLine(4, 'rgba(0,0,255,0.4)')
      .drawLine(2, 'rgba(0,0,255,0.6)')
      .drawLine(1, 'rgba(0,0,255,1)', 1.5);

    return this;
  }
}
