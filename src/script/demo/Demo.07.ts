import { GUI } from 'lil-gui';

import { Random } from '../tools/Random';
import { BaseDemo } from '../base/BaseDemo';
import { Point, Letter } from '../interfaces';

/**
 * @description 字母连接
 */
export class Demo extends BaseDemo {
  public override name: string = '移动的字符';
  private letters: Array<Letter> = [];
  private random: Random = Random.init(-5, 5);
  private letterString: string[] = 'abcdefghijklmnopqrstuvwxyz~!@#$%^&*()_+`1234567890-=[];\',./<>?:"{}'.split('');
  private emojiString: string[] = [
    '😀',
    '😁',
    '😂',
    '🤣',
    '😃',
    '😄',
    '😅',
    '😆',
    '😉',
    '😊',
    '😋',
    '😎',
    '😍',
    '😘',
    '🥰',
    '😗',
    '😙',
    '😚',
    '🙂',
    '🤗',
    '🤩',
    '🤔',
    '🤨',
    '😐',
    '😑',
    '😶',
    '🙄',
    '😏',
    '😣',
    '😥',
    '😮',
    '🤐',
    '😯',
    '😪',
    '😫',
    '🥱',
    '😴',
    '😌',
    '😛',
    '😜',
    '😝',
    '🤤',
    '😒',
    '😓',
    '😔',
    '😕',
    '🙃',
    '🤑',
    '😲',
    '🙁',
    '😖',
    '😞',
    '😟',
    '😤',
    '😢',
    '😭',
    '😦',
    '😧',
    '😨',
    '😩',
    '🤯',
    '😬',
    '😰',
    '😱',
    '🥵',
    '🥶',
    '😳',
    '🤪',
    '😵',
    '🥴',
    '😠',
    '😡',
    '🤬',
    '😷',
    '🤒',
    '🤕',
    '🤢',
    '🤮',
    '🤧',
    '😇',
    '🥳',
    '🥺',
    '🤠',
    '🤡',
    '🤥',
    '🤫',
    '🤭',
    '🧐',
    '🤓',
    '😈',
    '👿',
    '👹',
    '👺',
    '💀',
    '👻',
    '👽',
    '👾',
    '🤖',
    '💩',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
    '😽',
    '🙀',
    '😿',
    '😾',
    '🐱‍👤',
    '🐱‍🏍',
    '🐱‍💻',
    '🐱‍🐉',
    '🐱‍👓',
    '🐱‍🚀',
    '🙈',
    '🙉',
    '🙊',
    '🐵',
    '🐶',
    '🐺',
    '🐱',
    '🦁',
    '🐯',
    '🦒',
    '🦊',
    '🦝',
    '🐮',
    '🐷',
    '🐗',
    '🐭',
    '🐹',
    '🐰',
    '🐻',
    '🐨',
    '🐼',
    '🐸',
    '🦓',
    '🐴',
    '🦄',
    '🐔',
    '🐲',
    '🐽',
    '🐾',
    '🐒',
    '🦍',
    '🦧',
    '🦮',
    '🐕‍🦺',
    '🐩',
    '🐕',
    '🐈',
    '🐅',
    '🐆',
    '🐎',
    '🦌',
    '🦏',
    '🦛',
    '🐂',
    '🐃',
    '🐄',
    '🐖',
    '🐏',
    '🐑',
    '🐐',
    '🐪',
    '🐫',
    '🦙',
    '🦘',
    '🦥',
    '🦨',
    '🦡',
    '🐘',
    '🐁',
    '🐀',
    '🦔',
    '🐇',
    '🐿',
    '🦎',
    '🐊',
    '🐢',
    '🐍',
    '🐉',
    '🦕',
    '🦖',
    '🦦',
    '🦈',
    '🐬',
    '🐳',
    '🐋',
    '🐟',
    '🐠',
    '🐡',
    '🦐',
    '🐙',
    '🦑',
    '🦞',
    '🦀',
    '🐚',
    '🦆',
    '🐓',
    '🦃',
    '🦅',
    '🦢',
    '🦜',
    '🦩',
    '🦚',
    '🦉',
    '🐦',
    '🐧',
    '🐥',
    '🐤',
    '🐣',
    '🦇',
    '🦋',
    '🐌',
    '🐛',
    '🦟',
    '🦗',
    '🐜',
    '🐝',
    '🐞',
    '🦂',
    '🦠',
    '🧞‍♀️',
    '🧞‍♂️',
    '👤',
    '👥',
    '👀',
    '🦴',
    '🦷',
    '👄',
  ];

  private mousePosition: Point = { x: 0, y: 0 };
  public config: any = {
    quantity: 100,
    letterType: 1,
    lineType: 0,
    displayLetter: true,
  };

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl().createLetter(null, this.config.quantity).listenEvents();
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public override draw() {
    return this.clearScreen().drawGrid().drawLines().drawLetters();
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui
      .add(config, 'quantity')
      .min(5)
      .max(500)
      .step(5)
      .onFinishChange((v: any) => {
        config.quantity = Number(v);
        this.createLetter(this.center, config.quantity, true);
      });
    gui.add(config, 'letterType', { char: 1, emoji: 2 }).onFinishChange((v: any) => {
      config.letterType = Number(v);
      this.createLetter(this.center, config.quantity, true);
    });
    gui.add(config, 'lineType', { none: 0, ligature: 1, breaking: 2, connection: 3 }).onFinishChange((v: any) => {
      config.lineType = Number(v);
    });
    gui.add(config, 'displayLetter').onFinishChange((v: any) => {
      config.displayLetter = Boolean(v);
    });

    return this;
  }

