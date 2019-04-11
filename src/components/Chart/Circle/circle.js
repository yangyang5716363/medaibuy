import React, { PureComponent } from 'react'
import './styles.scss'

// 默认圆数据
const result = [
  {
    value: 'Clothing(Brand)',
    key: 0,
    r: 30,
    x: 100,
    y: 100,
    color: '#F6F7FE',
  },
  {
    value: 'Brand',
    key: 1,
    r: 50,
    x: 300,
    y: 100,
    color: '#F6F7FE',
  },
  {
    value: 'Other',
    key: 2,
    r: 40,
    x: 200,
    y: 70,
    color: '#F6F7FE',
  },
  {
    value: 'Other',
    key: 3,
    r: 80,
    x: 300,
    y: 259,
    color: '#F6F7FE',
  },
  {
    value: 'Other',
    key: 4,
    r: 30,
    x: 60,
    y: 300,
    color: '#F6F7FE',
  },
]

export default class extends PureComponent {
  render () {
    const { circleData = [] } = this.props

    return (
      <div className="common-circle">
        <svg 
          version="1.1" 
          width="100%" 
          height="100%" 
          viewBox="0 0 350 350" 
          preserveAspectRatio="xMidYMid meet" 
          className="svg-content"
        >
        {
          result && result.length && result.map((v, key) => (
            <circle key={ key } cx={ v.x } cy={ v.y } r={ v.r } fill={ v.color } />
          ))
        }
        {
          circleData && circleData.length && circleData.map((v, key) => (
            <a key={ key }>
              <circle cx={ v.x } cy={ v.y } r={ v.r } fill={ v.color } />
              <text x={ v.x - v.left } y={ v.y } fill="#000000">{ v.value }</text>
            </a>
          ))
        }
        </svg>
      </div>
    )
  }
}