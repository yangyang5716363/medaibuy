import React, { Component } from 'react'
import * as echarts from 'echarts'
import _ from 'lodash'
import numeral from 'numeral'
import { newLine } from '../cfgs'
import decorator from '../decorator'
const color = [
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
@decorator()
class GroupBar extends Component {
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
    let btn = link ? `<div class="chart-tooltip__btn"><a target="_blank" href="${link(query)}">See Offers</a></div>` : ''
    let ds = params.reduce((pre, item) => {
      return pre + `<li><i style="background-color:${item.color}"></i><span>${item.seriesName}</span><span style="color:${item.color}">${`${numeral(item.value).format('0.00%')}`}</span></li>`
    }, '')
    let str = `<div class="chart-tooltip"><p>${name}</p><ul>${ds}</ul>${btn}</div>`
    return str
  }
  // 设置建议信息
  _setOption({ data }) {
    let clientWidth = this.container.clientWidth
    let group = _.groupBy(data, d => d.type)
    // 排序
    group = Object.keys(group).reduce((obj, key) => {
      return {
        ...obj,
        [key]: group[key].sort((a, b) => a.key.localeCompare(b.key))
      }
    }, {})

    const legend = _.map(_.keys(group), key => ({ name: key, icon: 'roundRect' }))
    const xAxis = _.keys(_.groupBy(data, d => d.key)).sort((a, b) => a.localeCompare(b))
    const series = _.map(_.keys(group), (key) => ({
      name: key,
      type: 'bar',
      data: _.map(group[key], d => d.value)
    }))
    return {
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
        enterable: true,
        formatter: this._renderHtml,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        extraCssText: 'box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);padding: 6px',
        textStyle: {
          color: '#444444'
        }
      },
      color: color,
      legend: {
        show: true,
        type: 'scroll',
        itemWidth: 32,
        itemHeight: 16,
        itemGap: 16,
        orient: 'horizontal',
        bottom: 0,
        data: legend
      },
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: false
        },
        axisLine: {
          lineStyle: {
            color: '#EEEEEE'
          }
        },
        axisLabel: {
          color: '#777777',
          formatter: v =>  clientWidth < 800 ? newLine(v.split(',')[0]) : v.split(',')[0]
        },
        data: xAxis
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
        axisLabel: {
          color: '#777777',
          formatter: v => numeral(v).format('%'),
        }
      },
      series: series
    }
  }
  render() {
    const { width="100%", height="320px", style} = this.props
    return (
      <div style={{ width: '100%', height: '320px'}}>
        <div style={{
          position: 'absolute'
        }}></div>
        <div ref={c => this.container = c} style={{width, height, ...style}} />
      </div>

    )
  }
}
export default GroupBar