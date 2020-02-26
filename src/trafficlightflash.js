import React from 'react'
import Lodash from 'lodash'
import { fabric } from 'fabric'

import Constant from './constant'

export default class RealtimeCanalization extends React.Component {

  constructor(props) {
    super(props)

    this.canvas = null
    this.junctionCanvasRef = null
    this.junctionCanvasCtx = null
    
    if(this.props.size){
      this.canvasWidth = this.props.size
    this.canvasHeight = this.props.size
    }
    else{
      this.canvasWidth = 200
    this.canvasHeight = 200
    }
    this.canvasWidth = this.props.size
    this.canvasHeight = this.props.size

    this.roadCollection = []
    this.centerPolygon = null
  }

  componentDidMount () {
    this.initCtx()
    this.props.onRef(this)
  }

  render () {
    
    return (
      <div className="junction-state-canvas-box">
        <canvas className="draw-junction-canvas-base" ref={ref => this.junctionCanvasRef = ref}/>
        
      </div>
    )
  }

  reInitRoad = (junctionIrn, roadData, customShapes) => {
    this.roadCollection = []
    this.initRoad(roadData)
    this.drawCustomShapes(customShapes)

    setTimeout(() => {
      this.canvas.renderAll()
    })
  }

  initCtx = () => {
    this.junctionCanvasRef.width = this.canvasWidth
    this.junctionCanvasRef.height = this.canvasHeight
   
    this.canvas = new fabric.StaticCanvas(this.junctionCanvasRef)
  }

  clearCanvas = () => {
    this.canvas.clear()
    this.roadCollection.forEach(road => {
      clearInterval(road.flashZebraTimer)
      Object.values(road.flickerTimers).forEach(x => {
        clearInterval(x.timer)
      })
      road.flickerTimers = {}
    })
    this.roadCollection = []
  }

  initRoad = data => {
    if (!data) return

    this.clearCanvas()

    data.forEach(x => {
      const road = new Road(this.canvas, x)
      this.roadCollection.push(road)
    })

    this.drawCenterPolygon()
  }

  drawCenterPolygon = () => {
    this.centerPolygon && this.canvas.remove(this.centerPolygon)
    const points = []
    this.roadCollection.forEach((road, index) => {
      const coord = road.group.getCoords()
      if ((index > 0) && (index < this.roadCollection.length)) {
        points.push(coord[3])
      }
      points.push(coord[2])
      if (index === (this.roadCollection.length - 1)) {
        points.push(this.roadCollection[0].group.getCoords()[3])
      }
    })
    this.centerPolygon = new fabric.Polygon(points, {
      fill: '#506077'
    })

    this.canvas.add(this.centerPolygon)
  }

  drawCustomShapes = customShapes => {
    const shapes = {}
    customShapes.forEach((item, index) => {
      let shape
      switch (item.type) {
        case 'line':
          shape = this.initLineShape(item.data)
          break
        case 'polyline':
        case 'polygon':
          shape = this.initPolygonShape(item.data)
          break
        case 'rect':
          shape = this.initRectShape(item.data)
          break
        case 'circle':
          shape = this.initCircleShape(item.data)
          break
        case 'text':
          shape = this.initTextShape(item.data)
          break
        case 'image':
        case 'go':
        case 'left':
        case 'right':
        case 'goTurn':
        case 'goLeft':
        case 'goRight':
        case 'goLeftRight':
        case 'bike':
          //this.initImageShape(item.data, index)
          return
        case 'zebra':
          shape = this.initZebraShape(item.data)
          break
        default:
      }

      this.canvas.add(shape)
      shapes[index] = shape
    })
    this.props.onCustomShapesAdded(shapes)
  }

  initLineShape = data => {
    return new fabric.Line([ data.x1, data.y1, data.x2, data.y2 ], {
      top: data.top,
      left: data.left,
      stroke: data.strokeColor,
      strokeWidth: data.strokeWidth,
      angle: data.angle
    })
  }

  initPolygonShape = data => {
    return new fabric.Polyline(data.points, {
      top: data.top,
      left: data.left,
      stroke: data.strokeColor,
      fill: data.fillColor,
      strokeWidth: data.strokeWidth,
      angle: data.angle
    })
  }

  initRectShape = data => {
    return new fabric.Rect({
      top: data.top,
      left: data.left,
      width: data.width,
      height: data.height,
      stroke: data.strokeColor,
      fill: data.fillColor,
      strokeWidth: data.strokeWidth,
      angle: data.angle
    })
  }

  initCircleShape = data => {
    return new fabric.Circle({
      top: data.top,
      left: data.left,
      originX: 'center',
      originY: 'center',
      radius: data.radius,
      stroke: data.strokeColor,
      fill: data.fillColor,
      strokeWidth: data.strokeWidth,
      hasControls: false,
      hasRotatingPoint: false
    })
  }

