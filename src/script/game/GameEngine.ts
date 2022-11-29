import { Sprite } from '../sprite';

export class GameEngine {
  public gameName: string;
  public context: CanvasRenderingContext2D;

  public sprites: Sprite[] = [];
  public keyListeners: any[] = [];

  public images: Map<string, string> = new Map();
  public imageUrls: string[] = [];
  public imagesIndex: number = 0;
  public imagesLoaded: number = 0;
  public imagesFailedToLoad: number = 0;
  public imageLoadingProgressCallback: () => void;

  public constructor(gameName: string, canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    this.gameName = gameName;
    this.context = canvas.getContext('2d');
  }
}
