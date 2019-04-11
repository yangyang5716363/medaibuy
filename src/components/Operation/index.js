import React, { PureComponent } from 'react'
import cs from 'classnames'

import './styles.scss'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectKey: props.selectKey
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectKey !== this.props.selectKey) {
      this.setState({
        selectKey: nextProps.selectKey
      })
    }
  }
  onClick = (item, e) => {
    const { selectKey } = this.state
    const { onSelect } = this.props
    const _selectKey = selectKey === item.key ? null : item.key
    this.setState({
      selectKey: _selectKey
    }, () => {
      onSelect && onSelect(item.key, _selectKey !== null)
    })
    
  }
  render() {
    const { option, label } = this.props
    const { selectKey } = this.state
    return (
      <div className="operation">
        <div className="operation__panel">
          <span className="operation-label">{label}:</span>
          <div className="operation-list">
            {
              option.map(item => (
                <span 
                  key={item.key}
                  className={cs('operation-list-item', {
                    'operation-list-item__checked': item.key === selectKey || item.actived
                  })}
                  onClick={(e) => this.onClick(item, e)}
                >
                  {item.name}
                </span>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}