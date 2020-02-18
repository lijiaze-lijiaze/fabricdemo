import React from 'react';
import { fabric } from 'fabric'
import trafficBG from './trafficBG.png';
import logo from './logo.svg';
import './App.css';

class Trafficlightflash extends React.Component {
  constructor(props){
    super(props);
    this.state={
     station:[]
    }
   
  }
  componentDidMount() {
    this.updateCanvas();
}
  render () {
   const{station}=this.state
    return (
      <div style={{width:500,height:500,position:"relative"}}>
       
       
       <img style={{width:500,height:500,position:"absolute",left:0,top:0}} src={trafficBG} className="trafficBG" alt="trafficBG" />
      {/*  <canvas style={{position:"absolute",left:0,top:0}} ref="canvas" width={500} height={500}/> */}
       <canvas style={{position:"absolute",left:0,top:0}} id="canvas" width={500} height={500}/>
      </div>
    ) 
  }
   updateCanvas=()=> {
    var canvas =new fabric.Canvas('canvas');
    //canvas.selection = false;
    var rect = new fabric.Rect({

      left:100,//距离画布左侧的距离，单位是像素

      top:100,//距离画布上边的距离

      fill:'red',//填充的颜色

      width:30,//方形的宽度

     height:30,//方形的高度

     angle:30

  });
  
  // rect.set('selectable', false);
  
   rect.on('selected', function() {//选中监听事件

    console.log('selected a rectangle');

});
  canvas.add(rect);
} 
}

export default Trafficlightflash;