  initTextShape = data => {
    return new fabric.Text(data.text, {
      left: data.left,
      top: data.top,
      originX: 'center',
      originY: 'center',
      fontSize: data.fontSize,
      fill: data.fillColor,
      stroke: data.strokeColor,
      strokeWidth: data.strokeWidth,
      width: data.width,
      height: data.height,
      scaleX: data.scaleX,
      scaleY: data.scaleY,
      angle: data.angle
    })
  }

 /*  initImageShape = (data, index) => {
    fabric.Image.fromURL(data.base64, oImg => {
      oImg.scaleToWidth(data.width)
      oImg.scaleToHeight(data.height)
      oImg.set('angle', data.angle)

      if (data.fillColor) {
        const filter = new fabric.Image.filters.BlendColor({
          color: data.fillColor,
          mode: 'tint',
          alpha: 1
        })
        oImg.filters[16] = filter
        oImg.applyFilters()
      }

      this.canvas.add(oImg)
      oImg.moveTo(index)
      this.props.onAsyncShapeAdded(index, oImg)
    }, {
      left: data.left,
      top: data.top
    })
  } */

  initZebraShape = data => {
    return new fabric.Line([ data.x1, data.y1, data.x2, data.y2 ], {
      top: data.top,
      left: data.left,
      stroke: data.strokeColor,
      strokeWidth: data.strokeWidth,
      strokeDashArray: [4, 5],
      angle: data.angle
    })
  }

  flashPhase = (roadIndex, laneIndex, mode) => {
    const road = this.roadCollection[roadIndex]
    const options = this.getFlashColor(mode)

    if (!options.flicker) {
      road.flashPhase(laneIndex, options.color)
    } else {
      road.flashPhaseWithFlicker(laneIndex, options.color)
    }
  }

  flashZebra = (roadIndex, mode) => {
    const road = this.roadCollection[roadIndex]
    const options = this.getFlashColor(mode)

    if (!options.flicker) {
      road.flashZebra(options.color)
    } else {
      road.flashZebraWithFlicker(options.color)
    }
  }

  flashSecondZebra = (roadIndex, mode) => {
    const road = this.roadCollection[roadIndex]
    const options = this.getFlashColor(mode)

    if (!options.flicker) {
      road.flashSecondZebra(options.color)
    } else {
      road.flashSecondZebraWithFlicker(options.color)
    }
  }

  getFlashColor = mode => {
    let color = Constant.dictionary.colors.white,
      flicker = false
    switch (mode) {
      case 'R': //红
        color = Constant.dictionary.colors.red
        break
      case 'A': //黄
        color = Constant.dictionary.colors.yellow
        break
      case 'G': //绿
        color = Constant.dictionary.colors.green
        break
      case 'RA': //红黄
        color = Constant.dictionary.colors.red
        flicker = true
        break
      case 'FA': //黄闪
        color = Constant.dictionary.colors.yellow
        flicker = true
        break
      case 'FG': //绿闪
        color = Constant.dictionary.colors.green
        flicker = true
        break
      case 'B': // 黑
      default: // 灭
        break
    }
    return {color, flicker}
  }
}

class Road {
  // 中上点坐标, 用于定位 group
  basePos
  // 实际长和宽 { width, height, justWidth, reverseWidth }
  realBound
  // 实际坐标
  coords
  // 路背景块
  bgRect
  // left, top, width, height. 从 group 取出来的, 不知为何有误差(待查), 最好用 realBound
  boundingRect
  // 组
  group
  // 交通流标志
  streamArrows = {}
  // 斑马线
  zebraLine
  flashZebraTimer

  secondZebraLine
  flashSecondZebraTimer

  // 闪烁 timer
  flickerTimers = {}
  drawStopLine = () => {
    // 停车线
    const x = -(this.realBound.width / 2 - this.realBound.justWidth)
    const y = this.realBound.height / 2

    const line = new fabric.Line([0, 0, -this.realBound.justWidth, 0], {
      left: x - this.realBound.justWidth,
      top: this.roadData.zebra.show === 1 ? y - 22 : y - 2,
      stroke: '#79879c',
      strokeWidth: 2
    })
    this.group.add(line)
  }

  flashPhase = (laneIndex, color, flickerMode) => {
    if (!flickerMode) {
      this.stopFlicker(laneIndex)
    }

    const icon = this.streamArrows[laneIndex]
    const filter = new fabric.Image.filters.BlendColor({
      color,
      mode: 'tint',
      alpha: 1
    })
  icon.filters[16] = filter
    icon.applyFilters()  
    this.canvas.renderAll()
  }

