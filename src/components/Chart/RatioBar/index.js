import React, { Component } from 'react'
import * as echarts from 'echarts'
import _ from 'lodash'
import numeral from 'numeral'
import cfgs from '../cfgs'
const color =  [
  '#5cbef0', 
  '#687adc', 
  '#83d5ac', 
  '#1abbcc', 
  '#f1a363', 
  '#ef6f6f', 
  '#bb87da',
  '#3b588f',
  '#f1ca6e'
]
class BarChart extends Component {
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
    const { link } = this.props
    let ds = params.reduce((pre, item) => {
      return item.value !== 0 ? pre + `<li><i style="background-color:${item.color}"></i><span>${item.seriesName}</span><span style="color:${item.color}">${`${numeral(item.value).format('0.00%')}`}</span></li>` : pre
    }, '')
    let btn = link ? `<div class="chart-tooltip__btn"><a target="_blank" href="${link(query)}">See Offers</a></div>` : ''
    let str = `<div class="chart-tooltip"><ul>${ds}</ul>${btn}</div>`
    return str
  }
  // 设置建议信息
  _setOption(props) {
    const { data } = props
    const total = data.reduce((sum, item)=> sum + item.value, 0)
    const series = data.map(item => {
      return {
        type: 'bar',
        name: item.key,
        stack: '1',
        barWidth: 20,
        data: [item.value / total]
      }
    })
    return {
      grid: {
        left: 10, //默认是80px
        top: 0,
        right: 10,
        bottom: 0
      },
      tooltip: {
        trigger: 'axis',
        position: (pos, params, dom, rect, size) => {
          let [ left, top ] = pos
          let { contentSize, viewSize } = size
          const obj = { top }
          const dir = left < viewSize[0] / 2 ? 'left' : 'right'
          return { 
            top, 
            [dir]: dir === 'left' ? left : viewSize[0] - left 
            }
        },
        axisPointer: {
          type: 'none'
        },
        formatter: this._renderHtml,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        extraCssText: 'box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);padding: 6px',
        textStyle: {
          color: '#444444'
        }
      },
      color,
      xAxis:  {
        max: 1,
        type: 'value',
        show: false
      },
      yAxis: {
        type: 'category',
        data: ['1'],
        show: false
      },
      series: series
    };
  }
  render() {
    const { width="100%", height="24px", style} = this.props
    return (
      <div ref={c => this.container = c} style={{width, height, ...style}}/>
    )
  }
}
export default BarChart