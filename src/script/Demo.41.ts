import * as dat from 'dat.gui';
import { Point } from './declare';
import { BaseDemo } from './BaseDemo';
import { IFilter } from './filters/IFilter';
import { BlackWhiteFilter } from './filters/BlackWhiteFilter';
import { NegativeFilter } from './filters/NegativeFilter';
import { EmbossmentFilter } from './filters/EmbossmentFilter';
import { SunglassesFilter } from './filters/SunglassesFilter';

/**
 * @description 像素处理与裁剪
 */
export class Demo extends BaseDemo {
  public image: HTMLImageElement;
  public offScreenCanvas: HTMLCanvasElement;
  public offScreenContext: CanvasRenderingContext2D;

  public config = {
    scale: 0.2,
    filter: 0,
    LENS_RADIUS: this.canvas.width / 5,
    resetScene: () => this.drawScene(),
    putFilterOn: () => this.putFilterOn()
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.initOffScreenCanvas();
    this.loadImage(require('../asset/images/flower.jpg'))
      .then(image => (this.image = image))
      .then(() => {
        this.drawScene();
      });

    this.createControl();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this;
  }

  public draw() {
    return this;
  }

  public initOffScreenCanvas() {
    const { canvas } = this;
    this.offScreenCanvas = document.createElement('canvas');
    this.offScreenContext = this.offScreenCanvas.getContext('2d');
    this.offScreenCanvas.width = canvas.width;
    this.offScreenCanvas.height = canvas.height;
  }

  private createControl() {
    const { config } = this;
    const gui = new dat.GUI();

    gui
      .add(config, 'scale')
      .step(0.01)
      .min(0.1)
      .max(1)
      .onChange(() => this.drawScene());
    gui
      .add(config, 'filter', {
        default: 0,
        negative: 1,
        black_white: 2,
        embossment: 3,
        sunglasses: 4
      })
      .onFinishChange((v: string) => (this.config.filter = Number(v)));

    gui.add(config, 'resetScene');
    gui.add(config, 'putFilterOn');

    return this;
  }

  public drawScene() {
    const { context, canvas, config, image } = this;

    // 画布宽高
    const w = canvas.width;
    const h = canvas.height;

    // 缩放后的图像宽高
    const ratio = (image.width * config.scale) / image.width;
    const sw = image.width * config.scale;
    const sh = image.height * ratio;

    // 绘制到画布中心
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(this.image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);

    return this;
  }

  public putFilterOn() {
    const { context, canvas, config } = this;
    const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
    const leftLensLocation: Point = { x: this.center.x - config.LENS_RADIUS - 10, y: this.center.y };
    const rightLensLocation: Point = { x: this.center.x + config.LENS_RADIUS + 10, y: this.center.y };
    let filter: IFilter = null;

    switch (config.filter) {
      case 1:
        filter = new NegativeFilter(imagedata);
        break;
      case 2:
        filter = new BlackWhiteFilter(imagedata);
        break;
      case 3:
        filter = new EmbossmentFilter(imagedata);
        break;
      case 4:
        filter = new SunglassesFilter(imagedata);
        break;
      default:
        filter = null;
    }

    if (filter) {
      filter.dye();
    }

    this.offScreenContext.putImageData(imagedata, 0, 0);
    this.drawLenses(leftLensLocation, rightLensLocation);
  }

  public drawLenses(leftLensLocation: Point, rightLensLocation: Point) {
    const { context, canvas, config, offScreenCanvas } = this;

    context.save();
    context.beginPath();

    context.arc(leftLensLocation.x, leftLensLocation.y, config.LENS_RADIUS, 0, Math.PI * 2, false);
    // context.stroke();

    context.moveTo(rightLensLocation.x, rightLensLocation.y);

    context.arc(rightLensLocation.x, rightLensLocation.y, config.LENS_RADIUS, 0, Math.PI * 2, false);
    // context.stroke();

    context.clip();

    context.drawImage(offScreenCanvas, 0, 0, canvas.width, canvas.height);
    context.restore();

    return this;
  }
}
