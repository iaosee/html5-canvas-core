import { IFilter } from './IFilter';

export class EmbossmentFilter implements IFilter {
  public imageData: ImageData;

  public constructor(imageData: ImageData) {
    this.imageData = imageData;
  }

  public dye() {
    const { imageData } = this;
    const data = imageData.data;
    const width = imageData.width;
    const length = data.length;

    for (let i = 0; i < length; i++) {
      // 防止超出边界
      if (i <= length - width * 4) {
        // 不是 alpha
        if ((i + 1) % 4 !== 0) {
          // 如果是一行的最后一个像素，右边不会有像素，拷贝前一个像素值
          if ((i + 4) % (width * 4) === 0) {
            data[i] = data[i - 4];
            data[i + 1] = data[i - 3];
            data[i + 2] = data[i - 2];
            data[i + 3] = data[i - 1];
            i += 4;
          } else {
            // 不是一行的最后一个像素
            data[i] =
              255 / 2 + // Average value
              2 * data[i] - // current pixel
              data[i + 4] - // next pixel
              data[i + width * 4]; // pixel underneath
          }
        }
      } else {
        // 最后一行，下方没有像素，拷贝上方像素
        if ((i + 1) % 4 !== 0) {
          data[i] = data[i - width * 4];
        }
      }
    }

    return imageData;
  }
}
