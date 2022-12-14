import{G as g}from"./lil-gui.esm.7a5dd4ff.js";import{R as h}from"./Rubberband.c7ec187d.js";import{P as a}from"./BaseDemo.deaf79c0.js";import{R as u}from"./RegularPolygon.e5aa00a6.js";import"./Polygon.fb0fffd3.js";class d extends h{constructor(t){super(t),this.canvas=t,this.name="\u62D6\u62FD\u7ED8\u5236\u7684\u7269\u4F53",this.polygons=[],this.draggingOffsetPos=new a,this.config={sides:5,startAngle:0,fillStyle:[71,163,56,.2],strokeStyle:[0,128,255,.8],filled:!0,editing:!1,redraw:()=>{console.log("redraw"),this.clearScreen().drawGrid().drawPolygons()}},this.createControl().listenEvents()}static init(t){return new d(t)}start(){return this.drawGrid().drawPolygons()}draw(){return this}createControl(){const{config:t}=this;this.gui=new g;const{gui:s}=this;return s.add(t,"sides").min(3).max(50).step(1),s.add(t,"startAngle").min(0).max(180).step(15),s.add(t,"filled"),s.addColor(t,"fillStyle"),s.addColor(t,"strokeStyle"),s.add(t,"redraw"),s.add(t,"editing"),this}drawRubberbandShape(t){const{context:s,config:i,mousedownPos:e,mousemovePos:o,rubberbandRect:r}=this,l=Math.sqrt(Math.pow(r.width,2)+Math.pow(r.height,2)),n=new u({x:e.x,y:e.y,radius:l,sides:i.sides,startAngle:this.degreesToRadian(i.startAngle),fillStyle:this.rgbaFromArr(i.fillStyle),strokeStyle:this.rgbaFromArr(i.strokeStyle),filled:i.filled});return this.drawPolygon(n),!this.dragging&&!e.equals(t)&&this.polygons.push(n),this}drawPolygon(t){const{context:s,config:i,dpr:e}=this;return t.createPath(s),t.stroke(s),t.filled&&t.fill(s),this}drawPolygons(){return this.polygons.forEach(t=>this.drawPolygon(t)),this}listenEvents(){return super.listenEvents(),window.addEventListener("keydown",t=>t.key==="c"&&(this.polygons=[])),this}onMousedownHandler(t){const{context:s,config:i,dpr:e}=this;t.preventDefault(),this.dragging=!0,this.mousemovePos=this.mousedownPos=this.coordinateTransformation(t.clientX,t.clientY),s.fillStyle=this.rgbaFromArr(i.fillStyle)||this.randomRgba(),i.editing?this.polygons.forEach(o=>{!o.isPointInPath(s,t.clientX*e,t.clientY*e)||(this.draggingPolygon=o,this.draggingOffsetPos=new a(this.mousedownPos.x-o.x,this.mousedownPos.y-o.y))}):this.saveDrawingSurface()}onMousemoveHandler(t){const{context:s,config:i}=this;t.preventDefault(),this.mousemovePos=this.coordinateTransformation(t.clientX,t.clientY),i.editing&&this.dragging?(this.draggingPolygon&&this.draggingPolygon.move(this.mousemovePos.x-this.draggingOffsetPos.x,this.mousemovePos.y-this.draggingOffsetPos.y),this.clearScreen().drawGrid().drawPolygons()):this.dragging&&(this.restoreDrawingSurface(),this.updateRubberband(this.mousemovePos),this.guidewires&&this.drawBandGuidelines())}onMouseupHandler(t){const{config:s}=this;t.preventDefault(),this.dragging=!1,this.draggingPolygon=null,this.mousemovePos=this.coordinateTransformation(t.clientX,t.clientY),!s.editing&&(this.restoreDrawingSurface(),this.updateRubberband(this.mousemovePos))}}export{d as Demo};
