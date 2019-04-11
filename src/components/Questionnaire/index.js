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

export default class Questionnaire extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputData: {},
      checkedData: {},
      isDisabled: true,
      radioData: {},
      dataSource: props.dataSource,
      why: 'don not know'
    }
  }
  
  componentDidMount() {
    const { dataSource } = this.props
    const { options } = dataSource
    // console.log('组件中数据', dataSource)
    // console.log('获取dom节点', this.input)
    if(options.length === 1 && dataSource.questionType === 3) {
      const inputOptions = options.map(item => {
        item.controlInput = true
        return item
      })
    }
    const newOptions = options.map(item => {
      item.checked = false
      return item
    })
    this.setState({
      dataSource: {...dataSource, options: newOptions}
    })
  }
  componentWillReceiveProps(nextProps) {
    // console.log('查看变化的数据', nextProps.dataSource)
    // console.log('查看上一次传过来的dataSource', this.props.dataSource)
    if (JSON.stringify(nextProps.dataSource) !== JSON.stringify(this.props.dataSource)) {
      this.setState({
        dataSource: nextProps.dataSource
      })
    }
  }
  handleCheckedChange(data) {
    const { checkedData, inputData } = this.state
    const { dataSource } = this.props
    const { options } = dataSource
    let _checkedData = {...checkedData}
    let newInputData = {}
    const newOptions = options.map(item => {
      let obj = lodash.clone(item)
      if (item.content === data.content) {
        obj.checked = !item.checked
        item.checked = !item.checked
      }
      if (item.checked && inputData[item.id]) {
        newInputData[item.id] = inputData[item.id]
      }
      return obj
    })
    // handleSingleChange主要是对于嵌套题目，把当前点击数据上传
    this.props.handleSingleChange && this.props.handleSingleChange(data)
    newOptions.forEach((item) => {
      _checkedData[item.id] = item.checked
    })
    if (!Object.values(_checkedData).some(item => item)) {
      _checkedData= {}
    }
    // debugger;
    this.setState({
      dataSource: {...dataSource, options: newOptions},
      checkedData: _checkedData,
    }, () => {
      this.props.onChange( {...this.state.checkedData, ...newInputData}, data )
    })
  }
  handleRadioChange(data) {
    this.props.handleSingleChange && this.props.handleSingleChange(data)
    const { dataSource, radioData, inputData } = this.state
    const { options } = dataSource
    let newInputData = {}
    const newOptions = options.map(item => {
      item.checked = false
      radioData[item.id] = false
      if (item.content === data.content) {
        item.checked = true
        radioData[item.id] = true
        newInputData = inputData[item.id] ? {[item.id]: inputData[item.id]} : {}
      }
      return item
    })
    this.setState({
      dataSource: {...this.state.dataSource, options: newOptions},
      radioData,
    }, () => {
      this.props.onChange( {...radioData, ...newInputData}, data )
    })
  }
  handleInput(e, data) {
    this.props.handleSingleChange && this.props.handleSingleChange(data, e.target.value)
    const { inputData, checkedData, radioData, dataSource } = this.state
    let newInputData = {}
    inputData[data.id] = e.target.value
    dataSource.options.map(item => {
      if (item.checked && inputData[item.id]) {
        newInputData[item.id] = inputData[data.id]
      }
    })
    this.setState({
      inputData,
    }, () => {
      console.log('zhi xing')
      if (dataSource.questionType === 23) {
        this.props.onChange( {...checkedData, ...newInputData}, data )
      } else if (dataSource.questionType === 13) {
        this.props.onChange( {...radioData, ...newInputData}, data )
      } else if (dataSource.questionType === 3 ) {
        this.props.onChange(newInputData, data)
      }
    })
  }
  render() {
    // console.log(this.state.dataSource)
    const { dataSource } = this.props
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
                dataSource.options.map(( item ) => {
                  return (
                    <Col span={gird} key={`${Math.random()}`}>
                      {
                        dataSource.questionType === 2 || dataSource.questionType === 23 
                        ? (
                          <Checkbox 
                            value={item.content} 
                            checked={item.checked} 
                            onClick={() => this.handleCheckedChange(item)}
                            disabled={dataSource.disabled}
                            > 
                            { item.content } 
                          </Checkbox>
                        ) : ''
                      }
                      {
                        dataSource.questionType === 1 || dataSource.questionType === 13? (
                          <Radio 
                            value={item.content}
                            checked={item.checked}
                            onClick={() => this.handleRadioChange(item)}
                            disabled={dataSource.disabled}
                            >
                            { item.content }
                          </Radio>
                        ) : ''
                      }
                      {
                        dataSource.questionType === 3 || item.optionType === 1 ? (
                          <input 
                            type="text" 
                            maxLength="30"
                            ref={(dom) => this.input = dom} 
                            disabled={!item.checked && !item.controlInput}
                            className="myInput"
                            onChange={(e) => this.handleInput(e, item)}
                          />
                        ) : ''
                      }
                    </Col>
                  )
                })
              }
            </Row>
          ) : ''
        }
        
      </div>
    )
  }
}