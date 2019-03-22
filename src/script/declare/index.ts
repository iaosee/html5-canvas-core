
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
