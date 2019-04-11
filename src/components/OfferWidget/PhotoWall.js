import React, { PureComponent } from 'react'
import { Row, Col, Card} from 'antd'
import NoPermission from '@/components/NoPermission/NoPermission.js'
import './styles.scss'
const gridStyle = {
  width: '33.33%',
  textAlign: 'center',
}
export default class Covers extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { data, permission} = this.props
    if (permission === true) {
      return (
        <div className="offer-detail-wall">
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            margin: 'auto'
          }}>
            <NoPermission />
          </div>
        </div>
      )
    }
    return (
      <div className="offer-detail-wall">
        {
          Array.isArray(data) && data.map((item, idx) => (
            <div key={item.id || idx } className="offer-detail-wall__item">
              <img 
                alt={item.id} 
                src={item.url}
              />
            </div>
          ))
        }
      </div>
    )
  }
}
