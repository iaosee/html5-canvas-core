import { Sprite } from '../sprite';

/**
 * @description simple game engine
 *
 */
export class GameEngine {
  public gameName: string;
  public context: CanvasRenderingContext2D;

  public sprites: Sprite[] = [];
  public keyListeners: any[] = [];

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
  public paused = 60;
  public startedPauseAt = 60;
  public PAUSE_TIMEOUT = 60;

  public soundOn = true;
  public soundChannels: HTMLAudioElement[] = [];
  public audio = new Audio();
  public NUM_SOUND_CHANNELS = 10;

  public constructor(gameName: string, canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    this.gameName = gameName;
    this.context = canvas.getContext('2d');

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
      this.animate.call(this, time);
    });
  }

  public animate(time: number) {
    if (this.paused) {
      setTimeout(() => {
        requestAnimationFrame((time) => {
          this.animate.call(self, time);
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
      this.animate.call(self, time);
    });
  }

  public tick(time: number) {}

  public clearScreen() {}

  public startAnimate(time: number) {}

  public paintUnderSprites() {}

  public updateSprites(time: number) {}

  public paintSprites(time: number) {}

  public paintOverSprites() {}

  public endAnimate() {}
}
