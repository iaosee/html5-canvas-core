import { Random } from '../tools/Random';
import { BaseDemo } from '../base/BaseDemo';
import { GameEngine } from '../game/GameEngine';
import { Progressbar } from '../game/Progressbar';

const SUN_TOP = 110;
const SUN_LEFT = 450;
const SUN_RADIUS = 80;

export class Demo extends BaseDemo {
  public override name: string = '简单游戏引擎';
  public game: GameEngine;
  public progressbar: Progressbar;

  public translateDelta = 0.025;
  public translateOffset = 0;
  public gameOver = false;
  public livesLeft = 3;

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.game = new GameEngine('ungame', this.canvas);
    this.progressbar = new Progressbar({
      w: 300,
      h: 10,
      strokeStyle: 'rgba(0,255,0,0.5)',
      red: 100,
      green: 130,
      blue: 250,
    });

    this.progressbar.domElement.style.position = 'absolute';
    this.progressbar.domElement.style.top = '20px';
    this.progressbar.domElement.style.left = '20px';
    document.body.appendChild(this.progressbar.domElement);
    this.progressbar.draw(Random.init(0, 100).getOne());

    this.configGame();
    this.game.start();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public override start() {
    return this.draw();
  }

  public destroy() {
    this.game.endAnimate();
    this.progressbar.domElement?.parentElement.removeChild(this.progressbar.domElement);
    return this;
  }

  public override draw() {
    return this.clearScreen().drawGrid().drawScene();
  }

  public drawScene() {
    const { context } = this;
    return this;
  }

  public configGame() {
    const { game } = this;

    game.paintOverSprites = () => {
      this.paintNearCloud(game.context, 120, 20);
      this.paintNearCloud(game.context, game.context.canvas.width + 120, 20);
    };
    game.paintUnderSprites = () => {
      if (!this.gameOver && this.livesLeft === 0) {
        // over();
      } else {
        this.paintSun(game.context);
        this.paintFarCloud(game.context, 20, 20);
        this.paintFarCloud(game.context, game.context.canvas.width + 20, 20);

        if (!this.gameOver) {
          // this.updateScore();
        }
        //  updateLivesDisplay();
      }
    };
    game.addKeyListener({
      key: 'p',
      listener: () => {
        game.togglePaused();
      },
    });
  }

  public scrollBackground() {
    const { game } = this;
    this.translateOffset = (this.translateOffset + this.translateDelta) % game.context.canvas.width;
    game.context.translate(-this.translateOffset, 0);
  }

  public paintSun(context: CanvasRenderingContext2D) {
    context.save();

    context.strokeStyle = 'orange';
    context.fillStyle = 'yellow';
    context.strokeStyle = 'orange';
    context.lineWidth = 1;

    context.beginPath();
    context.arc(SUN_LEFT, SUN_TOP, SUN_RADIUS, 0, Math.PI * 2, true);
    context.fill();
    context.stroke();

    context.stroke();
    context.restore();
  }

  public paintFarCloud(context: CanvasRenderingContext2D, x: number, y: number) {
    context.save();
    this.scrollBackground();
    context.lineWidth = 0.5;
    context.strokeStyle = 'rgba(100, 140, 230, 0, 0.8)';
    context.fillStyle = 'rgba(255,255,255,0.4)';
    context.beginPath();

    context.moveTo(x + 102, y + 91);
    context.quadraticCurveTo(x + 180, y + 110, x + 250, y + 90);
    context.quadraticCurveTo(x + 312, y + 87, x + 279, y + 60);
    context.quadraticCurveTo(x + 321, y + 20, x + 265, y + 20);
    context.quadraticCurveTo(x + 219, y + 4, x + 171, y + 23);
    context.quadraticCurveTo(x + 137, y + 5, x + 104, y + 18);
    context.quadraticCurveTo(x + 57, y + 23, x + 79, y + 48);
    context.quadraticCurveTo(x + 57, y + 74, x + 104, y + 92);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
  }

  public paintNearCloud(context: CanvasRenderingContext2D, x: number, y: number) {
    context.save();
    this.scrollBackground();
    this.scrollBackground();
    context.lineWidth = 0.5;
    context.strokeStyle = 'rgba(100, 140, 230, 0, 0.8)';
    context.fillStyle = 'rgba(255,255,255,0.4)';
    context.beginPath();

    context.fillStyle = 'rgba(255,255,255,0.7)';

    context.moveTo(x + 364, y + 37);
    context.quadraticCurveTo(x + 426, y + 28, x + 418, y + 72);
    context.quadraticCurveTo(x + 450, y + 123, x + 388, y + 114);
    context.quadraticCurveTo(x + 357, y + 144, x + 303, y + 115);
    context.quadraticCurveTo(x + 251, y + 118, x + 278, y + 83);
    context.quadraticCurveTo(x + 254, y + 46, x + 320, y + 46);
    context.quadraticCurveTo(x + 326, y + 12, x + 362, y + 37);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
  }
}
