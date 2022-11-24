import { Point } from './Point';
import { Vector } from './Vector';
import { Circle } from './Circle';
import { Polygon } from './Polygon';

export function getPolygonPointClosestToCircle(polygon: Polygon, circle: Circle) {
  let min = 10000;
  let closestPoint: Point;

  for (var i = 0; i < polygon.points.length; ++i) {
    const testPoint = polygon.points[i];
    const length = Math.sqrt(Math.pow(testPoint.x - circle.x, 2) + Math.pow(testPoint.y - circle.y, 2));
    if (length < min) {
      min = length;
      closestPoint = testPoint;
    }
  }

  return closestPoint;
}

export function polygonCollidesWithCircle(polygon: Polygon, circle: Circle): boolean {
  const axes = polygon.getAxes();
  const closestPoint = getPolygonPointClosestToCircle(polygon, circle);

  const v1 = new Vector(circle.x, circle.y);
  const v2 = new Vector(closestPoint.x, closestPoint.y);

  axes.push(v1.subtract(v2).normalize());

  return !polygon.separationOnAxes(axes, circle);
}

export function polygonCollidesWithPolygon() {}
