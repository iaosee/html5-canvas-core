export interface Point {
  x: number;
  y: number;
}

export interface Vector2d {
  x: number;
  y: number;
}

export interface LineSegment {
  start: Point;
  end: Point;
}

export type Polyline = Array<Point>;

export interface Colorable {
  color?: string;
}

export interface Accelerator {
  gravity?: number;
}

export interface Velocity extends Accelerator {
  velocityX?: number;
  velocityY?: number;
}

export interface Circle extends Colorable, Velocity {
  position: Point;
  radius: number;
}

export interface Letter extends Colorable, Velocity {
  position: Point;
  symbol: string;
  size: number;
}

export interface Rectangle extends Colorable {
  x: number;
  y: number;
  width: number;
  height: number;
}
