import React, { PureComponent } from 'react'
import cs from 'classnames'
import { Tooltip, Icon, Button, Select} from 'antd'
export default class Item extends PureComponent {
  render() {
    const { label, help, addonAfter, suffix, more, children, span, style, divider} = this.props
    const width = `${span * 12.5}%`
    return (
      <div 
        className={cs('crawl-item', {
          'crawl-item__divider': !!divider
        })} 
        style={{width, ...style}}

      >
        <div className="crawl-item-header">
          <div className="crawl-opt-left">
            { label && <span className="crawl-item__label">{label}</span> }
         
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
        <div className="crawl-item-children">
        {
          children
        }
        </div>
      </div>
    )
  }
}