var f=Object.defineProperty;var x=(i,r,t)=>r in i?f(i,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[r]=t;var h=(i,r,t)=>x(i,typeof r!="symbol"?r+"":r,t);import{G as m}from"./lil-gui.esm-hsJpI9MV.js";import{B as w}from"./BaseDemo-DB1y7toB.js";class l extends w{constructor(t){super(t);h(this,"name","文字路径环绕");h(this,"config",{radius:300,fontSize:50,text:"Hello canvas, hello world. It's so funny. "});this.canvas=t,this.createControl()}static init(t){return new l(t)}start(){return this.clearScreen().drawGrid().drawScene()}draw(){return this}createControl(){const{config:t}=this;this.gui=new m;const{gui:s}=this;return s.add(t,"text").onFinishChange(()=>this.start()),s.add(t,"radius").min(100).max(500).step(10).onFinishChange(()=>this.start()),this}drawScene(){const{config:t}=this;return this.drawCircularText(t.text,Math.PI*2,Math.PI/8),this}drawCircularText(t,s,d){const{context:e,config:n}=this,u=(s-d)/(t.length-1);let a=0,o;const c=this.randomRgba();for(e.save(),e.fillStyle=c,e.strokeStyle=c,e.font=n.fontSize+"px Lucida Sans";a<t.length;)o=t.charAt(a),e.save(),e.beginPath(),e.translate(this.center.x+Math.cos(s)*n.radius,this.center.y-Math.sin(s)*n.radius),e.rotate(Math.PI/2-s),e.fillText(o,0,0),e.strokeText(o,0,0),s-=u,a++,e.restore();return e.restore(),this}}export{l as Demo};
