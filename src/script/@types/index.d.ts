import { Point } from '../interfaces';

interface CanvasRenderingContext2D {
  lastMoveToLocation: Point;
  dashedLineTo(x: number, y: number, dashLength: number): void;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.gif';
declare module '*.mp4';
