import React, { PureComponent } from 'react'
import _ from 'lodash'
import { formatMessage } from 'umi/locale'
import BizIcon from '@/components/BizIcon'

export default class extends PureComponent {
  constructor(props) {
    super(props)
  }

  onSerialize(obj) {
    return Object.keys(obj).reduce((pre, key) => {
      let item = obj[key]
      return item ? _.isArray(item) ? _.concat(pre, item.map(d => ({ ...d, id: key})))
        : _.concat(pre, { ...item, id: key }): pre
    }, [])
  }
  onClick(id, item) {
    const { onRemove } = this.props
    onRemove && onRemove(id, item)
  }
  onClickAll = () => {
    const { onRemove } = this.props
    onRemove && onRemove()
  }
  render() {
    const dataSource = this.onSerialize(this.props.dataSource)
    if (dataSource.length === 0) return null
    return (
      <div className="filter-tooltip">
        <div className="filter-tooltip__prompt">Searched:</div>
        <div className="filter-tooltip__list">
          {
            dataSource.map(({ id, ...item }, idx) => (
              <div className="filter-tooltip-item" key={idx}>
                <span className="filter-tooltip-item__prefix">
                  {item.label}:
                </span>
                <span className="filter-tooltip-item__suffix">
                  {
                    item.name.replace('00:00:00', '').replace('23:59:59', '')
                  }
                </span>
                <span 
                  className="filter-tooltip-item__close" 
                  onClick={() => this.onClick(id, item)}
                >
                  <BizIcon type="close" />
                </span>
              </div>
            ))
          }
          <div className="filter-tooltip-clear">
            <span onClick={this.onClickAll}>
              {formatMessage({ id: 'app.filter.tooltip.clear' })}
            </span>
          </div>
        </div>
      </div>
    )
  }
}