import React, { Component } from 'react'
import numeral from 'numeral'
import * as echarts from 'echarts'
import _ from 'lodash'
import decorator from '../decorator'

@decorator()
class DspGroupBar extends Component {
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
    window.onresize = () => {
      this.echart.resize()
    }
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
  // 设置建议信息
  _setOption(props) {
    const { color, data, yAxis, emphasis, legend, paramsList } = props
    const group = _.groupBy(data, d => d.s)
    const legendData = _.map(_.keys(group), key => ({ name: key, icon: 'roundRect' }))
    return  {
      noDataLoadingOption: {
        text: '暂无数据',
        effect: 'bubble',
        effectOption: {
          effect: {
              n: 0
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
        textStyle: {
          color: '#444444'
        },
        formatter (params) {
          params = params[0]
          var relVal = params.name
          relVal = `<div class="dsp-group-bar" >
            <span class="title">${ paramsList.title }</span>
            <p>
              <em class="crile"></em>
              <span style="color: #AAA">${ paramsList.name } : </span>
              <span style="color: #5cbef0">${ numeral(params.value).format('0%') }</span>
            </p>
          </div>`
          return relVal;
        }
      },
      color: color,
      legend: this._doLegend(legend, legendData),
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
          color: '#777777'
        },
        data: _.keys(_.groupBy(data, d => d.x))
      },
      yAxis: this._doYAxis(yAxis),
      series: _.map(_.keys(group), (key) => ({
        name: key,
        type: 'bar',
        // stack: '1',
        data: _.map(group[key], d => d.y)
      }))
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
export default DspGroupBar