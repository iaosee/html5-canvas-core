import { Point } from './Point';
import { Vector } from './Vector';
import { Shape } from './Shape';
import { Circle } from './Circle';
import { Polygon } from './Polygon';
import { MinimumTranslationVector } from './MinimumTranslationVector';

export function getCircleAxis(circle: Circle, closestPoint: Point, polygon?: Polygon) {
  const v1 = new Vector(circle.x, circle.y);
  const v2 = new Vector(closestPoint.x, closestPoint.y);
  const surfaceVector = v1.subtract(v2);
  return surfaceVector.normalize();
}

export function getPolygonPointClosestToCircle(polygon: Polygon, circle: Circle) {
  let min = 1000000;
  let closestPoint: Point;

  for (var i = 0; i < polygon.points.length; ++i) {
    const testPoint = polygon.points[i];
    const length = testPoint.distance(new Point(circle.x, circle.y));
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

export function circleCollidesWithCircle(c1: Circle, c2: Circle): MinimumTranslationVector {
  const distance = Math.sqrt(Math.pow(c2.x - c1.x, 2) + Math.pow(c2.y - c1.y, 2));
  const overlap = Math.abs(c1.radius + c2.radius) - distance;

  return overlap < 0 ? new MinimumTranslationVector(undefined, 0) : new MinimumTranslationVector(undefined, overlap);
}

export function polygonCollidesWithPolygon(
  shape1: Shape,
  shape2: Shape,
  displacement?: number
): MinimumTranslationVector {
  const mtv1 = shape1.minimumTranslationVector(shape1.getAxes(), shape2, displacement);
  const mtv2 = shape1.minimumTranslationVector(shape2.getAxes(), shape2, displacement);

  if (mtv1.overlap === 0 || mtv2.overlap === 0) {
    return new MinimumTranslationVector(undefined, 0);
  }

  return mtv1.overlap < mtv2.overlap ? mtv1 : mtv2;
}

export const BIG_NUMBER = 1000000;

function getMTV(shape1: Shape, shape2: Shape, axes: Vector[], displacement?: number) {
  let minimumOverlap = BIG_NUMBER;
  let axisWithSmallestOverlap;

  for (var i = 0; i < axes.length; ++i) {
    const axis = axes[i];
    const projection1 = shape1.project(axis);
    const projection2 = shape2.project(axis);
    const overlap = projection1.getOverlap(projection2);

    if (overlap === 0) {
      return new MinimumTranslationVector(undefined, 0);
    }
    if (overlap < minimumOverlap) {
      minimumOverlap = overlap;
      axisWithSmallestOverlap = axis;
    }
  }
  return new MinimumTranslationVector(axisWithSmallestOverlap, minimumOverlap);
}
