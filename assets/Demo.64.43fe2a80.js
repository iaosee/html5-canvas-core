import{G as v}from"./lil-gui.esm.7a5dd4ff.js";import{B as m,P as a}from"./BaseDemo.deaf79c0.js";import{R as y}from"./Random.9d5db597.js";import{P as g,C as u,V as c}from"./Polygon.fb0fffd3.js";import{R as P}from"./RandomConvexPolygon.267444ef.js";class x extends m{constructor(t){super(t),this.canvas=t,this.name="\u78B0\u649E\u68C0\u6D4B \u2014 \u591A\u7269\u4F53\u8FD0\u52A8\u68C0\u6D4B",this.shapes=[],this.lastTime=0,this.random=y.init(-5,5),this.randomPolygon=new P({maxWidth:100,maxHeight:100}),this.polygonPoints=[[new a(100,100),new a(100,200),new a(200,200)],[new a(300,100),new a(300,200),new a(400,200),new a(400,100)],[new a(500,100),new a(475,200),new a(600,200),new a(625,100)]],this.config={boundingBox:!1,count:10},this.createControl().initShapes()}static init(t){return new x(t)}createControl(){return this.gui=new v,this}draw(t=0){return this.lastTime||(this.lastTime=t),this.drawScene(t),this.lastTime=t,this}initShapes(){const{polygonPoints:t}=this,s=this.polygonPoints.length;for(let e=0;e<s;++e){const o=new g,i=t[e];o.setPoints(i),o.name=`Polygon ${e}`,o.strokeStyle=this.randomRgba(),o.fillStyle=this.randomRgba(),this.shapes.push({shape:o,velocityX:this.random.range(-400,400).getOne(),velocityY:this.random.range(-400,400).getOne()})}for(let e=0;e<3;e++)for(let o=0;o<10;o++){const i=this.randomPolygon.getConvex(y.init(4,10).random()),n=new g;n.setPoints(i),n.move(o*200,(e+1)*200),n.name=`Polygon ${e}-${o}`,n.strokeStyle=this.randomRgba(),n.fillStyle=this.randomRgba(),this.shapes.push({shape:n,velocityX:this.random.range(-400,400).getOne(),velocityY:this.random.range(-400,400).getOne()})}return this.shapes.push({shape:new u({name:"circle 1",x:100,y:50,radius:30}),velocityX:this.random.range(-400,400).getOne(),velocityY:this.random.range(-400,400).getOne()}),this.shapes.push({shape:new u({name:"circle 2",x:250,y:50,radius:50}),velocityX:this.random.range(-400,400).getOne(),velocityY:this.random.range(-400,400).getOne()}),this}drawShapes(){const{context:t,config:s}=this;return this.shapes.forEach(e=>{const o=e.shape;if(o.stroke(t),o.fill(t),s.boundingBox){const i=o.getBoundingBox();t.strokeRect(i.x,i.y,i.width,i.height)}}),this}drawScene(t=0){return this.clearScreen().drawGrid().drawShapes(),this.update(t),this}update(t){const s=t-this.lastTime;this.shapes.forEach(e=>{const o=e.shape,i=e.velocityX*(s/1e3),n=e.velocityY*(s/1e3);o.move(i,n),this.handleEdgeCollisions(e).handleShapeCollisions(e)})}handleEdgeCollisions(t){const s=t.shape,e=s.getBoundingBox(),o=e.x+e.width,i=e.y+e.height;return(o>this.width||e.x<0)&&(t.velocityX=-t.velocityX,o>this.width&&s.move(0-(o-this.width),0),e.x<0&&s.move(-e.x,0)),(i>this.height||e.y<0)&&(t.velocityY=-t.velocityY,i>this.height&&s.move(0,0-(i-this.height)),e.y<0&&s.move(0,-e.y)),this}handleShapeCollisions(t){const s=t.shape;return this.shapes.forEach(e=>{const o=e.shape;if(o!==s){const i=s.collidesMTVWith(o);(i.axis||i.overlap)&&this.bounce(i,t,e)}}),this}bounce(t,s,e){const o=s.velocityX,i=s.velocityY,n=new c(o,i),h=n.normalize(),r=n.getMagnitude();this.checkMTVAxisDirection(t,s.shape,e.shape);const d=new a,l=t.axis?t.axis.perpendicular():new c(-h.y,h.x),w=h.dotProduct(l),f=l.dotProduct(l),p=w/f;d.x=2*p*l.x-h.x,d.y=2*p*l.y-h.y,this.separate(t,s),s.velocityX=d.x*r,s.velocityY=d.y*r}checkMTVAxisDirection(t,s,e){if(!t.axis)return;const o=c.fromPoint(s.centroid()),n=c.fromPoint(e.centroid()).subtract(o);new c(n.x,n.y).normalize().dotProduct(t.axis)>0&&(t.axis.x=-t.axis.x,t.axis.y=-t.axis.y)}separate(t,s){const e=s.velocityX,o=s.velocityY;let i,n,h,r;t.axis||(r=new a,h=Math.sqrt(Math.pow(e,2)+Math.pow(o,2)),r.x=e/h,r.y=o/h,t.axis=new c(r.x,r.y)),n=t.axis.y*t.overlap,i=t.axis.x*t.overlap,(i<0&&e<0||i>0&&e>0)&&(i=-i),(n<0&&o<0||n>0&&o>0)&&(n=-n),s.shape.move(i,n)}}export{x as Demo};
