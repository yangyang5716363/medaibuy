import React, { PureComponent } from 'react'
import cs from 'classnames'
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectKeys: props.value || []
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      
      this.setState({ 
        selectKeys: nextProps.value || []
      })
    }
  }
  onClick = (item) => {
    if (item.disabled) return
    const { selectKeys: _selectKeys } = this.state
    const { onChange, label } = this.props
    const status = _selectKeys.findIndex(d => d.value === item.value)
    let selectKeys =  status !== -1 ? _selectKeys.filter(d => d.value !== item.value) : [..._selectKeys, item ]
    this.setState({
      selectKeys: selectKeys
    }, () => {
      selectKeys = selectKeys.map(d => ({ ...d, label }))
      let value = selectKeys.length > 0 ? selectKeys : undefined
      onChange && onChange(value)
    })
  }

  render() {
    const { option } = this.props
    const { selectKeys } = this.state
    const _selectKeys = selectKeys.map(d => d.value)
    return (
      <div className="filter-radio">
        {
          option.map(item => (
            <span 
              key={item.value}
              className={cs('filter-radio-item', {
                'filter-radio-item__checked': _selectKeys.includes(String(item.value)),
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