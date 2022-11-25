/**
 * @description 给 Context2D 对象上添加绘制虚线的方法，早期 Canvas 规范中没有绘制虚线的方法
 */

export const moveToFucntion = CanvasRenderingContext2D.prototype.moveTo;

CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
  moveToFucntion.apply(this, [x, y]);
  this.lastMoveToLocation.x = x;
  this.lastMoveToLocation.y = y;
};

Object.defineProperty(CanvasRenderingContext2D.prototype, 'lastMoveToLocation', {
  configurable: true,
  enumerable: true,
  value: {},
  writable: true,
});

Object.defineProperty(CanvasRenderingContext2D.prototype, 'dashedLineTo', {
  configurable: true,
  enumerable: true,
  value: function (x: number, y: number, dashLength: number = 5) {
    const startX = this.lastMoveToLocation.x;
    const startY = this.lastMoveToLocation.y;
    const deltaX = x - startX;
    const deltaY = y - startY;
    const numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

    for (let i = 0; i < numDashes; i++) {
      const px = startX + (deltaX / numDashes) * i;
      const py = startY + (deltaY / numDashes) * i;
      i % 2 === 0 ? this.moveTo(px, py) : this.lineTo(px, py);
    }

    this.moveTo(x, y);
  },
  writable: false,
});
