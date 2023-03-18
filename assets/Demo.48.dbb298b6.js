var w=Object.defineProperty;var T=(f,h,e)=>h in f?w(f,h,{enumerable:!0,configurable:!0,writable:!0,value:e}):f[h]=e;var a=(f,h,e)=>(T(f,typeof h!="symbol"?h+"":h,e),e);import{G as l}from"./lil-gui.esm.7a5dd4ff.js";import{S as I}from"./stats.min.9233e90c.js";import{B as E}from"./BaseDemo.9c35b300.js";import{i as u}from"./sky.df5be63d.js";const S="/html5-canvas-core/assets/smalltree.a099f29f.png",_="/html5-canvas-core/assets/tree-twotrunks.c0533924.png",p="/html5-canvas-core/assets/grass.48f65ee8.png",C="/html5-canvas-core/assets/grass2.1b1a5ff2.png";class O extends E{constructor(e){super(e);a(this,"name","\u52A8\u753B \u2014\u2014 \u89C6\u5DEE\u6EDA\u52A8");a(this,"lastTime",0);a(this,"sky");a(this,"tree");a(this,"nearTree");a(this,"grass");a(this,"grass2");a(this,"skyOffset",0);a(this,"treeOffset",0);a(this,"nearTreeOffset",0);a(this,"grassOffset",0);a(this,"grass2Offset",0);a(this,"config",{SKY_VELOCITY:20,TREE_VELOCITY:40,FAST_TREE_VELOCITY:60,GRASS_VELOCITY:100});this.canvas=e,this.createControl().initStats().initResource().then(t=>{this.sky=t[0],this.tree=t[1],this.nearTree=t[2],this.grass=t[3],this.grass2=t[4]}).then(()=>this.startPlay())}static init(e){return new O(e)}start(){return this}draw(e){return this.clearScreen().drawGrid().drawScene(e),this.stats.update(),this.lastTime=e,this}initStats(){return this.stats=new I,this.stats.showPanel(0),document.body.appendChild(this.stats.dom),this}createControl(){const{config:e}=this;this.gui=new l;const{gui:t}=this;return t.add(e,"SKY_VELOCITY").min(10).max(200).step(10),t.add(e,"TREE_VELOCITY").min(20).max(400).step(10),t.add(e,"FAST_TREE_VELOCITY").min(30).max(600).step(10),t.add(e,"GRASS_VELOCITY").min(80).max(800).step(10),this}initResource(){return Promise.all([this.loadImage(u),this.loadImage(S),this.loadImage(_),this.loadImage(p),this.loadImage(C)])}drawScene(e){const{context:t,canvas:s,config:o,sky:r,tree:m,nearTree:c,grass:i,grass2:n}=this,d=1e3/(e-this.lastTime);this.skyOffset=this.skyOffset<r.width?this.skyOffset+o.SKY_VELOCITY/d:0,this.treeOffset=this.treeOffset<s.width/6*2?this.treeOffset+o.TREE_VELOCITY/d:0,this.nearTreeOffset=this.nearTreeOffset<s.width/4*2?this.nearTreeOffset+o.FAST_TREE_VELOCITY/d:0,this.grassOffset=this.grassOffset<i.width?this.grassOffset+o.GRASS_VELOCITY/d:0,t.save(),t.translate(-this.skyOffset,-1200),t.drawImage(r,0,s.height-r.height+80),t.drawImage(r,r.width-2,s.height-r.height+80),t.drawImage(r,(r.width-2)*2,s.height-r.height+80),t.restore(),t.save(),t.translate(-this.treeOffset,-1200);for(let g=0;g<=8;g++)t.drawImage(m,s.width/6*g,s.height-m.height);t.restore(),t.save(),t.translate(-this.nearTreeOffset,-1200);for(let g=0;g<=6;g++)t.drawImage(c,s.width/4*g,s.height-c.height);return t.restore(),t.save(),t.translate(-this.grassOffset,-1200),t.drawImage(i,0,s.height-i.height),t.drawImage(i,i.width,s.height-i.height),t.drawImage(i,i.width*2,s.height-i.height),t.drawImage(n,0,s.height-n.height),t.drawImage(n,n.width,s.height-n.height),t.drawImage(n,n.width*2,s.height-n.height),t.restore(),this}}export{O as Demo};
