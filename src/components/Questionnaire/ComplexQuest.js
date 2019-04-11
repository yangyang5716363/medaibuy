import React,{Component} from 'react'
import { Radio, Checkbox } from 'antd'
import Questionnaire from './index'
import './styles.scss'

export default class ComplexQuest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: props.dataSource
    }
    this.onChange = this.onChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const { dataSource } = this.state
    const newcQuestions = dataSource.cQuestions.map(item => {
      item.disabled = false
      return item
    })
    this.setState({
      dataSource: { ...dataSource, cQuestions: newcQuestions }
    })
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.dataSource) !== JSON.stringify(this.props.dataSource)) {
      
      this.setState({
        dataSource: nextProps.dataSource
      })
    }
  }
  handleChange(dataObj, inputValue) {
    const { dataSource } = this.state
    const { cQuestions } = dataSource
    const checkedItem = cQuestions.filter((item => item.id === dataObj.questionId))
    // @todo 这里还有一类就是某一项只有一个输入框的话，其他项禁用, 当值input框值为空时, 其他选项恢复
    // @todo 点击某一项若checked的值为false,那么判断这一父元素下面的子元素是否所有checked都为false，若是，则所有框都可选
    if (!dataObj.checked && checkedItem[0].options.length > 1 ) {
      const isHasChecked = checkedItem[0].options.some(item => item.checked)
      if(!isHasChecked) {
        const newOptions = cQuestions.map(item => {
          if (item.options.length === 1 && item.questionType === 3) {
            item.options[0].controlInput = true
          }
          item.disabled = false
          return item
        })
         this.setState({
          dataSource: { ...dataSource, cQuestions: newOptions }
        })
      }
    } else if (checkedItem[0].options.length === 1 && inputValue === "") {
      const inputNewData = cQuestions.map(item => {
        if (item.options.length === 1 && item.questionType === 3) {
          item.options[0].controlInput = true
        }
        item.disabled = false
        return item
      })
      this.setState({
        dataSource: { ...dataSource, cQuestions: inputNewData }
      })
    } else if (checkedItem[0].options.length === 1 && inputValue !== "") {
      const inputValueData = cQuestions.map(item => {
        item.disabled = true
        if (item.id === dataObj.questionId) {
          item.disabled = false
        }
        if (item.options.length === 1 && item.questionType === 3) {
          item.options[0].controlInput = true
        }
        return item
      })
      this.setState({
        dataSource: { ...dataSource, cQuestions: inputValueData }
      })
    }
    else {
       const newData = cQuestions.map(item => {
        item.disabled = true
        if (item.id === dataObj.questionId) {
          item.disabled = false
        }
        if (item.options.length === 1 && item.questionType === 3) {
          item.options[0].controlInput = false
        }
        return item
      })
      this.setState({
        dataSource: { ...dataSource, cQuestions: newData }
      })
    }
  }
  onChange(checkData, id) {
    console.log('complexquest change',checkData, id)
    const obj = {}
    obj[id] = checkData
    this.props.onChange && this.props.onChange(obj)
  }
  render() {
    const { dataSource } = this.state
    const { cQuestions } = dataSource
    // console.log(this.props)
    return (
      <div className="complexWrap">
        <h1 className="compTitle">
          { `${dataSource.questionSequence}.${dataSource.questionContent}` }
        </h1>
        {
          cQuestions && cQuestions.map((item) => {
            return (
              <Questionnaire 
              key={`${Math.random()}Questionnaire`}
              dataSource={item} 
              handleSingleChange={this.handleChange} 
              onChange={(checkData) => this.onChange(checkData, item.id)}
              noShowSerialNum={true}/>
            )
          }
          )
        }
      </div>
    )
  }
}