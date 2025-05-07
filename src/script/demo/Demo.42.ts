import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import image_flower_url from '../../../asset/images/flower.jpg';

enum FadeType {
  FadeIn,
  FadeOut,
}

/**
 * @description 图像淡入淡出动画
 *
 * 此示例是通过修改 ImageData 的方式以改变像素的 alpha 值，涉及大量像素时性能低下
 * 更优更简便的方式实现 可以在绘制每帧动画之前，先修改绘图环境对象的 globalAlpha 值，再绘制图像
 */
export class Demo extends BaseDemo {
  public override name: string = '图像渲染淡入淡出';
  public image: HTMLImageElement;
  public originalImageData: ImageData;
  public offScreenCanvas: HTMLCanvasElement;
  public offScreenContext: CanvasRenderingContext2D;

  public config = {
    scale: 0.2,
    LENS_RADIUS: this.canvas.width / 5,
    resetScene: () => this.drawScene(),
    fadeIn: () => this.fadeIn(),
    fadeOut: () => this.fadeOut(),
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

    gui.add(config, 'fadeIn');
    gui.add(config, 'fadeOut');

    return this;
  }

  public drawScene() {
    const { context, offScreenContext, canvas, config, image } = this;

    // 画布宽高
    const w = canvas.width;
    const h = canvas.height;

    // 缩放后的图像宽高
    const ratio = (image.width * config.scale) / image.width;
    const sw = image.width * config.scale;
    const sh = image.height * ratio;

    // 绘制到画布中心
    context.clearRect(0, 0, canvas.width, canvas.height);
    offScreenContext.clearRect(0, 0, canvas.width, canvas.height);
    // context.drawImage(this.image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
    offScreenContext.drawImage(this.image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
    this.originalImageData = offScreenContext.getImageData(0, 0, canvas.width, canvas.height);
    return this;
  }

  public fadeIn() {
    const { offScreenContext, canvas } = this;

    const imagedata = offScreenContext.getImageData(0, 0, canvas.width, canvas.height);
    this.doFadeAnimate(imagedata, 0, 0, 20, FadeType.FadeIn);
  }

  public fadeOut() {
    const { context, canvas } = this;

    context.putImageData(this.originalImageData, 0, 0);
    const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);

    this.doFadeAnimate(imagedata, 0, 0, 20, FadeType.FadeOut);
  }

  public doFadeAnimate(imagedata: ImageData, x: number, y: number, steps: number, type: FadeType = FadeType.FadeIn) {
    const { context } = this;
    let frame = 0;
    let interval: any;

    if (type === FadeType.FadeIn) {
      for (let i = 3; i < imagedata.data.length; i += 4) {
        imagedata.data[i] = 0;
      }
    }

    const fade = (d: number) => {
      frame++;
      interval = requestAnimationFrame(fade);

      if (frame > steps) {
        // animation is over
        cancelAnimationFrame(interval);
      }

      type === FadeType.FadeIn
        ? this.increaseTransparency(imagedata, steps)
        : this.decreaseTransparency(imagedata, steps);
      context.putImageData(imagedata, x, y);
    };

    interval = requestAnimationFrame(fade);
    return this;
  }

  public decreaseTransparency(imagedata: ImageData, steps: number) {
    const length = imagedata.data.length;
    let alpha;
    let currentAlpha;
    let step;

    for (let i = 3; i < length; i += 4) {
      alpha = this.originalImageData.data[i];

      if (alpha > 0 && imagedata.data[i] > 0) {
        currentAlpha = imagedata.data[i];

        // The ratio of alpha to total steps. get the decrement for each step
        step = Math.ceil(alpha / steps);

        if (currentAlpha - step > 0) {
          imagedata.data[i] -= step;
        } else {
          imagedata.data[i] = 0;
        }
      }
    }
  }

  public increaseTransparency(imagedata: ImageData, steps: number) {
    const length = imagedata.data.length;
    let alpha;
    let currentAlpha;
    let step;

    for (let i = 3; i < length; i += 4) {
      alpha = this.originalImageData.data[i];

      if (alpha > 0) {
        currentAlpha = imagedata.data[i];
        step = Math.ceil(alpha / steps);

        if (currentAlpha + step <= alpha) {
          imagedata.data[i] += step;
        } else {
          imagedata.data[i] = alpha;
        }
      }
    }
  }
}
