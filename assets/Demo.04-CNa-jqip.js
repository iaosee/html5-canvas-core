var d=Object.defineProperty;var o=(s,n,e)=>n in s?d(s,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[n]=e;var i=(s,n,e)=>o(s,typeof n!="symbol"?n+"":n,e);import{B as h}from"./BaseDemo-DB1y7toB.js";import{r as u}from"./util-CX8edQ7O.js";import{I as l}from"./presta_illustration_20-4QhwEhFx.js";class b extends h{constructor(e){super(e);i(this,"name","图像选区");i(this,"dragging",!1);i(this,"mousedownPosition",{x:0,y:0});i(this,"rubberbandDiv",document.createElement("div"));i(this,"rubberbandRectangle",{});i(this,"image");this.canvas=e,this.addRubberbandToScene().listenEvents()}static init(e){return new b(e)}draw(){return this}destroy(){super.destroy(),this.rubberbandDiv.remove()}addRubberbandToScene(){return u(this.rubberbandDiv,{position:"absolute",zIndex:"5",border:"2px solid red",cursor:"crosshair"}),document.body.appendChild(this.rubberbandDiv),this}rubberbandStart(e,t){this.rubberbandRectangle.left=this.mousedownPosition.x=e,this.rubberbandRectangle.top=this.mousedownPosition.y=t,this.moveRubberbandDiv(),this.showRubberbandDiv(),this.dragging=!0}moveRubberbandDiv(){return this.rubberbandDiv.style.top=this.rubberbandRectangle.top+"px",this.rubberbandDiv.style.left=this.rubberbandRectangle.left+"px",this}resizeRubberbandDiv(){return this.rubberbandDiv.style.width=this.rubberbandRectangle.width+"px",this.rubberbandDiv.style.height=this.rubberbandRectangle.height+"px",this}showRubberbandDiv(){return this.rubberbandDiv.style.display="block",this}hideRubberbandDiv(){this.rubberbandDiv.style.display="none"}rubberbandStretch(e,t){this.rubberbandRectangle.left=e<this.mousedownPosition.x?e:this.mousedownPosition.x,this.rubberbandRectangle.top=t<this.mousedownPosition.y?t:this.mousedownPosition.y,this.rubberbandRectangle.width=Math.abs(e-this.mousedownPosition.x),this.rubberbandRectangle.height=Math.abs(t-this.mousedownPosition.y),this.moveRubberbandDiv(),this.resizeRubberbandDiv()}rubberbandEnd(){const{context:e,canvas:t}=this,r=t.getBoundingClientRect();try{e.drawImage(t,this.rubberbandRectangle.left-r.left,this.rubberbandRectangle.top-r.top,this.rubberbandRectangle.width,this.rubberbandRectangle.height,0,0,this.width,this.height)}catch(a){console.log(a)}this.rubberbandDiv.style.width=String(0),this.rubberbandDiv.style.height=String(0),this.resetRubberbandRectangle(),this.hideRubberbandDiv(),this.dragging=!1}resetRubberbandRectangle(){return this.rubberbandRectangle={top:0,left:0,width:0,height:0},this}drawImage(){const{canvas:e,context:t}=this;return t.drawImage(this.image,0,0,this.width,this.height),this}async listenEvents(){const{canvas:e,context:t}=this;try{this.image=await this.loadImage(l),this.drawImage()}catch(r){console.log(r)}return e.addEventListener("mousedown",this.mousedownHandler(),!1),document.addEventListener("mousemove",this.mousemoveHandler(),!1),document.addEventListener("mouseup",this.mouseupHandler(),!1),window.addEventListener("keyup",this.keyupHandler(),!1),this}mousedownHandler(){return e=>{const t=e.x||e.clientX,r=e.y||e.clientY;e.preventDefault(),this.rubberbandStart(t,r)}}mousemoveHandler(){return e=>{const t=e.x||e.clientX,r=e.y||e.clientY;e.preventDefault(),this.dragging&&this.rubberbandStretch(t,r)}}mouseupHandler(){return e=>{e.preventDefault(),this.rubberbandEnd()}}keyupHandler(){return e=>{!e||e.keyCode!==32||this.clearScreen().drawImage()}}}export{b as Demo};