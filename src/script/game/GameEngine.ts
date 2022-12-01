import { Sprite } from '../sprite';

/**
 * @description simple game engine
 *
 */
interface Listener {
  key: string;
  listener: (e: Event) => void;
}

export class GameEngine {
  public gameName: string;
  public context: CanvasRenderingContext2D;

  public sprites: Sprite[] = [];
  public keyListeners: Array<Listener> = [];

  public HIGH_SCORES_SUFFIX = '_highscores';

  public images: Map<string, HTMLImageElement> = new Map();
  public imageUrls: string[] = [];
  public imagesIndex: number = 0;
  public imagesLoaded: number = 0;
  public imagesFailedToLoad: number = 0;
  public imageLoadingProgressCallback: () => void;

  public startTime = 0;
  public lastTime = 0;
  public gameTime = 0;
  public fps = 0;
  public STARTING_FPS = 60;
  public paused = false;
  public startedPauseAt = 0;
  public PAUSE_TIMEOUT = 100;

  public soundOn = true;
  public soundChannels: HTMLAudioElement[] = [];
  public audio = new Audio();
  public NUM_SOUND_CHANNELS = 10;

  public constructor(gameName: string, canvasElem: HTMLCanvasElement) {
    this.gameName = gameName;
    this.context = canvasElem.getContext('2d');

    for (let i = 0; i < this.NUM_SOUND_CHANNELS; ++i) {
      const audio = new Audio();
      this.soundChannels.push(audio);
    }

    window.onkeypress = (e) => {
      this.keyPressed(e);
    };
    window.onkeydown = (e) => {
      this.keyPressed(e);
    };
  }

  public keyPressed(e: KeyboardEvent) {
    let key = undefined;
    switch (e.keyCode) {
      case 32:
        key = 'space';
        break;
      case 68:
        key = 'd';
        break;
      case 75:
        key = 'k';
        break;
      case 83:
        key = 's';
        break;
      case 80:
        key = 'p';
        break;
      case 37:
        key = 'left arrow';
        break;
      case 39:
        key = 'right arrow';
        break;
      case 38:
        key = 'up arrow';
        break;
      case 40:
        key = 'down arrow';
        break;
    }

    const listener = this.findKeyListener(key);
    if (listener) {
      listener();
    }
  }

  public addKeyListener(keyAndListener: Listener) {
    this.keyListeners.push(keyAndListener);
  }

  public findKeyListener(key: string) {
    let listener = undefined;

    for (let i = 0; i < this.keyListeners.length; ++i) {
      const keyAndListener = this.keyListeners[i];
      const currentKey = keyAndListener.key;
      if (currentKey === key) {
        listener = keyAndListener.listener;
      }
    }

    return listener;
  }

  public getImage(imageUrl: string) {
    return this.images.get(imageUrl);
  }

  public imageLoadedCallback(e: Event) {
    this.imagesLoaded++;
  }

  public imageLoadErrorCallback(e: Event) {
    this.imagesFailedToLoad++;
  }

  public loadImage(imageUrl: string) {
    const image = new Image();
    image.src = imageUrl;

    image.addEventListener('load', (e) => {
      this.imageLoadedCallback(e);
    });
    image.addEventListener('error', (e) => {
      this.imageLoadErrorCallback(e);
    });

    this.images.set(imageUrl, image);
  }

  public loadImages() {
    if (this.imagesIndex < this.imageUrls.length) {
      this.loadImage(this.imageUrls[this.imagesIndex]);
      this.imagesIndex++;
    }

    return ((this.imagesLoaded + this.imagesFailedToLoad) / this.imageUrls.length) * 100;
  }

  public queueImage(imageUrl: string) {
    this.imageUrls.push(imageUrl);
  }

  public start() {
    this.startTime = Date.now();

    requestAnimationFrame((time) => {
      this.animate(time);
    });
  }

