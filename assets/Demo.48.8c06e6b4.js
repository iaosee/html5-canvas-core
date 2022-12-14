import{G as m}from"./lil-gui.esm.7a5dd4ff.js";import{S as c}from"./stats.min.9233e90c.js";import{B as O}from"./BaseDemo.deaf79c0.js";import{i as w}from"./sky.df5be63d.js";const l="/html5-canvas-core/assets/smalltree.a099f29f.png",T="/html5-canvas-core/assets/tree-twotrunks.c0533924.png",I="/html5-canvas-core/assets/grass.48f65ee8.png",E="/html5-canvas-core/assets/grass2.1b1a5ff2.png";class d extends O{constructor(e){super(e),this.canvas=e,this.name="\u52A8\u753B \u2014\u2014 \u89C6\u5DEE\u6EDA\u52A8",this.lastTime=0,this.skyOffset=0,this.treeOffset=0,this.nearTreeOffset=0,this.grassOffset=0,this.grass2Offset=0,this.config={SKY_VELOCITY:20,TREE_VELOCITY:40,FAST_TREE_VELOCITY:60,GRASS_VELOCITY:100},this.createControl().initStats().initResource().then(t=>{this.sky=t[0],this.tree=t[1],this.nearTree=t[2],this.grass=t[3],this.grass2=t[4]}).then(()=>this.startPlay())}static init(e){return new d(e)}start(){return this}draw(e){return this.clearScreen().drawGrid().drawScene(e),this.stats.update(),this.lastTime=e,this}initStats(){return this.stats=new c,this.stats.showPanel(0),document.body.appendChild(this.stats.dom),this}createControl(){const{config:e}=this;this.gui=new m;const{gui:t}=this;return t.add(e,"SKY_VELOCITY").min(10).max(200).step(10),t.add(e,"TREE_VELOCITY").min(20).max(400).step(10),t.add(e,"FAST_TREE_VELOCITY").min(30).max(600).step(10),t.add(e,"GRASS_VELOCITY").min(80).max(800).step(10),this}initResource(){return Promise.all([this.loadImage(w),this.loadImage(l),this.loadImage(T),this.loadImage(I),this.loadImage(E)])}drawScene(e){const{context:t,canvas:s,config:n,sky:a,tree:f,nearTree:o,grass:i,grass2:h}=this,g=1e3/(e-this.lastTime);this.skyOffset=this.skyOffset<a.width?this.skyOffset+n.SKY_VELOCITY/g:0,this.treeOffset=this.treeOffset<s.width/6*2?this.treeOffset+n.TREE_VELOCITY/g:0,this.nearTreeOffset=this.nearTreeOffset<s.width/4*2?this.nearTreeOffset+n.FAST_TREE_VELOCITY/g:0,this.grassOffset=this.grassOffset<i.width?this.grassOffset+n.GRASS_VELOCITY/g:0,t.save(),t.translate(-this.skyOffset,-1200),t.drawImage(a,0,s.height-a.height+80),t.drawImage(a,a.width-2,s.height-a.height+80),t.drawImage(a,(a.width-2)*2,s.height-a.height+80),t.restore(),t.save(),t.translate(-this.treeOffset,-1200);for(let r=0;r<=8;r++)t.drawImage(f,s.width/6*r,s.height-f.height);t.restore(),t.save(),t.translate(-this.nearTreeOffset,-1200);for(let r=0;r<=6;r++)t.drawImage(o,s.width/4*r,s.height-o.height);return t.restore(),t.save(),t.translate(-this.grassOffset,-1200),t.drawImage(i,0,s.height-i.height),t.drawImage(i,i.width,s.height-i.height),t.drawImage(i,i.width*2,s.height-i.height),t.drawImage(h,0,s.height-h.height),t.drawImage(h,h.width,s.height-h.height),t.drawImage(h,h.width*2,s.height-h.height),t.restore(),this}}export{d as Demo};
