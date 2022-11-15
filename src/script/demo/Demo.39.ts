import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import image_flower_url from '../../../asset/images/flower.jpg';

/**
 * @description 像素处理 - 负片滤镜
 */
export class Demo extends BaseDemo {
  public name: string = '图像处理 —— 反色';
  public image: HTMLImageElement;

  public config = {
    scale: 0.2,
    resetScene: () => this.drawScene(),
    negative: () => this.updatePixel(),
  };

  public constructor(public canvas: HTMLCanvasElement) {
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

  public start() {
    return this;
  }

  public draw() {
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
    gui.add(config, 'negative');

    return this;
  }

  public drawScene() {
    const { canvas, context, config, image } = this;

    // 画布宽高
    const w = this.width;
    const h = this.height;

    // 缩放后的图像宽高
    const ratio = (image.width * config.scale) / image.width;
    const sw = (image.width * config.scale) / this.dpr;
    const sh = (image.height * ratio) / this.dpr;

    // 绘制到画布中心
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(this.image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);

    return this;
  }

  public updatePixel() {
    const { context } = this;

    const imagedata = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imagedata.data;

    for (let i = 0; i <= data.length - 4; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
      // data[i + 3] = data[i + 3];
    }

    context.putImageData(imagedata, 0, 0);
  }
}
