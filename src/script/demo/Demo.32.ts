import * as dat from 'dat.gui';
import { BaseDemo } from '../base/BaseDemo';
import { Point } from '../geometry/Point';

enum ShapeStyle {
  Linellae = 'linellae',
  Circle = 'circle'
}

enum BackgroundColor {
  Light = 'light',
  Dark = 'dark'
}

/**
 * @description 星星，围绕鼠标转圈，鼠标跟随，带拖尾效果
 */
export class Demo extends BaseDemo {
  public stars: Star[] = [];
  public mousePos: Point = new Point(this.centerX, this.canvas.height);
  public config = {
    pointQuantity: 500,
    isFill: false,
    maxRangeRadius: 800,
    maxStarRadius: 5,
    shapeStyle: ShapeStyle.Linellae,
    backgroundColor: BackgroundColor.Dark
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl()
      .generatePoint()
      .listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public clearScreen() {
    const { context, canvas, config } = this;
    context.globalAlpha = 0.8;
    context.fillStyle =
      config.backgroundColor === BackgroundColor.Dark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    return this;
  }

  public draw() {
    return this.clearScreen().drawScene();
  }

  private createControl() {
    const { config } = this;
    this.gui = new dat.GUI();
    const { gui } = this;

    gui
      .add(config, 'pointQuantity')
      .min(10)
      .max(5000)
      .step(10)
      .onChange(() => this.resetScene());
    gui
      .add(config, 'maxStarRadius')
      .min(1)
      .max(50)
      .step(1)
      .onChange(() => this.resetScene());
    gui
      .add(config, 'maxRangeRadius')
      .min(100)
      .max(1200)
      .step(10)
      .onChange(() => this.resetScene());

    gui.add(config, 'shapeStyle', {
      linellae: ShapeStyle.Linellae,
      circle: ShapeStyle.Circle
    });
    gui.add(config, 'backgroundColor', {
      light: BackgroundColor.Light,
      dark: BackgroundColor.Dark
    });
    gui.add(config, 'isFill');

    return this;
  }

  public resetScene() {
    this.stars.length = 0;
    this.generatePoint();
    return this;
  }

  public generatePoint() {
    const { config, mousePos } = this;

    for (let i = 0; i < config.pointQuantity; i++) {
      this.stars.push(
        new Star(
          new Point(mousePos.x, mousePos.y),
          Math.random() * config.maxStarRadius,
          this.randomRgba(),
          Math.random() / 100 + 0.001,
          Math.random() * config.maxRangeRadius + 10
        )
      );
    }

    return this;
  }

  public drawScene() {
    const { stars } = this;
    stars.forEach(star => star.draw(this));
    return this;
  }

  protected listenEvents() {
    const { canvas } = this;

    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      this.mousePos = this.coordinateTransformation(e.clientX, e.clientY);
    });

    return this;
  }
}

class Star {
  public theta = Math.random() * Math.PI * 2;

  public constructor(
    public position: Point,
    public radius: number,
    public color: string,
    public speed: number = 0.01,
    public maxRangeRadius: number = Math.random() * 500 + 10
  ) {}

  public set x(v: number) {
    this.position.x = v;
  }

  public get x() {
    return this.position.x;
  }

  public set y(v: number) {
    this.position.y = v;
  }

  public get y() {
    return this.position.y;
  }

  public draw(demo: Demo) {
    const { context, mousePos, config } = demo;
    const old = { x: this.x, y: this.y };
    this.theta += this.speed;
    this.x = mousePos.x + Math.cos(this.theta) * this.maxRangeRadius;
    this.y = mousePos.y + Math.sin(this.theta) * this.maxRangeRadius;

    context.beginPath();
    context.lineCap = 'round';
    context.strokeStyle = this.color;

    if (config.shapeStyle === ShapeStyle.Linellae) {
      context.lineWidth = this.radius;
      context.moveTo(old.x, old.y);
      context.lineTo(this.x, this.y);
      context.stroke();
    } else if (config.shapeStyle === ShapeStyle.Circle) {
      context.lineWidth = 1;
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.stroke();
      config.isFill && context.fill();
    }
    context.closePath();
  }
}
