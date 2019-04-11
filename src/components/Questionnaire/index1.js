import React,{Component} from 'react'
import { Radio, Checkbox } from 'antd'
import './styles.scss'

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group

export default class RadioGroup1 extends Component {
  constructor(props) {
    super(props)
    this.state={
      isDisabled: true,
      isCheckedData: [],
      inputValue: "",
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    console.log('从父组件传下来的值', this.props.dataSource)
  }
  handleRadioChange(e) {
    // console.log(e.target.value)
    console.log(this.props.onChange)
    this.props.onChange(e.target.value)
    if ( e.target.value &&  e.target.value === "Others") {
      this.setState({
        isDisabled: false,
      })
    }
  }
  // 问题：如果有其他类型存在，需要判断其他类型是否有输入值，若有，把值与其他类型组合成一个数组一起onChange出去
  handleCheckChange(checkedValues) {
    console.log(checkedValues)
    if(Array.isArray(checkedValues) && checkedValues.indexOf('Others') !== -1) {
      this.setState({
        isDisabled: false,
      })
    }
    this.setState({
      isCheckedData: [...checkedValues]
    }, () => {
      console.log('这个是isCheckedData的值', this.state.isCheckedData)
      this.props.onChange([...this.state.isCheckedData, this.state.inputValue])
    })
  }
  handleChange(e) {
    // console.log(e.target.value)
    this.setState({
      inputValue: e.target.value,
    })
    this.props.onChange([...this.state.isCheckedData, this.state.inputValue])
  }
  render() {
    const dataSource = {
      title: 'Where did you know us: ',
      index: '1',
      isShowInput: true,
      type: 'checkbox',
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Others', value: 'Others' },
      ]
    }
    return (
      <div className="radioQuestWrap">
        <h2 className="questTitle">
          { `${dataSource.index}.${dataSource.title}` }
        </h2>
        {
          dataSource.type === 'radio' ? (
            <RadioGroup 
              options={dataSource.options}
              onChange={(e) => this.handleRadioChange(e)}
              />
          ) : ''
        }
        {
          dataSource.type === 'checkbox' ? (
            <CheckboxGroup
              options={dataSource.options}
              onChange={(e) => this.handleCheckChange(e)}
            />
          ) : ''
        }
        {
          dataSource.isShowInput ? (
            <input 
            type="text" 
            maxLength="10"
            ref={(dom) => this.input = dom} 
            className="myInput"
            disabled={this.state.isDisabled}
            onChange={this.handleChange}/>
          ): ''
        }
      </div>
    )
  }
}