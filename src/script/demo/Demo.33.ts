import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';

enum ShapeStyle {
  Linellae = 'linellae',
  Circle = 'circle',
}

/**
 * @description 线条波浪抖动
 */
export class Demo extends BaseDemo {
  public override name: string = '线条摆动';

  public K: number = 2;
  public F: number = 1;
  public MAX = this.height / 2;

  public phase: number = 0.1;

  public config = {
    noise: 20,
    speed: 0.2,
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public override draw() {
    return this.clearScreen().drawGrid().drawScene();
  }

  public override clearScreen() {
    const { context } = this;

    context.globalCompositeOperation = 'destination-out';
    context.clearRect(0, 0, this.width, this.height);
    context.globalCompositeOperation = 'source-over';

    return this;
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'noise').min(1).max(500).step(1);

    gui.add(config, 'speed').min(0.01).max(0.5).step(0.01);

    return this;
  }

  public globalAttenuationFn(x: number) {
    return Math.pow((this.K * 4) / (this.K * 4 + Math.pow(x, 4)), this.K * 2);
  }

  public drawLine(attenuation: number, color: string, width: number = 1) {
    const { context, config } = this;

    context.moveTo(0, 0);
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = width;
    for (let i = -this.K; i <= this.K; i += 0.01) {
      const x = this.width * ((i + this.K) / (this.K * 2));
      const y =
        this.height / 2 +
        config.noise * this.globalAttenuationFn(i) * (1 / attenuation) * Math.sin(this.F * i - this.phase);

      // console.log(x, y);
      context.lineTo(x, y);
    }

    context.stroke();
    return this;
  }

  public drawScene() {
    const { config } = this;

    this.phase = (this.phase + config.speed) % (Math.PI * 64);

    this.drawLine(-2, 'rgba(0,0,255,0.1)')
      .drawLine(-6, 'rgba(0,0,255,0.2)')
      .drawLine(4, 'rgba(0,0,255,0.4)')
      .drawLine(2, 'rgba(0,0,255,0.6)')
      .drawLine(1, 'rgba(0,0,255,1)', 1.5);

    return this;
  }
}
