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
 - `data` 包含各个设备像素值得数组，每个值中包含的颜色分量，都是含有 8 位二进制的整数, 使用 `TypedArray` 形式 `ArrayBuffer` 来存储数据


``` js
imgdata.data[0]       // red
imgdata.data[0]       // green
imgdata.data[0]       // blue
imgdata.data[0]       // alpha

imgdata.data[n - 4]   // red
imgdata.data[n - 3]   // green
imgdata.data[n - 2]   // blue
imgdata.data[n - 1]   // alpha
```
 
### 常用图像像素遍历方式

``` js

const imgdata = context.getImageData(0, 0, canvas.width, canvas.height);
const data = imgdata.data;
const length = imgdata.data.length;
const width = imgdata.width;

// 遍历每个像素
for (let i = 0; i < length; i++) {
  data[i]
}

// 反向遍历每个像素
let i = length - 1;
while (i >= 0) {
  data[i--]
}

// 只处理 alpha 值，不改变 r,g,b
for (let i = 3; i < length - 4; i += 4) {
  data[i]
}

// 只处理  r,g,b 值，不改变 alpha
for (let i = 0; i < length - 4; i += 4) {
  data[i]               // red
  data[i + 1]           // green
  data[i + 2]           // blue
}

```

### 常见图像滤镜

**负片滤镜**

``` js
for (let i = 0; i < length - 4; i += 4) {
  data[i] = 255 - data[i];
  data[i + 1] = 255 - data[i + 1];
  data[i + 2] = 255 - data[i + 2];
}
```

**黑白滤镜**

``` js
for (let i = 0; i < length - 4; i += 4) {
  const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
  data[i] = average;
  data[i + 1] = average;
  data[i + 2] = average;
}
```

**浮雕滤镜**

``` js
for (let i = 0; i < length; i++) {
  // 防止超出边界
  if (i <= length - width * 4) {
    // 不是 alpha
    if ((i + 1) % 4 !== 0) {
      // 如果是一行的最后一个像素，右边不会有像素，拷贝前一个像素值
      if ((i + 4) % (width * 4) === 0) {
        data[i] = data[i - 4];
        data[i + 1] = data[i - 3];
        data[i + 2] = data[i - 2];
        data[i + 3] = data[i - 1];
        i += 4;
      } else {
        // 不是一行的最后一个像素
        data[i] =
          255 / 2 + // Average value
          2 * data[i] - // current pixel
          data[i + 4] - // next pixel
          data[i + width * 4]; // pixel underneath
      }
    }
  } else { 
    // 最后一行，下方没有像素，拷贝上方像素
    if ( (i + 1) % 4 !== 0) {
      data[i] = data[i - width * 4];
    }
  }
}
```

**墨镜滤镜**

``` js 
for (let i = 0; i < length - 4; i++) {
  if ((i + 1) % 4 !== 0) {
    if ( (i + 4) % (width * 4) === 0) {
      data[i] = data[i - 4];
      data[i + 1] = data[i - 3];
      data[i + 2] = data[i - 2];
      data[i + 3] = data[i - 1];
      i += 4;
    } else {
      data[i] = 2 * data[i] - data[i + 4] - 0.5 * data[i + 4];
    }
  }
}
```

### 图像处理性能问题

在处理大图像数据时，很容易遇到性能瓶颈，可以考虑将图像处理的任务交给工作线程 —— [`Web Worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 来处理，这样将耗时的数据处理代码放在主线程之外执行。


