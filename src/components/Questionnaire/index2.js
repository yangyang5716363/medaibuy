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
      checkedData: {},
      isDisabled: true,
      radioData: {},
      dataSource: props.dataSource,
    }
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
  handleRadioChange(e,index,questionsIndex) {
    const {dataSource,onChange} = this.props
    let value = Number(e.target.value)
    let cloneData = lodash.cloneDeep(dataSource)
    let obj = {}
    cloneData.options.map(item => {
      item.checked = false
    })
    cloneData.options.forEach(item => {
      (item.id === value) && (item.checked = true)
    });
    onChange(cloneData,questionsIndex)
  }
  inputChange = (e, item) => {
    const { inputChange } = this.props
    let obj = {
      [`input${item.id}`]: e.target.value
    }
    inputChange(obj)
  }
  render() {
    const { dataSource, value, questionsIndex, inputData } = this.props
    console.log(inputData)
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
                //<RadioGroup 
                 // style={{ width: "100%"}} 
                  //onChange={(e) => this.handleRadioChange(e,dataSource,true)}
                //>
                <div>
                  {
                    dataSource.options.map(( item, index ) => {
                      return(
                        <Col span={gird} key={`${Math.random()}`}>
                          <Radio 
                            value={`${item.id}`}
                            checked={item.checked}
                            disabled={dataSource.disabled}
                            onChange={(e) => this.handleRadioChange(e,index,questionsIndex)}
                          >
                            { item.content }
                          </Radio>
                          { item.optionType === 1 && 
                            <input 
                              className="myInput"
                              value={ inputData&&inputData[`input${item.id}`] ? inputData[`input${item.id}`] : ''}
                              disabled={!item.checked}
                              onChange={(e) => this.inputChange(e, item)}
                            />
                          }
                        </Col>
                      )
                    })
                  }</div>
                //</RadioGroup> 
                : null
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
                          <input className="myInput"/>
                        }
                      </Col>
                    )
                  }) }
                  </Checkbox.Group> : null
              }
              {
                dataSource.questionType === 3 ?
                <Input /> : null
              }
            </Row>
          ) : ''
        }
      </div>
    )
  }
}