import React, { PureComponent} from 'react'
import { Select } from 'antd'

export default class Selection extends PureComponent {
  render() {
    const { option, placeholder, onChange } = this.props
    return (
      <Select
        allowClear
        showSearch
        defaultActiveFirstOption={false}
        onChange={onChange}
        style={{ width: '100%'}} 
        placeholder={placeholder}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
      {
        Array.isArray(option) && option.map((item, idx) => (
          <Select.Option key={item.value}>
            {item.key}
          </Select.Option>
        ))
      }
      </Select>
    )
  }
}