  flashPhaseWithFlicker = (laneIndex, color) => {
    this.flashPhase(laneIndex, color)
    this.flickerTimers[laneIndex] = {
      flag: true,
    }

    this.flickerTimers[laneIndex].timer = setInterval(() => {
      if (this.flickerTimers[laneIndex].flag) {
        this.flashPhase(laneIndex, Constant.dictionary.colors.white, true)
      } else {
        this.flashPhase(laneIndex, color, true)
      }
      this.flickerTimers[laneIndex].flag = !this.flickerTimers[laneIndex].flag
    }, 500)
  }

  stopFlicker = (laneIndex) => {
    if (this.flickerTimers[laneIndex]) {
      clearInterval(this.flickerTimers[laneIndex].timer)
      delete this.flickerTimers[laneIndex]
    }
  }

  flashZebra = (color, flickerMode) => {
    if (!flickerMode) {
      clearInterval(this.flashZebraTimer)
    }

    if (this.roadData.zebra.show === 1) {
      this.zebraLine.set('stroke', color)
      this.canvas.renderAll()
    }
  }

  flashZebraWithFlicker = color => {
    this.flashZebra(color)
    let flag = true
    this.flashZebraTimer = setInterval(() => {
      if (flag) {
        this.flashZebra(Constant.dictionary.colors.white, true)
      } else {
        this.flashZebra(color, true)
      }
      flag = !flag
    }, 500)
  }

  flashSecondZebra = (color, flickerMode) => {
    if (!flickerMode) {
      clearInterval(this.flashSecondZebraTimer)
    }

    if (this.roadData.secondZebra.show === 1) {
      this.secondZebraLine.set('stroke', color)
      this.canvas.renderAll()
    }
  }

  flashSecondZebraWithFlicker = color => {
    this.flashSecondZebra(color)
    let flag = true
    this.flashSecondZebraTimer = setInterval(() => {
      if (flag) {
        this.flashSecondZebra(Constant.dictionary.colors.white, true)
      } else {
        this.flashSecondZebra(color, true)
      }
      flag = !flag
    }, 500)
  }

  /**
   * 构造函数
   * @param {*} canvas fabric.Canvas 实例
   * @param {*} data road data
   */
  constructor (canvas, data) {
    this.canvas = canvas
    this.roadData = data
    this.angle = data.angle
    this.basePos = data.basePos

    this.realBound = {
      width: data.laneWidth * (this.roadData.laneCount + this.roadData.reverseLaneCount),
      height: data.height,
      justWidth: data.laneWidth * this.roadData.laneCount,
      reverseWidth: data.laneWidth * this.roadData.reverseLaneCount
    }

    this.draw()
  }

  draw () {
    this.remove()

    this.drawRoad()
    this.drawBaseLine()
    this.drawLane()
    this.drawStopLine()
    this.drawReverseLane()
    if (this.roadData.zebra.show === 1) {
      this.drawZebra()
    }
    if (this.roadData.secondZebra.show === 1) {
      this.drawSecondZebra()
    }

    setTimeout(() => this.canvas.renderAll(), 100)       // 省掉那层回调会不行, this 问题
  }

  remove () {
    if (this.group) {
      this.canvas.remove(this.group)
    }
  }

  drawRoad () {
    this.bgRect = new fabric.Rect({
      left: this.basePos.x,
      top: this.basePos.y,
      fill: 'transparent',
      width: this.realBound.width,
      height: this.realBound.height,
      angle: this.angle,
      originX: 'center'
    })

    // 四个角真实坐标
    this.coords = this.bgRect.getCoords()

    this.boundingRect = this.bgRect.getBoundingRect()

    // 重置角度后加入组
    this.bgRect.set('angle', 0)
    this.bgRect.set('left', 0)
    this.bgRect.set('top', 0)
    this.bgRect.set('originX', 'left')

    const rect1 = new fabric.Rect({
      left: 0,
      top: 0,
      fill: '#506077',
      width: this.realBound.justWidth,
      height: this.realBound.height,
      originX: 'left',
      originY: 'top',
    })
    const rect2 = new fabric.Rect({
      left: this.realBound.justWidth - 0.5,
      top: 0,
      fill: '#506077',
      width: this.realBound.reverseWidth,
      height: this.realBound.height,
      originX: 'left',
      originY: 'top',
    })

    this.group = new fabric.Group([this.bgRect, rect1, rect2], {
      left: this.boundingRect.left + this.boundingRect.width / 2,             // 因为它的 left 和 right 都是有偏差的, 所以计算的宽度也用它的
      top: this.boundingRect.top + this.boundingRect.height / 2,              // 因为它的 left 和 right 都是有偏差的, 所以计算的宽度也用它的
      originX: 'center',
      originY: 'center',
      angle: 180 + this.angle                     // 使手柄向外
    })

    this.canvas.add(this.group)
  }

