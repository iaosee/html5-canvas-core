# Chapter 02 —— 绘制


## Canvas 坐标系统

Canvas 的坐标系统默认左上角为原点， `X` 轴坐标向右延伸， `Y` 轴坐标向下延伸。

坐标系统可进行改变：

- 平移
- 旋转
- 缩放
- 自定义变换



浏览器的事件对象中的鼠标坐标，是相对于浏览器窗口的坐标，并非实际 Canvas 自身的坐标系统。而我们通常需要知道鼠标发生在 Canvas 中的坐标，而不是相对于窗口的坐标，所以就需要坐标转换。

``` js
function coordinateTransformation(canvas: HTMLCanvasElement, x: number, y: number) {
  const bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width  / bbox.width),
    y: y - bbox.top  * (canvas.height / bbox.height)
  };
}
```


## Canvas 绘制模型

Canvas 渲染图像步骤：

1. 将图形/图像绘制到一个无限大的透明位图中，绘制是使用当前绘制环境样式
2. 将阴影绘制到另一幅为图中，使用当前绘制环境样式
3. 将阴影中每个像素的 `alpha` 分量乘以绘图环境对象的 `globalAlpha` 属性值
4. 将绘有阴影的位图与经过剪辑区域剪切过的 canvas 进行图像合成，使用当前合成模式参数
5. 将图形/图像每个颜色像素分量，乘以绘图环境对象的  `globalAlpha` 属性值
6. 将绘有图形/图形的位图，合成到当前经过剪辑区域裁剪过的 canvas 位图上，使用当前合成参数

**只有在启用阴影效果时才会执行 2 ~ 4 步骤。**

### 绘制矩形

- `clearRect(x, y, weight, height)`   —— 擦除范围内像素
- `strokeRect(x, y, weight, height)`  —— 为矩形描边
- `fillRect(x, y, weight, height)`    —— 填充矩形

描边属性：

- `strokeStyle`     —— 描边颜色
- `lineWidth`     —— 线宽
- `lineJoin`    —— 线连接方式 `round` | `bevel` | `miter` 默认 `miter`
- `miterLimit`    —— 斜接面限制比例 默认 10.0 


## 渐变 和  图案


### 创建渐变

canvas 支持 `线性渐变(linear)` 和 `径向渐变(radial)` 。


**线性渐变** 

需要两个点的坐标，canvas 会根据两点之间的连线来建立渐变效果。

使用 `createLinearGradient(x0, y0, x1, y1)` 方法创建渐变，返回一个 `CanvasGradient` 实例，通过它的 `addColorStop(percentage, color)` 方法添加 `颜色停止点`。


``` js
const gradient = context.createLinearGradient(0, 0, this.centerX, 0);
gradient.addColorStop(0.00, 'blue');
gradient.addColorStop(0.50, 'red');
gradient.addColorStop(1.00, 'yellow');
context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width / 2,  canvas.height / 2);
```


**径向渐变** 


需要两个圆形，canvas 会根据两个圆之间的范围来建立渐变效果。


使用 `createRadialGradient(x0, y0, r0, x1, y1, r1)` 方法创建渐变实例，返回一个 `CanvasGradient` 实例


``` js
const gradient = context.createRadialGradient(
  this.centerX / 2, canvas.height / 2 * 1.5, 20,
  this.centerX / 2, canvas.height / 2 * 1.5, 200
);
gradient.addColorStop(0.0, 'blue');
gradient.addColorStop(0.5, 'yellow');
gradient.addColorStop(1.0, 'white');
context.fillStyle = gradient;
context.fillRect(0, this.centerY, canvas.width / 2, canvas.height / 2);
```


### 创建图案


Canvas 允许使用图案来对图形和文本进行填充和描边，图案可以为这些类型：

- image 元素
- canvas 元素
- video 元素

使用 `createPattern(image, repetition)` 方法创建图案，返回一个 `CanvasPattern` 实例。

- `image` - `HTMLImagesElement | HTMLCanvasElement | HTMLVideoElement`
- `repetition` - `repeat | repeat-x | repeat-y | no-repeat`



### 阴影

可以通过下列 4 个属性值来指定 图形、图像、文本 阴影效果：

- `shadowColor` CSS3 格式支持的颜色值
- `shadowOffsetX` 阴影的水平像素偏移
- `shadowOffsetY` 阴影的垂直像素偏移
- `shadowBlur` 阴影模糊值

将 `shadowColor` 设置为 `underfined` 可以禁用阴影效果。


