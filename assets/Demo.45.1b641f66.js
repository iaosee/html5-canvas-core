var f=Object.defineProperty;var u=(r,i,e)=>i in r?f(r,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[i]=e;var o=(r,i,e)=>(u(r,typeof i!="symbol"?i+"":i,e),e);import{G as l}from"./lil-gui.esm.7a5dd4ff.js";import{B as v}from"./BaseDemo.9c35b300.js";const p="/html5-canvas-core/assets/video-01.2839360d.mp4";class c extends v{constructor(e){super(e);o(this,"name","\u89C6\u9891 \u2014\u2014 \u89C6\u9891\u6E32\u67D3\u7ED8\u5236");o(this,"video",null);o(this,"offScreenCanvas");o(this,"offScreenContext");o(this,"config",{color:!0,flip:!1,play:()=>this.playVideo(),pause:()=>this.pauseVideo()});this.canvas=e,this.createVedio().createControl().initOffScreenCanvas().listenEvents()}static init(e){return new c(e)}start(){return this}draw(){return this}destroy(){super.destroy(),this.pauseVideo()}initOffScreenCanvas(){const{canvas:e}=this;return this.offScreenCanvas=document.createElement("canvas"),this.offScreenContext=this.offScreenCanvas.getContext("2d"),this.offScreenCanvas.width=e.width,this.offScreenCanvas.height=e.height,this}createControl(){const{config:e}=this;this.gui=new l;const{gui:t}=this;return t.add(e,"color"),t.add(e,"flip"),t.add(e,"play"),t.add(e,"pause"),this}createVedio(){return this.video=document.createElement("video"),this.video.src=p,this}playVideo(){const{canvas:e,context:t,config:n}=this;if(!this.video.paused)return this;const s=()=>{this.offScreenContext.drawImage(this.video,0,0),n.color||this.removeColor(),n.flip?this.drawFlipped():t.drawImage(this.offScreenCanvas,0,0),requestAnimationFrame(s)};return this.video.play(),requestAnimationFrame(s),this}pauseVideo(){return this.video.pause(),this}removeColor(){const{offScreenCanvas:e,offScreenContext:t}=this,n=t.getImageData(0,0,e.width,e.height),s=n.data,d=s.length;for(let a=0;a<d-4;a+=4){const h=(s[a]+s[a+1]+s[a+2])/3;s[a]=h,s[a+1]=h,s[a+2]=h}t.putImageData(n,0,0)}drawFlipped(){const{canvas:e,context:t,offScreenCanvas:n}=this;t.save(),t.translate(this.width/2,this.height/2),t.rotate(Math.PI),t.translate(-this.width/2,-this.height/2),t.drawImage(n,0,0),t.restore()}listenEvents(){const{canvas:e}=this;return e.addEventListener("click",t=>{console.log(t)}),this}}export{c as Demo};
