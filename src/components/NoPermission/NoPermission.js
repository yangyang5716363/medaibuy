
import React, { PureComponent } from 'react'
import { Empty } from 'antd'
import emptyImage from '@/assets/adult.png'
import './styles.scss'

export default class extends PureComponent {
  render () {
    const { description = 'Sorry, due to legal reasons, this part of data is temporarily unavailable in your area.', style={} } = this.props

    return (
      <div className="no-permission">
        <Empty 
          image={ emptyImage } 
          description={ description } 
          style={ style }
        />
      </div>
    )
  }
}