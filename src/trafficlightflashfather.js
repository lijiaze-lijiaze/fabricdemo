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
     station:[]
    }
   
  }
  componentDidMount(){
   
  }
  render () {
   const{station}=this.state
    return (
      <div>
       
       
        
        <Trafficlightflash></Trafficlightflash> 
      </div>
    ) 
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