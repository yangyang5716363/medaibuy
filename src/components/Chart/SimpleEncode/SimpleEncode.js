import React, { PureComponent } from 'react'
import { Tooltip, Button, Empty } from 'antd'
import './styles.scss'

export default class extends PureComponent {
  state = {
    left: 0
  }

  componentWillReceiveProps ( { simpleEncodeData } ) {
    simpleEncodeData && this.agePosition()
  }

  agePosition () {
    if ( !this.el ) return false 
    let { simpleEncodeData: value } = this.props
    let element = [...this.el.children]
    let left = 0
    let num = i => {
      let sum = 0
      element.forEach((v, k) => {
        if ( k <= i ) {
          sum += v.offsetWidth
        }
      })
      return sum
    }
    value = value.split('~')[0]

    switch (true) {
      case 0:
        left = 0
        break;
        
      case (value > 0 && value <= 10):
        left = num(1) * (value / 10)
        break;

      case (value > 10 && value <= 20):
        left = num(2) * (value / 20)
        break;

      case (value > 20 && value <= 30):
        left = num(3) * (value / 30)
        break;

      case (value > 30 && value <= 40):
        left = num(4) * (value / 40)
        break;

      case (value > 40 && value <= 50):
        left = num(5) * (value / 50)
        break;

      case (value > 50 && value <= 60):
        left = num(6) * (value / 60)
        break;
    
      default:
      left = num(6) * (value / 60) + 10
    }

    this.setState({ left })
  }

  render () {
    const { left } = this.state
    let { simpleEncodeData } = this.props

    return (
      <div className="simple-encode">
        {
          simpleEncodeData ? (
            <article className="box">
              <Tooltip placement="top" title={ `Age:${simpleEncodeData}` }>
                <div className="age" style={{ left: `${left}px` }}></div>
              </Tooltip>
              <div className="background"></div>
              <ul ref={el => this.el = el}>
                <li>0</li>
                <li>10</li>
                <li>20</li>
                <li>30</li>
                <li>40</li>
                <li>50</li>
                <li>60</li>
                <li>&lt;60</li>
              </ul>
            </article>
          ) : <Empty />
        }
      </div>
    )
  }
}
