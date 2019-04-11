/*
 * @Author: jiaoguowei 
 * @Date: 2019-01-09 15:04:28 
 * @Last Modified by: yangyang
 * @Last Modified time: 2019-03-16 11:24:11
 */

import React,{Component} from 'react'
import { Radio, Checkbox, Row, Col } from 'antd'
import './styles.scss'
import lodash from 'lodash'
import Input from './Input'
import { number } from 'prop-types';
const RadioGroup = Radio.Group
export default class NewQuestionnaire extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputData: {},
      checkedData: {},
      isDisabled: true,
      radioData: {},
      dataSource: props.dataSource,
    }
    this.triggerChange = this.triggerChange.bind(this)
  }
  
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  getCheck = (value, isRadio) => {
    let val = isRadio ? '' : []
    value&&Object.keys(value).map(item => {
      if(value[item] && item.indexOf('input') === -1) {
        isRadio && (val = item)
        !isRadio && val.push(`${item}`)
      }
    })
    return val
  }
  handleRadioChange(e,dataSource,isRadio) {
    let value = isRadio ? Number(e.target.value) : e
    let cloneData = lodash.clone(dataSource)
    let obj = {}
    cloneData.options.map(item => {
      isRadio&&(obj[item.id] = item.id === value ? true : false)
      !isRadio&&(obj[item.id] = value.includes(`${item.id}`) ? true : false)
    })
    this.triggerChange(this.props.value,obj)
  }
  triggerChange = (changedValue,inputValParams) => {
    const onChange = this.props.onChange
    if (onChange) {
      onChange(Object.assign({}, changedValue,inputValParams))
    }
  }
  render() {
    
    const { dataSource, value } = this.props
    const { options } = dataSource
    const { noShowSerialNum } = this.props
    // console.log('传给组件的数据', this.props.dataSource)
    // @todo 这个需要处理, 作为配置项传下来
    let gird = 8
    if (dataSource.id === 10) {
      gird = ''
    }
    return (
      <div className="radioQuestWrap">
        <h2 className="questTitle">
          { 
            noShowSerialNum 
            ? dataSource.questionContent 
            : `${dataSource.questionSequence}.${dataSource.questionContent}` 
          }
        </h2>
        {
          options && options.length !== 0 ? (
            <Row>
              {
                dataSource.questionType === 1 || dataSource.questionType === 13 ? 
                <RadioGroup 
                  style={{ width: "100%"}} 
                  value={`${this.getCheck(value,true)}`}
                  onChange={(e) => this.handleRadioChange(e,dataSource,true)}
                >
                  {
                    dataSource.options.map(( item, index ) => {
                      return(
                        <Col span={gird} key={`${Math.random()}`}>
                          <Radio 
                            value={`${item.id}`}
                            disabled={dataSource.disabled}
                          >
                            { item.content }
                          </Radio>
                          { item.optionType === 1 && 
                            <Input 
                              item={item} 
                              checkValue={this.getCheck(value,true)}
                              triggerChange={this.triggerChange}
                              value={this.props.value}
                            />
                          }
                        </Col>
                      )
                    })
                  }
                </RadioGroup> : null
              }
              {
                dataSource.questionType === 2 || dataSource.questionType === 23 ? 
                <Checkbox.Group
                  style={{ width: "100%"}} 
                  value={this.getCheck(value)}
                  onChange={(e) => this.handleRadioChange(e,dataSource,false)}
                >
                  {dataSource.options.map(( item, index ) => {
                    return(
                      <Col span={gird} key={`${Math.random()}Checkbox`}>
                        <Checkbox 
                          value={`${item.id}`}
                          disabled={dataSource.disabled}
                        > 
                          { item.content } 
                        </Checkbox>
                        { item.optionType === 1 && 
                          <Input 
                            item={item} 
                            checkValue={this.getCheck(value,false)}
                            triggerChange={this.triggerChange}
                            value={this.props.value}
                          />
                        }
                      </Col>
                    )
                  }) }
                  </Checkbox.Group> : null
              }
              {
                dataSource.questionType === 3 ?
                <Input 
                  item={item} 
                  checkValue={this.getCheck(value,false)}
                  triggerChange={this.triggerChange}
                  value={this.props.value}
                /> : null
              }
            </Row>
          ) : ''
        }
      </div>
    )
  }
}