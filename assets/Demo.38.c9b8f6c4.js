import{G as a}from"./lil-gui.esm.7a5dd4ff.js";import{R as o}from"./Rubberband.c7ec187d.js";import{i as d}from"./flower.21c0439b.js";import"./BaseDemo.deaf79c0.js";class h extends o{constructor(t){super(t),this.canvas=t,this.name="\u56FE\u50CF\u62D6\u52A8\u88C1\u526A\u7F29\u653E",this.config={scale:1,resetScene:()=>this.drawScene()},this.loadImage(d).then(e=>this.image=e).then(()=>{this.drawScene()}),this.createControl().listenEvents()}static init(t){return new h(t)}start(){return this}draw(){return this}createControl(){const{config:t}=this;this.gui=new a;const{gui:e}=this;return e.add(t,"scale").step(.01).onChange(()=>this.drawScene()),e.add(t,"resetScene"),this}drawScene(){const{context:t,config:e}=this,s=this.width,i=this.height,n=s*e.scale,r=i*e.scale;return t.clearRect(0,0,this.width,this.height),t.drawImage(this.image,-n/2+s/2,-r/2+i/2,n,r),this}drawRubberbandShape(t){return this}onMouseupHandler(t){const{canvas:e,context:s,rubberbandRect:i}=this;super.onMouseupHandler(t),s.drawImage(e,(i.x+s.lineWidth*2)*this.dpr,(i.y+s.lineWidth*2)*this.dpr,(i.width-4*s.lineWidth)*this.dpr,(i.height-4*s.lineWidth)*this.dpr,0,0,this.width,this.height)}onKeydownHander(t){super.onKeydownHander(t),t.keyCode===32&&this.drawScene()}}export{h as Demo};