  public animate(time: number) {
    if (this.paused) {
      setTimeout(() => {
        requestAnimationFrame((time) => {
          this.animate(time);
        });
      }, this.PAUSE_TIMEOUT);

      return;
    }

    this.tick(time); // Update fps, game time
    this.clearScreen(); // Clear the screen in preparation for next frame

    this.startAnimate(time); // Override as you wish
    this.paintUnderSprites(); // Override as you wish

    this.updateSprites(time); // Invoke sprite behaviors
    this.paintSprites(time); // Paint sprites in the canvas

    this.paintOverSprites(); // Override as you wish
    this.endAnimate(); // Override as you wish

    this.lastTime = time;
    requestAnimationFrame((time) => {
      this.animate(time);
    });
  }

  public tick(time: number) {
    this.updateFrameRate(time);
    this.gameTime = Date.now() - this.startTime;
  }

  public updateFrameRate(time: number) {
    if (this.lastTime === 0) {
      this.fps = this.STARTING_FPS;
    } else {
      this.fps = 1000 / (time - this.lastTime);
    }
  }

  public clearScreen() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  public updateSprites(time: number) {
    for (let i = 0; i < this.sprites.length; ++i) {
      const sprite = this.sprites[i];
      sprite.update(this.context, time);
    }
  }

  public paintSprites(time: number) {
    for (let i = 0; i < this.sprites.length; ++i) {
      const sprite = this.sprites[i];
      if (sprite.visible) {
        sprite.paint(this.context);
      }
    }
  }

  public startAnimate(time: number) {}
  public endAnimate() {}
  public paintOverSprites() {}
  public paintUnderSprites() {}

  public togglePaused() {
    const now = Date.now();

    this.paused = !this.paused;

    if (this.paused) {
      this.startedPauseAt = now;
    } else {
      this.startTime = this.startTime + now - this.startedPauseAt;
      this.lastTime = now;
    }
  }

  public pixelsPerFrame(time: number, velocity: number) {
    // Sprites move a certain amount of pixels per frame (pixels/frame).
    // This methods returns the amount of pixels a sprite should move
    // for a given frame. Sprite velocity is measured in pixels / second,
    // so: (pixels/second) * (second/frame) = pixels/frame:
    return velocity / this.fps;
  }

  /** -------------------- Scores -------------------- */
  public getHighScores() {
    const key = this.gameName + this.HIGH_SCORES_SUFFIX;
    const highScoresString = localStorage[key];

    if (highScoresString == undefined) {
      localStorage[key] = JSON.stringify([]);
    }
    return JSON.parse(localStorage[key]);
  }

  public setHighScore(highScore: number) {
    const key = this.gameName + this.HIGH_SCORES_SUFFIX;
    const highScoresString = localStorage[key] || '[]';
    const highScores = JSON.parse(highScoresString);
    highScores.unshift(highScore);
    localStorage[key] = JSON.stringify(highScores);
  }

  public clearHighScores() {
    localStorage[this.gameName + this.HIGH_SCORES_SUFFIX] = JSON.stringify([]);
  }

  /** -------------------- Sound -------------------- */
  public canPlayOggVorbis() {
    return '' != this.audio.canPlayType('audio/ogg; codecs="vorbis"');
  }

  public canPlayMp3() {
    return '' != this.audio.canPlayType('audio/mpeg');
  }

  public getAvailableSoundChannel() {
    let audio: HTMLAudioElement;

    for (let i = 0; i < this.NUM_SOUND_CHANNELS; ++i) {
      audio = this.soundChannels[i];
      if (audio.played.length === 0 || audio.ended) {
        return audio;
      }
    }

    return undefined;
  }

  public playSound(id: string) {
    const channel = this.getAvailableSoundChannel();
    const element = document.getElementById(id) as HTMLAudioElement;

    if (channel && element) {
      channel.src = element.src === '' ? element.currentSrc : element.src;
      channel.load();
      channel.play();
    }
  }

  public addSprite(sprite: Sprite) {
    this.sprites.push(sprite);
  }

  public getSprite(name: string) {
    for (const i in this.sprites) {
      if (this.sprites[i].name === name) return this.sprites[i];
    }
    return null;
  }
}
