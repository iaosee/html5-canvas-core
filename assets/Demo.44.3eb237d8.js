import{G as l}from"./lil-gui.esm.7a5dd4ff.js";import{B as d,P as f}from"./BaseDemo.deaf79c0.js";import{i as m}from"./flower.21c0439b.js";class r extends d{constructor(e){super(e),this.canvas=e,this.name="\u56FE\u50CF \u2014\u2014 \u653E\u5927\u955C\u5B9E\u73B02",this.magnifyRectangle=null,this.magnifyingGlassPos=new f,this.config={scale:.2,zoomScale:2,zoomRadius:150,resetScene:()=>this.drawScene()},this.initOffScreenCanvas(),this.loadImage(m).then(t=>this.image=t).then(()=>{this.drawScene()}),this.createControl().listenEvents()}static init(e){return new r(e)}start(){return this}draw(){return this}initOffScreenCanvas(){const{canvas:e}=this;this.offScreenCanvas=document.createElement("canvas"),this.offScreenContext=this.offScreenCanvas.getContext("2d"),this.offScreenCanvas.width=e.width,this.offScreenCanvas.height=e.height}createControl(){const{config:e}=this;this.gui=new l;const{gui:t}=this;return t.add(e,"scale").step(.01).min(.1).max(1).onChange(()=>this.drawScene()),t.add(e,"zoomScale").step(1).min(.5).max(10),t.add(e,"zoomRadius").step(10).min(50).max(1e3),this}drawScene(){const{context:e,offScreenContext:t,canvas:a,config:i,image:n}=this,s=this.width,h=this.height,g=n.width*i.scale/n.width,o=n.width*i.scale,c=n.height*g;return e.clearRect(0,0,a.width,a.height),e.drawImage(this.image,-o/2+s/2,-c/2+h/2,o,c),this.originalImageData=e.getImageData(0,0,a.width,a.height),this}drawMagnifyingGlass(e){const{context:t,config:a,magnifyingGlassPos:i}=this;i.x=e.x,i.y=e.y,this.calculateMagnifyRectangle(e),this.magnifyRectangleImageData=t.getImageData(this.magnifyRectangle.x,this.magnifyRectangle.y,this.magnifyRectangle.width,this.magnifyRectangle.height),this.drawScene(),t.save();const n={width:this.magnifyRectangle.width*a.zoomScale,height:this.magnifyRectangle.height*a.zoomScale};return this.setClip(),t.drawImage(t.canvas,this.magnifyRectangle.x,this.magnifyRectangle.y,this.magnifyRectangle.width,this.magnifyRectangle.height,this.magnifyRectangle.x+this.magnifyRectangle.width/2-n.width/2,this.magnifyRectangle.y+this.magnifyRectangle.height/2-n.height/2,n.width,n.height),t.stroke(),t.restore(),this.drawMagnifyingGlassCircle(e),this}setClip(){const{context:e,config:t,magnifyingGlassPos:a}=this;return e.beginPath(),e.arc(a.x,a.y,t.zoomRadius,0,Math.PI*2,!1),e.clip(),this}calculateMagnifyRectangle(e){const{canvas:t,context:a,config:i}=this;this.magnifyRectangle={x:e.x-i.zoomRadius,y:e.y-i.zoomRadius,width:i.zoomRadius*2+2*a.lineWidth,height:i.zoomRadius*2+2*a.lineWidth};const n=this.magnifyRectangle.y,s=this.magnifyRectangle.x,h=this.magnifyRectangle.y+this.magnifyRectangle.height,g=this.magnifyRectangle.x+this.magnifyRectangle.width;return s<0?(this.magnifyRectangle.width+=s,this.magnifyRectangle.x=0):g>t.width&&(this.magnifyRectangle.width-=g-t.width),n<0?(this.magnifyRectangle.height+=n,this.magnifyRectangle.y=0):h>t.height&&(this.magnifyRectangle.height-=h-t.height),this}drawMagnifyingGlassCircle(e){const{context:t,config:a}=this;let i=a.zoomRadius/7;i=i<10?10:i,i=i>40?40:i,i=10,t.save(),t.lineWidth=i,t.strokeStyle="rgb(0, 0, 255, 0.3)",t.beginPath(),t.arc(e.x,e.y,a.zoomRadius,0,Math.PI*2,!1),t.clip();const n=t.createRadialGradient(e.x,e.y,a.zoomRadius-i,e.x,e.y,a.zoomRadius);return n.addColorStop(0,"rgba(0,0,0,0.2)"),n.addColorStop(.8,"rgb(235,237,255)"),n.addColorStop(.9,"rgb(235,237,255)"),n.addColorStop(1,"rgba(150,150,150,0.9)"),t.shadowColor="rgba(52, 72, 35, 1.0)",t.shadowOffsetX=2,t.shadowOffsetY=2,t.shadowBlur=20,t.strokeStyle=n,t.stroke(),t.beginPath(),t.arc(e.x,e.y,a.zoomRadius-i/2,0,Math.PI*2,!1),t.clip(),t.lineWidth=i,t.strokeStyle="rgba(0,0,0,0.06)",t.stroke(),t.restore(),this}listenEvents(){const{canvas:e}=this;return e.addEventListener("mousemove",t=>{const a=this.coordinateTransformation(t.clientX,t.clientY);this.drawMagnifyingGlass(a)}),this}}export{r as Demo};
