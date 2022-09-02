import { IPainter, Sprite } from './Sprite';

export class DoraemonSprite extends Sprite<DoraemonPainter> {
  public constructor(name: string = 'DoraemonSprite') {
    super(name);
    this.painter = new DoraemonPainter();
  }
}

export class DoraemonPainter implements IPainter {
  /**
   * @reference  From https://zhuanlan.zhihu.com/p/28013131
   */
  paint(sprite: Sprite, context: CanvasRenderingContext2D) {
    /* 头部*/
    context.save();
    context.translate(sprite.x, sprite.y);
    context.scale(0.5, 0.5);

    context.beginPath(); // 起始路径
    context.lineWidth = 1; // 线宽度为1
    context.strokeStyle = '#000'; // 笔触的颜色
    context.arc(200, 175, 175, 0.7 * Math.PI, 0.3 * Math.PI); // 绘制弧，中心点（200，175），半径175
    context.fillStyle = '#0bb0da'; // 设置填充时的颜色
    context.fill(); // 填充颜色
    context.stroke(); // 绘制路径

    /*脸部*/
    context.beginPath();
    context.fillStyle = '#fff';
    context.moveTo(110, 110); // 将路径移到点（110，110），不创建线条
    context.quadraticCurveTo(-10, 200, 120, 315); // 创建二次贝塞尔曲线,控制点(-10,200),结束点(120,315)
    context.lineTo(280, 315); // 添加一个新点，然后在画布中创建从（110，110）到（280，315）的线条
    context.quadraticCurveTo(410, 210, 290, 110);
    context.lineTo(110, 110);
    context.fill();
    context.stroke();

    /*眼睛*/
    context.beginPath();
    context.lineWidth = 1;
    context.fillStyle = '#fff';
    context.moveTo(110, 110);
    context.bezierCurveTo(110, 25, 200, 25, 200, 100); // 创建三次贝塞尔曲线,控制点1(110,25),控制点2(200,25),结束点(200,100)，也就是画左上半椭圆
    context.bezierCurveTo(200, 175, 110, 175, 110, 100); // 画左下半椭圆
    context.moveTo(200, 100);
    context.bezierCurveTo(200, 25, 290, 25, 290, 100);
    context.bezierCurveTo(290, 175, 200, 175, 200, 100);
    context.fill();
    context.stroke();

    /*右眼球*/
    context.beginPath();
    context.fillStyle = '#000';
    context.arc(230, 130, 12, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    /*左眼球*/
    context.beginPath();
    context.fillStyle = '#000';
    context.arc(170, 130, 12, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    /* 鼻子*/
    context.beginPath();
    context.arc(200, 165, 25, 0, 2 * Math.PI);
    context.fillStyle = '#d05823';
    context.fill();
    context.stroke();

    /*胡须*/
    // 左胡须
    context.beginPath();
    context.moveTo(80, 175);
    context.lineTo(150, 195);
    context.moveTo(80, 200);
    context.lineTo(150, 205);
    context.moveTo(80, 225);
    context.lineTo(150, 215);

    // 中部胡须
    context.moveTo(200, 195);
    context.lineTo(200, 290);
    // 右胡须
    context.moveTo(250, 195);
    context.lineTo(320, 175);
    context.moveTo(250, 205);
    context.lineTo(320, 200);
    context.moveTo(250, 215);
    context.lineTo(320, 225);
    context.stroke();

    /*嘴*/
    context.moveTo(80, 240);
    context.quadraticCurveTo(200, 350, 320, 240);
    context.stroke();

    /*围巾*/
    context.beginPath();
    context.moveTo(96, 316);
    context.lineTo(305, 316);
    context.lineTo(320, 316);
    context.arcTo(330, 316, 330, 326, 10); // 在画布上创建介于两个切线之间的弧，起点坐标为(330,316),终点坐标为(330,326),半径为10
    context.lineTo(330, 336);
    context.arcTo(330, 346, 305, 346, 10);
    context.lineTo(81, 346);
    context.arcTo(71, 346, 71, 336, 10);
    context.lineTo(71, 326);
    context.arcTo(71, 316, 81, 316, 10);
    context.lineTo(96, 316);
    context.fillStyle = '#b13209';
    context.fill();
    context.stroke();

    /*下半身*/
    context.beginPath();
    context.fillStyle = '#0bb0da';
    context.moveTo(80, 346);
    // 左衣服
    context.lineTo(26, 406);
    context.lineTo(65, 440);
    context.lineTo(85, 418);
    context.lineTo(85, 528);
    context.lineTo(185, 528);
    // 右衣服
    context.lineTo(315, 528);
    context.lineTo(315, 418);
    context.lineTo(337, 440);
    context.lineTo(374, 406);
    context.lineTo(320, 346);
    context.fill();
    context.stroke();

    /*手*/
    // 左手
    context.beginPath();
    context.fillStyle = '#fff';
    context.arc(37, 433, 30, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    // 右手
    context.beginPath();
    context.fillStyle = '#fff';
    context.arc(363, 433, 30, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    /*肚*/
    context.beginPath();
    context.fillStyle = '#fff';
    context.arc(200, 400, 91, 1.8 * Math.PI, 1.2 * Math.PI);
    context.fill();
    context.stroke();
    // 小口袋
    context.beginPath();
    context.fillStyle = '#fff';
    context.moveTo(130, 394);
    context.lineTo(270, 394);
    context.moveTo(130, 394);
    context.bezierCurveTo(130, 490, 270, 490, 270, 394);
    context.fill();
    context.stroke();

    /*两只脚的空隙*/
    context.beginPath();
    context.fillStyle = '#fff';
    context.arc(200, 529, 20, Math.PI, 0);
    context.fill();
    context.stroke();

    /*脚*/
    // 左脚
    context.beginPath();
    context.fillStyle = '#fff';
    context.moveTo(180, 528);
    context.lineTo(72, 528);
    context.bezierCurveTo(52, 528, 52, 558, 72, 558);
    context.lineTo(180, 558);
    context.moveTo(180, 558);
    context.bezierCurveTo(200, 558, 200, 528, 180, 528);
    context.fill();
    context.stroke();

    // 右脚
    context.beginPath();
    context.fillStyle = '#fff';
    context.moveTo(220, 528);
    context.lineTo(328, 528);
    context.bezierCurveTo(348, 528, 348, 558, 328, 558);
    context.lineTo(220, 558);
    context.moveTo(220, 558);
    context.bezierCurveTo(200, 558, 200, 528, 220, 528);
    context.fill();
    context.stroke();
    context.restore();
  }
}
