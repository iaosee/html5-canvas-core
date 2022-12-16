import{G as u}from"./lil-gui.esm.7a5dd4ff.js";import{B as x,P as a}from"./BaseDemo.deaf79c0.js";import{R as g}from"./index.941fc2b4.js";import{P as c,C as d,V as m}from"./Polygon.fb0fffd3.js";import{C as f}from"./CircleImage.61806950.js";import{R as p}from"./RandomConvexPolygon.267444ef.js";import{g as w}from"./golfball.de451e99.js";class y extends x{constructor(i){super(i),this.canvas=i,this.name="\u78B0\u649E\u68C0\u6D4B \u2014 \u6700\u5C0F\u5E73\u79FB\u5411\u91CF",this.shapes=[],this.lastTime=0,this.isStuck=!1,this.velocity={x:300,y:200},this.lastVelocity={x:300,y:200},this.mousedownPos=new a(0,0),this.mousemovePos=new a(0,0),this.randomPolygon=new p({maxWidth:200,maxHeight:200}),this.polygonPoints=[[new a(100,100),new a(100,200),new a(200,200)],[new a(300,100),new a(300,200),new a(400,200),new a(400,100)],[new a(500,100),new a(475,200),new a(600,200),new a(625,100)]],this.config={boundingBox:!1,count:10},this.createControl().initShapes().listenEvents()}static init(i){return new y(i)}createControl(){const{config:i}=this;this.gui=new u;const{gui:n}=this;return n.add(i,"boundingBox").onFinishChange(t=>this.drawScene()),this}draw(i=0){const{shapeMoving:n,velocity:t}=this;if(this.lastTime||(this.lastTime=i),n){const s=i-this.lastTime,o=t.x*(s/1e3),e=t.y*(s/1e3);n.move(o,e)}return this.drawScene(),this.lastTime=i,this}initShapes(){const{polygonPoints:i}=this,n=this.polygonPoints.length;for(let t=0;t<n;++t){const s=new c,o=i[t];s.setPoints(o),s.name=`Polygon ${t}`,s.strokeStyle=this.randomRgba(),s.fillStyle=this.randomRgba(),this.shapes.push(s)}for(let t=0;t<2;t++)for(let s=0;s<3;s++){const o=this.randomPolygon.getConvex(g.init(4,10).random()),e=new c;e.setPoints(o),e.move(s*300,(t+1)*300),e.name=`Polygon ${t}-${s}`,e.strokeStyle=this.randomRgba(),e.fillStyle=this.randomRgba(),this.shapes.push(e)}return this.shapes.push(new d({name:"circle 1",x:100,y:50,radius:30})),this.shapes.push(new d({name:"circle 2",x:250,y:50,radius:50})),this.shapes.push(new f({name:"circleImage",x:800,y:100,radius:72,strokeStyle:"red",imageSource:w})),this}drawShapes(){const{context:i,config:n}=this;return this.shapes.forEach(t=>{if(t.stroke(i),t.fill(i),n.boundingBox){const s=t.getBoundingBox();i.strokeRect(s.x,s.y,s.width,s.height)}}),this}drawScene(){return this.clearScreen().drawGrid().drawShapes().detectCollisions(),this}detectCollisions(){const{context:i,shapes:n,shapeMoving:t,velocity:s}=this;let o=30;if(!t)return this;i.save(),i.font="20px Palatino",n.forEach(h=>{if(h===t)return;const r=t.collidesMTVWith(h);(r.axis||r.overlap)&&(i.lineWidth=10,i.fillStyle="red",i.strokeStyle="red",i.fillText(`${t.name} Collision with ${h.name}`,20,o),i.strokeRect(0,0,this.width,this.height),o+=40,!this.isStuck&&this.stick(r))}),i.restore();const e=t==null?void 0:t.getBoundingBox();return(e.x+e.width>this.width||e.x<0)&&(s.x=-s.x),(e.y+e.height>this.height||e.y<0)&&(s.y=-s.y),this}stick(i){const{shapeMoving:n,velocity:t,lastVelocity:s}=this;if(!i.axis){const h=new a,r=Math.sqrt(Math.pow(t.x,2)+Math.pow(t.y,2));h.x=t.x/r,h.y=t.y/r,i.axis=new m(h.x,h.y)}let o=i.axis.x*(i.overlap+2),e=i.axis.y*(i.overlap+2);(o<0&&t.x<0||o>0&&t.x>0)&&(o=-o),(e<0&&t.y<0||e>0&&t.y>0)&&(e=-e),setTimeout(()=>{n.move(o,e)},500),s.x=t.x,s.y=t.y,t.x=t.y=0,this.isStuck=!0}listenEvents(){const{canvas:i,context:n,dpr:t,shapes:s,velocity:o,lastVelocity:e}=this;return i.addEventListener("mousedown",h=>{const r=this.coordinateTransformation(h.clientX,h.clientY);o.x=e.x,o.y=e.y,this.isStuck=!1,this.shapeMoving=void 0,s.forEach(l=>{l.isPointInPath(n,r.x*t,r.y*t)&&(this.shapeMoving=l)})}),this}}export{y as Demo};
