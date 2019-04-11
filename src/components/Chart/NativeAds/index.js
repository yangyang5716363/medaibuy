import React, { Component } from 'react'
import * as echarts from 'echarts'
import numeral from 'numeral'
import _ from 'lodash'
import decorator from '../decorator'
@decorator()
export default class NativeAds extends Component {
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
  // 设置建议信息
  _setOption(props) {
    const { color, data, yAxis, seriesLabel, formatter} = props
    const total = data.reduce((c, d) => c + d.value, 0)
    console.log('aaa', total)
    return {
      color: [color],
      yAxis: {
        show: false,
        type : 'value',
        splitLine: {
          show: false,
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
          color: '#777777'
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
          type: 'bar',
          barWidth: '60%',
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: ({ value }) => numeral(value / total).format('%')
            }           
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