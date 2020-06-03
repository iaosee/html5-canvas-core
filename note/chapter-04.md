# Chapter 04 —— 图像与视频


## 图像操作 API 

图像操作相关接口：

- `drawImage()` 该方法有三个重载方式 [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)
- `getImageData()` [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)
- `putImageData()` [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData)
- `createImageData()` [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createImageData)

`drawImage()` 方法第一个参数可以接收 `CanvasImageSource` 类型的参数


## 离屏 Canvas

离屏 Canvas 非常有用，可以提高绘制效率。要使用离屏 Canvas 遵循一下四个步骤：

- 创建用作离屏绘制的 Canvas 元素
- 设置离屏 Canvas 的宽高
- 在离屏 Canvas 中进行绘制
- 将离屏 Canvas 中的全部或部分内容复制到显示的 Canvas 中

代码：

``` js
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const offScreenCanvas = document.createElement('canvas');
const offScreenContext = offScreenCanvas.getContext('2d');

offScreenContext.width = canvas.width;
offScreenContext.height = canvas.height;

offScreenContext.drawImage(image, 0, 0);
context.drawImage(offScreenCanvas, 0, 0);
```


## 操作图形像素

 `getImageData()` / `putImageData()`  两个方法分别用于获取像素和填充像素，同时也可以修改像素中的值以达到预期效果。

 `getImageData()` 方法返回一个 `ImageData` 类型对象，包含三个属性:
 
 - `width` 以设备像素为单位的图像数据宽度
 - `height` 以设备像素为单位的图像数据高度
 - `data` 包含各个设备像素值得数组，每个值中包含的颜色分量，都是含有 8 个二进制的整数, 使用 `TypedArray` 形式 `ArrayBuffer` 来存储数据

 





