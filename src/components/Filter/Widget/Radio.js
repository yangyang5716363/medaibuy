import React, { PureComponent } from 'react'
import cs from 'classnames'
import isEqual from 'react-fast-compare'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectKey: props.value && props.value.value
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ 
        selectKey: nextProps.value && nextProps.value.value
      })
    }
  }
  onClick = (item) => {
    if (item.disabled) return
    const { selectKey: _selectKey } = this.state
    const { onChange, label } = this.props
    let selectKey = item.value === _selectKey ? null : item.value
    this.setState({
      selectKey: selectKey
    }, () => {
      let value = selectKey ? { value: selectKey, name: item.name, label } : undefined
      onChange && onChange(value)
    })
  }

  render() {

    const { option } = this.props
    const { selectKey } = this.state
    return (
      <div className="filter-radio">
        {
          option.map(item => (
            <span 
              key={item.value}
              className={cs('filter-radio-item', {
                'filter-radio-item__checked': item.value === selectKey,
                'filter-radio-item__disabled': item.disabled
              })}
              onClick={() => this.onClick(item)}
            >
              {item.name}
            </span>
          ))
        }
      </div>
    )
  }
}