import React, { Component } from 'react'
import * as echarts from 'echarts'
import './world.js'
import _ from 'lodash'
import decorator from '../decorator'

@decorator()
class StackedBar extends Component {
  static defaultProps = {
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.echart = echarts.init(this.container)
    let option = this._setOption(this.props)
    this.echart.setOption(option)
  }
  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      let option = this._setOption(nextProps)
      this.echart.setOption(option, true)
    }
  }
  resize() {
    this.echart && this.echart.resize()
  }
  _renderHtml = (params) => {
    const { formatter } = this.props
    const { name, value, color} = params
    let v = _.isFunction(formatter) ? formatter(value) : value
    let ds = `<li><i style="background-color:${color}"></i><span>${name}:</span><span style="margin-left:6px">${v}</span></li>`
    let btn = `<div class="line-tooltip__btn"><button>See Offers</button></div>`
    let str = `<div class="line-tooltip"><ul>${ds}</ul></div>`
    return isNaN(value) ? null : str
  }
  // 设置建议信息
  _setOption(props) {
    const { color, data, yAxis, emphasis, legend } = props
    const _data = _.isArray(data) ? data.map(d => d.value) : [0, 10000]
    let max = _.max(_data)
    let min = _.min(_data)
    min = max === min ? max - min : min
    return {
      grid: {
        left: 0, //默认是80px
        top: 0,
        right: 40,
        bottom: 60
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        position: (point) => {
          return point
        },
        // padding: 6,
        // triggerOn: 'click',
        transitionDuration: 1,
        enterable: true,
        formatter: this._renderHtml,
        extraCssText: 'box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);',
        textStyle: {
          color: '#444444'
        }
      },
      visualMap: {
        type: 'continuous',
        min: max,
        max: min,
        text:['More', 'Less'],
        realtime: false,
        calculable: false,
        color: ['#039AE8', '#E9EFF2']
      },
      series: {
        type: 'map',
        mapType: 'world',
        roam: false,
        aspectScale: 1.15,
        zoom: 1.1,
        left: 60,
        itemStyle: {
          areaColor: '#E8E7E8',
          borderColor: '#ffffff'
        },
        data: _.isArray(data) ? data.map(d => ({
          name: d.key,
          value: d.value
        })) : []
      }
    }
  }
  render() {
    const { width="100%", height="320px", style } = this.props
    return (
      <div ref={c => this.container = c} style={{width, height, ...style }}/>
    )
  }
}
export default StackedBar