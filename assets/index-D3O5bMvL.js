const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Demo.00-DgkeWeiE.js","assets/BaseDemo-DB1y7toB.js","assets/Demo.01-Dz3etif1.js","assets/Demo.02-DTcirmob.js","assets/presta_illustration_20-4QhwEhFx.js","assets/Demo.03-m4sS8eRj.js","assets/Demo.04-CNa-jqip.js","assets/util-CX8edQ7O.js","assets/Demo.05-BNULdJTD.js","assets/Demo.06-DAxQpf_F.js","assets/lil-gui.esm-hsJpI9MV.js","assets/Demo.07-2Kj99j8u.js","assets/Demo.08-CiBAU17i.js","assets/Demo.09-D3dg5RL2.js","assets/Demo.10-C5QJdCVR.js","assets/Demo.11-BwA4759_.js","assets/Demo.12-DI_siWwA.js","assets/Demo.13-CfmQDS2l.js","assets/Demo.14-iclGdqOg.js","assets/Demo.15-C4ona9A3.js","assets/Demo.16-B2W-MIFN.js","assets/Rubberband-DpEanIXC.js","assets/Demo.17-D0MAxTY6.js","assets/Demo.18-DOBHEk-0.js","assets/Demo.19-BCBFwmDU.js","assets/Demo.20-DoogVx6c.js","assets/Demo.21-DDJEIIH5.js","assets/Demo.22-FchM8cce.js","assets/Demo.23-DLXVZO4h.js","assets/Demo.24-C0HYS-Ge.js","assets/RegularPolygon-CZ1oj-O8.js","assets/Polygon-DGNxmrap.js","assets/Demo.25-QGdc_ia-.js","assets/Demo.26-BuTXAzwb.js","assets/Demo.27-Dv_OoGOp.js","assets/Demo.28-CJHoMO_S.js","assets/Demo.29-CsJymvFd.js","assets/Demo.30-CBo2d0Ni.js","assets/Demo.31-CLk8qRN5.js","assets/Demo.32-D4aRtiaH.js","assets/Demo.33-DBIaLpft.js","assets/Demo.34-YrKjgGOE.js","assets/Demo.35-Bz-KFRx7.js","assets/Demo.36-DlCtLb-a.js","assets/flower-BOKp_aAz.js","assets/Demo.37-Dt7VAPrF.js","assets/Demo.38-CI-7aXPm.js","assets/Demo.39-DV1Fjvx8.js","assets/Demo.40-Dqhj66QC.js","assets/SunglassesFilter-DVzImb6D.js","assets/Demo.41-BB5Z43vD.js","assets/Demo.42-CFXvpawv.js","assets/Demo.43-DEBjd42o.js","assets/Demo.44-so4LMPln.js","assets/Demo.45-CaV2RJvv.js","assets/Demo.46-WY23moG6.js","assets/stats.min-BpIepu9J.js","assets/Demo.47-Cs8_f3Bx.js","assets/sky-DGchKoT-.js","assets/Demo.48-B_rzjk5s.js","assets/Demo.49-CV9mu1Vq.js","assets/Demo.50-BMrOuQ2r.js","assets/Demo.51-yXKkmPJH.js","assets/Sprite-9nB6cOPC.js","assets/ImagePainter-B-NpNDxt.js","assets/bomb-BLXqLVh_.js","assets/Demo.52-xP0VS3SG.js","assets/AnimationTimer-DJQ6xzIw.js","assets/RunnerSprite-Yg9z0LSO.js","assets/Demo.53-DzDm91AG.js","assets/Demo.54-C00shtNn.js","assets/Demo.55-DgG40stR.js","assets/Demo.56-CQau7m-n.js","assets/Demo.57-BC_nKCK9.js","assets/Demo.58-BDBTYZRX.js","assets/Demo.59-DWXLgfa_.js","assets/golfball-fqIsnLt-.js","assets/Demo.60-DriOqMFz.js","assets/CircleImage-CUqYqt57.js","assets/RandomConvexPolygon-DHYIvaIw.js","assets/Demo.61-Bn1y98tH.js","assets/Demo.62-BdVCd5mX.js","assets/Demo.63-78WNmrUm.js","assets/Demo.64-DZsHsvGd.js"])))=>i.map(i=>d[i]);
var O=Object.defineProperty;var P=(m,o,i)=>o in m?O(m,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):m[o]=i;var E=(m,o,i)=>P(m,typeof o!="symbol"?o+"":o,i);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const _ of r)if(_.type==="childList")for(const s of _.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(r){const _={};return r.integrity&&(_.integrity=r.integrity),r.referrerPolicy&&(_.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?_.credentials="include":r.crossOrigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function n(r){if(r.ep)return;r.ep=!0;const _=i(r);fetch(r.href,_)}})();class D{constructor(o,i){E(this,"minValue",0);E(this,"maxValue",0);if(!(this instanceof D))return new D(o,i);this.minValue=Number.isFinite(o)?o:this.minValue,this.maxValue=Number.isFinite(i)?i:this.maxValue}static init(o,i){if(o>i)throw new Error(`min(${o}) greater than max(${i})`);return new D(o,i)}min(o){return this.minValue=Number.isFinite(o)?o:this.minValue,this}max(o){if(o<this.minValue)throw new Error(`max(${o}) less than min(${this.minValue})`);return this.maxValue=Number.isFinite(o)?o:this.maxValue,this}range(o,i){if(o>i)throw new Error(`min(${o}) greater than max(${i})`);return this.min(o).max(i)}random(){return Math.round(Math.random()*(this.maxValue-this.minValue))+this.minValue}getOne(){return this.random()}getGroup(o){const i=[];if(o>this.maxValue-this.minValue+1)throw new Error(`${this.minValue} ~ ${this.maxValue} 范围不能生成 ${o} 个值`);let n=this.getOne();for(;i.length<o;)i.includes(n)?n=this.getOne():i.push(n);return i}}const A="modulepreload",I=function(m){return"/html5-canvas-core/"+m},h={},t=function(o,i,n){let r=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),u=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));r=Promise.allSettled(i.map(a=>{if(a=I(a),a in h)return;h[a]=!0;const l=a.endsWith(".css"),p=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${p}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":A,l||(d.as="script"),d.crossOrigin="",d.href=a,u&&d.setAttribute("nonce",u),document.head.appendChild(d),l)return new Promise((L,V)=>{d.addEventListener("load",L),d.addEventListener("error",()=>V(new Error(`Unable to preload CSS for ${a}`)))})}))}function _(s){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=s,window.dispatchEvent(u),!u.defaultPrevented)throw s}return r.then(s=>{for(const u of s||[])u.status==="rejected"&&_(u.reason);return o().catch(_)})},e=new Map;e.set("Demo.00",()=>t(()=>import("./Demo.00-DgkeWeiE.js"),__vite__mapDeps([0,1])));e.set("Demo.01",()=>t(()=>import("./Demo.01-Dz3etif1.js"),__vite__mapDeps([2,1])));e.set("Demo.02",()=>t(()=>import("./Demo.02-DTcirmob.js"),__vite__mapDeps([3,1,4])));e.set("Demo.03",()=>t(()=>import("./Demo.03-m4sS8eRj.js"),__vite__mapDeps([5,1])));e.set("Demo.04",()=>t(()=>import("./Demo.04-CNa-jqip.js"),__vite__mapDeps([6,1,7,4])));e.set("Demo.05",()=>t(()=>import("./Demo.05-BNULdJTD.js"),__vite__mapDeps([8,1])));e.set("Demo.06",()=>t(()=>import("./Demo.06-DAxQpf_F.js"),__vite__mapDeps([9,10,1])));e.set("Demo.06",()=>t(()=>import("./Demo.06-DAxQpf_F.js"),__vite__mapDeps([9,10,1])));e.set("Demo.07",()=>t(()=>import("./Demo.07-2Kj99j8u.js"),__vite__mapDeps([11,10,1])));e.set("Demo.08",()=>t(()=>import("./Demo.08-CiBAU17i.js"),__vite__mapDeps([12,1])));e.set("Demo.09",()=>t(()=>import("./Demo.09-D3dg5RL2.js"),__vite__mapDeps([13,1])));e.set("Demo.10",()=>t(()=>import("./Demo.10-C5QJdCVR.js"),__vite__mapDeps([14,1])));e.set("Demo.11",()=>t(()=>import("./Demo.11-BwA4759_.js"),__vite__mapDeps([15,1])));e.set("Demo.12",()=>t(()=>import("./Demo.12-DI_siWwA.js"),__vite__mapDeps([16,1])));e.set("Demo.13",()=>t(()=>import("./Demo.13-CfmQDS2l.js"),__vite__mapDeps([17,1])));e.set("Demo.14",()=>t(()=>import("./Demo.14-iclGdqOg.js"),__vite__mapDeps([18,1])));e.set("Demo.15",()=>t(()=>import("./Demo.15-C4ona9A3.js"),__vite__mapDeps([19,1])));e.set("Demo.16",()=>t(()=>import("./Demo.16-B2W-MIFN.js"),__vite__mapDeps([20,21,1])));e.set("Demo.17",()=>t(()=>import("./Demo.17-D0MAxTY6.js"),__vite__mapDeps([22,1])));e.set("Demo.18",()=>t(()=>import("./Demo.18-DOBHEk-0.js"),__vite__mapDeps([23,10,1])));e.set("Demo.19",()=>t(()=>import("./Demo.19-BCBFwmDU.js"),__vite__mapDeps([24,21,1])));e.set("Demo.20",()=>t(()=>import("./Demo.20-DoogVx6c.js"),__vite__mapDeps([25,1])));e.set("Demo.21",()=>t(()=>import("./Demo.21-DDJEIIH5.js"),__vite__mapDeps([26,1])));e.set("Demo.22",()=>t(()=>import("./Demo.22-FchM8cce.js"),__vite__mapDeps([27,1])));e.set("Demo.23",()=>t(()=>import("./Demo.23-DLXVZO4h.js"),__vite__mapDeps([28,10,21,1])));e.set("Demo.24",()=>t(()=>import("./Demo.24-C0HYS-Ge.js"),__vite__mapDeps([29,10,21,1,30,31])));e.set("Demo.25",()=>t(()=>import("./Demo.25-QGdc_ia-.js"),__vite__mapDeps([32,10,21,1,30,31])));e.set("Demo.26",()=>t(()=>import("./Demo.26-BuTXAzwb.js"),__vite__mapDeps([33,10,21,1])));e.set("Demo.27",()=>t(()=>import("./Demo.27-Dv_OoGOp.js"),__vite__mapDeps([34,10,21,1])));e.set("Demo.28",()=>t(()=>import("./Demo.28-CJHoMO_S.js"),__vite__mapDeps([35,10,1])));e.set("Demo.29",()=>t(()=>import("./Demo.29-CsJymvFd.js"),__vite__mapDeps([36,10,21,1])));e.set("Demo.30",()=>t(()=>import("./Demo.30-CBo2d0Ni.js"),__vite__mapDeps([37,1])));e.set("Demo.31",()=>t(()=>import("./Demo.31-CLk8qRN5.js"),__vite__mapDeps([38,10,1])));e.set("Demo.32",()=>t(()=>import("./Demo.32-D4aRtiaH.js"),__vite__mapDeps([39,10,1])));e.set("Demo.33",()=>t(()=>import("./Demo.33-DBIaLpft.js"),__vite__mapDeps([40,10,1])));e.set("Demo.34",()=>t(()=>import("./Demo.34-YrKjgGOE.js"),__vite__mapDeps([41,10,1])));e.set("Demo.35",()=>t(()=>import("./Demo.35-Bz-KFRx7.js"),__vite__mapDeps([42,10,1])));e.set("Demo.36",()=>t(()=>import("./Demo.36-DlCtLb-a.js"),__vite__mapDeps([43,10,1,44])));e.set("Demo.37",()=>t(()=>import("./Demo.37-Dt7VAPrF.js"),__vite__mapDeps([45,10,1,44])));e.set("Demo.38",()=>t(()=>import("./Demo.38-CI-7aXPm.js"),__vite__mapDeps([46,10,21,1,44])));e.set("Demo.39",()=>t(()=>import("./Demo.39-DV1Fjvx8.js"),__vite__mapDeps([47,10,1,44])));e.set("Demo.40",()=>t(()=>import("./Demo.40-Dqhj66QC.js"),__vite__mapDeps([48,10,1,49,44])));e.set("Demo.41",()=>t(()=>import("./Demo.41-BB5Z43vD.js"),__vite__mapDeps([50,10,1,49,44])));e.set("Demo.42",()=>t(()=>import("./Demo.42-CFXvpawv.js"),__vite__mapDeps([51,10,1,44])));e.set("Demo.43",()=>t(()=>import("./Demo.43-DEBjd42o.js"),__vite__mapDeps([52,10,1,44])));e.set("Demo.44",()=>t(()=>import("./Demo.44-so4LMPln.js"),__vite__mapDeps([53,10,1,44])));e.set("Demo.45",()=>t(()=>import("./Demo.45-CaV2RJvv.js"),__vite__mapDeps([54,10,1])));e.set("Demo.46",()=>t(()=>import("./Demo.46-WY23moG6.js"),__vite__mapDeps([55,10,56,1])));e.set("Demo.47",()=>t(()=>import("./Demo.47-Cs8_f3Bx.js"),__vite__mapDeps([57,10,56,1,58])));e.set("Demo.48",()=>t(()=>import("./Demo.48-B_rzjk5s.js"),__vite__mapDeps([59,10,56,1,58])));e.set("Demo.49",()=>t(()=>import("./Demo.49-CV9mu1Vq.js"),__vite__mapDeps([60,1])));e.set("Demo.50",()=>t(()=>import("./Demo.50-BMrOuQ2r.js"),__vite__mapDeps([61,10,1])));e.set("Demo.51",()=>t(()=>import("./Demo.51-yXKkmPJH.js"),__vite__mapDeps([62,1,63,64,65])));e.set("Demo.52",()=>t(()=>import("./Demo.52-xP0VS3SG.js"),__vite__mapDeps([66,10,1,67,63,64,68,65])));e.set("Demo.53",()=>t(()=>import("./Demo.53-DzDm91AG.js"),__vite__mapDeps([69,10,1,67,63])));e.set("Demo.54",()=>t(()=>import("./Demo.54-C00shtNn.js"),__vite__mapDeps([70,10,1,7,63])));e.set("Demo.55",()=>t(()=>import("./Demo.55-DgG40stR.js"),__vite__mapDeps([71,10,1,63])));e.set("Demo.56",()=>t(()=>import("./Demo.56-CQau7m-n.js"),__vite__mapDeps([72,10,1,67,63])));e.set("Demo.57",()=>t(()=>import("./Demo.57-BC_nKCK9.js"),__vite__mapDeps([73,10,1,67,63,68])));e.set("Demo.58",()=>t(()=>import("./Demo.58-BDBTYZRX.js"),__vite__mapDeps([74,10,56,1])));e.set("Demo.59",()=>t(()=>import("./Demo.59-DWXLgfa_.js"),__vite__mapDeps([75,1,31,63,64,76])));e.set("Demo.60",()=>t(()=>import("./Demo.60-DriOqMFz.js"),__vite__mapDeps([77,10,1,31,78,79,76])));e.set("Demo.61",()=>t(()=>import("./Demo.61-Bn1y98tH.js"),__vite__mapDeps([80,10,1,31,78,79,76])));e.set("Demo.62",()=>t(()=>import("./Demo.62-BdVCd5mX.js"),__vite__mapDeps([81,10,1,31,78,79,76])));e.set("Demo.63",()=>t(()=>import("./Demo.63-78WNmrUm.js"),__vite__mapDeps([82,1])));e.set("Demo.64",()=>t(()=>import("./Demo.64-DZsHsvGd.js"),__vite__mapDeps([83,10,1,31,79])));const T=()=>{const m=/#\/(.+)$/,o=window.location.hash.match(m),n=D.init(0,[...e.keys()].length-1).getOne().toString().padStart(2,"0");return o?o[1]:`Demo.${n}`},c=class c{constructor(){E(this,"canvas");E(this,"demo");E(this,"menuContianer");E(this,"menuLastActive")}static init(){return c.instance?c.instance:c.instance=new c}run(){window.app=this,this.initMenuList().listenEvent().initDemo()}createCanvas(){return this.canvas=document.createElement("canvas"),document.body.insertBefore(this.canvas,document.body.firstChild),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this}initDemo(){return this.renderScene(),this}initMenuList(){const o=document.querySelector(".menu-bar-container"),i=document.querySelector(".menu-toggle"),n=document.createElement("div");n.classList.add("menu-list-container");let r="";return e.forEach((_,s)=>{r+=`<div class="menu-item" data-name="${s}">
                          <a href="#/${s}">
                            ${s}
                          </a>
                        </div>`}),n.innerHTML=r,o.appendChild(n),i.addEventListener("click",()=>{o.classList.contains("collapsed")?o.classList.remove("collapsed"):o.classList.add("collapsed")}),this.menuContianer=o,this}listenEvent(){return window.addEventListener("hashchange",o=>this.renderScene()),this}async renderScene(o=T()){const i=e.get(o);if(!i)throw alert(`${o} doesn't exist !`),new Error(`${o} doesn't exist !`);const r=(await i()).Demo;this.demo&&(this.demo.destroy(),this.demo=null),this.canvas&&(this.canvas.remove(),this.canvas=null),this.createCanvas(),this.demo=r.init(this.canvas).start(),document.title=this.demo.name||"Canvas Demo",window.demo=this.demo;const _=this.menuContianer.querySelector(`[data-name="${o}"]`);return this.menuLastActive&&this.menuLastActive.classList.remove("active"),_&&(_.classList.add("active"),this.menuLastActive=_),this}};E(c,"instance");let v=c;v.init().run();export{D as R};
