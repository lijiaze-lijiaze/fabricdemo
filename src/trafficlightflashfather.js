import React from 'react';
import { fabric } from 'fabric'
import './App.css';
import Trafficlightflash from './trafficlightflash'
import { Select } from 'antd';

const { Option } = Select;
const station = []
class Trafficlightflashfather extends React.Component {
  constructor(props){
    super(props);
    this.state={
     station:[],
     roadData:[{code:1,
                name: '未定义',
                dir:1,
                dirName:"北",
                zebra:{ code :0, show :1, stream :[1], bindPhase :0},
                secondZebra:{ code :100, show :0, stream :[1], bindPhase :0},
                laneWidth:18,
                laneCount:4, 
                reverseLaneCount :4,
                laneData :[{ code :1, type :1, stream :[2], bindPhase : 1 },
                            { code :2, type :1, stream :[3], bindPhase : 2 },
                            { code :3, type :1, stream :[4], bindPhase : 3 },
                            { code :4, type :2, stream :[3], bindPhase :0}],
                basePos :{ x :294.85214948777707, y :141.01472908604552}, 
                height :170,
                 angle :-180},
                 { code :2, name : '未定义' , dir :1, dirName : '东' , zebra :{ code :0, show :1, stream :[1], bindPhase :0}, secondZebra :{ code :100, show :0, stream :[1], bindPhase :0}, laneWidth :18, laneCount :4, reverseLaneCount :4, laneData :[{ code :1, type :1, stream :[2], bindPhase : 5 },{ code :2, type :1, stream :[3], bindPhase : 6 },{ code :3, type :1, stream :[4], bindPhase :0},{ code :4, type :2, stream :[3], bindPhase : 7 }], basePos :{ x :367.89799247989174, y :216.93853159823547}, height :292.1873139730507, angle :-90},{ code :3, name :"未定义", dir :1, dirName :"南", zebra :{ code :0, show :1, stream :[1], bindPhase :0}, secondZebra :{ code :100, show :0, stream :[1], bindPhase :0}, laneWidth :18, laneCount :4, reverseLaneCount :4, laneData :[{ code :1, type :1, stream :[2], bindPhase : 9 },{ code :2, type :1, stream :[3], bindPhase : 10 },{ code :3, type :1, stream :[4], bindPhase :0},{ code :4, type :2, stream :[3], bindPhase : 11 }], basePos :{ x :290.5558083937423, y :299.2559547751967}, height :170, angle :0},{ code :4, name : '未定义' , dir :1, dirName : '西' , zebra :{ code :0, show :1, stream :[1], bindPhase :0}, secondZebra :{ code :100, show :0, stream :[1], bindPhase :0}, laneWidth :18, laneCount :4, reverseLaneCount :4, laneData :[{ code :1, type :1, stream :[2], bindPhase : 13 },{ code :2, type :1, stream :[3], bindPhase : 14 },{ code :3, type :1, stream :[4], bindPhase :0},{ code :4, type :2, stream :[3], bindPhase : 15 }], basePos :{ x :215.17902283013115, y :218.74149728220485}, height :277.26939216559657, angle :90}],
      customShapes:[{ type : 'go' , objectType : 'phase' , objectPreId : 10101 , objectId : 10 , objectAttr : 'color' , data :{ top :411.170121841009, left :336.49650733905594, strokeColor :null, strokeWidth :0, angle :90, width :39.9114, height :23.4567, base64 : '/static/img/go.png' , fillColor : 'transparent' }},{ type : 'right' , objectType : 'phase' , objectPreId : 10101 , objectId :null, objectAttr :null, data :{ top :409.59875049907214, left :355.9999999999998, strokeColor :null, strokeWidth :0, angle :90, width :39.5352, height :23.2356, base64 : '/static/img/right.png' , fillColor : 'transparent' }},{ type : 'left' , objectType : 'phase' , objectPreId : 10101 , objectId : 9 , objectAttr : 'color' , data :{ top :408.709247736641, left :319.00000000000006, strokeColor :null, strokeWidth :0, angle :90, width :41.4162, height :24.3411, base64 : '/static/img/left.png' , fillColor : 'transparent' }}]
                }
   
  }
  componentDidMount(){
    this.canvasRef.reInitRoad(13, this.state.roadData, this.state.customShapes)
  }
  render () {
   const{station}=this.state
    return (
      <div>
       
       
        
        <Trafficlightflash
        size = {700}
        onRef={ref => this.canvasRef = ref}
        onCustomShapesAdded={this.handleCustomShapesAdded}
        onAsyncShapeAdded={this.handleAsyncShapeAdded}
        ></Trafficlightflash> 
      </div>
    ) 
  }
  handleCustomShapesAdded = shapes => {
    const customShapes = this.state.customShapes
    customShapes.forEach((item, index) => {
      item.shape = shapes[index]
    })
  }

  handleAsyncShapeAdded = (index, shape) => {
    const customShapes = this.state.customShapes
    customShapes[index].shape = shape
  }
  handleChange=(value)=> {
    const{station}=this.state
    console.log(`selected ${value}`);
    station.push(value);
    this.setState({
      station
    })
  }
}

export default Trafficlightflashfather;