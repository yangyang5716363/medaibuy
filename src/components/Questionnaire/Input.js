/*
 * @Author: jiaoguowei 
 * @Date: 2019-01-09 15:04:28 
 * @Last Modified by: yangyang
 * @Last Modified time: 2019-03-16 11:24:11
 */

import React,{Component} from 'react'
import './styles.scss'
let inputValParams = {}
export default class MyInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVal: null
    }
  }
  handleInput(e, item) { 
    const val = e.target.value
    let obj = {}
    obj[`input${item.id}`]= val
    inputValParams = Object.assign(inputValParams, obj)
    this.setState({
      inputVal: inputValParams
    })
  }
  handleInputBlur(e,item){
    this.props.triggerChange(this.props.value,this.state.inputVal)
  }
  render() {
    const {item,checkValue,value} = this.props
    const {inputVal} = this.state
    return (
      <input 
        type="text"
        value={ (inputVal || value&&value[`input${item.id}`]) ? (inputVal&&inputVal[`input${item.id}`] || value[`input${item.id}`]) : ''} 
        maxLength="30"
        ref={(dom) => this.input = dom} 
        disabled={ Array.isArray(checkValue) ? !checkValue.includes(`${item.id}`) : checkValue != item.id }
        className="myInput"
        onChange={(e) => this.handleInput(e, item)}
        onBlur={(e) => this.handleInputBlur(e, item)}
      />
    )
  }
}