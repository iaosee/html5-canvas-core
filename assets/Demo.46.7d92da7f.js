import{G as n}from"./lil-gui.esm.7a5dd4ff.js";import{S as h}from"./stats.min.9233e90c.js";import{B as d}from"./BaseDemo.deaf79c0.js";import{R as r}from"./index.941fc2b4.js";class e extends d{constructor(t){super(t),this.canvas=t,this.name="\u52A8\u753B \u2014\u2014 \u5E27\u7387\u663E\u793A/\u57FA\u4E8E\u65F6\u95F4\u52A8\u753B",this.circles=[],this.random=r.init(-5,5),this.lastTime=0,this.elapsedTime=0,this.lastFpsUpdate=0,this.lastFpsUpdateTime=0,this.fps=0,this.config={timeBased:!1};const i={x:this.centerX,y:this.centerY};this.createControl().initStats().createCircle(i,50).listenEvents()}static init(t){return new e(t)}draw(t){const i=+new Date;this.elapsedTime=t-this.lastTime;const s=1e3/(t-this.lastTime);return this.fps=s,i-this.lastFpsUpdateTime>1e3&&(this.lastFpsUpdate=s,this.lastFpsUpdateTime=i),this.clearScreen().drawGrid().drawCircles().drawFpsLabel(this.lastFpsUpdate),this.stats.update(),this.lastTime=t,this}initStats(){return this.stats=new h,this.stats.showPanel(0),document.body.appendChild(this.stats.dom),this}createControl(){const{config:t}=this;this.gui=new n;const{gui:i}=this;return i.add(t,"timeBased"),this}createCircle(t,i=100,s=!1){s&&this.circles.splice(0,this.circles.length);for(let o=0;o<i;o++){const a={x:t.x||this.centerX,y:t.y||this.centerY};this.circles.push({position:a,velocityX:Math.random()*(this.random.range(-8,8).getOne()||8),velocityY:Math.random()*(this.random.range(-8,8).getOne()||8),radius:Math.random()*20,color:this.randomRgba()})}return this}drawCircles(){const{context:t,config:i}=this;return this.circles.forEach(s=>{t.beginPath(),t.arc(s.position.x,s.position.y,s.radius,0,Math.PI*2,!1),t.fillStyle=s.color,t.fill(),i.timeBased?this.updatePositionByTime(s):this.updatePosition(s)}),this}updatePosition(t){const{canvas:i}=this;return(t.position.x+t.velocityX+t.radius>i.width||t.position.x+t.velocityX-t.radius<0)&&(t.velocityX=-t.velocityX),(t.position.y+t.velocityY+t.radius>i.height||t.position.y+t.velocityY-t.radius<0)&&(t.velocityY=-t.velocityY),t.position.x+=t.velocityX,t.position.y+=t.velocityY,this}updatePositionByTime(t){const{canvas:i}=this;let s=t.velocityX/this.fps*10,o=t.velocityY/this.fps*10;return(t.position.x+s+t.radius>i.width||t.position.x+s-t.radius<0)&&(t.velocityX=-t.velocityX,s=-s),(t.position.y+o+t.radius>i.height||t.position.y+o-t.radius<0)&&(t.velocityY=-t.velocityY,o=-o),t.position.x+=s,t.position.y+=o,this}listenEvents(){const{canvas:t}=this,i=s=>{const o=this.coordinateTransformation(s.clientX,s.clientY);s.type==="click"&&this.circles.splice(0,Math.floor(this.circles.length/2)),this.createCircle(o,100,!1)};t.addEventListener("mousemove",this.throttle(i,100),!1),t.addEventListener("click",i,!1)}}export{e as Demo};
