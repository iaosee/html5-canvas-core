import * as dat from 'dat.gui';
import { BaseDemo } from './BaseDemo';

/**
 * @description Hello World
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
  public video: HTMLVideoElement = null;
  public offScreenCanvas: HTMLCanvasElement;
  public offScreenContext: CanvasRenderingContext2D;

  public config = {
    play: () => this.playVideo(),
    pause: () => this.pauseVideo()
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createVedio()
      .createControl()
      .initOffScreenCanvas()
      .listenEvents();

    this.video.oncanplay = e => {
      console.log(e);
    };
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
    return this;
  }

  private createControl() {
    const { config } = this;
    const gui = new dat.GUI();

    gui.add(config, 'play');
    gui.add(config, 'pause');

    return this;
  }

  public createVedio() {
    this.video = document.createElement('video');
    this.video.src = require('../asset/videos/video-01.mp4');
    return this;
  }

  public playVideo() {
    const { context } = this;

    if (!this.video.paused) {
      return this;
    }

    const nextVideoFrame = () => {
      this.offScreenContext.drawImage(this.video, 0, 0);
      context.drawImage(this.offScreenCanvas, 0, 0);
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

  public listenEvents() {
    const { canvas } = this;

    canvas.addEventListener('click', e => {
      console.log(e);
      // const pos = this.coordinateTransformation(e.clientX, e.clientY);
    });

    return this;
  }
}
