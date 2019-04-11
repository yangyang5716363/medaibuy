import React, { PureComponent } from 'react'
import BizIcon from '@/components/BizIcon'
import { Tooltip, Button } from 'antd'

export default class extends PureComponent {
  render () {
    const { text = '' } = this.props

    return (
      <div className="page-header__icon">
        <Tooltip placement="left" title={ <span>{ text }</span> }>
          <Button><BizIcon type="question-circle-o" /></Button>
        </Tooltip>
      </div>
    )
  }
}