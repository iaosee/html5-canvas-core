import { GUI } from 'lil-gui';
import * as Stats from 'stats.js';
import { BaseDemo } from '../base/BaseDemo';
import image_sky from '../../../asset/images/sky.png';
import image_smalltree from '../../../asset/images/smalltree.png';
import image_tree from '../../../asset/images/tree-twotrunks.png';
import image_grass from '../../../asset/images/grass.png';
import image_grass2 from '../../../asset/images/grass2.png';

/**
 * @description 动画 —— 视差滚动
 */
export class Demo extends BaseDemo {
  public name: string = '动画 —— 视差滚动';

  public lastTime = 0;

  public sky: HTMLImageElement;
  public tree: HTMLImageElement;
  public nearTree: HTMLImageElement;
  public grass: HTMLImageElement;
  public grass2: HTMLImageElement;

  public skyOffset: number = 0;
  public treeOffset: number = 0;
  public nearTreeOffset: number = 0;
  public grassOffset: number = 0;
  public grass2Offset: number = 0;

  public config = {
    // pixels/second
    SKY_VELOCITY: 20,
    TREE_VELOCITY: 40,
    FAST_TREE_VELOCITY: 60,
    GRASS_VELOCITY: 100,
  };

  public constructor(public canvas: HTMLCanvasElement) {
    super(canvas);

    this.createControl()
      .initStats()
      .initResource()
      .then((images) => {
        this.sky = images[0];
        this.tree = images[1];
        this.nearTree = images[2];
        this.grass = images[3];
        this.grass2 = images[4];
      })
      .then(() => this.startPlay());
  }

  public static init(canvas: HTMLCanvasElement): Demo {
    return new Demo(canvas);
  }

  public start() {
    return this;
  }

  public draw(timestamp: number) {
    this.clearScreen().drawGrid().drawScene(timestamp);

    this.stats.update();
    this.lastTime = timestamp;

    return this;
  }

  public initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
    return this;
  }

  private createControl() {
    const { config } = this;
    this.gui = new GUI();
    const { gui } = this;

    gui.add(config, 'SKY_VELOCITY').min(10).max(200).step(10);
    gui.add(config, 'TREE_VELOCITY').min(20).max(400).step(10);
    gui.add(config, 'FAST_TREE_VELOCITY').min(30).max(600).step(10);
    gui.add(config, 'GRASS_VELOCITY').min(80).max(800).step(10);

    return this;
  }

  public initResource(): Promise<HTMLImageElement[]> {
    return Promise.all([
      this.loadImage(image_sky),
      this.loadImage(image_smalltree),
      this.loadImage(image_tree),
      this.loadImage(image_grass),
      this.loadImage(image_grass2),
    ]);
  }

  public drawScene(timestamp: number) {
    const { context, canvas, config, sky, tree, nearTree, grass, grass2 } = this;
    const fps = 1000 / (timestamp - this.lastTime);

    this.skyOffset = this.skyOffset < sky.width ? this.skyOffset + config.SKY_VELOCITY / fps : 0;

    this.treeOffset = this.treeOffset < (canvas.width / 6) * 2 ? this.treeOffset + config.TREE_VELOCITY / fps : 0;

    this.nearTreeOffset =
      this.nearTreeOffset < (canvas.width / 4) * 2 ? this.nearTreeOffset + config.FAST_TREE_VELOCITY / fps : 0;

    this.grassOffset = this.grassOffset < grass.width ? this.grassOffset + config.GRASS_VELOCITY / fps : 0;

    context.save();
    context.translate(-this.skyOffset, -1200);
    context.drawImage(sky, 0, canvas.height - sky.height + 80);
    context.drawImage(sky, sky.width - 2, canvas.height - sky.height + 80);
    context.drawImage(sky, (sky.width - 2) * 2, canvas.height - sky.height + 80);
    context.restore();

    context.save();
    context.translate(-this.treeOffset, -1200);
    for (let i = 0; i <= 8; i++) {
      context.drawImage(tree, (canvas.width / 6) * i, canvas.height - tree.height);
    }
    context.restore();

    context.save();
    context.translate(-this.nearTreeOffset, -1200);
    for (let i = 0; i <= 6; i++) {
      context.drawImage(nearTree, (canvas.width / 4) * i, canvas.height - nearTree.height);
    }
    context.restore();

    context.save();
    context.translate(-this.grassOffset, -1200);
    context.drawImage(grass, 0, canvas.height - grass.height);
    context.drawImage(grass, grass.width, canvas.height - grass.height);
    context.drawImage(grass, grass.width * 2, canvas.height - grass.height);
    context.drawImage(grass2, 0, canvas.height - grass2.height);
    context.drawImage(grass2, grass2.width, canvas.height - grass2.height);
    context.drawImage(grass2, grass2.width * 2, canvas.height - grass2.height);
    context.restore();

    return this;
  }
}
