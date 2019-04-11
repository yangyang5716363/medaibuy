import React, { PureComponent } from 'react'
import { FormattedMessage } from 'umi/locale'
import cs from 'classnames'
import BizIcon from '@/components/BizIcon'

import './styles.scss'

export default class Follow extends PureComponent {
  constructor(props) {
    super(props)
  }
  onClick = (e) => {
    e.stopPropagation()
    const { status, onFollow } = this.props
    onFollow && onFollow(!status)
  }
  render() {
    const { status } = this.props
    return (
      <button 
        className={cs('idvert-follow', {
            'idvert-follow__actived': status
          })
        }
        onClick={this.onClick}
      >
        <span>
          <BizIcon type={status ? 'collection' : 'collection-o'} />
        </span>
        <FormattedMessage id={!status ? 'app.follow.actived' : 'app.follow.cancel'} />
      </button>
    )
  }
}
