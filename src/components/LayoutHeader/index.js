import React, { PureComponent } from 'react'
import withRouter from 'umi/withRouter'
import cs from 'classnames'
import _ from 'lodash'
import { connect } from 'dva'
import moment from 'moment'
import Redirect from 'umi/redirect'
import Link from 'umi/link'
import { Button, Icon, Badge, Avatar, Menu, Dropdown, } from 'antd'
import logoIcon from '@/assets/logo.png'
import headPIC from '@/assets/touxiang.png'
import './styles.scss'

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
  }
  _renderMenu(item, key, selectKey) {
    if (item.to) {
      return (
        <Link 
          key={item.key || key}
          className={cs('header-menu__item', {
            'acitve': selectKey === item.to 
          })}
          to={item.to}>
          {item.name}
         </Link>
        )
    } else {
      return (
        <span 
          key={item.key || key} 
          className="header-menu__item"
          onClick={() => item.onClick && item.onClick(item)}
          >
          { item.name }
        </span>
      )
    }
  }
  render() {
    const { style, opacity, menu, logo, container, userInfo,
      help, badge, information, isButton, useage, infoStyle,
      loginClick, signClick, selectKey, hideOverlay
    } = this.props
    const showCountContent = (hide,useage) => {
      return (
        <span style={{ display: "inline-block", width: "calc(100% - 24px)"}}>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Remaining</span>
          <span style={{ display: "flex", justifyContent: "space-between"}}>
          {
            !hide ?
            <span>{ useage.useageInfo.COUNT_SOCIAL_DATA.remain }</span> : null
          }
          <span style={{ cursor: "pointer", color: "#0099e8", marginLeft: "14px" }}>Upgrade</span>
        </span>
        </span>
        </span>
      )
    }
    const productMsgContent = (data) => {
      return data && data.length && data.map( (item,index) => {
        return(
          <span key={`${index}${Math.random()}`} style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{item.key}: {moment(item.value).format('YYYY-MM-DD')}</span>
            {
              item.key === 'MediaBuy' ? null : 
              <Link to='/pay/payBuy' style={{ cursor: "pointer", color: "#0099e8", marginLeft: "14px" }}>Upgrade</Link>
            }
          </span>
        )
      })
    }
    const Menus = (data,hideOverlay) => {
      const menuContent = (icon,text,hide,useage) => {
        return(
          <span>
            { icon && <i className={`header-userInfo__icon icon iconfont icon-${icon}`} /> }
            {text === 'vistor' ? showCountContent(hide, useage) : null}
            {text === 'vip' && useage.productMsg ? productMsgContent(useage.productMsg) : null}
            {text != 'vip' && text != 'vistor' ? text : null}
          </span>
        )
      }
      return (
        <Menu style={{ display: hideOverlay ? 'none' : 'block'}} className="header-userInfo__menu">
          {
            data.map((item,index) => {
              return (
                <Menu.Item key={`${index}s${Math.random()}`} style={{ display: item.hide ? 'none' : 'block'}}>
                 {
                   item.to ? (
                    <Link to={item.to}>
                      {menuContent(item.icon,item.text,item.hide,useage)}
                    </Link>
                   ) : (
                    <span onClick={() => item.click(item)}>
                    {menuContent(item.icon,item.text,item.hide,useage)}
                  </span>
                   )
                 }
               
              </Menu.Item>
              )
            })
          }
        </Menu>
      )
    }
    return (
      <div 
        className={cs('header', {
          'header__opacity': opacity
        })} 
        style={style}
      >
        {
          logo && (
            <Link to="/" key="logo" className="logo">
              <img src={ _.isString(logo) ? logo : logoIcon} alt="logo" />
            </Link>
          )
        }
        {
          _.isArray(menu) && (
            <div className="header-menu">
              {menu.map((item, idx) => this._renderMenu(item, idx, selectKey))}
            </div>
          )
        }
        <div className="header-search">{container}</div>
        <div className="header-right" style={infoStyle}>
          <div className="header-right__icon inlineBlock">
            {
              badge && (
                <Badge count={_.isObject(badge) ? badge.number : badge}>
                  <Link 
                    to={_.isObject(badge) ? badge.link : '' } 
                    className="header-right__bell"
                  >
                    <Icon type="bell" />
                  </Link>
                </Badge>
              )
            }
            { help && (<Icon type="question-circle" className="marginLeft40"/>)}
            
          </div>
          {
            information && !isButton && ( <Dropdown overlay={Menus(information.dropMenu,hideOverlay)} className="inlineBlock header-userInfo">
              <div className="ant-dropdown-link">
                <Avatar size="default" src={headPIC} className="header-userInfo__avatar"/>
                <div className="header-userInfo__name inlineBlock">
                  {information.userName} 
                  <Icon type="down" style={{ display: hideOverlay ? 'none' : 'inline-block'}}/>
                </div>
                <div className="header-userInfo__level">
                  {
                    information.memberLevel === 'Visitor' ? 
                    null
                    : <i className="icon iconfont icon-diamond" />
                  }
                  {information.memberLevel}
                  {
                    information.memberLevel === 'Visitor' && useage.showCountFlag && 
                    useage.showCountFlag === 1 &&  useage.useageInfo.COUNT_SOCIAL_DATA.remain ? 
                    <span style={{ marginLeft: "10px" }}><i className="icon iconfont icon-competitor-analysis" />{useage.useageInfo.COUNT_SOCIAL_DATA.remain}</span>
                    : null
                  }
                </div>
              </div>
            </Dropdown>)
          }
          {
            isButton && !information && (
              <div className="inlineBlock header-btn">
                <Button 
                  type='primary'
                  ghost
                  className="header-btn__login"
                  onClick={ () => loginClick()}
                >
                  Login
                </Button>
                <Button 
                  className="header-btn__signUp"
                  type='primary'
                  onClick={ () => signClick()}
                >
                  Sign Up
                </Button>
            </div>
            )
          }
        </div>
      </div>
    )
  }
}