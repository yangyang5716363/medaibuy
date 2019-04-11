import React, { Component } from 'react'
import * as echarts from 'echarts'
import _ from 'lodash'
import cfgs from '../cfgs'
import decorator from '../decorator'

@decorator()
export default class extends Component {
  static defaultProps = {
    color: ["#5C5DBA", "#6776F3", "#8A92D0", "#54C6EA", "#55D9C9"]
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.echart = echarts.init(this.container)
    this.echart.setOption(this._setOption(this.props))
    window.onresize = () => {
      this.echart.resize()
    }
  }
  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.echart.setOption(this._setOption(nextProps))
    }
  }
  _doYAxis(yAxis) {
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
  // 设置建议信息
  _setOption(props) {
    let { color, data, yAxis, seriesLabel } = props

    if (!_.isArray(data)) return {}
    return {
      color: '#5CBEF0',
      grid: {
        left: '34',
        right: '34',
        top: '24',
        bottom: '24'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#EEEEEE'
          }
        },
        axisLabel: {
          color: '#777777'
        },
        data: data.map(d => d.x)
      },
      yAxis: {
        type: 'value',
        show: true,
        axisLine: {
          show: true
        },
        axisLabel: {
          show: true,
        },
        axisTick: {
          show: true
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter: "{b}: <br/> total: {c} ",
      },
      series: [{
        data: data.map(d => d.y),
        type: 'line',
        areaStyle: {},
        smooth: true,
      }]
    }
  }
  render() {
    return (
      <div ref={c => this.container = c} style={this.props.style}/>
    )
  }
}
