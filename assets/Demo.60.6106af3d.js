import{G as u}from"./lil-gui.esm.7a5dd4ff.js";import{B as w,P as o}from"./BaseDemo.deaf79c0.js";import{P as d,C as g}from"./Polygon.fb0fffd3.js";import{R as f}from"./index.941fc2b4.js";import{C as p}from"./CircleImage.61806950.js";import{R as y}from"./RandomConvexPolygon.267444ef.js";import{g as x}from"./golfball.de451e99.js";class m extends w{constructor(t){super(t),this.canvas=t,this.name="\u78B0\u649E\u68C0\u6D4B \u2014 \u968F\u673A\u591A\u8FB9\u5F62",this.shapes=[],this.mousedownPos=new o(0,0),this.mousemovePos=new o(0,0),this.randomPolygon=new y({maxWidth:200,maxHeight:200}),this.polygonPoints=[[new o(100,100),new o(100,200),new o(200,200)],[new o(300,100),new o(300,200),new o(400,200),new o(400,100)],[new o(500,100),new o(475,200),new o(600,200),new o(625,100)]],this.config={boundingBox:!1,centroid:!1},this.createControl().initShapes().listenEvents()}static init(t){return new m(t)}createControl(){const{config:t}=this;this.gui=new u;const{gui:i}=this;return i.add(t,"boundingBox").onFinishChange(e=>this.drawScene()),i.add(t,"centroid").onFinishChange(e=>this.drawScene()),this}start(){return this.draw()}draw(){return this.drawScene()}initShapes(){const{polygonPoints:t}=this,i=this.polygonPoints.length;for(let e=0;e<i;++e){const n=new d,s=t[e];n.setPoints(s),n.name=`Polygon ${e}`,n.strokeStyle=this.randomRgba(),n.fillStyle=this.randomRgba(),this.shapes.push(n)}for(let e=0;e<2;e++)for(let n=0;n<5;n++){const s=this.randomPolygon.getConvex(f.init(4,10).random()),a=new d;a.setPoints(s),a.move(n*200,(e+1)*200),a.name=`Polygon ${e}-${n}`,a.strokeStyle=this.randomRgba(),a.fillStyle=this.randomRgba(),this.shapes.push(a)}return this.shapes.push(new g({name:"circle 1",x:100,y:50,radius:30})),this.shapes.push(new g({name:"circle 2",x:250,y:50,radius:50})),this.shapes.push(new p({name:"circleImage",x:800,y:100,radius:72,strokeStyle:"red",imageSource:x})),this}drawShapes(){const{context:t,config:i}=this;return this.shapes.forEach(e=>{if(e.stroke(t),e.fill(t),i.boundingBox){const n=e.getBoundingBox();t.strokeRect(n.x,n.y,n.width,n.height)}if(i.centroid){const n=e.centroid();t.beginPath(),t.arc(n.x,n.y,5,0,Math.PI*2,!1),t.closePath(),t.fill()}}),this}drawScene(){return this.clearScreen().drawGrid().drawShapes(),this}detectCollisions(){const{context:t,shapes:i,shapeBeingDragged:e}=this;let n=30;if(!!e)return t.save(),t.font="20px Palatino",i.forEach(s=>{s!==e&&e.collidesWith(s)&&(t.lineWidth=10,t.fillStyle="red",t.strokeStyle="red",t.fillText(`${e.name} Collision with ${s.name}`,20,n),t.strokeRect(0,0,this.width,this.height),n+=40)}),t.restore(),this}listenEvents(){const{canvas:t,context:i,dpr:e,mousedownPos:n,mousemovePos:s,shapes:a}=this;return t.addEventListener("mousedown",h=>{const r=this.coordinateTransformation(h.clientX,h.clientY);a.forEach(l=>{l.isPointInPath(i,r.x*e,r.y*e)&&(this.shapeBeingDragged=l,n.x=r.x,n.y=r.y,s.x=r.x,s.y=r.y)})}),t.addEventListener("mousemove",h=>{var c;const r=this.coordinateTransformation(h.clientX,h.clientY);if(!this.shapeBeingDragged)return;const l={x:r.x-s.x,y:r.y-s.y};(c=this.shapeBeingDragged)==null||c.move(l.x,l.y),s.x=r.x,s.y=r.y,this.draw().detectCollisions()}),t.addEventListener("mouseup",h=>{this.shapeBeingDragged=null}),this}}export{m as Demo};
