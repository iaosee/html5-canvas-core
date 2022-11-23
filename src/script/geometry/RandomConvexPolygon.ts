import { Point } from './Point';
import { Vector } from './Vector';

/**
 * @description 随机凸多边形生成算法
 * - https://kingins.cn/2022/02/18/随机凸多边形生成算法/
 */
export class RandomConvexPolygon {
  private maxWidth = 200;
  private maxHeight = 200;

  public constructor(config?: { maxWidth: number; maxHeight: number }) {
    this.maxWidth = config?.maxWidth || this.maxWidth;
    this.maxHeight = config?.maxHeight || this.maxHeight;
  }

  public setWidth(width: number) {
    this.maxWidth = width;
    return this;
  }

  public setHeight(height: number) {
    this.maxHeight = height;
    return this;
  }

  public getConvex(edges: number): Point[] {
    const xPool = [];
    const yPool = [];
    for (let i = 0; i < edges; i++) {
      xPool[i] = Math.random();
      yPool[i] = Math.random();
    }

    xPool.sort((a, b) => a - b);
    yPool.sort((a, b) => a - b);

    const minX = xPool[0];
    const maxX = xPool[edges - 1];
    const minY = yPool[0];
    const maxY = yPool[edges - 1];

    const xVec = [];
    const yVec = [];

    let lastTop = minX,
      lastBottom = minX;
    for (let i = 1; i < edges - 1; i++) {
      const x = xPool[i];
      if (Math.random() > 0.5) {
        xVec.push(x - lastTop);
        lastTop = x;
      } else {
        xVec.push(lastBottom - x);
        lastBottom = x;
      }
    }
    xVec.push(maxX - lastTop);
    xVec.push(lastBottom - maxX);

    let lastLeft = minY,
      lastRight = minY;
    for (let i = 1; i < edges - 1; i++) {
      const y = yPool[i];
      if (Math.random() > 0.5) {
        yVec.push(y - lastLeft);
        lastLeft = y;
      } else {
        yVec.push(lastRight - y);
        lastRight = y;
      }
    }
    yVec.push(maxY - lastLeft);
    yVec.push(lastRight - maxY);

    // yVec.shuffle();
    yVec.sort(() => 0.5 - Math.random());

    const vectors: Vector[] = [];
    for (let i = 0; i < edges; i++) {
      vectors[i] = new Vector(xVec[i], yVec[i]);
    }

    vectors.sort((a, b) => Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x));

    let point = new Vector(0, 0);
    let minPolygonX = 0;
    let minPolygonY = 0;
    const points: Vector[] = [];
    const result: Point[] = [];

    for (let i = 0; i < edges; i++) {
      const p = point.add(vectors[i]);
      points.push(p);
      point = p;
      minPolygonX = Math.min(minPolygonX, p.x);
      minPolygonY = Math.min(minPolygonY, p.y);
    }

    const translation = new Vector(minX - minPolygonX, minY - minPolygonY);
    for (let i = 0; i < edges; i++) {
      const p = points[i].add(translation);
      points[i] = p;
      result.push(new Point(p.x * this.maxWidth, p.y * this.maxHeight));
    }

    return result;
  }
}
