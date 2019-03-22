import DemoBase from './DemoBase';
import { Point, Circle } from './declare';

export default class Demo extends DemoBase {

  public circles: Array<Circle> = [];

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);
    this.createCircle();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public draw() {
    const { context, canvas } = this;

    return this.clearScreen()
               .drawGrid()
               .drawCircles()
               .startPlay();
  }

  private createCircle(quantity: number = 100) {

    for ( let i = 0; i < quantity; i++ ) {
      let point: Point = {
        x: this.centerX,
        y: this.centerY
      };
      this.circles.push({
        position: point,
        velocityX: Math.random() * 5,
        velocityY: Math.random() * -5,
        radius: Math.random() * 50,
        color: this.randomRgba(),
      });
    }

    return this;
  }

  private drawGrid(
    color: string = 'rgba(0,0,0,0.2)',
    stepx: number = 10,
    stepy: number = 10
  ) {
    const { context, canvas } = this;

    context.strokeStyle = color;
    context.lineWidth = 0.5;

    for ( let i = stepx + 0.5, len = canvas.width; i < len; i += stepx ) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, canvas.height);
      context.stroke();
    }

    for ( let i = stepy + 0.5, len = canvas.height; i < len; i += stepy ) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(canvas.width, i);
      context.stroke();
    }

    return this;
  }

  private drawCircles() {
    const { context } = this;

    this.circles.forEach((circle) => {
      context.beginPath();
      context.arc(
        circle.position.x,
        circle.position.y,
        circle.radius,
        0,
        Math.PI * 2,
        false
      );
      context.fillStyle = circle.color;
      context.fill();

      this.updatePosition(circle);
   });

   return this;
  }

  private updatePosition(circle: Circle) {
    const { canvas }  = this;

    if ( circle.position.x + circle.velocityX + circle.radius > canvas.width ||
         circle.position.x + circle.velocityX - circle.radius < 0 ) {
      circle.velocityX = -circle.velocityX;
    }
    if ( circle.position.y + circle.velocityY + circle.radius > canvas.height ||
         circle.position.y + circle.velocityY - circle.radius < 0 ) {
      circle.velocityY = -circle.velocityY;
    }

    circle.position.x += circle.velocityX;
    circle.position.y += circle.velocityY;
    return this;
  }

}
