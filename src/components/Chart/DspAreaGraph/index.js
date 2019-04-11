import React, { Component } from 'react'
import numeral from 'numeral'
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
    let { color, data, yAxis, seriesLabel, paramsList } = props

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
          show: false,
        },
        axisLabel: {
          show: true,
        },
        axisTick: {
          show: false
        },
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#FFFFFF',
        formatter (params) {
          params = params[0]

          var relVal = params.name
          relVal = `<div class="dsp-group-bar" >
            <span class="title">${ paramsList.title }</span>
            <p>
              <em class="crile"></em>
              <span style="color: #AAA">${ paramsList.name } : </span>
              <span style="color: #5cbef0">${ params.value }</span>
            </p>
          </div>`
          return relVal;
        }
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
