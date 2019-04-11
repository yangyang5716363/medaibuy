import React, { PureComponent } from 'react'
import { Tooltip, Button, Select, Icon } from 'antd'
import _ from 'lodash'

import BizIcon from '@/components/BizIcon'
import Item from './Item'
import cs from 'classnames'
import './styles.scss'

class Crawl extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { 
      style, 
      border, 
      help, 
      label, 
      more,
      addonAfter,
      suffix,
      children,
      visible,
      ...props
    } = this.props
    if (!!visible === true) {
      return null
    }
    return (
      <div 
        className={cs('crawl', {
          'crawl-border': _.isBoolean(border) && border === true,
          [`crawl-border_${border}`]: _.isString(border)
        })} 
        style={style} 
        {...props}
      >
        <div 
          className={cs('crawl-opt', {
            'crawl-opt_border': _.isBoolean(border) && border === true || border === 'center'
          })}
        >
          <div className="crawl-opt-left">
            {
              label && <span className="crawl-opt__label">{label}</span> 
            }
            {
              help && (
                <Tooltip placement="right" title={help}>
                  <span className="crawl-opt__help">
                    <Icon type="question-circle" />
                  </span>
                </Tooltip>
              )
            }
          </div>
          <div className="crawl-opt-right">
            {
              addonAfter && <div className="crawl-opt__addon">{addonAfter}</div>
            }
            {
              suffix && <div className="crawl-opt__suffix">{suffix}</div>
            }
            {
              more && <div className="crawl-opt__more">{more}</div>
            }   
          </div>
        </div>
        <div className="crawl-panel">
          {children}
        </div>
      </div>
    )
  }
}
Crawl.Item = Item
export default Crawl