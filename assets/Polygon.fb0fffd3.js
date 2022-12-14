import{P as l}from"./BaseDemo.deaf79c0.js";class o{constructor(t,s){this.x=t||0,this.y=s||0}static fromPoint(t){return new o(t.x,t.y)}equals(t){return this.x===t.x&&this.y===t.y}getMagnitude(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}add(t){return new o(this.x+t.x,this.y+t.y)}subtract(t){return new o(this.x-t.x,this.y-t.y)}dotProduct(t){return this.x*t.x+this.y*t.y}edge(t){return this.subtract(t)}perpendicular(){return new o(this.y,0-this.x)}normalize(){const t=this.getMagnitude();return new o(this.x/t,this.y/t)}normal(){return this.perpendicular().normalize()}reflect(t){const s=this.dotProduct(t),i=t.dotProduct(t),e=s/i;return new o(2*e*t.x-this.x,2*e*t.y-this.y)}}class m{constructor(t,s){this.min=t,this.max=s}overlaps(t){return this.max>t.min&&t.max>this.min}getOverlap(t){if(!this.overlaps(t))return 0;let s;return this.max>t.max?s=t.max-this.min:s=this.max-t.min,s}}class u{constructor(t,s){this.axis=t,this.overlap=s}}function v(r,t,s){const i=new o(r.x,r.y),e=new o(t.x,t.y);return i.subtract(e).normalize()}function p(r,t){let s=1e6,i;for(var e=0;e<r.points.length;++e){const n=r.points[e],h=n.distance(new l(t.x,t.y));h<s&&(s=h,i=n)}return i}function w(r,t){const s=r.getAxes(),i=p(r,t),e=new o(t.x,t.y),n=new o(i.x,i.y);return s.push(e.subtract(n).normalize()),!r.separationOnAxes(s,t)}function M(r,t){const s=Math.sqrt(Math.pow(t.x-r.x,2)+Math.pow(t.y-r.y,2)),i=Math.abs(r.radius+t.radius)-s;return i<0?new u(void 0,0):new u(void 0,i)}function A(r,t,s){const i=r.minimumTranslationVector(r.getAxes(),t,s),e=r.minimumTranslationVector(t.getAxes(),t,s);return i.overlap===0||e.overlap===0?new u(void 0,0):i.overlap<e.overlap?i:e}const S=1e6;class P{constructor(t){this.fillStyle="rgba(147, 197, 114, 0.8)",this.strokeStyle="rgba(255, 253, 208, 0.9)",this.x=t==null?void 0:t.x,this.y=t==null?void 0:t.y,this.name=t==null?void 0:t.name,this.fillStyle=(t==null?void 0:t.fillStyle)||this.fillStyle,this.strokeStyle=(t==null?void 0:t.strokeStyle)||this.strokeStyle}getPosition(){return{x:this.x,y:this.y}}setPosition(t,s){return this.x=t,this.y=s,this}fill(t){return t.save(),t.fillStyle=this.fillStyle,this.createPath(t),t.fill(),t.restore(),this}stroke(t){return t.save(),t.strokeStyle=this.strokeStyle,this.createPath(t),t.stroke(),t.restore(),this}isPointInPath(t,s,i){return this.createPath(t),t.isPointInPath(s,i)}collidesWith(t){const s=this.getAxes().concat(t.getAxes());return!this.separationOnAxes(s,t)}separationOnAxes(t,s){for(let i=0,e=t.length;i<e;i++){const n=t[i],h=s.project(n),a=this.project(n);if(!h.overlaps(a))return!0}return!1}minimumTranslationVector(t,s,i){let e=S,n;for(var h=0;h<t.length;++h){const a=t[h],x=this.project(a),y=s.project(a),d=x.getOverlap(y);if(d===0)return new u(void 0,0);d<e&&(e=d,n=a)}return new u(n,e)}}class c extends P{constructor(t){super(t),this.radius=t==null?void 0:t.radius}collidesWith(t){return t.getAxes()===void 0&&t instanceof c?Math.sqrt(Math.pow(t.x-this.x,2)+Math.pow(t.y-this.y,2))<Math.abs(this.radius+t.radius):w(t,this)}collidesMTVWith(t,s){if(t instanceof g){const i=t.getAxes(),e=p(t,this);return i.push(v(this,e)),t.minimumTranslationVector(i,this,s)}return M(this,t)}getAxes(){}project(t){const s=[],i=new l(this.x,this.y),e=new o(i.x,i.y).dotProduct(t);return s.push(e),s.push(e+this.radius),s.push(e-this.radius),new m(Math.min.apply(Math,s),Math.max.apply(Math,s))}move(t,s){this.x+=t,this.y+=s}createPath(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,Math.PI*2,!1)}centroid(){return new l(this.x,this.y)}getBoundingBox(){return{x:this.x-this.radius,y:this.y-this.radius,width:this.radius*2,height:this.radius*2}}}class g extends P{constructor(t){super(t),this.points=[],this.points=(t==null?void 0:t.points)||[]}addPoint(t,s){return this.points.push(new l(t,s)),this}setPoints(t){return this.points=[].concat(t),this}move(t,s){const i=this.points.length;for(var e=0;e<i;++e)this.points[e].move(t,s);return this}createPath(t){if(this.points.length!==0){t.beginPath(),t.moveTo(this.points[0].x,this.points[0].y);for(var s=1;s<this.points.length;++s)t.lineTo(this.points[s].x,this.points[s].y);return t.closePath(),this}}collidesWith(t){return t.getAxes()===void 0&&t instanceof c?w(this,t):super.collidesWith(t)}collidesMTVWith(t,s){if(t instanceof c){const i=this.getAxes(),e=p(this,t);return i.push(v(t,e)),this.minimumTranslationVector(i,t,s)}return A(this,t,s)}getAxes(){const t=[],s=this.points.length;for(let n=0;n<s-1;n++){const h=this.points[n],a=this.points[n+1],x=new o(h.x,h.y),y=new o(a.x,a.y);t.push(x.edge(y).normal())}const i=new o(this.points[s-1].x,this.points[s-1].y),e=new o(this.points[0].x,this.points[0].y);return t.push(i.edge(e).normal()),t}project(t){const s=[];return this.points.forEach(i=>{const e=new o(i.x,i.y);s.push(e.dotProduct(t))}),new m(Math.min.apply(Math,s),Math.max.apply(Math,s))}centroid(){const t=new l(0,0);for(let s=0;s<this.points.length;++s){const i=this.points[s];t.x+=i.x,t.y+=i.y}return new l(t.x/this.points.length,t.y/this.points.length)}getBoundingBox(){let t,s,i,e;return this.points.forEach(n=>{t===void 0&&(t=i=n.x,s=e=n.y),t=Math.min(t,n.x),s=Math.min(s,n.y),i=Math.max(i,n.x),e=Math.max(e,n.y)}),{x:t,y:s,width:i-t,height:e-s}}}export{c as C,g as P,o as V};
