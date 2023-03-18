var V=Object.defineProperty;var p=(n,o,i)=>o in n?V(n,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[o]=i;var E=(n,o,i)=>(p(n,typeof o!="symbol"?o+"":o,i),i);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const _ of document.querySelectorAll('link[rel="modulepreload"]'))s(_);new MutationObserver(_=>{for(const r of _)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function i(_){const r={};return _.integrity&&(r.integrity=_.integrity),_.referrerpolicy&&(r.referrerPolicy=_.referrerpolicy),_.crossorigin==="use-credentials"?r.credentials="include":_.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(_){if(_.ep)return;_.ep=!0;const r=i(_);fetch(_.href,r)}})();class D{constructor(o,i){E(this,"minValue",0);E(this,"maxValue",0);if(!(this instanceof D))return new D(o,i);this.minValue=Number.isFinite(o)?o:this.minValue,this.maxValue=Number.isFinite(i)?i:this.maxValue}static init(o,i){if(o>i)throw new Error(`min(${o}) greater than max(${i})`);return new D(o,i)}min(o){return this.minValue=Number.isFinite(o)?o:this.minValue,this}max(o){if(o<this.minValue)throw new Error(`max(${o}) less than min(${this.minValue})`);return this.maxValue=Number.isFinite(o)?o:this.maxValue,this}range(o,i){if(o>i)throw new Error(`min(${o}) greater than max(${i})`);return this.min(o).max(i)}random(){return Math.round(Math.random()*(this.maxValue-this.minValue))+this.minValue}getOne(){return this.random()}getGroup(o){const i=[];if(o>this.maxValue-this.minValue+1)throw new Error(`${this.minValue} ~ ${this.maxValue} \u8303\u56F4\u4E0D\u80FD\u751F\u6210 ${o} \u4E2A\u503C`);let s=this.getOne();for(;i.length<o;)i.includes(s)?s=this.getOne():i.push(s);return i}}const L="modulepreload",O=function(n){return"/html5-canvas-core/"+n},h={},t=function(o,i,s){if(!i||i.length===0)return o();const _=document.getElementsByTagName("link");return Promise.all(i.map(r=>{if(r=O(r),r in h)return;h[r]=!0;const m=r.endsWith(".css"),v=m?'[rel="stylesheet"]':"";if(!!s)for(let a=_.length-1;a>=0;a--){const c=_[a];if(c.href===r&&(!m||c.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${v}`))return;const u=document.createElement("link");if(u.rel=m?"stylesheet":L,m||(u.as="script",u.crossOrigin=""),u.href=r,document.head.appendChild(u),m)return new Promise((a,c)=>{u.addEventListener("load",a),u.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>o())},e=new Map;e.set("Demo.00",()=>t(()=>import("./Demo.00.97af6dd1.js"),["assets/Demo.00.97af6dd1.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.01",()=>t(()=>import("./Demo.01.c905e0eb.js"),["assets/Demo.01.c905e0eb.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.02",()=>t(()=>import("./Demo.02.32ed1722.js"),["assets/Demo.02.32ed1722.js","assets/BaseDemo.9c35b300.js","assets/presta_illustration_20.082a40c8.js"]));e.set("Demo.03",()=>t(()=>import("./Demo.03.3c584d3e.js"),["assets/Demo.03.3c584d3e.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.04",()=>t(()=>import("./Demo.04.4d9c47e4.js"),["assets/Demo.04.4d9c47e4.js","assets/BaseDemo.9c35b300.js","assets/util.064ed5aa.js","assets/presta_illustration_20.082a40c8.js"]));e.set("Demo.05",()=>t(()=>import("./Demo.05.c366c6d4.js"),["assets/Demo.05.c366c6d4.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.06",()=>t(()=>import("./Demo.06.830209e1.js"),["assets/Demo.06.830209e1.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.06",()=>t(()=>import("./Demo.06.830209e1.js"),["assets/Demo.06.830209e1.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.07",()=>t(()=>import("./Demo.07.facc3b77.js"),["assets/Demo.07.facc3b77.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.08",()=>t(()=>import("./Demo.08.08fd4d42.js"),["assets/Demo.08.08fd4d42.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.09",()=>t(()=>import("./Demo.09.a8d312a9.js"),["assets/Demo.09.a8d312a9.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.10",()=>t(()=>import("./Demo.10.8d90712f.js"),["assets/Demo.10.8d90712f.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.11",()=>t(()=>import("./Demo.11.26a4473e.js"),["assets/Demo.11.26a4473e.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.12",()=>t(()=>import("./Demo.12.f8deb97f.js"),["assets/Demo.12.f8deb97f.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.13",()=>t(()=>import("./Demo.13.c7a5c04c.js"),["assets/Demo.13.c7a5c04c.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.14",()=>t(()=>import("./Demo.14.0403d108.js"),["assets/Demo.14.0403d108.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.15",()=>t(()=>import("./Demo.15.dfe9f7e2.js"),["assets/Demo.15.dfe9f7e2.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.16",()=>t(()=>import("./Demo.16.5cb6f770.js"),["assets/Demo.16.5cb6f770.js","assets/Rubberband.acc17faa.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.17",()=>t(()=>import("./Demo.17.6d99f099.js"),["assets/Demo.17.6d99f099.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.18",()=>t(()=>import("./Demo.18.99ffd7ad.js"),["assets/Demo.18.99ffd7ad.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.19",()=>t(()=>import("./Demo.19.b750b824.js"),["assets/Demo.19.b750b824.js","assets/Rubberband.acc17faa.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.20",()=>t(()=>import("./Demo.20.4e2a4a59.js"),["assets/Demo.20.4e2a4a59.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.21",()=>t(()=>import("./Demo.21.3042f956.js"),["assets/Demo.21.3042f956.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.22",()=>t(()=>import("./Demo.22.091e79d1.js"),["assets/Demo.22.091e79d1.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.23",()=>t(()=>import("./Demo.23.2ddada05.js"),["assets/Demo.23.2ddada05.js","assets/lil-gui.esm.7a5dd4ff.js","assets/Rubberband.acc17faa.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.24",()=>t(()=>import("./Demo.24.72a85985.js"),["assets/Demo.24.72a85985.js","assets/lil-gui.esm.7a5dd4ff.js","assets/Rubberband.acc17faa.js","assets/BaseDemo.9c35b300.js","assets/RegularPolygon.3940033a.js","assets/Polygon.2e760a6a.js"]));e.set("Demo.25",()=>t(()=>import("./Demo.25.5e58acd2.js"),["assets/Demo.25.5e58acd2.js","assets/lil-gui.esm.7a5dd4ff.js","assets/Rubberband.acc17faa.js","assets/BaseDemo.9c35b300.js","assets/RegularPolygon.3940033a.js","assets/Polygon.2e760a6a.js"]));e.set("Demo.26",()=>t(()=>import("./Demo.26.a2dbfa1c.js"),["assets/Demo.26.a2dbfa1c.js","assets/lil-gui.esm.7a5dd4ff.js","assets/Rubberband.acc17faa.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.27",()=>t(()=>import("./Demo.27.9eb3153e.js"),["assets/Demo.27.9eb3153e.js","assets/lil-gui.esm.7a5dd4ff.js","assets/Rubberband.acc17faa.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.28",()=>t(()=>import("./Demo.28.cfe8f184.js"),["assets/Demo.28.cfe8f184.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.29",()=>t(()=>import("./Demo.29.aa0e71a9.js"),["assets/Demo.29.aa0e71a9.js","assets/lil-gui.esm.7a5dd4ff.js","assets/Rubberband.acc17faa.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.30",()=>t(()=>import("./Demo.30.af132242.js"),["assets/Demo.30.af132242.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.31",()=>t(()=>import("./Demo.31.b4314dbf.js"),["assets/Demo.31.b4314dbf.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.32",()=>t(()=>import("./Demo.32.b3cd5101.js"),["assets/Demo.32.b3cd5101.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.33",()=>t(()=>import("./Demo.33.f70e9972.js"),["assets/Demo.33.f70e9972.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.34",()=>t(()=>import("./Demo.34.40a18202.js"),["assets/Demo.34.40a18202.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.35",()=>t(()=>import("./Demo.35.0652123f.js"),["assets/Demo.35.0652123f.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.36",()=>t(()=>import("./Demo.36.1ff4c1c1.js"),["assets/Demo.36.1ff4c1c1.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/flower.21c0439b.js"]));e.set("Demo.37",()=>t(()=>import("./Demo.37.552bddb0.js"),["assets/Demo.37.552bddb0.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/flower.21c0439b.js"]));e.set("Demo.38",()=>t(()=>import("./Demo.38.5a3892ea.js"),["assets/Demo.38.5a3892ea.js","assets/lil-gui.esm.7a5dd4ff.js","assets/Rubberband.acc17faa.js","assets/BaseDemo.9c35b300.js","assets/flower.21c0439b.js"]));e.set("Demo.39",()=>t(()=>import("./Demo.39.cac45c5a.js"),["assets/Demo.39.cac45c5a.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/flower.21c0439b.js"]));e.set("Demo.40",()=>t(()=>import("./Demo.40.2f9d0fa4.js"),["assets/Demo.40.2f9d0fa4.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/SunglassesFilter.9d2d86ac.js","assets/flower.21c0439b.js"]));e.set("Demo.41",()=>t(()=>import("./Demo.41.100796ce.js"),["assets/Demo.41.100796ce.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/SunglassesFilter.9d2d86ac.js","assets/flower.21c0439b.js"]));e.set("Demo.42",()=>t(()=>import("./Demo.42.03df4e23.js"),["assets/Demo.42.03df4e23.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/flower.21c0439b.js"]));e.set("Demo.43",()=>t(()=>import("./Demo.43.a0f10034.js"),["assets/Demo.43.a0f10034.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/flower.21c0439b.js"]));e.set("Demo.44",()=>t(()=>import("./Demo.44.b5210419.js"),["assets/Demo.44.b5210419.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/flower.21c0439b.js"]));e.set("Demo.45",()=>t(()=>import("./Demo.45.1b641f66.js"),["assets/Demo.45.1b641f66.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.46",()=>t(()=>import("./Demo.46.ddf2e338.js"),["assets/Demo.46.ddf2e338.js","assets/lil-gui.esm.7a5dd4ff.js","assets/stats.min.9233e90c.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.47",()=>t(()=>import("./Demo.47.ae680a1e.js"),["assets/Demo.47.ae680a1e.js","assets/lil-gui.esm.7a5dd4ff.js","assets/stats.min.9233e90c.js","assets/BaseDemo.9c35b300.js","assets/sky.df5be63d.js"]));e.set("Demo.48",()=>t(()=>import("./Demo.48.dbb298b6.js"),["assets/Demo.48.dbb298b6.js","assets/lil-gui.esm.7a5dd4ff.js","assets/stats.min.9233e90c.js","assets/BaseDemo.9c35b300.js","assets/sky.df5be63d.js"]));e.set("Demo.49",()=>t(()=>import("./Demo.49.35e96a6f.js"),["assets/Demo.49.35e96a6f.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.50",()=>t(()=>import("./Demo.50.0ec123b4.js"),["assets/Demo.50.0ec123b4.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.51",()=>t(()=>import("./Demo.51.ac59de91.js"),["assets/Demo.51.ac59de91.js","assets/BaseDemo.9c35b300.js","assets/Sprite.b43779c9.js","assets/ImagePainter.f7266c8a.js","assets/bomb.7e822fe4.js"]));e.set("Demo.52",()=>t(()=>import("./Demo.52.bc39ad9d.js"),["assets/Demo.52.bc39ad9d.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/AnimationTimer.e9c92d46.js","assets/Sprite.b43779c9.js","assets/ImagePainter.f7266c8a.js","assets/RunnerSprite.bf039336.js","assets/bomb.7e822fe4.js"]));e.set("Demo.53",()=>t(()=>import("./Demo.53.cbd2aea8.js"),["assets/Demo.53.cbd2aea8.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/AnimationTimer.e9c92d46.js","assets/Sprite.b43779c9.js"]));e.set("Demo.54",()=>t(()=>import("./Demo.54.b81be63b.js"),["assets/Demo.54.b81be63b.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/util.064ed5aa.js","assets/Sprite.b43779c9.js"]));e.set("Demo.55",()=>t(()=>import("./Demo.55.3c3b647c.js"),["assets/Demo.55.3c3b647c.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/Sprite.b43779c9.js"]));e.set("Demo.56",()=>t(()=>import("./Demo.56.e70af8e9.js"),["assets/Demo.56.e70af8e9.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/AnimationTimer.e9c92d46.js","assets/Sprite.b43779c9.js"]));e.set("Demo.57",()=>t(()=>import("./Demo.57.b2f55e41.js"),["assets/Demo.57.b2f55e41.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/AnimationTimer.e9c92d46.js","assets/Sprite.b43779c9.js","assets/RunnerSprite.bf039336.js"]));e.set("Demo.58",()=>t(()=>import("./Demo.58.ced973ee.js"),["assets/Demo.58.ced973ee.js","assets/lil-gui.esm.7a5dd4ff.js","assets/stats.min.9233e90c.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.59",()=>t(()=>import("./Demo.59.c4993a24.js"),["assets/Demo.59.c4993a24.js","assets/BaseDemo.9c35b300.js","assets/Polygon.2e760a6a.js","assets/Sprite.b43779c9.js","assets/ImagePainter.f7266c8a.js","assets/golfball.de451e99.js"]));e.set("Demo.60",()=>t(()=>import("./Demo.60.e1ae55ee.js"),["assets/Demo.60.e1ae55ee.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/Polygon.2e760a6a.js","assets/CircleImage.b7ada592.js","assets/RandomConvexPolygon.63aced17.js","assets/golfball.de451e99.js"]));e.set("Demo.61",()=>t(()=>import("./Demo.61.c7f2d9c9.js"),["assets/Demo.61.c7f2d9c9.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/Polygon.2e760a6a.js","assets/CircleImage.b7ada592.js","assets/RandomConvexPolygon.63aced17.js","assets/golfball.de451e99.js"]));e.set("Demo.62",()=>t(()=>import("./Demo.62.0a2e56e6.js"),["assets/Demo.62.0a2e56e6.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/Polygon.2e760a6a.js","assets/CircleImage.b7ada592.js","assets/RandomConvexPolygon.63aced17.js","assets/golfball.de451e99.js"]));e.set("Demo.63",()=>t(()=>import("./Demo.63.09057256.js"),["assets/Demo.63.09057256.js","assets/BaseDemo.9c35b300.js"]));e.set("Demo.64",()=>t(()=>import("./Demo.64.81f6475c.js"),["assets/Demo.64.81f6475c.js","assets/lil-gui.esm.7a5dd4ff.js","assets/BaseDemo.9c35b300.js","assets/Polygon.2e760a6a.js","assets/RandomConvexPolygon.63aced17.js"]));const P=()=>{const n=/#\/(.+)$/,o=window.location.hash.match(n),s=D.init(0,[...e.keys()].length-1).getOne().toString().padStart(2,"0");return o?o[1]:`Demo.${s}`},d=class{constructor(){E(this,"canvas");E(this,"demo")}static init(){return d.instance?d.instance:d.instance=new d}run(){window.app=this,this.initMenuList().listenEvent().initDemo()}createCanvas(){return this.canvas=document.createElement("canvas"),document.body.insertBefore(this.canvas,document.body.firstChild),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this}initDemo(){return this.renderScene(),this}initMenuList(){const o=document.querySelector(".menu-bar-container"),i=document.createElement("div");i.classList.add("menu-list-container");let s="";return e.forEach((_,r)=>{s+=`<div class="menu-item">
                          <a href="#/${r}">
                            ${r}
                          </a>
                        </div>`}),i.innerHTML=s,o.appendChild(i),this}listenEvent(){return window.addEventListener("hashchange",o=>this.renderScene()),this}async renderScene(o=P()){const i=e.get(o);if(!i)throw alert(`${o} doesn't exist !`),new Error(`${o} doesn't exist !`);const _=(await i()).Demo;return this.demo&&(this.demo.destroy(),this.demo=null),this.canvas&&(this.canvas.remove(),this.canvas=null),this.createCanvas(),this.demo=_.init(this.canvas).start(),document.title=this.demo.name||"Canvas Demo",window.demo=this.demo,this}};let l=d;E(l,"instance");l.init().run();export{D as R};
