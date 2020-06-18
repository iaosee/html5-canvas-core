import { IFilter } from './IFilter';

export class SunglassesFilter implements IFilter {
  public imageData: ImageData;

  public constructor(imageData: ImageData) {
    this.imageData = imageData;
  }

  public dye() {
    const { imageData } = this;
    const data = imageData.data;
    const width = imageData.width;
    const length = data.length;

    for (let i = 0; i < length - 4; i++) {
      if ((i + 1) % 4 !== 0) {
        if ((i + 4) % (width * 4) === 0) {
          data[i] = data[i - 4];
          data[i + 1] = data[i - 3];
          data[i + 2] = data[i - 2];
          data[i + 3] = data[i - 1];
          i += 4;
        } else {
          data[i] = 2 * data[i] - data[i + 4] - 0.5 * data[i + 4];
        }
      }
    }

    return imageData;
  }
}
