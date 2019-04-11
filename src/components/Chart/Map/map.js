import React, { PureComponent } from 'react'
import * as echarts from 'echarts'
import './styles.scss'

const data = [ {name: '', value: 731449} ]

export default class extends PureComponent {
  componentDidMount () {
    this.echart = echarts.init( this.container )
    this.echart.hideLoading()
    this.registerMap()
    this.echart.setOption( this.setOption() )
  }

  registerMap () {
    const { usaJson } = this.props
    if ( usaJson && usaJson.features) {
      data[0].name = usaJson.features[0].properties.name
      echarts.registerMap( 'USA', usaJson )
    }
  }

  setOption () {
    const { title } = this.props

    return {
      title: {
        text: title,
      },
      aspectScale: 2,
      visualMap: {
        inRange: {
          color: ['#5BBFF2']
        },
        show: false,
        text:['High', 'Low'],
        calculable: false
      },
      series: [
        {
          name: '',
          type: 'map',
          roam: false,
          map: 'USA',
          itemStyle:{
            emphasis:{
              label: {
                show: true
              }
            }
          },
          data,
        }
      ]
    }
  }

  render () {
    const { usaJson } = this.props
    const features = usaJson.features[0]
    const geoName = features.geo
    const className = `margin flag-icon flag-icon-${geoName}`
    return (
      <div className="common-map-box">
        <div ref={c => this.container = c} className="common-map"></div>
        <div className="geo-name">
          <span>
            {/* <img src={ `/countrys-png/${geoName}.png` } /> */}
            <span className={ className }></span>
            { features.properties.name }
          </span>
        </div>
      </div>
    )
  }
}