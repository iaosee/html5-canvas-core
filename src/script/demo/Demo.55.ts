import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { Sprite, IBehavior, IPainter } from '../sprite/Sprite';

/**
 * @description 物理效果 —— 钟摆运动
 */
export class Demo extends BaseDemo {
  public override name: string = '钟摆运动';

  public pendulum: PendulumSprite;
  public startTime: number = 0;

  public config = {
    PIVOT_Y: 50,
    PIVOT_RADIUS: 7,
    WEIGHT_RADIUS: 25,
    INITIAL_ANGLE: Math.PI / 4,
    ROD_LENGTH_IN_PIXELS: 300,
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.createControl().initSprite();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui
      .add(config, 'PIVOT_Y')
      .min(50)
      .max(this.height - 300)
      .step(10)
      .onFinishChange(() => this.resetSpriteStatus());
    gui
      .add(config, 'WEIGHT_RADIUS')
      .min(10)
      .max(100)
      .step(10)
      .onFinishChange(() => this.resetSpriteStatus());
    gui
      .add(config, 'ROD_LENGTH_IN_PIXELS')
      .min(10)
      .max(1000)
      .step(10)
      .onFinishChange(() => this.resetSpriteStatus());

    return this;
  }

  public override draw(timestamp: number) {
    // const now = +new Date();

    return this.clearScreen().drawGrid().drawScene(timestamp);
  }

  public initSprite() {
    const { context, config } = this;

    // this.pendulum = new Sprite('pendulum', new PendulumPainter(), [ new SwingBehavior() ]);
    this.pendulum = new PendulumSprite();
    this.resetSpriteStatus();

    context.lineWidth = 0.5;
    context.strokeStyle = 'rgba(0,0,0,0.5)';
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowBlur = 4;

    return this;
  }

  public drawScene(timestamp: number) {
    const { context, pendulum } = this;

    pendulum.update(context, timestamp);
    pendulum.paint(context);

    return this;
  }

  public resetSpriteStatus() {
    const { config, pendulum } = this;

    this.pendulum.x = this.width / 2;
    this.pendulum.y = config.PIVOT_Y;
    this.pendulum.weightRadius = config.WEIGHT_RADIUS;
    this.pendulum.pivotRadius = config.PIVOT_RADIUS;
    this.pendulum.initialAngle = config.INITIAL_ANGLE;
    this.pendulum.angle = config.INITIAL_ANGLE;
    this.pendulum.rodLength = config.ROD_LENGTH_IN_PIXELS;

    return this;
  }
}

export class PendulumSprite extends Sprite<PendulumPainter> {
  public angle: number = 0;
  public weightRadius: number = 0;
  public pivotRadius: number = 0;
  public initialAngle: number = 0;
  public rodLength: number = 0;
  public weightX: number = 0;
  public weightY: number = 0;

  public constructor(name: string = 'PendulumSprite') {
    super(name);
    this.painter = new PendulumPainter();
    this.addBehavior(new SwingBehavior());
  }
}

export class PendulumPainter implements IPainter {
  public PIVOT_FILL_STYLE = 'rgba(0,0,0,0.2)';
  public WEIGHT_SHADOW_COLOR = 'rgb(0,0,0)';
  public PIVOT_SHADOW_COLOR = 'rgb(255,255,0)';
  public STROKE_COLOR = 'rgb(100,100,195)';

  public constructor() {}

  public paint(pendulum: PendulumSprite, context: CanvasRenderingContext2D) {
    this.drawPivot(pendulum, context);
    this.drawRod(pendulum, context);
    this.drawWeight(pendulum, context);
  }

  /**
   * @description 顶端悬挂点
   */
  public drawPivot(pendulum: PendulumSprite, context: CanvasRenderingContext2D) {
    context.save();
    context.beginPath();
    context.shadowColor = undefined;
    context.shadowBlur = undefined;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fillStyle = 'white';
    context.arc(pendulum.x, pendulum.y, pendulum.pivotRadius / 2, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();

    context.beginPath();
    context.fillStyle = this.PIVOT_FILL_STYLE;
    context.arc(pendulum.x, pendulum.y, pendulum.pivotRadius, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
    context.restore();
  }

  /**
   * @description 悬挂线条
   */
  public drawRod(pendulum: PendulumSprite, context: CanvasRenderingContext2D) {
    context.beginPath();

    // 画连接先，只画到圆的边缘，分别用 正弦、余弦 求圆上坐标
    context.moveTo(
      pendulum.x, // + pendulum.pivotRadius + pendulum.pivotRadius * Math.sin(pendulum.angle),
      pendulum.y, // + pendulum.pivotRadius * Math.cos(pendulum.angle)
    );

    context.lineTo(
      pendulum.weightX, // - pendulum.weightRadius * Math.sin(pendulum.angle),
      pendulum.weightY, // - pendulum.weightRadius * Math.cos(pendulum.angle)
    );

    context.stroke();
  }

  /**
   * @description 底端悬挂物
   */
  public drawWeight(pendulum: PendulumSprite, context: CanvasRenderingContext2D) {
    context.save();
    context.beginPath();
    context.arc(pendulum.weightX, pendulum.weightY, pendulum.weightRadius, 0, Math.PI * 2, false);
    context.clip();

    context.shadowColor = this.WEIGHT_SHADOW_COLOR;
    context.shadowOffsetX = -4;
    context.shadowOffsetY = -4;
    context.shadowBlur = 8;

    context.lineWidth = 2;
    context.strokeStyle = this.STROKE_COLOR;
    context.stroke();

    context.beginPath();
    context.arc(pendulum.weightX, pendulum.weightY, pendulum.weightRadius / 2, 0, Math.PI * 2, false);
    context.clip();

    context.shadowColor = this.PIVOT_SHADOW_COLOR;
    context.shadowOffsetX = -4;
    context.shadowOffsetY = -4;
    context.shadowBlur = 8;
    context.stroke();

    context.restore();
  }
}

export class SwingBehavior implements IBehavior {
  public GRAVITY_FORCE: number = 32; //  32 ft/s/s,
  public ROD_LENGTH: number = 0.8; // 0.8 ft
  public startTime: number = 0;

  public constructor() {}

  public execute(pendulum: PendulumSprite, context: CanvasRenderingContext2D, time: number) {
    if (!this.startTime) {
      this.startTime = time;
    }

    const elapsedTime = (time - this.startTime) / 1000;
    // 计算摆动角度，新坐标， rodLength 为 摆动半径
    pendulum.angle = pendulum.initialAngle * Math.cos(Math.sqrt(this.GRAVITY_FORCE / this.ROD_LENGTH) * elapsedTime);
    pendulum.weightX = pendulum.x + Math.sin(pendulum.angle) * pendulum.rodLength;
    pendulum.weightY = pendulum.y + Math.cos(pendulum.angle) * pendulum.rodLength;
  }
}
