import { GUI } from 'lil-gui';
import { BaseDemo } from '../base/BaseDemo';
import { IFilter } from '../filters/IFilter';
import { NegativeFilter } from '../filters/NegativeFilter';
import { BlackWhiteFilter } from '../filters/BlackWhiteFilter';
import { EmbossmentFilter } from '../filters/EmbossmentFilter';
import { SunglassesFilter } from '../filters/SunglassesFilter';
import video_url from '../../../asset/videos/video-01.mp4';

/**
 * @description 绘制视频数据
 *
 * https://tencent-xpc13.xpccdn.com/57f8dbf40398f.mp4
 * https://tencent-xpc13.xpccdn.com/5db170fb38e5e.mp4
 * https://tencent-xpc13.xpccdn.com/5db105663fe81.mp4
 * https://tencent-xpc13.xpccdn.com/5b3bb10e5ccb3.mp4
 * https://tencent-xpc13.xpccdn.com/5cd1501cd6bb3.mp4
 * https://ks-xpc4.xpccdn.com/5e4667326d2d4.mp4
 * https://qiniu-xpc4.xpccdn.com/5eca1f6e864c6.mp4
 * https://qiniu-xpc4.xpccdn.com/5eca1f6e6b3f0.mp4
 *
 */
export class Demo extends BaseDemo {
  public override name: string = '视频 —— 视频渲染绘制';
  public video: HTMLVideoElement = null;
  public offScreenCanvas: HTMLCanvasElement;
  public offScreenContext: CanvasRenderingContext2D;

  public config = {
    color: true,
    flip: false,
    play: () => this.playVideo(),
    pause: () => this.pauseVideo(),
    camera: () => this.camera(),
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.createVedio().createControl().initOffScreenCanvas().listenEvents();
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

  public override destroy() {
    super.destroy();
    this.pauseVideo();
  }

  public initOffScreenCanvas() {
    const { canvas } = this;
    this.offScreenCanvas = document.createElement('canvas');
    this.offScreenContext = this.offScreenCanvas.getContext('2d');
    this.offScreenCanvas.width = canvas.width;
    this.offScreenCanvas.height = canvas.height;
    return this;
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'color');
    gui.add(config, 'flip');
    gui.add(config, 'play');
    gui.add(config, 'pause');
    gui.add(config, 'camera');

    return this;
  }

  public createVedio() {
    this.video = document.createElement('video');
    this.video.src = video_url;
    return this;
  }

  public async camera() {
    const { context } = this;
    this.pauseVideo();
    this.clearScreen();

    const userMedia = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    // const displayMedia = await navigator.mediaDevices.getDisplayMedia({
    //   video: true,
    //   audio: false
    // });

    const userCapture = new ImageCapture(userMedia.getVideoTracks()?.[0]);
    const render = async () => {
      if (!this.video.paused) {
        return;
      }
      const userImageBitMap = await userCapture.grabFrame();
      context.drawImage(userImageBitMap, 0, 0);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return this;
  }

  public playVideo() {
    const { canvas, context, config } = this;

    if (!this.video.paused) {
      return this;
    }

    const nextVideoFrame = () => {
      this.offScreenContext.drawImage(this.video, 0, 0);

      if (this.video.paused) {
        return;
      }
      if (!config.color) {
        this.removeColor();
      }

      if (config.flip) {
        this.drawFlipped();
      } else {
        context.drawImage(this.offScreenCanvas, 0, 0);
      }

      requestAnimationFrame(nextVideoFrame);
    };

    this.video.play();
    requestAnimationFrame(nextVideoFrame);

    return this;
  }

  public pauseVideo() {
    this.video.pause();
    return this;
  }

  public removeColor() {
    const { offScreenCanvas, offScreenContext } = this;

    const imageData = offScreenContext.getImageData(0, 0, offScreenCanvas.width, offScreenCanvas.height);

    const data = imageData.data;
    const len = data.length;

    for (let i = 0; i < len - 4; i += 4) {
      const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = average;
      data[i + 1] = average;
      data[i + 2] = average;
    }

    offScreenContext.putImageData(imageData, 0, 0);
  }

  public drawFlipped() {
    const { canvas, context, offScreenCanvas } = this;
    context.save();

    context.translate(this.width / 2, this.height / 2);
    context.rotate(Math.PI);
    context.translate(-this.width / 2, -this.height / 2);
    context.drawImage(offScreenCanvas, 0, 0);

    context.restore();
  }

  public listenEvents() {
    const { canvas } = this;

    canvas.addEventListener('click', (e) => {
      console.log(e);
    });

    return this;
  }
}
