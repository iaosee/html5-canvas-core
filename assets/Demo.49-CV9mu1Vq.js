var w=Object.defineProperty;var P=(a,n,i)=>n in a?w(a,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[n]=i;var l=(a,n,i)=>P(a,typeof n!="symbol"?n+"":n,i);import{B as b,P as p}from"./BaseDemo-DB1y7toB.js";class y extends b{constructor(i){super(i);l(this,"name","拖拽交互 —— 扔球/惯性运动");l(this,"lastTime",0);l(this,"ball",{position:this.center,velocityX:5,velocityY:5,radius:100,color:this.randomRgba()});this.canvas=i,this.listenEvents(),this.drawGrid().drawCircle()}static init(i){return new y(i)}start(){return this}draw(){return this.clearScreen().drawGrid().drawCircle()}drawCircle(){const{context:i,ball:o}=this;return i.lineWidth=1.5,i.fillStyle=o.color,i.strokeStyle=o.color,i.beginPath(),i.arc(o.position.x,o.position.y,o.radius,0,Math.PI*2,!1),i.fill(),i.stroke(),this}setCirclePosition(i){const{context:o,ball:t}=this;return t.position=i,t.position.x+t.radius>this.width&&(t.position.x=this.width-t.radius),t.position.x-t.radius<0&&(t.position.x=t.radius),t.position.y+t.radius>this.height&&(t.position.y=this.height-t.radius),t.position.y-t.radius<0&&(t.position.y=t.radius),this}updatePosition(){const{ball:i}=this;return(i.position.x+i.velocityX+i.radius>this.width||i.position.x+i.velocityX-i.radius<0)&&(i.velocityX=-i.velocityX*.8),(i.position.y+i.velocityY+i.radius>this.height||i.position.y+i.velocityY-i.radius<0)&&(i.velocityY=-i.velocityY*.8),i.position.x+=i.velocityX,i.position.y+=i.velocityY,this}isPointInCirclePath(i){const{context:o,dpr:t,ball:s}=this;return o.beginPath(),o.arc(s.position.x,s.position.y,s.radius,0,Math.PI*2,!1),o.closePath(),o.isPointInPath(i.x*t,i.y*t)}animate(){this.updatePosition().draw(),this.player=requestAnimationFrame(this.animate.bind(this))}listenEvents(){const{canvas:i,ball:o}=this;let t=!1,s=null,r=null,d=null,h=0,u=0;const m=()=>{const e=u-h;return(Math.abs(r.x-s.x)+Math.abs(r.y-s.y))/e*10>10},f=e=>{s=this.coordinateTransformation(e.clientX,e.clientY),h=Date.now(),this.isPointInCirclePath(s)&&(this.stop(),t=!0,d=new p(s.x-o.position.x,s.y-o.position.y))},v=e=>{if(!t)return;const c=this.coordinateTransformation(e.clientX,e.clientY);this.setCirclePosition(new p(c.x-d.x,c.y-d.y)),this.draw()},x=e=>{u=Date.now(),r=this.coordinateTransformation(e.clientX,e.clientY),t&&m()&&(console.log("didThrow"),o.velocityX=(r.x-s.x)/20,o.velocityY=(r.y-s.y)/20,this.player=requestAnimationFrame(this.animate.bind(this))),t=!1};return i.addEventListener("mousedown",f,!1),i.addEventListener("mousemove",v,!1),document.addEventListener("mouseup",x,!1),document.addEventListener("contextmenu",e=>e.preventDefault(),!1),this}}export{y as Demo};
