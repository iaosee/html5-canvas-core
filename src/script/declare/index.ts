
export interface Point {
  x: number;
  y: number;
};


export interface Circle {
  position: Point;
  velocityX: number;
  velocityY: number;
  radius: number;
  color: string;
}

export interface Letter {
  position: Point;
  velocityX: number;
  velocityY: number;
  symbol: string;
  size: number;
  color: string;
}

export interface Rectangle {
  x: number;
  y: number,
  width: number;
  height: number;
  color: string;
}
