var m=Object.defineProperty;var w=(n,s,t)=>s in n?m(n,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[s]=t;var h=(n,s,t)=>(w(n,typeof s!="symbol"?s+"":s,t),t);import{G as l}from"./lil-gui.esm.7a5dd4ff.js";import{B as p}from"./BaseDemo.9c35b300.js";import{i as f}from"./flower.21c0439b.js";class o extends p{constructor(t){super(t);h(this,"name","\u56FE\u50CF\u5904\u7406 \u2014\u2014 \u53CD\u8272");h(this,"image");h(this,"config",{scale:.2,resetScene:()=>this.drawScene(),negative:()=>this.updatePixel()});this.canvas=t,this.loadImage(f).then(i=>this.image=i).then(()=>{this.drawScene()}),this.createControl()}static init(t){return new o(t)}start(){return this}draw(){return this}createControl(){const{config:t}=this;this.gui=new l;const{gui:i}=this;return i.add(t,"scale").step(.01).min(.1).max(1).onChange(()=>this.drawScene()),i.add(t,"resetScene"),i.add(t,"negative"),this}drawScene(){const{canvas:t,context:i,config:a,image:e}=this,d=this.width,g=this.height,u=e.width*a.scale/e.width,r=e.width*a.scale/this.dpr,c=e.height*u/this.dpr;return i.clearRect(0,0,t.width,t.height),i.drawImage(this.image,-r/2+d/2,-c/2+g/2,r,c),this}updatePixel(){const{context:t}=this,i=t.getImageData(0,0,this.canvas.width,this.canvas.height),a=i.data;for(let e=0;e<=a.length-4;e+=4)a[e]=255-a[e],a[e+1]=255-a[e+1],a[e+2]=255-a[e+2];t.putImageData(i,0,0)}}export{o as Demo};
