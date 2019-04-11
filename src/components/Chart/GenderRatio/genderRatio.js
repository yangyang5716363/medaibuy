import React, { PureComponent } from 'react'
import BizIcon from '@/components/BizIcon'
import cs from 'classnames'
import './styles.scss'

export default class extends PureComponent {
  
  render () {
    const { chatData } = this.props

    return (
      <div className="gender-ratio">
        <article>
          <div 
            className={cs(
              'gender-ratio__common gender-ratio__male', { 'gender-ratio__active': (chatData == 1) }
            )}
          >
            <em></em>
            <span>Male</span>
          </div>

          <div
            className={cs(
              'gender-ratio__common gender-ratio__female', { 'gender-ratio__active': (chatData == 2) }
            )}
          >
            <em><BizIcon type="nvweixuanzhong" /></em>
            <span>Female</span>
          </div>
        </article>
      </div>
    )
  }
}