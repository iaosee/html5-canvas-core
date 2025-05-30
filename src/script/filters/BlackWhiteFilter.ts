import { IFilter } from './IFilter';

export class BlackWhiteFilter implements IFilter {
  public imageData: ImageData;

  public constructor(imageData: ImageData) {
    this.imageData = imageData;
  }

  public dye() {
    const { imageData } = this;
    const data = imageData.data;
    const length = data.length;

    for (let i = 0; i < length - 4; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i + 1] = data[i + 2] = avg >= 100 ? 255 : 0;
    }

    return imageData;
  }
}
