import React, { PureComponent } from 'react'
import { Avatar, Dropdown, Icon} from 'antd'
import cs from 'classnames'
import BizIcon from '@/components/BizIcon'
import defaultAvatar from '@/assets/touxiang.png'
import './styles.scss'

export default class UserInfo extends PureComponent {
  static defaultProps = {
    avatar: ''
  }
  constructor(props) {
    super(props)
  }
  renderOverlay() {
    const { option, status, remaining, product, hideOverlay } = this.props
    return (
      <div className="layout-info__panel">
        {
          !hideOverlay && status === 'Visitor' &&
            <div className="layout-info-item layout-info-itemflex">
              <BizIcon type='competitor-analysis' />
              <span>Remaining</span>
              <span className="layout-info-item__otherText">
                {remaining ? remaining : null}
              </span>
              <a className="layout-info-item__upgrade" href='/pay/payBuy'>Upgrade</a>
            </div>
        }
        {
          !hideOverlay && status === 'Vip' && product && product.map(item => {
            return(
              <div className="layout-info-item layout-info-itemflex" key={item.name}>
                <span>{item.name}</span>
                <span className="layout-info-item__otherText">{item.time}</span>
                { item.isUpGrade && 
                  <a className="layout-info-item__upgrade" href={item.to}>Upgrade</a>
                }
              </div>
            )
          })
        }
        {
          Array.isArray(option) && option.filter(d => !d.visible)
            .map((item, idx) => item.to ? (
              <a className="layout-info-item" key={idx} href={item.to}>
                {item.icon && <BizIcon type={item.icon} />}
                <span>{item.text}</span>
              </a>
            ) : (
              <div className="layout-info-item" key={idx} onClick={item.click}>
                {item.icon && <BizIcon type={item.icon} />}
                <span>{item.text}</span>
              </div>
            )
          )
        }
      </div>
    )
  }
  render() {
    const { avatar, account, status, option, theme } = this.props
    return (
      <Dropdown overlay={this.renderOverlay()}>
        <div className={cs('layout-info',{[`layout-info${theme}`]: theme})}>
          <div className="layout-info__avatar">
            <img src={defaultAvatar} />
          </div>
          <div className='layout-info__account'>
            <a className='layout-info__account-link'>
              {account} <Icon type="down" style={{ display: option ? 'inline-block' : 'none', marginLeft: '8px' }} />
            </a>
            <span>
              { status === 'Vip' && <BizIcon type="diamond" style={{marginRight: 8 }}/>}
              { status === 'Vip' && 'Vip'}
              { status === 'Visitor' && 'Visitor'}
            </span>
          </div>
        </div>
      </Dropdown>
    )
  }
}