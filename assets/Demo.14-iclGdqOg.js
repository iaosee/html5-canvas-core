var l=Object.defineProperty;var u=(i,n,t)=>n in i?l(i,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[n]=t;var o=(i,n,t)=>u(i,typeof n!="symbol"?n+"":n,t);import{B as d}from"./BaseDemo-DB1y7toB.js";class a extends d{constructor(t){super(t);o(this,"name","路径、描边、填充");this.canvas=t}static init(t){return new a(t)}start(){return this.drawGrid().drawScene()}draw(){return this}drawScene(){const{context:t}=this;return t.fillStyle="rgba(100, 140, 230, 0.5)",t.shadowColor="rgba(0, 0, 0, 0.5)",t.shadowOffsetX=10,t.shadowOffsetY=10,t.shadowBlur=15,this.drawAnnulus({...this.center,y:this.centerY/2},"rgba(19, 160, 223, 0.5)").drawAnnulus({x:this.centerX/2,y:this.centerY/2},"rgba(86, 129, 178, 0.5)").drawAnnulus({x:this.centerX*1.5,y:this.centerY/2},"rgba(229, 79, 119, 0.5)").drawCutouts(),this}drawAnnulus(t,r="rgba(100, 140, 230, 0.5)"){const{context:e}=this;return e.lineWidth=2,e.fillStyle=r||e.fillStyle,e.strokeStyle=e.fillStyle,e.shadowColor=r,e.beginPath(),e.arc(t.x,t.y,200,0,Math.PI*2,!1),e.arc(t.x,t.y,150,0,Math.PI*2,!0),e.fill(),e.stroke(),e.closePath(),this}drawCutouts(){const{context:t}=this;return t.beginPath(),t.rect(this.centerX-150,this.centerY,300,300),t.strokeStyle="green",t.stroke(),t.arc(this.centerX-80,this.centerY+80,40,0,Math.PI*2,!0),t.closePath(),t.arc(this.centerX+80,this.centerY+80,40,0,Math.PI*2,!0),t.closePath(),t.moveTo(this.centerX,this.centerY+120),t.lineTo(this.centerX-50,this.centerY+120+50),t.lineTo(this.centerX+50,this.centerY+120+50),this.rect(this.centerX-50,this.centerY+220,100,20,!0),t.closePath(),t.fill(),this}rect(t,r,e,h,c){const{context:s}=this;c?(s.moveTo(t,r),s.lineTo(t,r+h),s.lineTo(t+e,r+h),s.lineTo(t+e,r)):(s.moveTo(t,r),s.lineTo(t+e,r),s.lineTo(t+e,r+h),s.lineTo(t,r+h)),s.closePath()}}export{a as Demo};