  drawBaseLine () {
    if (this.roadData.reverseLaneCount === 0) {
      return
    }

    const x = this.realBound.width / 2 - this.realBound.justWidth
    const height = this.roadData.zebra.show === 1 ? this.realBound.height - 20 : this.realBound.height

    const line = new fabric.Line([0, 0, 0, height], {
      left: 0 - x,
      top: 0 - this.realBound.height / 2,
      stroke: '#ff9632',
      strokeWidth: 2
    })
    this.group.add(line)
  }

  drawLane () {
    const {laneStreamImg} = Constant.dictionary
    const {laneData} = this.roadData

    for (let i = 0; i < laneData.length; i++) {
      const x = parseInt(0 - (this.realBound.width / 2 - this.realBound.justWidth) - (i + 1) * this.roadData.laneWidth, 10)
      const y = parseInt(this.realBound.height / 2, 10)
      const y1 = this.roadData.zebra.show === 1 ? 23 - y : -y             // 23 留给停车线和斑马线

      // 因为 4 条路只需画 3 条线, 所以
      if (i < laneData.length - 1) {
        const line = new fabric.Line([0, y, 0, y1], {
          left: x + 0.5,
          top: 0 - y + 0.5,
          stroke: '#79879c',
          strokeWidth: 2
          // strokeDashArray: [ 5, 5 ]
        })
        this.group.add(line)
      }

      // 导向箭头
      const scaleWidth = this.roadData.laneWidth * 5
      const scaleHeight = this.roadData.laneWidth - 2
      const offsetY = this.roadData.laneWidth + 35
      const offsetX = this.roadData.laneWidth / 5

      const stream = laneData[i].stream.sort()
      const laneStreamItem = laneStreamImg.find(x => Lodash.isEqual(stream, x.code))
      if (laneStreamItem) {
        const imgName = laneStreamItem.img
        fabric.Image.fromURL(`/static/imglite/${ imgName }.png`, oImg => {
          oImg.scaleToWidth(scaleWidth)
          oImg.scaleToHeight(scaleHeight)
          oImg.rotate(-90)
          this.streamArrows[i] = oImg
          this.group.add(oImg)
        }, {
          left: x - offsetX,
          top: y - offsetY,
          originX: 'left',
          originY: 'top'
        })
      }

      // 非机动车道
      if (laneData[i].type === 2) {
        const imgName = laneStreamImg[0].img        // 0 特别留给非机动车标志
        fabric.Image.fromURL(`/static/img/${ imgName }.png`, oImg => {
          oImg.scaleToWidth(scaleWidth)
          oImg.scaleToHeight(scaleHeight)
          oImg.rotate(-90)
          this.group.add(oImg)
        }, {
          left: x,
          top: y - offsetY - offsetY,
          originX: 'left',
          originY: 'top'
        })
      }
    }
  }

  drawReverseLane () {
    for (let i = 1; i < this.roadData.reverseLaneCount; i++) {
      const x = parseInt(0 - (this.realBound.width / 2 - this.realBound.justWidth) + i * this.roadData.laneWidth, 10)
      const y = parseInt(this.realBound.height / 2, 10)
      const y1 = this.roadData.zebra.show === 1 ? y - 22 : y                      // 22 留给斑马线, 因为不需要停车线, 所以比另一面少 1
      const line = new fabric.Line([x + 0.5, y1 + 0.5, x + 0.5, -y + 0.5], {
        stroke: '#79879c',
        strokeWidth: 2,
        strokeDashArray: [5, 5]
      })
      this.group.add(line)
    }
  }

  drawZebra () {
    // 斑马线
    const x = this.realBound.width / 2 - (this.realBound.width - 2)
    const y = this.realBound.height / 2

    const length = this.roadData.secondZebra.show === 1 ? this.realBound.justWidth - 9 : this.realBound.width

    const line = new fabric.Line([0, 0, length, 0], {
      left: x,
      top: y - 18,
      stroke: '#79879c',
      strokeWidth: 18,
      strokeDashArray: [4, 5],
    })
    this.zebraLine = line
    this.group.add(line)
  }

  drawSecondZebra () {
    const x = this.realBound.width / 2 - (this.realBound.reverseWidth - 2 - 9)
    const y = this.realBound.height / 2

    const length = this.realBound.reverseWidth - 9 - 2 - 2

    const line = new fabric.Line([0, 0, -length, 0], {
      left: x,
      top: y - 18,
      stroke: '#79879c',
      strokeWidth: 18,
      strokeDashArray: [4, 5],
    })
    this.secondZebraLine = line
    this.group.add(line)

    const rect = new fabric.Rect({
      left: x - 18,
      top: y - 18,
      fill: 'transparent',
      stroke: '#79879c',
      strokeWidth: 2,
      width: 12,
      height: 16,
      originX: 'left',
      originY: 'top',
    })
    this.group.add(rect)
  }
}
