var l=Object.defineProperty;var d=(i,o,t)=>o in i?l(i,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[o]=t;var n=(i,o,t)=>d(i,typeof o!="symbol"?o+"":o,t);import{B as c}from"./BaseDemo-DB1y7toB.js";class h extends c{constructor(t){super(t);n(this,"name","绘制-贝塞尔曲线");this.canvas=t}static init(t){return new h(t)}start(){return this.drawGrid().draw()}draw(){return this.drawQuadraticBezier().drawCubeBezier()}drawQuadraticBezier(){const{context:t}=this;return t.save(),t.fillStyle=this.randomRgba(),t.strokeStyle=this.randomRgba(),t.shadowColor=this.randomRgba(),t.lineWidth=2,t.lineCap="round",t.shadowOffsetX=1,t.shadowOffsetY=1,t.shadowBlur=1,t.beginPath(),t.moveTo(120.5,130),t.quadraticCurveTo(190,250,210.5,160.5),t.quadraticCurveTo(240,100.5,290,70.5),t.stroke(),t.restore(),t.save(),t.fillStyle=this.randomRgba(),t.strokeStyle=this.randomRgba(),t.shadowColor=this.randomRgba(),t.lineWidth=2,t.beginPath(),t.moveTo(this.centerX/2,50),t.quadraticCurveTo(this.centerX/2+100,0,this.centerX/2+100,200),t.quadraticCurveTo(this.centerX/2+200,0,this.centerX/2+100,100),t.stroke(),t.restore(),this}drawCubeBezier(){const{context:t}=this,e=[{x:this.centerX,y:this.centerY},{x:430,y:270}],r=[{x:this.centerX,y:250},{x:450,y:this.centerY}];return t.fillStyle=this.randomRgba(),t.strokeStyle=this.randomRgba(),t.lineWidth=2,t.beginPath(),t.moveTo(e[0].x,e[0].y),t.bezierCurveTo(r[0].x,r[0].y,r[1].x,r[1].y,e[1].x,e[1].y),t.stroke(),t.lineWidth=1,t.setLineDash([5,5]),t.strokeStyle="rgba(0,0,0,0.5)",t.beginPath(),t.moveTo(e[0].x,e[0].y),t.lineTo(r[0].x,r[0].y),t.moveTo(e[1].x,e[1].y),t.lineTo(r[1].x,r[1].y),t.stroke(),this.drawPoints(r,"yellow","blue").drawPoints(e,"blue","red"),this}drawPoints(t,e="yellow",r="blue"){const{context:s}=this;return s.strokeStyle=e,s.fillStyle=r,t.forEach(a=>{s.beginPath(),s.arc(a.x,a.y,5,0,Math.PI*2,!1),s.stroke(),s.fill()}),this}}export{h as Demo};
