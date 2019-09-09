# Chapter 02 —— 绘制


## Canvas 坐标系统

Canvas 的坐标系统默认左上角为原点， `X` 轴坐标向右延伸， `Y` 轴坐标向下延伸。

坐标系统可进行改变：

- 平移
- 旋转
- 缩放
- 自定义变换


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


### 创建渐变

canvas 支持 `先行渐变(linear)` 和 `径向渐变(radial)` 使用 `createLinearGradient(x ,y)` 方法创建渐变，返回一个 `CanvasGradient` 实例，通过它的 `addColorStop(percentage, color)` 方法添加 `颜色停止点`。








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



