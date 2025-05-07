import { Frame, GifReader } from 'omggif';
import { Sprite, IPainter, IBehavior } from './Sprite';

export interface GifFrame {
  frame: Frame;
  pixels: Uint8ClampedArray;
  buffer: ImageData;
  bufferCanvas: HTMLCanvasElement;
}

/**
 * @reference - https://themadcreator.github.io/gifler/
 */
export class GifImagePainter implements IPainter {
  private lastTime = Date.now();
  public image = new Image();
  public frameIndex: number = 0;
  public frames: Array<GifFrame> = [];

  public constructor(imageUrl: string) {
    this.image.src = imageUrl;

    this.loadImage(imageUrl).then((data) => this.decodeFrame(data));
  }

  private loadImage(url: string): Promise<ArrayBuffer> {
    const promise = new Promise<ArrayBuffer>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            // console.log('response:', xhr);
            resolve(xhr.response);
          } else {
            reject();
          }
        }
      };
      xhr.send();
    });
    return promise;
  }

  private decodeFrame(data: ArrayBuffer) {
    const reader = new GifReader(new Uint8Array(data));
    const frames: Array<GifFrame> = [];

    for (var i = 0, count = reader.numFrames(); i < count; i++) {
      const frameInfo = reader.frameInfo(i);
      const pixels = new Uint8ClampedArray(reader.width * reader.height * 4);
      reader.decodeAndBlitFrameRGBA(i, pixels);
      // reader.decodeAndBlitFrameBGRA(i, pixels);

      const bufferCanvas = document.createElement('canvas');
      const bufferContext = bufferCanvas.getContext('2d');
      const imageData = bufferContext.createImageData(frameInfo.width, frameInfo.height);
      bufferCanvas.width = frameInfo.width;
      bufferCanvas.height = frameInfo.height;
      imageData.data.set(pixels);
      bufferContext.putImageData(imageData, -frameInfo.x, -frameInfo.y);

      frames.push({
        frame: frameInfo,
        pixels: pixels,
        buffer: imageData,
        bufferCanvas: bufferCanvas,
      });
    }

    this.frames = frames;
    // console.log(reader, frames);
  }

  public advance() {
    if (this.frameIndex === this.frames.length - 1) {
      this.frameIndex = 0;
    } else {
      this.frameIndex++;
    }
  }

  public async paint(sprite: Sprite, context: CanvasRenderingContext2D) {
    if (!this.frames || !this.frames.length) {
      return;
    }

    const x = sprite.x || sprite.left;
    const y = sprite.y || sprite.top;
    const frameInfo = this.frames[this.frameIndex];
    const width = sprite.width || this.image.width;
    const height = sprite.height || this.image.height;

    if (!this.image.complete) {
      this.image.onload = (e) => {
        sprite.width = this.image.width;
        sprite.height = this.image.height;

        context.drawImage(this.image, x, y, sprite.width, sprite.height);
      };
    } else {
      context.drawImage(frameInfo.bufferCanvas, x, y, width, height);
    }
  }
}

export class GifPlayBehavior implements IBehavior {
  public lastAdvance: number = 0;

  public constructor() {}

  public execute(sprite: Sprite<GifImagePainter>, context: CanvasRenderingContext2D, time: number) {
    const frameInfo = sprite.painter.frames[sprite.painter.frameIndex];

    if (!frameInfo) {
      return;
    }

    const delay = time - this.lastAdvance;
    const frameDelay = frameInfo.frame.delay * 10;

    if (delay >= frameDelay) {
      // console.log('frameDelay', frameDelay, delay);
      sprite.painter.advance();
      this.lastAdvance = time;
    }
  }
}
