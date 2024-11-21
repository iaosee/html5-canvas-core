var g=Object.defineProperty;var x=(c,e,t)=>e in c?g(c,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[e]=t;var h=(c,e,t)=>x(c,typeof e!="symbol"?e+"":e,t);import{G as v}from"./lil-gui.esm-hsJpI9MV.js";import{R as P}from"./index-D3O5bMvL.js";import{B as M}from"./BaseDemo-DB1y7toB.js";class l extends M{constructor(t){super(t);h(this,"name","移动的小球");h(this,"circles",[]);h(this,"random",P.init(-5,5));h(this,"mousePosition",{x:0,y:0});h(this,"config",{circleQuantity:50,lineType:1});this.canvas=t;const o={x:this.centerX,y:this.centerY};this.createControl().createCircle(o,this.config.circleQuantity).listenEvents()}static init(t){return new l(t)}draw(){return this.clearScreen().drawGrid().drawLines().drawCircles()}createControl(){const{config:t}=this;this.gui=new v;const{gui:o}=this;return o.add(t,"circleQuantity").min(5).max(1e3).step(5).onFinishChange(i=>{t.circleQuantity=Number(i),this.createCircle(this.center,t.circleQuantity,!0)}),o.add(t,"lineType",{none:0,ligature:1,breaking:2,connection:3}).onFinishChange(i=>{t.lineType=Number(i)}),this}createCircle(t,o=50,i=!1){i&&this.circles.splice(0,this.circles.length);for(let s=0;s<o;s++){const n={x:t.x||this.centerX,y:t.y||this.centerY};this.circles.push({position:n,velocityX:Math.random()*(this.random.range(-2,2).getOne()||2),velocityY:Math.random()*(this.random.range(-2,2).getOne()||2),radius:this.random.range(5,10).getOne(),color:this.randomRgba()})}return this}drawCircles(){const{context:t}=this;return this.circles.forEach(o=>{t.beginPath(),t.arc(o.position.x,o.position.y,o.radius,0,Math.PI*2,!1),t.fillStyle=o.color,t.fill(),this.updatePosition(o)}),this}drawLines(){const{config:t,context:o,circles:i}=this;switch(t.lineType){case 1:o.beginPath(),o.moveTo(i[0].position.x,i[0].position.y);for(let s=1,n=i.length;s<n;s++)o.strokeStyle=i[s].color,o.lineTo(i[s].position.x,i[s].position.y);o.closePath(),o.stroke();break;case 2:o.beginPath();for(let s=0,n=i.length;s<n;s++){o.strokeStyle=i[s].color;for(let r=s+1,y=i.length;r<y;r++){const d=Math.pow(i[r].position.x-i[s].position.x,2),m=Math.pow(i[r].position.y-i[s].position.y,2),f=Math.sqrt(d+m);Math.abs(f)>100||(o.moveTo(i[s].position.x,i[s].position.y),o.lineTo(i[r].position.x,i[r].position.y))}if(this.mousePosition.x===0&&this.mousePosition.y===0)continue;const a=Math.pow(this.mousePosition.x-i[s].position.x,2),u=Math.pow(this.mousePosition.y-i[s].position.y,2),p=Math.sqrt(a+u);Math.abs(p)>150||(o.moveTo(this.mousePosition.x,this.mousePosition.y),o.lineTo(i[s].position.x,i[s].position.y))}o.closePath(),o.stroke();break;case 3:o.beginPath();for(let s=0,n=i.length;s<n;s++){o.strokeStyle=i[s].color;for(let a=s+1,u=i.length;a<u;a++)o.moveTo(i[s].position.x,i[s].position.y),o.lineTo(i[a].position.x,i[a].position.y)}o.closePath(),o.stroke();break}return this}updatePosition(t){(t.position.x+t.velocityX+t.radius>this.width||t.position.x+t.velocityX-t.radius<0)&&(t.velocityX=-t.velocityX),(t.position.y+t.velocityY+t.radius>this.height||t.position.y+t.velocityY-t.radius<0)&&(t.velocityY=-t.velocityY);const o=Math.pow(this.mousePosition.x-t.position.x,2),i=Math.pow(this.mousePosition.y-t.position.y,2),s=Math.sqrt(o+i);return Math.abs(s)<50?(t.origin_radius||(t.origin_radius=t.radius),t.radius<=50&&(t.radius+=2)):t.radius>=t.origin_radius&&(t.radius-=2),t.position.x+=t.velocityX,t.position.y+=t.velocityY,this}listenEvents(){const{canvas:t}=this,o=s=>{const n=this.coordinateTransformation(s.clientX,s.clientY);this.createCircle(n,20,!1)},i=s=>{const n=this.coordinateTransformation(s.clientX,s.clientY);this.mousePosition=n};t.addEventListener("mousemove",i,!1),t.addEventListener("click",o,!1)}}export{l as Demo};
