import React, { PureComponent } from 'react'
import _ from 'lodash'
import cs from 'classnames'
import Radio from './Widget/Radio'
import Checkbox from './Widget/Checkbox'
import Selects from './Widget/Selects'
import DatePicker from './Widget/DatePicker'
import Input from './Widget/Input'

import { Row, Col, Form } from 'antd'

@Form.create({
  mapPropsToFields({ value }) {
    return _.mapValues(value, v => Form.createFormField({ value: v }))
  },
  onValuesChange (props, changedValues, allValues) {
    props.onChange && props.onChange(allValues)
  }
})
export default class extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderCombine(source) {
    return source.map(({ type, ...item }, idx) => {
      return (
        <div className="filter-atom" key={`${type}_${idx}`}>
          { this.renderTypeElement(type, item)}
        </div>
      )
    })
  }

  renderTypeElement(type, item, key) {
    const { form } = this.props
    switch (type) {
      case 'radio':
        return form.getFieldDecorator(item.field)(<Radio {...item} />)
      case 'checkbox': 
        return form.getFieldDecorator(item.field)(<Checkbox {...item} />)
      case 'select':
        return form.getFieldDecorator(item.field)(<Selects {...item} />)
      case 'datePicker':
        return form.getFieldDecorator(item.field)(<DatePicker {...item}/>)
      case 'input':
        return form.getFieldDecorator(item.field)(<Input {...item}/>)
      default:
        break
    }
  }
  render() {
    const { dataSource } = this.props

    return (
      <Row gutter={24} style={{ margin: 0 }}>
        {
          dataSource.map(({ cell, type, combine, ...item }, idx) => {
            return (
              <Col
                key={idx}
                span={24 / cell}
                style={{ padding: 0 }}
                className={cs('filter-panel__item', {
                    [`filter-panel__item-${cell}`]: true
                  })
                }
              >
                <div className="filter-panel-packing">
                  <span>{item.label}</span>
                  <div>
                   { combine ? this.renderCombine(item.option) : this.renderTypeElement(type, item) }                  
                  </div>
                </div>
              </Col>
            )
          })
        }
      </Row>
    )
  }
}