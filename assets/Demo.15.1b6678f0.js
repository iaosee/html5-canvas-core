import{B as r}from"./BaseDemo.deaf79c0.js";class o extends r{constructor(t){super(t),this.canvas=t,this.name="\u5750\u6807\u8F74",this.config={AXIS_COLOR:"blue",AXIS_LINEWIDTH:1,TICK_WIDTH:5,TICK_SPACING:10,TICKS_COLOR:"navy",TICKS_LINEWIDTH:.5,AXIS_ORIGIN:{x:100,y:this.height-100},AXIS_TOP:100,AXIS_RIGHT:this.width-100,AXIS_WIDTH:this.width-100-100,AXIS_HEIGHT:this.height-100-100}}static init(t){return new o(t)}start(){return this.drawGrid().drawCoordinateAxis()}draw(){return this}drawCoordinateAxis(){const{context:t,config:I}=this;return t.save(),t.lineWidth=I.AXIS_LINEWIDTH,t.fillStyle=t.strokeStyle=I.AXIS_COLOR,this.drawHorizontalAxis().drawVerticalAxis(),t.lineWidth=I.TICKS_LINEWIDTH,t.fillStyle=t.strokeStyle=I.TICKS_COLOR,this.drawHorizontalTicks().drawVerticalTicks(),t.lineWidth=I.TICKS_LINEWIDTH,t.fillStyle=t.strokeStyle=I.TICKS_COLOR,this.drawHorizontalLabels().drawVerticalLabels(),t.restore(),this}drawHorizontalAxis(){const{context:t,config:I}=this;return t.beginPath(),t.moveTo(I.AXIS_ORIGIN.x,I.AXIS_ORIGIN.y),t.lineTo(I.AXIS_RIGHT,I.AXIS_ORIGIN.y),t.stroke(),t.moveTo(I.AXIS_RIGHT+10,I.AXIS_ORIGIN.y),t.lineTo(I.AXIS_RIGHT,I.AXIS_ORIGIN.y+5),t.lineTo(I.AXIS_RIGHT,I.AXIS_ORIGIN.y-5),t.closePath(),t.fill(),this}drawVerticalAxis(){const{context:t,config:I}=this;return t.beginPath(),t.moveTo(I.AXIS_ORIGIN.x,I.AXIS_ORIGIN.y),t.lineTo(I.AXIS_ORIGIN.x,I.AXIS_TOP),t.stroke(),t.moveTo(I.AXIS_ORIGIN.x,I.AXIS_TOP-10),t.lineTo(I.AXIS_ORIGIN.x+5,I.AXIS_TOP),t.lineTo(I.AXIS_ORIGIN.x-5,I.AXIS_TOP),t.closePath(),t.fill(),this}drawHorizontalTicks(){const{context:t,config:I}=this;for(let i=1;i<I.AXIS_WIDTH/I.TICK_SPACING;i++){t.beginPath();const e=i%5===0?I.TICK_WIDTH:I.TICK_WIDTH/2;t.moveTo(I.AXIS_ORIGIN.x+i*I.TICK_SPACING,I.AXIS_ORIGIN.y-e),t.lineTo(I.AXIS_ORIGIN.x+i*I.TICK_SPACING,I.AXIS_ORIGIN.y+e),t.stroke()}return this}drawVerticalTicks(){const{context:t,config:I}=this;for(let i=1;i<I.AXIS_HEIGHT/I.TICK_SPACING;i++){t.beginPath();const e=i%5===0?I.TICK_WIDTH:I.TICK_WIDTH/2;t.moveTo(I.AXIS_ORIGIN.x-e,I.AXIS_ORIGIN.y-i*I.TICK_SPACING),t.lineTo(I.AXIS_ORIGIN.x+e,I.AXIS_ORIGIN.y-i*I.TICK_SPACING),t.stroke()}return this}drawHorizontalLabels(){const{context:t,config:I}=this;t.textAlign="center",t.textBaseline="top";for(let i=0;i<=I.AXIS_WIDTH/I.TICK_SPACING;i++)t.beginPath(),i%5===0&&t.fillText(i.toString(),I.AXIS_ORIGIN.x+i*I.TICK_SPACING,I.AXIS_ORIGIN.y+20);return this}drawVerticalLabels(){const{context:t,config:I}=this;t.textAlign="right",t.textBaseline="middle";for(let i=0;i<=I.AXIS_HEIGHT/I.TICK_SPACING;i++)t.beginPath(),i%5===0&&t.fillText(i.toString(),I.AXIS_ORIGIN.x-20,I.AXIS_ORIGIN.y-i*I.TICK_SPACING);return this}}export{o as Demo};
