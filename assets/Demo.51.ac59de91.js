var w=Object.defineProperty;var v=(e,l,i)=>l in e?w(e,l,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[l]=i;var b=(e,l,i)=>(v(e,typeof l!="symbol"?l+"":l,i),i);import{B as P}from"./BaseDemo.9c35b300.js";import{S as u}from"./Sprite.b43779c9.js";import{I as S}from"./ImagePainter.f7266c8a.js";import{b as C}from"./bomb.7e822fe4.js";class y extends u{constructor(l="DoraemonSprite"){super(l),this.painter=new k}}class k{paint(l,i){i.save(),i.translate(l.x,l.y),i.scale(.5,.5),i.beginPath(),i.lineWidth=1,i.strokeStyle="#000",i.arc(200,175,175,.7*Math.PI,.3*Math.PI),i.fillStyle="#0bb0da",i.fill(),i.stroke(),i.beginPath(),i.fillStyle="#fff",i.moveTo(110,110),i.quadraticCurveTo(-10,200,120,315),i.lineTo(280,315),i.quadraticCurveTo(410,210,290,110),i.lineTo(110,110),i.fill(),i.stroke(),i.beginPath(),i.lineWidth=1,i.fillStyle="#fff",i.moveTo(110,110),i.bezierCurveTo(110,25,200,25,200,100),i.bezierCurveTo(200,175,110,175,110,100),i.moveTo(200,100),i.bezierCurveTo(200,25,290,25,290,100),i.bezierCurveTo(290,175,200,175,200,100),i.fill(),i.stroke(),i.beginPath(),i.fillStyle="#000",i.arc(230,130,12,0,2*Math.PI),i.fill(),i.stroke(),i.beginPath(),i.fillStyle="#000",i.arc(170,130,12,0,2*Math.PI),i.fill(),i.stroke(),i.beginPath(),i.arc(200,165,25,0,2*Math.PI),i.fillStyle="#d05823",i.fill(),i.stroke(),i.beginPath(),i.moveTo(80,175),i.lineTo(150,195),i.moveTo(80,200),i.lineTo(150,205),i.moveTo(80,225),i.lineTo(150,215),i.moveTo(200,195),i.lineTo(200,290),i.moveTo(250,195),i.lineTo(320,175),i.moveTo(250,205),i.lineTo(320,200),i.moveTo(250,215),i.lineTo(320,225),i.stroke(),i.moveTo(80,240),i.quadraticCurveTo(200,350,320,240),i.stroke(),i.beginPath(),i.moveTo(96,316),i.lineTo(305,316),i.lineTo(320,316),i.arcTo(330,316,330,326,10),i.lineTo(330,336),i.arcTo(330,346,305,346,10),i.lineTo(81,346),i.arcTo(71,346,71,336,10),i.lineTo(71,326),i.arcTo(71,316,81,316,10),i.lineTo(96,316),i.fillStyle="#b13209",i.fill(),i.stroke(),i.beginPath(),i.fillStyle="#0bb0da",i.moveTo(80,346),i.lineTo(26,406),i.lineTo(65,440),i.lineTo(85,418),i.lineTo(85,528),i.lineTo(185,528),i.lineTo(315,528),i.lineTo(315,418),i.lineTo(337,440),i.lineTo(374,406),i.lineTo(320,346),i.fill(),i.stroke(),i.beginPath(),i.fillStyle="#fff",i.arc(37,433,30,0,2*Math.PI),i.fill(),i.stroke(),i.beginPath(),i.fillStyle="#fff",i.arc(363,433,30,0,2*Math.PI),i.fill(),i.stroke(),i.beginPath(),i.fillStyle="#fff",i.arc(200,400,91,1.8*Math.PI,1.2*Math.PI),i.fill(),i.stroke(),i.beginPath(),i.fillStyle="#fff",i.moveTo(130,394),i.lineTo(270,394),i.moveTo(130,394),i.bezierCurveTo(130,490,270,490,270,394),i.fill(),i.stroke(),i.beginPath(),i.fillStyle="#fff",i.arc(200,529,20,Math.PI,0),i.fill(),i.stroke(),i.beginPath(),i.fillStyle="#fff",i.moveTo(180,528),i.lineTo(72,528),i.bezierCurveTo(52,528,52,558,72,558),i.lineTo(180,558),i.moveTo(180,558),i.bezierCurveTo(200,558,200,528,180,528),i.fill(),i.stroke(),i.beginPath(),i.fillStyle="#fff",i.moveTo(220,528),i.lineTo(328,528),i.bezierCurveTo(348,528,348,558,328,558),i.lineTo(220,558),i.moveTo(220,558),i.bezierCurveTo(200,558,200,528,220,528),i.fill(),i.stroke(),i.restore()}}class o{paint(l,i){const a=l.x+l.width/2,s=l.y+l.height/2;l.width,l.height;const r=l.width/2;i.save(),i.beginPath(),i.arc(a,s,r,0,Math.PI*2,!1),i.clip(),i.shadowColor="rgba(0,0,0,0.5)",i.shadowOffsetX=-4,i.shadowOffsetY=-4,i.shadowBlur=8,i.fillStyle="rgba(218, 165, 32, 0.1)",i.fill(),i.lineWidth=2,i.strokeStyle="rgb(100,100,195)",i.stroke(),i.restore()}}class m extends P{constructor(i){super(i);b(this,"name","\u7CBE\u7075\u7ED8\u5236\u5668 \u2014\u2014 \u63CF\u8FB9\u4E0E\u586B\u5145/\u56FE\u50CF\u56FE\u50CF\u7CBE\u7075");b(this,"ball1");b(this,"ball2");b(this,"doraemon",new y);b(this,"ballPainter",new o);b(this,"bomb");b(this,"config",{CLOCK_RADIUS:this.viewMin/2-15,HOUR_HAND_TRUNCATION:30});this.canvas=i,this.initSprite()}static init(i){return new m(i)}initSprite(){return this.ball1=new u("ball1",{paint(i,a){a.save(),a.beginPath(),a.arc(i.x+i.width/2,i.y+i.height/2,100,0,Math.PI*2,!1),a.clip(),a.shadowColor="rgba(0,0,0,0.5)",a.shadowOffsetX=-4,a.shadowOffsetY=-4,a.shadowBlur=8,a.lineWidth=2,a.strokeStyle="rgb(100,100,195)",a.fillStyle="rgba(30,144,255,0.15)",a.fill(),a.stroke(),a.restore()}}),this.ball1.setX(100),this.ball1.setY(100),this.ball2=new u("ball2",this.ballPainter),this.bomb=new u("bomb",new S(C)),this.bomb.x=100,this.bomb.y=this.height/2,this.doraemon.x=this.width-300,this.doraemon.y=50,this}draw(){return this.clearScreen().drawGrid().drawScene()}drawScene(){const{context:i}=this;return this.ball1.paint(i),this.drawClock(),this.bomb.paint(i),this.doraemon.paint(i),this}drawClock(){return this.drawClockFace(),this.drawHands(),this}drawClockFace(){const{context:i,canvas:a,config:s}=this;return i.beginPath(),i.arc(this.centerX,this.centerY,s.CLOCK_RADIUS,0,Math.PI*2,!1),i.save(),i.strokeStyle="rgba(0,0,0,0.2)",i.stroke(),i.restore(),this}drawHands(){const{context:i,canvas:a,config:s,ball2:r}=this,f=new Date,h=f.getHours(),T=h>12?h-12:h;return r.width=20,r.height=20,this.drawHand(f.getSeconds(),!1),r.width=30,r.height=30,this.drawHand(f.getMinutes(),!1),r.width=50,r.height=50,this.drawHand(T*5+f.getMinutes()/60*5),r.width=30,r.height=30,r.x=this.centerX-r.width/2,r.y=this.centerY-r.height/2,i.save(),this.ballPainter.paint(r,i),i.restore(),this}drawHand(i,a){const{context:s,canvas:r,config:f,ball2:h}=this,T=Math.PI*2*(i/60)-Math.PI/2,d=a?f.CLOCK_RADIUS-f.HOUR_HAND_TRUNCATION:f.CLOCK_RADIUS,g={x:this.centerX+Math.cos(T)*(d-h.width/2),y:this.centerY+Math.sin(T)*(d-h.width/2)};return s.strokeStyle="rgba(100,100,255,0.5)",s.beginPath(),s.moveTo(this.centerX,this.centerY),s.lineTo(g.x,g.y),s.stroke(),h.x=this.centerX+Math.cos(T)*d-h.width/2,h.y=this.centerY+Math.sin(T)*d-h.height/2,h.paint(s),this}}export{o as BallPainter,m as Demo};
