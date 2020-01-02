export class Color {
  public colorSource: string;

  public constructor(color: string) {
    if (!(this instanceof Color)) {
      return new Color(color);
    }

    this.colorSource = color;
  }

  public static fromHex(hexColor: string) {
    return new Color(hexColor);
  }

  public static fromRgb(rgbColor: string) {
    return new Color(rgbColor);
  }

  public static fromHsl(hslColor: string) {
    return new Color(hslColor);
  }

  public toHex() {}

  public toRgb() {}

  public toHsl() {}
}
