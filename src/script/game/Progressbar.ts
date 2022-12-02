export interface ProgressbarOptions {
  w: number;
  h: number;
  strokeStyle: string;
  red: number;
  green: number;
  blue: number;
}

export class Progressbar {
  public domElement: HTMLElement;
  public context: CanvasRenderingContext2D;
  public background: CanvasRenderingContext2D;
  public foreground: CanvasRenderingContext2D;

  public w = 0;
  public h = 0;
  public left = 0;
  public top = 0;
  public right = 0;
  public bottom = 0;
  public percentComplete: number = 0;
  public cornerRadius: number = 0;

  public constructor(options: ProgressbarOptions) {
    const { w, h, strokeStyle, red, green, blue } = options;

    this.domElement = document.createElement('div');
    this.context = document.createElement('canvas').getContext('2d');
    this.domElement.appendChild(this.context.canvas);

    this.context.canvas.width = w + h;
    this.context.canvas.height = h;

    this.setProgressbarProperties(w, h);

    this.background.globalAlpha = 0.3;
    this.drawToBuffer(this.background, strokeStyle, red, green, blue);
    this.drawToBuffer(this.foreground, strokeStyle, red, green, blue);
    this.percentComplete = 0;
  }

  public setProgressbarProperties(w: number, h: number) {
    this.w = w;
    this.h = h;
    (this.cornerRadius = this.h / 2),
      (this.right = this.left + this.cornerRadius + this.w + this.cornerRadius),
      (this.bottom = this.top + this.h);

    (this.background = document.createElement('canvas').getContext('2d')),
      (this.foreground = document.createElement('canvas').getContext('2d')),
      (this.background.canvas.width = w + h);
    this.background.canvas.height = h;

    this.foreground.canvas.width = w + h;
    this.foreground.canvas.height = h;
  }

  public draw(percentComplete: number) {
    this.erase();
    this.context.drawImage(this.background.canvas, 0, 0);
    if (percentComplete > 0) {
      this.context.drawImage(
        this.foreground.canvas,
        0,
        0,
        this.foreground.canvas.width * (percentComplete / 100),
        this.foreground.canvas.height,
        0,
        0,
        this.foreground.canvas.width * (percentComplete / 100),
        this.foreground.canvas.height
      );
    }
  }

  public drawToBuffer(
    context: CanvasRenderingContext2D,
    strokeStyle: string,
    red: number,
    green: number,
    blue: number
  ) {
    context.save();
    context.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    context.strokeStyle = strokeStyle;
    context.beginPath();

    context.moveTo(this.left + this.cornerRadius, this.top);
    context.lineTo(this.right - this.cornerRadius, this.top);
    context.arc(
      this.right - this.cornerRadius,
      this.top + this.cornerRadius,
      this.cornerRadius,
      -Math.PI / 2,
      Math.PI / 2
    );
    context.lineTo(this.left + this.cornerRadius, this.top + this.cornerRadius * 2);
    context.arc(
      this.left + this.cornerRadius,
      this.top + this.cornerRadius,
      this.cornerRadius,
      Math.PI / 2,
      -Math.PI / 2
    );
    context.fill();

    context.shadowColor = undefined;

    const gradient = context.createLinearGradient(this.left, this.top, this.left, this.bottom);
    gradient.addColorStop(0, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0.1)');
    context.fillStyle = gradient;
    context.fill();
    context.lineWidth = 0.4;
    context.stroke();

    context.restore();
  }

  public erase() {
    this.context.clearRect(this.left, this.TOP, this.context.canvas.width, this.context.canvas.height);
  }
}
