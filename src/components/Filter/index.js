import React, { PureComponent } from 'react'
const isEqual = require("react-fast-compare")
import _ from 'lodash'
import FormPanel from './FormPanel'
import Tooltip from './Widget/Tooltip'
import './styles.scss'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.schema = this.doSeekCb(props.dataSource)

    this.state = {
      value: {}
    }
  }
  componentDidMount() {
    
    const { getInstance,  getFormInstance } = this.props
    
    if (getInstance) getInstance(this)
    if (getFormInstance) getFormInstance(this.form)
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
     
      this.schema = this.doSeekCb(nextProps.dataSource)
      this.setState({
        value: this.doSequence(nextProps) || {}
      })
    } 
  }
  onChange = (record) => {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({ value: record }, this.onCallBack)
    }, 600)
  }
  onRemove = (field, record) => { 
    const { value } = this.state
    let _value = value 
    if (!field) {
      _value = _.mapValues(value, v => undefined)
    } else {
      _value = {
        ..._.update(value, field, item => {
          return _.isArray(item) ? _.filter(item, d => d.value !== record.value) : undefined
        })
      }
    }
    this.setState({
      value: _value
    }, this.onCallBack)
  }
  doSequence(record) {
    const { value, dataSource } = record
    // console.log('1111111', dataSource )
    // console.log('22222222', value)
    // console.log('333333', this.schema)
    let obj = {}
    if (!value) {
      obj = {}
    } else {
      for (let prop in value) {
        if (prop in this.schema) {
          let item = this.schema[prop] 
          if (item.type === 'datePicker') { 
            // 时间的单独处理,
            let _date = value[prop].split(',')
            obj[prop] = {
              label: item.label,
              name: _date.join('~'),
              value: value[prop].split(',')
            }
          } else {
            let gather = _.at(dataSource,  `${item.path}.option`)[0]
            if (Array.isArray(gather)) {
              let vs = value[prop] ? value[prop].split(',') : []
              obj[prop] = vs.reduce((p, d) => {
                let _s = gather.find(m => m.value == d)
                return _s ? [
                  ...p,
                  {
                    label: item.label,
                    name: _s.name,
                    value: d
                  }
                ] : [...p]
              }, [])
            } else {
              obj[prop] = {
                label: item.label,
                value: value[prop],
                name: value[prop]
              }
            }
          }
        } else {
          obj[prop] = undefined
        }
      }
    }
    return obj
  }
  onCallBack = () => {
    const { value } = this.state
    const { onChange } = this.props
    const result = _.mapValues(value, (v, k) => {
      let item = _.isArray(v) ?  v.map(d => d.value) : ( v && 'value' in v ? v.value : v)
      return _.isArray(item) && item.length > 0 ? item.join(',') : item
    })
   
    _.isFunction(onChange) && onChange(result)
  }
  doSeekCb(array, path='') {
    return _.isArray(array) ? array.reduce((pre, item, idx) => {
      return item.field ? { 
        ...pre, 
        [item.field]: { 
          label: item.label, 
          type: item.type,
          path: path === '' ? `${path}${idx}` : `${path}.${idx}` 
        }
      } : { 
        ...pre, 
        ...this.doSeekCb(item.option,  path === '' ? `${path}${idx}.option` : `${path}.${idx}.option`)
      }
    }, {}) : {}
  }
  _reset() {
    this.setState({ value: {} })
  }
  render() {
    const { style, dataSource } = this.props
    const { value } = this.state
    return (
      <div className="filter" style={style}>
        <div className="filter-panel">
          <FormPanel
            wrappedComponentRef={form => this.form = form} 
            dataSource={dataSource} 
            onChange={this.onChange}
            value={value}
          />
        </div>
        <div className="filter-list">
          <Tooltip 
            dataSource={value} 
            onRemove={this.onRemove}
          />
        </div>
      </div>
    )
  }
}