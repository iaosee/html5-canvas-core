import{B as n}from"./BaseDemo.deaf79c0.js";class s extends n{constructor(t){super(t),this.canvas=t,this.name="\u88C1\u526A\u5B9E\u73B0\u52A8\u753B",this.listenEvents()}static init(t){return new s(t)}start(){return this.drawGrid().drawText()}draw(){return this}drawText(){const{context:t}=this;t.save(),t.shadowColor="rgba(100, 100, 150, 0.8)",t.shadowOffsetX=5,t.shadowOffsetY=5,t.shadowBlur=10,t.font="180px Palatino",t.fillStyle="cornflowerblue";const e="HTML5 Canvas",i=t.measureText(e);return t.fillText(e,this.centerX-i.width/2,this.centerY),t.strokeStyle="yellow",t.strokeText(e,this.centerX-i.width/2,this.centerY),t.restore(),this}setClippingRegion(t){const{context:e}=this;return e.beginPath(),e.arc(this.width/2,this.height/2,t,0,Math.PI*2,!1),e.clip(),this}fillCanvas(t){const{context:e}=this;return e.fillStyle=t,e.fillRect(0,0,this.width,this.height),this}drawAnimationFrame(t){return this.setClippingRegion(t),this.fillCanvas("lightgray"),this.drawText(),this}endAnimation(t){const{context:e}=this;clearInterval(t),setTimeout(()=>{e.clearRect(0,0,this.width,this.height),this.drawText()},1e3)}animate(){const{context:t}=this;let e=this.width/2,i;i=window.setInterval(()=>{e-=this.width/100,this.fillCanvas("charcoal"),e>0?(t.save(),this.drawAnimationFrame(e),t.restore()):this.endAnimation(i)},16)}listenEvents(){const{canvas:t}=this;return t.addEventListener("click",()=>this.animate()),this}}export{s as Demo};
