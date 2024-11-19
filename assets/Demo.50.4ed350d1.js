import{G as r}from"./lil-gui.esm.7a5dd4ff.js";import{B as h}from"./BaseDemo.deaf79c0.js";import{R as u}from"./index.c5f23cd0.js";class a extends h{constructor(t){super(t),this.canvas=t,this.name="\u62D6\u62FD\u4EA4\u4E92 \u2014\u2014 \u9F20\u6807\u8DEF\u5F84\u8DDF\u968F",this.lastTime=0,this.circles=[],this.random=u.init(-5,5),this.mousePosition={x:this.centerX,y:this.centerY},this.config={quantity:50},this.centerX,this.centerY,this.createControl().drawGrid().createCircle(50).listenEvents()}static init(t){return new a(t)}draw(){return this.clearScreen().drawGrid().drawCircles().updateCircle()}createControl(){const{config:t}=this;this.gui=new r;const{gui:o}=this;return o.add(t,"quantity").min(5).max(300).step(5).onFinishChange(s=>{t.quantity=Number(s),this.createCircle(t.quantity,!0)}),this}createCircle(t=50,o=!1){o&&this.circles.splice(0,this.circles.length);for(let s=0;s<t;s++){const i=Math.random()*30,e={x:this.random.min(i).max(this.width-i).getOne(),y:this.random.min(i).max(this.height-i).getOne()};this.circles.push({position:e,velocityX:Math.random()*(this.random.range(-5,5).getOne()||5),velocityY:Math.random()*(this.random.range(-5,5).getOne()||5),radius:i,color:this.randomRgba()})}return this}drawCircles(){const{context:t,config:o}=this;return this.circles.forEach(s=>{t.beginPath(),t.arc(s.position.x,s.position.y,s.radius,0,Math.PI*2,!1),t.fillStyle=s.color,t.fill()}),this}updateCircle(){return this.circles.forEach(t=>this.updatePosition(t)),this}updatePosition(t){return(t.position.x+t.velocityX+t.radius>this.width||t.position.x+t.velocityX-t.radius<0)&&(t.velocityX=-t.velocityX),(t.position.y+t.velocityY+t.radius>this.height||t.position.y+t.velocityY-t.radius<0)&&(t.velocityY=-t.velocityY),t.position.x+=t.velocityX,t.position.y+=t.velocityY,this}moveFollow(){const{canvas:t,circles:o,mousePosition:s}=this;return o.forEach((i,e)=>{setTimeout(()=>{s.x>=this.width-i.radius||s.x<=i.radius?i.position.x=s.x<=i.radius?i.radius:this.width-i.radius:i.position.x=s.x,s.y>this.height-i.radius||s.y<=i.radius?i.position.y=s.y<=i.radius?i.radius:this.height-i.radius:i.position.y=s.y},e*10)}),this}animateFollw(){this.moveFollow(),this.clearScreen().drawGrid().drawCircles(),this.player=requestAnimationFrame(this.animateFollw.bind(this))}listenEvents(){const{canvas:t}=this,o=e=>{e.preventDefault(),this.stop(),this.animateFollw()},s=e=>{if(e.preventDefault(),console.log(e),e instanceof MouseEvent)this.mousePosition=this.coordinateTransformation(e.clientX,e.clientY);else if(e instanceof TouchEvent){const n=e.touches[0];this.mousePosition=this.coordinateTransformation(n.clientX,n.clientY)}},i=e=>{e.preventDefault(),this.start()};return t.addEventListener("mouseenter",o,!1),t.addEventListener("touchstart",o,!1),t.addEventListener("mousemove",s,!1),t.addEventListener("touchmove",s,!1),t.addEventListener("mouseleave",i,!1),t.addEventListener("touchend",i,!1),document.addEventListener("contextmenu",e=>e.preventDefault(),!1),this}}export{a as Demo};
