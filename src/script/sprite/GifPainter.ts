import { ImagePainter } from './ImagePainter';
import { Sprite, IPainter } from './Sprite';
import { Frame, GifReader } from 'omggif';

export class GifPainter extends ImagePainter implements IPainter {
  private imageUrl: string;

  public constructor(imageUrl: string) {
    super(imageUrl);

    this.imageUrl = imageUrl;

    this.loadImage().then((data) => {
      console.log('loadImage', data);

      const reader = new GifReader(new Uint8Array(data));
      const frames: Array<{ frame: Frame, pixels: Uint8ClampedArray }> = [];
      for (var i = 0, count = reader.numFrames(); i < count; i++) {
        const frameInfo = reader.frameInfo(i);
        const pixels = new Uint8ClampedArray(reader.width * reader.height * 4);
        frames.push({
          frame: frameInfo,
          pixels: pixels,
        });
        reader.decodeAndBlitFrameRGBA(i, pixels);
      }

      console.log(reader, frames);
    });
  }

  private loadImage() {
    const promise = new Promise<ArrayBuffer>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.imageUrl, true);
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

  public override async paint(sprite: Sprite, context: CanvasRenderingContext2D) {
    if (!this.image) {
      return;
    }

    const x = sprite.x || sprite.left;
    const y = sprite.y || sprite.top;

    if (!this.image.complete) {
      this.image.onload = (e) => {
        sprite.width = this.image.width;
        sprite.height = this.image.height;
      };
    } else {
      context.drawImage(this.image, x, y, sprite.width, sprite.height);
    }
  }
}
function resolve(arg0: any) {
  throw new Error('Function not implemented.');
}
