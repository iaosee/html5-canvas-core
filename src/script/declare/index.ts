export interface Point {
  x: number;
  y: number;
}

export interface LineSegment {
  start: Point;
  end: Point;
}

export type Polyline = Array<Point>;

export interface Accelerator {
  gravity?: number;
}

export interface Velocity extends Accelerator {
  velocityX: number;
  velocityY: number;
}

export interface Circle extends Velocity {
  position: Point;
  radius: number;
  color: string;
}

export interface Letter extends Velocity {
  position: Point;
  symbol: string;
  size: number;
  color: string;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}
