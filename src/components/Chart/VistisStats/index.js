import React, { Component } from 'react'
import * as echarts from 'echarts'
import _ from 'lodash'
import numeral from 'numeral'

import decorator from '../decorator'
const color = ['#5CBEF0']
@decorator()
class BarChart extends Component {
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
    const { link } = this.props
    let axisValue = _.at(params, '0.axisValue')
    axisValue = axisValue[0] && axisValue[0].split(',')
    let [name, query] = axisValue
    let ds = params.reduce((pre, item) => {
      return pre + `<li><i style="background-color:${item.color}"></i><span>Country Rank</span><span style="color:${item.color}">${`${numeral(item.value).format(0,0)}`}</span></li>`
    }, '')
    let str = `<div class="chart-tooltip"><p>${name}</p><ul>${ds}</ul></div>`
    return str
  }
  // 设置建议信息
  _setOption(props) {
    const { data } = props
    return {
      color: [color],
      grid: {
        left: 40, //默认是80px
        top: 40,
        right: 40,
        bottom: 60
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
        transitionDuration: 1,
        enterable: false,
        formatter: this._renderHtml,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        extraCssText: 'box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);',
        textStyle: {
          color: '#444444'
        }
      },
      yAxis: {
        show: true,
        type : 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EEEEEE'
          }
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#EEEEEE'
          }
        },
        "axisTick": {
          "show": false
        },
        axisLabel: {
          color: '#777777',
          formatter: v => numeral(v).format('0 a')
        }
      },
      xAxis: {
        type: 'category',
        data: data.map(d => d.key),
        axisTick: {
          alignWithLabel: false
        },
        axisLine: {
          lineStyle: {
            color: '#EEEEEE'
          }
        },
        axisLabel: {
          color: '#777777'
        }
      },
      series : [
        {
          type: 'line',
          smooth: true,
          data: data.map(d => d.value)
        }
      ]
    }
  }
  render() {
    return (
      <div ref={c => this.container = c} style={this.props.style}/>
    )
  }
}
export default BarChart