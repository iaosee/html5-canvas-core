import { GUI } from 'lil-gui';
import { Point } from '../interfaces';
import { BaseDemo } from '../base/BaseDemo';
import { IFilter } from '../filters/IFilter';
import { BlackWhiteFilter } from '../filters/BlackWhiteFilter';
import { NegativeFilter } from '../filters/NegativeFilter';
import { EmbossmentFilter } from '../filters/EmbossmentFilter';
import { SunglassesFilter } from '../filters/SunglassesFilter';
import image_flower_url from '../../../asset/images/flower.jpg';

/**
 * @description 像素处理与裁剪
 */
export class Demo extends BaseDemo {
  public override name: string = '图像处理 —— 裁剪应用部分滤镜';
  public image: HTMLImageElement;
  public offScreenCanvas: HTMLCanvasElement;
  public offScreenContext: CanvasRenderingContext2D;
  public originalImageData: ImageData;

  public config = {
    scale: 0.2,
    filter: 0,
    LENS_RADIUS: this.width / 5,
    resetScene: () => this.drawScene(),
    putFilterOn: () => this.putFilterOn(),
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.initOffScreenCanvas();
    this.loadImage(image_flower_url)
      .then((image) => (this.image = image))
      .then(() => {
        this.drawScene();
      });

    this.createControl();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public override start() {
    return this;
  }

  public override draw() {
    return this;
  }

  public initOffScreenCanvas() {
    const { canvas } = this;
    this.offScreenCanvas = document.createElement('canvas');
    this.offScreenContext = this.offScreenCanvas.getContext('2d');
    this.offScreenCanvas.width = canvas.width;
    this.offScreenCanvas.height = canvas.height;
    this.offScreenContext.scale(this.dpr, this.dpr);
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

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
        sunglasses: 4,
      })
      .onFinishChange((v: string) => (this.config.filter = Number(v)));

    gui.add(config, 'resetScene');
    gui.add(config, 'putFilterOn');

    return this;
  }

  public drawScene() {
    const { canvas, context, config, image } = this;

    // 画布宽高
    const w = this.width;
    const h = this.height;

    // 缩放后的图像宽高
    const ratio = (image.width * config.scale) / image.width;
    const sw = image.width * config.scale;
    const sh = image.height * ratio;

    // 绘制到画布中心
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(this.image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
    this.originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    return this;
  }

  public putFilterOn() {
    const { canvas, context, config } = this;
    const leftLensLocation: Point = { x: this.center.x - config.LENS_RADIUS - 10, y: this.center.y };
    const rightLensLocation: Point = { x: this.center.x + config.LENS_RADIUS + 10, y: this.center.y };
    let filter: IFilter = null;

    context.putImageData(this.originalImageData, 0, 0);
    const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);

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
    const { context, config, offScreenCanvas } = this;

    context.save();
    context.beginPath();

    context.arc(leftLensLocation.x, leftLensLocation.y, config.LENS_RADIUS, 0, Math.PI * 2, false);
    // context.stroke();

    context.moveTo(rightLensLocation.x, rightLensLocation.y);

    context.arc(rightLensLocation.x, rightLensLocation.y, config.LENS_RADIUS, 0, Math.PI * 2, false);
    // context.stroke();

    context.clip();

    context.drawImage(offScreenCanvas, 0, 0, this.canvas.width, this.canvas.height);
    context.restore();

    return this;
  }
}
