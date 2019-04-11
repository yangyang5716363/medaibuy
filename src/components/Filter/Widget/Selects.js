import React, { PureComponent } from 'react'
import { Select, Icon } from 'antd'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    const { multiple, value } = props
    let _value = !!multiple ? value && value.map(d => ({ key: d.value, label: d.name }))
      : value && { key: value.value, label: value.name }
    this.state = {
      value: _value
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { multiple, value } = nextProps
      let _value = !!multiple ? value && value.map(d => ({ key: d.value, label: d.name })) 
        : value && { key: value.value, label: value.name }
      this.setState({
        value: _value
      })
    }
  }
  onChange = (value) => {
    const { label, multiple, onChange } = this.props
    this.setState({
      value: value
    }, () => {
      let _value = !!multiple ? value.map(d => ({ value: d.key, name: d.label, label })) 
      : { value: value.key, name: value.label, label }
      onChange && onChange(_value)
    })
  }
  render() {
    const { option, label, multiple } = this.props
    const { value } = this.state
    const otherProps = !!multiple ? { mode: 'multiple', maxTagCount: 1} : {}
    return (
      <Select

        placeholder={label}
        style={{ width: '100%'}}
        value={value}
        onChange={this.onChange}
        labelInValue
        showArrow={true}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        {...otherProps}
      >
        {
          option.sort((a, b) => a.name.localeCompare(b.name))
          .map(item => (
            <Select.Option key={item.value}>
              {item.name}
            </Select.Option>
          ))
        }
      </Select>
    )
  }
}