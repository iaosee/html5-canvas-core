export class Canvas2DContext {
  private context: CanvasRenderingContext2D;

  public constructor(canvas: HTMLCanvasElement) {
    if (!(this instanceof Canvas2DContext)) {
      return new Canvas2DContext(canvas);
    }
    this.context = this.context = canvas.getContext('2d');

    if (!(Canvas2DContext.prototype as any).arc) {
      Canvas2DContext.setup.call(this, this.context);
    }
  }

  public static setup() {
    const methods = [
      'arc',
      'arcTo',
      'beginPath',
      'bezierCurveTo',
      'clearRect',
      'clip',
      'closePath',
      'drawImage',
      'fill',
      'fillRect',
      'fillText',
      'lineTo',
      'moveTo',
      'quadraticCurveTo',
      'rect',
      'restore',
      'rotate',
      'save',
      'scale',
      'setTransform',
      'stroke',
      'strokeRect',
      'strokeText',
      'transform',
      'translate'
    ];

    const getterMethods = [
      'createPattern',
      'drawFocusRing',
      'isPointInPath',
      'measureText', // drawFocusRing not currently supported
      // The following might instead be wrapped to be able to chain their child objects
      'createImageData',
      'createLinearGradient',
      'createRadialGradient',
      'getImageData',
      'putImageData'
    ];

    const props = [
      'canvas',
      'fillStyle',
      'font',
      'globalAlpha',
      'globalCompositeOperation',
      'lineCap',
      'lineJoin',
      'lineWidth',
      'miterLimit',
      'shadowOffsetX',
      'shadowOffsetY',
      'shadowBlur',
      'shadowColor',
      'strokeStyle',
      'textAlign',
      'textBaseline'
    ];

    for (const method of methods) {
      (Canvas2DContext.prototype as any)[method] = function() {
        this.context[method].apply(this.context, arguments);
        return this;
      };
    }

    for (const method of getterMethods) {
      (Canvas2DContext.prototype as any)[method] = function() {
        return this.context[method].apply(this.context, arguments);
      };
    }

    for (const prop of props) {
      (Canvas2DContext.prototype as any)[prop] = function(value: any) {
        if (value === undefined) {
          return this.context[prop];
        }
        this.context[prop] = value;
        return this;
      };
    }
  }
}
