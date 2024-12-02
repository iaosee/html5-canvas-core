var S=Object.defineProperty;var X=(p,r,t)=>r in p?S(p,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):p[r]=t;var l=(p,r,t)=>X(p,typeof r!="symbol"?r+"":r,t);import{G as Y}from"./lil-gui.esm-hsJpI9MV.js";import{B as V,P as a}from"./BaseDemo-DB1y7toB.js";import{R as u}from"./index-Bp5GyCed.js";import{P as w,C as f,V as d}from"./Polygon-DGNxmrap.js";import{R as C}from"./RandomConvexPolygon-DHYIvaIw.js";class v extends V{constructor(t){super(t);l(this,"name","碰撞检测 — 多物体运动检测");l(this,"shapes",[]);l(this,"lastTime",0);l(this,"random",u.init(-5,5));l(this,"randomPolygon",new C({maxWidth:100,maxHeight:100}));l(this,"polygonPoints",[[new a(100,100),new a(100,200),new a(200,200)],[new a(300,100),new a(300,200),new a(400,200),new a(400,100)],[new a(500,100),new a(475,200),new a(600,200),new a(625,100)]]);l(this,"config",{boundingBox:!1,count:10});this.canvas=t,this.createControl().initShapes()}static init(t){return new v(t)}createControl(){return this.gui=new Y,this}draw(t=0){return this.lastTime||(this.lastTime=t),this.drawScene(t),this.lastTime=t,this}initShapes(){const{polygonPoints:t}=this,s=this.polygonPoints.length;for(let e=0;e<s;++e){const o=new w,i=t[e];o.setPoints(i),o.name=`Polygon ${e}`,o.strokeStyle=this.randomRgba(),o.fillStyle=this.randomRgba(),this.shapes.push({shape:o,velocityX:this.random.range(-400,400).getOne(),velocityY:this.random.range(-400,400).getOne()})}for(let e=0;e<3;e++)for(let o=0;o<10;o++){const i=this.randomPolygon.getConvex(u.init(4,10).random()),n=new w;n.setPoints(i),n.move(o*200,(e+1)*200),n.name=`Polygon ${e}-${o}`,n.strokeStyle=this.randomRgba(),n.fillStyle=this.randomRgba(),this.shapes.push({shape:n,velocityX:this.random.range(-400,400).getOne(),velocityY:this.random.range(-400,400).getOne()})}return this.shapes.push({shape:new f({name:"circle 1",x:100,y:50,radius:30}),velocityX:this.random.range(-400,400).getOne(),velocityY:this.random.range(-400,400).getOne()}),this.shapes.push({shape:new f({name:"circle 2",x:250,y:50,radius:50}),velocityX:this.random.range(-400,400).getOne(),velocityY:this.random.range(-400,400).getOne()}),this}drawShapes(){const{context:t,config:s}=this;return this.shapes.forEach(e=>{const o=e.shape;if(o.stroke(t),o.fill(t),s.boundingBox){const i=o.getBoundingBox();t.strokeRect(i.x,i.y,i.width,i.height)}}),this}drawScene(t=0){return this.clearScreen().drawGrid().drawShapes(),this.update(t),this}update(t){const s=t-this.lastTime;this.shapes.forEach(e=>{const o=e.shape,i=e.velocityX*(s/1e3),n=e.velocityY*(s/1e3);o.move(i,n),this.handleEdgeCollisions(e).handleShapeCollisions(e)})}handleEdgeCollisions(t){const s=t.shape,e=s.getBoundingBox(),o=e.x+e.width,i=e.y+e.height;return(o>this.width||e.x<0)&&(t.velocityX=-t.velocityX,o>this.width&&s.move(0-(o-this.width),0),e.x<0&&s.move(-e.x,0)),(i>this.height||e.y<0)&&(t.velocityY=-t.velocityY,i>this.height&&s.move(0,0-(i-this.height)),e.y<0&&s.move(0,-e.y)),this}handleShapeCollisions(t){const s=t.shape;return this.shapes.forEach(e=>{const o=e.shape;if(o!==s){const i=s.collidesMTVWith(o);(i.axis||i.overlap)&&this.bounce(i,t,e)}}),this}bounce(t,s,e){const o=s.velocityX,i=s.velocityY,n=new d(o,i),h=n.normalize(),c=n.getMagnitude();this.checkMTVAxisDirection(t,s.shape,e.shape);const g=new a,y=t.axis?t.axis.perpendicular():new d(-h.y,h.x),m=h.dotProduct(y),P=y.dotProduct(y),x=m/P;g.x=2*x*y.x-h.x,g.y=2*x*y.y-h.y,this.separate(t,s),s.velocityX=g.x*c,s.velocityY=g.y*c}checkMTVAxisDirection(t,s,e){if(!t.axis)return;const o=d.fromPoint(s.centroid()),n=d.fromPoint(e.centroid()).subtract(o);new d(n.x,n.y).normalize().dotProduct(t.axis)>0&&(t.axis.x=-t.axis.x,t.axis.y=-t.axis.y)}separate(t,s){const e=s.velocityX,o=s.velocityY;let i,n,h,c;t.axis||(c=new a,h=Math.sqrt(Math.pow(e,2)+Math.pow(o,2)),c.x=e/h,c.y=o/h,t.axis=new d(c.x,c.y)),n=t.axis.y*t.overlap,i=t.axis.x*t.overlap,(i<0&&e<0||i>0&&e>0)&&(i=-i),(n<0&&o<0||n>0&&o>0)&&(n=-n),s.shape.move(i,n)}}export{v as Demo};