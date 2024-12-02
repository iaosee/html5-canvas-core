var l=Object.defineProperty;var c=(s,e,t)=>e in s?l(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var n=(s,e,t)=>c(s,typeof e!="symbol"?e+"":e,t);import{G as h}from"./lil-gui.esm-hsJpI9MV.js";import{B as d}from"./BaseDemo-DB1y7toB.js";const u=["source-over","source-in","source-out","source-atop","destination-over","destination-in","destination-out","destination-atop","lighter","copy","xor","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"];class a extends d{constructor(t){super(t);n(this,"name","图像合成");n(this,"config",{globalAlpha:1,compositeMode:"source-over",textColor:[100,149,237,.8],coverColor:[255,0,0,.8]});this.canvas=t,this.createControl().listenEvents()}static init(t){return new a(t)}start(){return this.draw()}createControl(){const{config:t}=this;this.gui=new h;const{gui:o}=this;return o.addColor(t,"textColor",255).onFinishChange(r=>this.draw()),o.addColor(t,"coverColor",255),o.add(t,"globalAlpha").min(.1).max(1).step(.1),o.add(t,"compositeMode",u),this}draw(){return this.clearScreen().drawGrid().drawText()}setComposite(t){return this.config.compositeMode=t,this}drawText(){const{context:t,config:o}=this;t.save(),t.shadowColor="rgba(100, 100, 150, 0.8)",t.shadowOffsetX=5,t.shadowOffsetY=5,t.shadowBlur=10,t.font="160px Palatino",t.fillStyle=this.rgbaFromArr(o.textColor);const r="HTML5 Canvas",i=t.measureText(r);return t.fillText(r,this.centerX-i.width/2,this.centerY),t.strokeStyle="yellow",t.strokeText(r,this.centerX-i.width/2,this.centerY),t.restore(),this}drawCover(t){const{context:o,config:r}=this,i=this.coordinateTransformation(t.clientX,t.clientY);o.save(),o.globalAlpha=r.globalAlpha,o.globalCompositeOperation=r.compositeMode,o.beginPath(),o.arc(i.x,i.y,100,0,Math.PI*2,!1),o.fillStyle=this.rgbaFromArr(r.coverColor),o.stroke(),o.fill(),o.restore()}listenEvents(){const{canvas:t}=this;return t.addEventListener("mousemove",o=>this.draw().drawCover(o)),this}}export{a as Demo};