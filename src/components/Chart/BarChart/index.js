import React, { Component } from 'react'
import * as echarts from 'echarts'
import _ from 'lodash'
import decorator from '../decorator'
@decorator()
class BarChart extends Component {
  static defaultProps = {
    color: '#5CBEF0'
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
        formatter: _.isFunction(formatterAxis) ? (v) => formatterAxis(v) : null
      }
    }
    if (_.isBoolean(yAxis) && yAxis === false ) {
      result =  {
        show: false
      }
    }
    return result
  }
  // 设置建议信息
  _setOption(props) {
    const { color, data, yAxis, seriesLabel, formatter} = props
    return {
      color: [color],
      yAxis: this._doYAxis(yAxis),
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
          type: 'bar',
          barWidth: '60%',
          label: {
            normal: {
              show: seriesLabel === true,
              position: 'top',
              formatter: _.isFunction(formatter) ? ({value}) => formatter(value) : null
            },
           
          },
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