import React, { PureComponent } from 'react'
import defaultImage from '@/assets/MaskCopy.png'

class DomainBasic extends PureComponent {
  render() {
    const { meta, title, desc } = this.props
    return (
      <div className="offer-widget-domain">
        <div className="offer-widget-domain__meta">
          <img 
            src={meta}  
            onError={e => e.target.src = defaultImage}
          />
        </div>
        <div className="offer-widget-domain__detail">
          <div className="offer-widget-domain__detail-title">
            {title}
          </div>
          <div className="offer-widget-domain__detail-desc">
            {desc}
          </div>
        </div>
      </div>
    )
  }
}
export default DomainBasic