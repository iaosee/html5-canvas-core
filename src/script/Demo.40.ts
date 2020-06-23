import * as dat from 'dat.gui';
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

  public config = {
    scale: 0.2,
    resetScene: () => this.drawScene(),
    filter: 0
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

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

  private createControl() {
    const { config } = this;
    const gui = new dat.GUI();

    gui
      .add(config, 'scale')
      .step(0.01)
      .min(0.1)
      .max(1)
      .onChange(() => this.drawScene());
    gui.add(config, 'resetScene');
    gui
      .add(config, 'filter', {
        default: 0,
        negative: 1,
        black_white: 2,
        embossment: 3,
        sunglasses: 4
      })
      .onFinishChange((v: string) => this.applyFilter(Number(v)));

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

  public applyFilter(type: number) {
    const { canvas, context } = this;
    this.drawScene();

    let filter: IFilter = null;
    const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);

    switch (type) {
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

    context.putImageData(imagedata, 0, 0);
  }
}