var u=Object.defineProperty;var y=(n,e,t)=>e in n?u(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var a=(n,e,t)=>y(n,typeof e!="symbol"?e+"":e,t);import{G as p}from"./lil-gui.esm-hsJpI9MV.js";import{B as m}from"./BaseDemo-DB1y7toB.js";import{R as l}from"./index-Bp5GyCed.js";class c extends m{constructor(t){super(t);a(this,"name","简单弹跳 与 简单碰撞检测");a(this,"circles",[]);a(this,"random",l.init(-5,5));a(this,"config",{circleQuantity:100,circleMinRadius:5,circleMaxRadius:50,throttleValue:100,collisionDetection:!1});this.canvas=t,this.centerX,this.centerY,this.createControl().createCircle().listenEvents()}static init(t){return new c(t)}draw(){return this.clearScreen().drawGrid().drawCircles()}createControl(){const{config:t}=this;this.gui=new p;const{gui:i}=this;return i.add(t,"circleQuantity").min(0).max(100).step(1),i.add(t,"circleMinRadius").min(1).max(50).step(1),i.add(t,"circleMaxRadius").min(5).max(100).step(1),i.add(t,"throttleValue").min(0).max(1e3).step(10),i.add(t,"collisionDetection"),this}createCircle(t=this.center,i=this.config.circleQuantity,o=!1){const{config:s}=this;o&&this.circles.splice(0,this.circles.length);for(let r=0;r<i;r++){const d={x:t.x||Math.random()*this.width,y:t.y||Math.random()*this.height},h=l.init(s.circleMinRadius,s.circleMaxRadius).getOne();this.circles.push({position:d,color:this.randomRgba(),velocityX:Math.random()*(this.random.range(-20,20).getOne()||20),velocityY:Math.random()*(this.random.range(-20,20).getOne()||20),radius:h,gravity:Math.random()*(h/s.circleMaxRadius)})}return this}drawCircles(){const{context:t}=this;return this.circles.forEach(i=>{t.beginPath(),t.arc(i.position.x,i.position.y,i.radius,0,Math.PI*2,!1),t.fillStyle=i.color,t.fill(),this.updatePosition(i)}),this}updatePosition(t){const{config:i}=this;return(t.position.x+t.velocityX+t.radius>this.width||t.position.x+t.velocityX-t.radius<0)&&(t.velocityX=-t.velocityX*.8),(t.position.y+t.velocityY+t.radius>this.height||t.position.y+t.velocityY-t.radius<0)&&(t.velocityY=-t.velocityY*.8),i.collisionDetection&&this.collisionDetection(t),t.position.x+=t.velocityX,t.position.y+=t.velocityY,t.velocityY+=t.gravity||0,this}collisionDetection(t){const{circles:i}=this;for(let o=0,s=i.length;o<s&&i[o]!==t;o++)Math.pow(t.position.x-i[o].position.x,2)+Math.pow(t.position.y-i[o].position.y,2)<=Math.pow(t.radius+i[o].radius,2)&&(t.velocityX=-t.velocityX,t.velocityY=-t.velocityY,i[o].velocityX=-i[o].velocityX,i[o].velocityY=-i[o].velocityY);return this}listenEvents(){const{canvas:t,config:i}=this,o=s=>{const r=this.coordinateTransformation(s.clientX,s.clientY);s.type==="click"&&this.circles.splice(0,Math.floor(this.circles.length/2)),this.createCircle(r,i.circleQuantity,!1)};t.addEventListener("mousemove",this.throttle(o,i.throttleValue),!1),t.addEventListener("click",o,!1)}}export{c as Demo};