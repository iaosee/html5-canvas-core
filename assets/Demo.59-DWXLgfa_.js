var u=Object.defineProperty;var y=(l,r,t)=>r in l?u(l,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[r]=t;var a=(l,r,t)=>y(l,typeof r!="symbol"?r+"":r,t);import{P as s,B as x}from"./BaseDemo-DB1y7toB.js";import{P as m}from"./Polygon-DGNxmrap.js";import{S as f}from"./Sprite-9nB6cOPC.js";import{I as P}from"./ImagePainter-B-NpNDxt.js";import{g as S}from"./golfball-fqIsnLt-.js";class v extends m{constructor(t){super(t);a(this,"image");a(this,"imageLoaded",!1);this.image=new Image,this.points=[new s(t.x,t.y)],this.image.src=t.imageSource,this.image.addEventListener("load",o=>{this.setPolygonPoints(),this.imageLoaded=!0},!1)}setPolygonPoints(){this.points.push(new s(this.x+this.image.width,this.y)),this.points.push(new s(this.x+this.image.width,this.y+this.image.height)),this.points.push(new s(this.x,this.y+this.image.height))}drawImage(t){t.drawImage(this.image,this.points[0].x,this.points[0].y)}fill(t){return this}stroke(t){return this.imageLoaded?t.drawImage(this.image,this.points[0].x,this.points[0].y):this.image.addEventListener("load",o=>this.drawImage(t),!1),this}}class B extends m{constructor(t){super(t);a(this,"sprite");this.sprite=t.sprite,this.sprite.left=this.x,this.sprite.top=this.y,this.setPolygonPoints()}setPolygonPoints(){this.points.push(new s(this.x,this.y)),this.points.push(new s(this.x+this.sprite.width,this.y)),this.points.push(new s(this.x+this.sprite.width,this.y+this.sprite.height)),this.points.push(new s(this.x,this.y+this.sprite.height))}move(t,o){for(var e=0;e<this.points.length;++e){const n=this.points[e];n.x+=t,n.y+=o}return this.sprite.left=this.points[0].x,this.sprite.top=this.points[0].y,this}fill(t){return this}stroke(t){return this.sprite.paint(t),this}}const E="/html5-canvas-core/assets/tennis-ball-CH_SWiWJ.png";class c extends x{constructor(t){super(t);a(this,"name","碰撞检测 — 分离轴定理");a(this,"shapes",[]);a(this,"shapeBeingDragged");a(this,"mousedownPos",new s(0,0));a(this,"mousemovePos",new s(0,0));a(this,"polygonPoints",[[new s(100,100),new s(100,200),new s(200,200)],[new s(300,100),new s(300,200),new s(400,200),new s(400,100)],[new s(500,100),new s(475,200),new s(600,200),new s(625,100)]]);this.canvas=t,this.initShapes().listenEvents()}static init(t){return new c(t)}start(){return this.draw()}draw(){return this.clearScreen().drawGrid().drawScene()}initShapes(){const{polygonPoints:t}=this,o=this.polygonPoints.length;for(let n=0;n<o;++n){const i=new m,d=t[n];i.setPoints(d),i.name=`Polygon ${n}`,i.strokeStyle=this.randomRgba(),i.fillStyle=this.randomRgba(),this.shapes.push(i)}const e=new f("ball",new P(E));return e.left=200,e.top=200,e.width=79,e.height=79,this.shapes.push(new v({name:"golfball",imageSource:S,x:50,y:300})),this.shapes.push(new B({name:"spriteBall",sprite:e,x:e.left,y:e.top})),this}drawShapes(){const{context:t}=this;this.shapes.forEach(o=>{o.stroke(t),o.fill(t)})}drawScene(){return this.drawShapes(),this}detectCollisions(){const{context:t,shapes:o,shapeBeingDragged:e}=this;let n=30;if(e)return t.save(),t.font="20px Palatino",o.forEach(i=>{i!==e&&e.collidesWith(i)&&(t.lineWidth=10,t.fillStyle="red",t.strokeStyle="red",t.fillText(`${e.name} Collision with ${i.name}`,20,n),t.strokeRect(0,0,this.width,this.height),n+=40)}),t.restore(),this}listenEvents(){const{canvas:t,context:o,dpr:e,mousedownPos:n,mousemovePos:i,shapes:d}=this;return t.addEventListener("mousedown",p=>{const h=this.coordinateTransformation(p.clientX,p.clientY);d.forEach(g=>{g.isPointInPath(o,h.x*e,h.y*e)&&(this.shapeBeingDragged=g,n.x=h.x,n.y=h.y,i.x=h.x,i.y=h.y)})}),t.addEventListener("mousemove",p=>{var w;const h=this.coordinateTransformation(p.clientX,p.clientY);if(!this.shapeBeingDragged)return;const g={x:h.x-i.x,y:h.y-i.y};(w=this.shapeBeingDragged)==null||w.move(g.x,g.y),i.x=h.x,i.y=h.y,this.draw(),this.detectCollisions()}),t.addEventListener("mouseup",p=>{this.shapeBeingDragged=null}),this}}export{c as Demo};
