import { IFilter } from './IFilter';

export class NegativeFilter implements IFilter {
  public imageData: ImageData;

  public constructor(imageData: ImageData) {
    this.imageData = imageData;
  }

  public dye() {
    const { imageData } = this;
    const data = imageData.data;
    const length = data.length;

    for (let i = 0; i <= length - 4; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }

    return imageData;
  }
}
