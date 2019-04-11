import React, { PureComponent } from 'react'
import { Icon, Badge, Button, Dropdown } from 'antd'
import _ from 'lodash'

import cs from 'classnames'

import Link from 'umi/link'
import './styles.scss'

export default class Header extends PureComponent {
  static defaultProps = {
    logo: true,
    theme: 'dark',
    help: true,
  }
  constructor(props) {
    super(props)
  }
  renderOverlay() {
    const { navigation, currNav } = this.props
    return (
      <div>
        {
          Array.isArray(navigation) && (
            navigation.map((item, idx) => idx !=0 && (!item.click ? (
              <Link
                key={`${idx}__item`}
                className="layout-header-overlay__item" to={item.to}
                data-checked={currNav === item.to}
              >
                {item.name}
              </Link>
              ) : (
              <a key={`${idx}__item`} className="layout-header-nav-dropdown__item" onClick={item.click}>
                {item.name}
              </a>
              )
            ))
          )
        }
      </div>
    )
  }
  componentDidMount() {
    const { getInstance } = this.props
    if (getInstance) getInstance(this.childElement)
  }
  render() {
    const { 
      logo, 
      logoTheme,
      navigation,
      btnClick,
      isButton,
      theme,
      currNav,
      badge,
      help,
      infoRender,
      children,
      leftNav,
    } = this.props

    return (
      <div 
        className={cs('layout-header', {
          [`layout-header__${theme}`]: theme
        })}
      >
        <div className="layout-header__left">
          {
            logo && (<a className={cs('layout-header-logo',{[`layout-header-${logoTheme}`]: logoTheme})} href="http://mediabuy.idvert.com"></a>)
          }
          {
            Array.isArray(navigation) && (
              <div className="layout-header-nav">
                {
                  navigation.map((item, idx) => !item.click ? (
                    <Link
                      key={idx}
                      className="layout-header-nav__item" to={item.to}
                      data-checked={item.to.indexOf( currNav ) !== -1 }
                      // data-checked={currNav === item.to}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a key={idx} className="layout-header-nav__item" onClick={item.click}>
                      {item.name}
                    </a>
                  )
                  )
                }
              </div>
            )
          }
        </div>

        <div className="layout-header__children" ref={c => this.childElement = c}>
          { children }
        </div>
        <div className="layout-header__right">
          {
            (badge || help) && 
              <div className="layout-header__right-basic">
                {
                  _.isNumber(badge) && (
                      <Link to="/account/message" className="layout-header-badge">
                        <Badge count={badge}>
                          <Icon type="bell" />
                        </Badge>
                      </Link>
                  )
              }
              {
                help && (
                  <Link to="" className="layout-header-help">
                    <Icon type="question-circle"/>
                  </Link>
                )
              }
            </div>
          }
          <div className="layout-header__right-info">
            {infoRender}
          </div>
          {
            isButton && !infoRender && (
              <div className="layout-header__btn">
                <Button 
                  type='primary'
                  ghost
                  className="layout-header__btn-login"
                  onClick={ () => btnClick('/user/login')}
                >
                  Login
                </Button>
                <Button 
                  className="layout-header__btn-sign"
                  type='primary'
                  onClick={ () => btnClick('/user/register')}
                >
                  Sign Up
                </Button>
            </div>
            )
          }
          {
            Array.isArray(leftNav) && (
              <div className="layout-header-nav">
                {
                  leftNav.map((item, idx) => (
                    <a key={idx} className="layout-header-leftnav__item" href={item.href} target='_blank'>
                      {item.text}
                    </a>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    )
  }
}