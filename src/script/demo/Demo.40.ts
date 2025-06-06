import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { IFilter } from '../filters/IFilter';
import { BlackWhiteFilter } from '../filters/BlackWhiteFilter';
import { NegativeFilter } from '../filters/NegativeFilter';
import { EmbossmentFilter } from '../filters/EmbossmentFilter';
import { SunglassesFilter } from '../filters/SunglassesFilter';
import { GrayscaleFilter } from '../filters/GrayscaleFilter';
import { XXXFilter } from '../filters/XXXFilter';
import image_flower_url from '../../../asset/images/flower.jpg';

/**
 * @description 像素处理与裁剪
 */
export class Demo extends BaseDemo {
  public override name: string = '图像处理 —— 基础滤镜实现';

  public image: HTMLImageElement;

  public config = {
    scale: 0.2,
    resetScene: () => this.drawScene(),
    filter: 0,
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

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
    gui.add(config, 'resetScene');
    gui
      .add(config, 'filter', {
        default: 0,
        Negative: 1,
        BlackWhite: 2,
        Embossment: 3,
        Sunglasses: 4,
        Grayscale: 5,
        XXXFilter: 6,
      })
      .onFinishChange((v: string) => this.applyFilter(Number(v)));

    return this;
  }

  public drawScene() {
    const { context, config, image } = this;

    // 画布宽高
    const w = this.width;
    const h = this.height;

    // 缩放后的图像宽高
    const ratio = (image.width * config.scale) / image.width;
    const sw = image.width * config.scale;
    const sh = image.height * ratio;

    // 绘制到画布中心
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.drawImage(this.image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);

    return this;
  }

  public applyFilter(type: number) {
    const { context } = this;
    this.drawScene();

    let filter: IFilter = null;
    const imagedata = context.getImageData(this.canvas.width / 2, 0, this.canvas.width, this.canvas.height);

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
      case 5:
        filter = new GrayscaleFilter(imagedata);
        break;
      case 6:
        filter = new XXXFilter(imagedata);
        break;
      default:
        filter = null;
    }

    if (filter) {
      filter.dye();
    }

    // context.putImageData(imagedata, 0, 0);
    context.putImageData(imagedata, this.canvas.width / 2, 0);
  }
}