  private createLetter(position?: Point, quantity: number = 50, clean: boolean = false) {
    const { config } = this;
    const characters = config.letterType === 1 ? this.letterString : this.emojiString;

    position = position || {
      x: this.random.range(0, this.width).getOne(),
      y: this.random.range(0, this.height).getOne(),
    };

    clean && this.letters.splice(0, this.letters.length);

    for (let i = 0; i < quantity; i++) {
      const point: Point = {
        x: position.x || this.centerX,
        y: position.y || this.centerY,
      };
      const randIndex = this.random.range(0, characters.length - 1).getOne();

      this.letters.push({
        position: point,
        velocityX: Math.random() * (this.random.range(-4, 4).getOne() || 4),
        velocityY: Math.random() * (this.random.range(-4, 4).getOne() || 4),
        color: this.randomRgba(),
        size: this.random.range(12, 50).getOne(),
        symbol: characters[randIndex],
      });
    }

    return this;
  }

  private drawLetters() {
    const { letters, config, context } = this;

    for (let i = 0, len = letters.length; i < len; i++) {
      this.updatePosition(letters[i]);

      if (!config.displayLetter) {
        continue;
      }

      context.fillStyle = letters[i].color;
      context.font = `${letters[i].size}px Palatino`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(letters[i].symbol, letters[i].position.x, letters[i].position.y);
    }

    return this;
  }

  private drawLines() {
    const { config, context, letters } = this;

    switch (config.lineType) {
      case 1:
        context.beginPath();
        context.moveTo(letters[0].position.x, letters[0].position.y);
        for (let i = 1, iLen = letters.length; i < iLen; i++) {
          context.strokeStyle = letters[i].color;
          context.lineTo(letters[i].position.x, letters[i].position.y);
        }
        context.closePath();
        context.stroke();

        break;
      case 2:
        context.beginPath();
        for (let i = 0, iLen = letters.length; i < iLen; i++) {
          context.strokeStyle = letters[i].color;
          for (let j = i + 1, jLen = letters.length; j < jLen; j++) {
            const xDistance = Math.pow(letters[j].position.x - letters[i].position.x, 2);
            const yDistance = Math.pow(letters[j].position.y - letters[i].position.y, 2);
            const distance = Math.sqrt(xDistance + yDistance);
            if (Math.abs(distance) > 100) {
              continue;
            }
            context.moveTo(letters[i].position.x, letters[i].position.y);
            context.lineTo(letters[j].position.x, letters[j].position.y);
          }

          if (this.mousePosition.x === 0 && this.mousePosition.y === 0) {
            continue;
          }
          const xMouseDistance = Math.pow(this.mousePosition.x - letters[i].position.x, 2);
          const yMouseDistance = Math.pow(this.mousePosition.y - letters[i].position.y, 2);
          const mDistance = Math.sqrt(xMouseDistance + yMouseDistance);
          if (Math.abs(mDistance) > 150) {
            continue;
          }
          context.moveTo(this.mousePosition.x, this.mousePosition.y);
          context.lineTo(letters[i].position.x, letters[i].position.y);
        }
        context.closePath();
        context.stroke();

        break;

      case 3:
        context.beginPath();
        for (let i = 0, iLen = letters.length; i < iLen; i++) {
          context.strokeStyle = letters[i].color;
          for (let j = i + 1, jLen = letters.length; j < jLen; j++) {
            context.moveTo(letters[i].position.x, letters[i].position.y);
            context.lineTo(letters[j].position.x, letters[j].position.y);
          }
        }
        context.closePath();
        context.stroke();

        break;

      case 0:
      default:
        break;
    }

    return this;
  }

  private updatePosition(letter: Letter) {
    const { canvas } = this;

    if (letter.position.x + letter.velocityX > this.width || letter.position.x + letter.velocityX < 0) {
      letter.velocityX = -letter.velocityX;
    }
    if (letter.position.y + letter.velocityY > this.height || letter.position.y + letter.velocityY < 0) {
      letter.velocityY = -letter.velocityY;
    }

    letter.position.x += letter.velocityX;
    letter.position.y += letter.velocityY;

    return this;
  }

  private listenEvents() {
    const { canvas } = this;
    const clickHandler = (e: MouseEvent) => {
      const coordinate: Point = this.coordinateTransformation(e.clientX, e.clientY);
      this.createLetter(coordinate, 20, false);
    };
    const moveHandler = (e: MouseEvent) => {
      const coordinate: Point = this.coordinateTransformation(e.clientX, e.clientY);
      this.mousePosition = coordinate;
    };

    canvas.addEventListener('mousemove', moveHandler, false);
    canvas.addEventListener('click', clickHandler, false);
  }
}
