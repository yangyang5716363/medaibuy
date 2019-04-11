import React, { PureComponent } from 'react'
import { DatePicker } from 'antd'
import cs from 'classnames'
import moment from 'moment'

const RangePicker = DatePicker.RangePicker

export default class extends PureComponent {
  static defaultProps = {
    format: 'YYYY-MM-DD'
  }
  constructor(props) {
    super(props)
    this.state = {
      value: props.value && props.value.value.map(v => moment(v))
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value && nextProps.value.value.map(v => moment(v))
      })
    }
  }
  onChange = (ranges) => {
    const { format, label, onChange } = this.props 
    let value = ranges.map((m, idx)=> idx === 0 ? `${m.format(format)} 00:00:00` : `${m.format(format)} 23:59:59`)
    let name = ranges.map(m => m.format('YYYY-MM-DD HH:mm:ss')).join('~')
    this.setState({
      value: ranges
    }, () => {
      let _value = value.length !== 0 ? { value, name, label } : undefined
      onChange && onChange(_value)
    })
  }
  doRanges(option) {
    let obj = option.reduce((pre, curr) => {
      return {
        ...pre,
        [curr.name]: [
          moment().subtract(curr.value - 1, curr.type).startOf(curr.type), 
          moment().endOf(curr.type)
        ] 
      }
    }, {})
    return obj
  }
  render() {
    const { option, format, placeholder } = this.props
    const { value } = this.state
    const ranges = this.doRanges(option)
    return (
      <div className="filter-atom">
        <RangePicker
          className={cs({
            'custom-canlendar_empty': !value
          })}
          ranges={ranges}
          value={value}
          format={format}
          placeholder={[placeholder, '']}
          onChange={this.onChange}
        />
      </div>

    )
  }
}