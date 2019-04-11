import React, { Component } from 'react'
import * as echarts from 'echarts'
import _ from 'lodash'
import numeral from 'numeral'
import cfgs from '../cfgs'
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
class PieChart extends Component {
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
    const { name, color, percent } = params
    let ds =`<li><i style="background-color:${color}"></i><span>${name}</span><span style="color:${color}">${percent}%`
    let str = `<div class="chart-tooltip"><ul>${ds}</ul></div>`
    return str
  }
  // 设置建议信息
  _setOption({ data,  solid }) {
    const series = data.map(d => ({ name: d.key, value: d.value }))
    const legend = data.map(d => d.key)

    return {
      grid: {
        left: 0, //默认是80px
        top: 40,
        right: 40,
        bottom: 80
      },
      tooltip: {
        trigger: 'item',
        position: point => point.map(d => d + 10),
        transitionDuration: 1,
        enterable: true,
        // formatter: "{b}: {c} ({d}%)",
        formatter: this._renderHtml,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        extraCssText: 'box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);',
        textStyle: {
          color: '#444444'
        }
      },
      legend: {
        show: true,
        orient: 'vertical',
        bottom: '10%',
        right: 0,
        data: legend
      },
      series: [
        {
          type: 'pie',
          radius: solid ? '65%' : ['30%', '60%'],
          avoidLabelOverlap: false,
          color: color,
          label: {
            show: false,
            normal: {
              show: false,
              position: 'center'
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: series
        }
      ]
    };
  }
  render() {
    return (
      <div ref={c => this.container = c} style={this.props.style}/>
    )
  }
}
export default PieChart