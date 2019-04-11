import React, { Component } from 'react'
import * as echarts from 'echarts'
import _ from 'lodash'
import numeral from 'numeral'
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
export default class DoubleLine extends Component {

  constructor(props) {
    super(props)
    this.yAxisStyle = {
      splitLine: {
        show: true,
        lineStyle: {
          color: '#EEEEEE'
        }
      },
      nameTextStyle: {
        color: '#777777'
      },
      axisLine: {
        show: false
      },
      "axisTick": {
        "show": false
      },
      axisLabel: {
        color: '#777777',
      }
    }
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
      return pre + `<li><i style="background-color:${item.color}"></i><span>${item.seriesName}</span><span style="color:${item.color}">${item.value}</span></li>`
    }, '')
    let str = `<div class="chart-tooltip"><p>${name}</p><ul>${ds}</ul></div>`
    return str
  }
  // 设置建议信息
  _setOption(props) {
    const { data, yAxis, seriesLabel } = props
    const group = _.groupBy(data, d => d.type)
    const xAxis =  _.keys(_.groupBy(data, d => d.key))
    const series = _.map(_.keys(group), (key) => ({
      name: key,
      type: 'line',
      showSymbol: false,
      smooth: true,
      yAxisIndex: yAxis === key ? 1 : 0,
      data: _.map(group[key], d => d.value)
    }))
    
    return  {
      grid: {
        left: 40, //默认是80px
        top: 40,
        right: 40,
        bottom: 60
      },
      tooltip: {
        trigger: 'axis',
        // position: point => point.map(d => d + 10),
        transitionDuration: 1,
        enterable: true,
        formatter: this._renderHtml,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        extraCssText: 'box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);',
        textStyle: {
          color: '#444444'
        }
      },
      color: color,
      calculable : true,
      legend: {
        type: 'scroll',
        show: true,
        orient: 'horizontal',
        x: 'center',
        y:"bottom",
        right: '-20px',
        tooltip: {
          show: true,
          triggerOn: 'mousemove'
        },
        data: _.map(_.keys(group), key => ({ name: key, icon: 'roundRect' }))
      },
      xAxis: [{
        type: 'category',
        data: xAxis,
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
          interval: (index, value) => {
            return xAxis.length >= 30 && index % 5 === 0
          }
        }
      }],
      yAxis:[{ 
        type : 'value',
        name: Object.keys(group).filter(d => d !== yAxis).join(', '),
        nameTextStyle: {
          padding: 16
        },
        minInterval: 1,
        ...this.yAxisStyle
      }, { 
        type : 'value',
        name: yAxis,
        minInterval: 1,
        ...this.yAxisStyle
      }],
      series: series
    };
  }
  render() {
    const { width="100%", height="320px", style } = this.props
    return (
      <div ref={c => this.container = c} style={{width, height, ...style}}/>
    )
  }
}