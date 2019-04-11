import React, { PureComponent } from 'react'
import { Select } from 'antd'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    const { multiple, value } = props
    this.state = {
      value: props.value && props.value.value,
      option: []
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value && nextProps.value.value
      })
    }
  }
  isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'; 
  }
  onChange = (value) => {
    this.setState({
      value
    }, this.onCallBack)
  }
  onSearch = (value) => {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const { onSearch } = this.props
      if (value.length >= 3) {
        if (this.isPromise(onSearch())){
          onSearch(value).then(option => {
            if (option.length === 0) {
              this.setState({ value: value, option: [] }, this.onCallBack)
            } else {
              this.setState({ value: value, option: option })
            }
          })
        } else {
          this.setState({ value: value, option: []}, this.onCallBack)
        }
      } else {
        this.setState({
          value: value,
          option: []
        }, this.onCallBack)
      }
    }, 1000)
  }
  onCallBack = () => {
    const { label, onChange } = this.props
    const { value } = this.state
    let param = !!value ? { label, name: value, value} : undefined
    onChange && onChange(param)
  }
  render() {
    const { label, multiple } = this.props
    const { value, option } = this.state
    return (
      <Select
        showSearch
        // labelInValue
        value={value}
        placeholder={label}
        notFoundContent={null}
        filterOption={false}
        showArrow={false}
        getPopupContainer={trigger => trigger.parentNode}
        onSearch={this.onSearch}
        // onChange={this.onChange}
        style={{ width: '100%' }}
        onFocus={() => {
          this.setState({ option: []})
        }}
      >
        {
          option.map(d => (
            <Select.Option key={d} onClick={() => this.onChange(d)}>
              {d}
            </Select.Option>
          ))
        }
      </Select>
    )
  }
}