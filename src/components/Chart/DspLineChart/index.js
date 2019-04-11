import React, { Component } from 'react'
import * as echarts from 'echarts'
import _ from 'lodash'
import decorator from '../decorator'

@decorator()
class LineChart extends Component {
  static defaultProps = {
    color: [
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
  _doYAxis(yAxis) {
    const { formatterAxis } = this.props
    let result = {
      show: true,
      type : 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#EEEEEE'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#EEEEEE'
        }
      },
      axisLabel: {
        formatter: _.isFunction(formatterAxis) ? (v) => formatterAxis(v) : null,
        color: '#777777',
      }
    }
    if (_.isBoolean(yAxis) && yAxis === false ) {
      result =  {
        show: false
      }
    }
    return result
  }
  _doLegend(opt, data) {
    let result = {
      show: true,
      orient: 'horizontal',
      x : 'center',
      y : 'bottom',
      padding: 5,
      data
    }
    if (_.isBoolean(opt) && opt === false) {
      result = { ...result, show: false }
    } 
    if (_.isObject(opt)) {
      result = { ...result, ...opt }
    }

    return result
  }
  _renderHtml = (params) => {
    const { formatter } = this.props
    const { name, value, seriesName, color} = params
    let v = _.isFunction(formatter) ? formatter(value) : value
    let ds = `<li><i style="background-color:${color}"></i><span class="span-first">Total ${seriesName}</span><span class="span-last">${v}</span></li>`
    let btn = `<div class="line-tooltip__btn"><button>See Offers</button></div>`
    let str = `<div class="line-tooltip"><p>${name}</p><ul>${ds}</ul></div>`
    return str
  }
  // 设置建议信息
  _setOption(props) {
    const { color, data, yAxis, emphasis, formatter, legend } = props
    const group = _.groupBy(data, d => d.s)
    const legendData = _.map(_.keys(group), key => ({ name: key, icon: 'roundRect' }))
    return  {
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
      color: color,
      legend: this._doLegend(legend, legendData),
      xAxis: {
        type: 'category',
        boundaryGap: false,
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
        },
        data: _.keys(_.groupBy(data, d => d.x))
      },
      yAxis: this._doYAxis(yAxis),
      series: _.map(_.keys(group), (key) => ({
        name: key,
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        smooth: true,
        data: _.map(group[key], d => d.y)
      }))
    }
  }
  render() {
    return (
      <div ref={c => this.container = c} style={this.props.style}/>
    )
  }
}
export default LineChart