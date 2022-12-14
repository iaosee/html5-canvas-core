import{G as p}from"./lil-gui.esm.7a5dd4ff.js";import{R as d}from"./Random.9d5db597.js";import{B as m}from"./BaseDemo.deaf79c0.js";class a extends m{constructor(u){super(u),this.canvas=u,this.name="\u79FB\u52A8\u7684\u5B57\u7B26",this.letters=[],this.random=d.init(-5,5),this.letterString="abcdefghijklmnopqrstuvwxyz~!@#$%^&*()_+`1234567890-=[];',./<>?:\"{}".split(""),this.emojiString=["\u{1F600}","\u{1F601}","\u{1F602}","\u{1F923}","\u{1F603}","\u{1F604}","\u{1F605}","\u{1F606}","\u{1F609}","\u{1F60A}","\u{1F60B}","\u{1F60E}","\u{1F60D}","\u{1F618}","\u{1F970}","\u{1F617}","\u{1F619}","\u{1F61A}","\u{1F642}","\u{1F917}","\u{1F929}","\u{1F914}","\u{1F928}","\u{1F610}","\u{1F611}","\u{1F636}","\u{1F644}","\u{1F60F}","\u{1F623}","\u{1F625}","\u{1F62E}","\u{1F910}","\u{1F62F}","\u{1F62A}","\u{1F62B}","\u{1F971}","\u{1F634}","\u{1F60C}","\u{1F61B}","\u{1F61C}","\u{1F61D}","\u{1F924}","\u{1F612}","\u{1F613}","\u{1F614}","\u{1F615}","\u{1F643}","\u{1F911}","\u{1F632}","\u{1F641}","\u{1F616}","\u{1F61E}","\u{1F61F}","\u{1F624}","\u{1F622}","\u{1F62D}","\u{1F626}","\u{1F627}","\u{1F628}","\u{1F629}","\u{1F92F}","\u{1F62C}","\u{1F630}","\u{1F631}","\u{1F975}","\u{1F976}","\u{1F633}","\u{1F92A}","\u{1F635}","\u{1F974}","\u{1F620}","\u{1F621}","\u{1F92C}","\u{1F637}","\u{1F912}","\u{1F915}","\u{1F922}","\u{1F92E}","\u{1F927}","\u{1F607}","\u{1F973}","\u{1F97A}","\u{1F920}","\u{1F921}","\u{1F925}","\u{1F92B}","\u{1F92D}","\u{1F9D0}","\u{1F913}","\u{1F608}","\u{1F47F}","\u{1F479}","\u{1F47A}","\u{1F480}","\u{1F47B}","\u{1F47D}","\u{1F47E}","\u{1F916}","\u{1F4A9}","\u{1F63A}","\u{1F638}","\u{1F639}","\u{1F63B}","\u{1F63C}","\u{1F63D}","\u{1F640}","\u{1F63F}","\u{1F63E}","\u{1F431}\u200D\u{1F464}","\u{1F431}\u200D\u{1F3CD}","\u{1F431}\u200D\u{1F4BB}","\u{1F431}\u200D\u{1F409}","\u{1F431}\u200D\u{1F453}","\u{1F431}\u200D\u{1F680}","\u{1F648}","\u{1F649}","\u{1F64A}","\u{1F435}","\u{1F436}","\u{1F43A}","\u{1F431}","\u{1F981}","\u{1F42F}","\u{1F992}","\u{1F98A}","\u{1F99D}","\u{1F42E}","\u{1F437}","\u{1F417}","\u{1F42D}","\u{1F439}","\u{1F430}","\u{1F43B}","\u{1F428}","\u{1F43C}","\u{1F438}","\u{1F993}","\u{1F434}","\u{1F984}","\u{1F414}","\u{1F432}","\u{1F43D}","\u{1F43E}","\u{1F412}","\u{1F98D}","\u{1F9A7}","\u{1F9AE}","\u{1F415}\u200D\u{1F9BA}","\u{1F429}","\u{1F415}","\u{1F408}","\u{1F405}","\u{1F406}","\u{1F40E}","\u{1F98C}","\u{1F98F}","\u{1F99B}","\u{1F402}","\u{1F403}","\u{1F404}","\u{1F416}","\u{1F40F}","\u{1F411}","\u{1F410}","\u{1F42A}","\u{1F42B}","\u{1F999}","\u{1F998}","\u{1F9A5}","\u{1F9A8}","\u{1F9A1}","\u{1F418}","\u{1F401}","\u{1F400}","\u{1F994}","\u{1F407}","\u{1F43F}","\u{1F98E}","\u{1F40A}","\u{1F422}","\u{1F40D}","\u{1F409}","\u{1F995}","\u{1F996}","\u{1F9A6}","\u{1F988}","\u{1F42C}","\u{1F433}","\u{1F40B}","\u{1F41F}","\u{1F420}","\u{1F421}","\u{1F990}","\u{1F419}","\u{1F991}","\u{1F99E}","\u{1F980}","\u{1F41A}","\u{1F986}","\u{1F413}","\u{1F983}","\u{1F985}","\u{1F9A2}","\u{1F99C}","\u{1F9A9}","\u{1F99A}","\u{1F989}","\u{1F426}","\u{1F427}","\u{1F425}","\u{1F424}","\u{1F423}","\u{1F987}","\u{1F98B}","\u{1F40C}","\u{1F41B}","\u{1F99F}","\u{1F997}","\u{1F41C}","\u{1F41D}","\u{1F41E}","\u{1F982}","\u{1F9A0}","\u{1F9DE}\u200D\u2640\uFE0F","\u{1F9DE}\u200D\u2642\uFE0F","\u{1F464}","\u{1F465}","\u{1F440}","\u{1F9B4}","\u{1F9B7}","\u{1F444}"],this.mousePosition={x:0,y:0},this.config={quantity:100,letterType:1,lineType:0,displayLetter:!0},this.createControl().createLetter(null,this.config.quantity).listenEvents()}static init(u){return new a(u)}draw(){return this.clearScreen().drawGrid().drawLines().drawLetters()}createControl(){const{config:u}=this;this.gui=new p;const{gui:i}=this;return i.add(u,"quantity").min(5).max(500).step(5).onFinishChange(t=>{u.quantity=Number(t),this.createLetter(this.center,u.quantity,!0)}),i.add(u,"letterType",{char:1,emoji:2}).onFinishChange(t=>{u.letterType=Number(t),this.createLetter(this.center,u.quantity,!0)}),i.add(u,"lineType",{none:0,ligature:1,breaking:2,connection:3}).onFinishChange(t=>{u.lineType=Number(t)}),i.add(u,"displayLetter").onFinishChange(t=>{u.displayLetter=Boolean(t)}),this}createLetter(u,i=50,t=!1){const{config:F}=this,e=F.letterType===1?this.letterString:this.emojiString;u=u||{x:this.random.range(0,this.width).getOne(),y:this.random.range(0,this.height).getOne()},t&&this.letters.splice(0,this.letters.length);for(let o=0;o<i;o++){const s={x:u.x||this.centerX,y:u.y||this.centerY},r=this.random.range(0,e.length-1).getOne();this.letters.push({position:s,velocityX:Math.random()*(this.random.range(-4,4).getOne()||4),velocityY:Math.random()*(this.random.range(-4,4).getOne()||4),color:this.randomRgba(),size:this.random.range(12,50).getOne(),symbol:e[r]})}return this}drawLetters(){const{letters:u,config:i,context:t}=this;for(let F=0,e=u.length;F<e;F++)this.updatePosition(u[F]),i.displayLetter&&(t.fillStyle=u[F].color,t.font=`${u[F].size}px Palatino`,t.textAlign="center",t.textBaseline="middle",t.fillText(u[F].symbol,u[F].position.x,u[F].position.y));return this}drawLines(){const{config:u,context:i,letters:t}=this;switch(u.lineType){case 1:i.beginPath(),i.moveTo(t[0].position.x,t[0].position.y);for(let F=1,e=t.length;F<e;F++)i.strokeStyle=t[F].color,i.lineTo(t[F].position.x,t[F].position.y);i.closePath(),i.stroke();break;case 2:i.beginPath();for(let F=0,e=t.length;F<e;F++){i.strokeStyle=t[F].color;for(let n=F+1,c=t.length;n<c;n++){const h=Math.pow(t[n].position.x-t[F].position.x,2),l=Math.pow(t[n].position.y-t[F].position.y,2),y=Math.sqrt(h+l);Math.abs(y)>100||(i.moveTo(t[F].position.x,t[F].position.y),i.lineTo(t[n].position.x,t[n].position.y))}if(this.mousePosition.x===0&&this.mousePosition.y===0)continue;const o=Math.pow(this.mousePosition.x-t[F].position.x,2),s=Math.pow(this.mousePosition.y-t[F].position.y,2),r=Math.sqrt(o+s);Math.abs(r)>150||(i.moveTo(this.mousePosition.x,this.mousePosition.y),i.lineTo(t[F].position.x,t[F].position.y))}i.closePath(),i.stroke();break;case 3:i.beginPath();for(let F=0,e=t.length;F<e;F++){i.strokeStyle=t[F].color;for(let o=F+1,s=t.length;o<s;o++)i.moveTo(t[F].position.x,t[F].position.y),i.lineTo(t[o].position.x,t[o].position.y)}i.closePath(),i.stroke();break}return this}updatePosition(u){return(u.position.x+u.velocityX>this.width||u.position.x+u.velocityX<0)&&(u.velocityX=-u.velocityX),(u.position.y+u.velocityY>this.height||u.position.y+u.velocityY<0)&&(u.velocityY=-u.velocityY),u.position.x+=u.velocityX,u.position.y+=u.velocityY,this}listenEvents(){const{canvas:u}=this,i=F=>{const e=this.coordinateTransformation(F.clientX,F.clientY);this.createLetter(e,20,!1)},t=F=>{const e=this.coordinateTransformation(F.clientX,F.clientY);this.mousePosition=e};u.addEventListener("mousemove",t,!1),u.addEventListener("click",i,!1)}}export{a as Demo};
