import { IFilter } from './IFilter';

export class XXXFilter implements IFilter {
  public imageData: ImageData;

  public constructor(imageData: ImageData) {
    this.imageData = imageData;
  }

  public dye() {
    const { imageData } = this;
    const data = imageData.data;
    const length = data.length;

    for (let i = 0; i < length - 4; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      data[i] = (Math.abs(g - b + g + r) * r) / 256;
      data[i + 1] = (Math.abs(b - g + b + r) * r) / 256;
      data[i + 2] = (Math.abs(b - g + b + r) * g) / 256;
    }

    // for (let i = 0; i < length - 4; i += 4) {
    //   const avg = Math.floor((Math.min(data[i], data[i+1], data[i+2]) + Math.max(data[i], data[i+1], data[i+2])) / 2 );
    //   data[i] = data[i+1] = data[i+2] = avg;
    // }

    // for (let i = 0; i < length - 4; i += 4) {
    //   data[i*4 + 2] = 0;
    //   data[i*4 + 1] = 0;
    // }
    // for (let i = 0; i < length - 4; i += 4) {
    //   var r = imageData.data[i * 4],
    //     g = imageData.data[i * 4 + 1],
    //     b = imageData.data[i * 4 + 2];

    //   var newR = (0.393 * r + 0.769 * g + 0.189 * b);
    //   var newG = (0.349 * r + 0.686 * g + 0.168 * b);
    //   var newB = (0.272 * r + 0.534 * g + 0.131 * b);
    //   var rgbArr = [newR, newG, newB].map((e) => {
    //     return e < 0 ? 0 : e > 255 ? 255 : e;
    //   });
    //   [imageData.data[i * 4], imageData.data[i * 4 + 1], imageData.data[i * 4 + 2]] = rgbArr;
    // }

    // for (let i = 0; i < length - 4; i += 4) {
    //   var r = imageData.data[i * 4],
    //     g = imageData.data[i * 4 + 1],
    //     b = imageData.data[i * 4 + 2];

    //   var newR = r * 128 / (g + b + 1);
    //   var newG = g * 128 / (r + b + 1);
    //   var newB = b * 128 / (g + r + 1);
    //   var rgbArr = [newR, newG, newB].map((e) => {
    //     return e < 0 ? 0 : e > 255 ? 255 : e;
    //   });
    //   [imageData.data[i * 4], imageData.data[i * 4 + 1], imageData.data[i * 4 + 2]] = rgbArr;
    // }

    // for (let i = 0; i < length - 4; i += 4) {

    //   var r = imageData.data[i * 4],
    //     g = imageData.data[i * 4 + 1],
    //     b = imageData.data[i * 4 + 2];

    //   var newR = r * 0.393 + g * 0.769 + b * 0.189;
    //   var newG = r * 0.349 + g * 0.686 + b * 0.168;
    //   var newB = r * 0.272 + g * 0.534 + b * 0.131;
    //   var rgbArr = [newR, newG, newB];
    //   [imageData.data[i * 4], imageData.data[i * 4 + 1], imageData.data[i * 4 + 2]] = rgbArr;
    // }

    return imageData;
  }
}
