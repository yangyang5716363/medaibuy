import React,{Component} from 'react'
import { Input } from 'antd'
import './styles.scss'

const { TextArea } = Input

export default class TextAreaQuest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: props.dataSource
    }
    this.handleChange = this.handleChange.bind(this)
  }
 
  handleChange(e) {
    // console.log(e.target.value)
    let obj = {}
    const { dataSource } = this.state
    obj[dataSource.id] = e.target.value
    this.props.onChange(obj)
  }
  render() {
    const { dataSource } = this.state
    return (
      <div className="TextAreaWrap">
         <h1 className="compTitle">
          { `${dataSource.questionSequence}.${dataSource.questionContent}` }
        </h1>
        <div>
          <TextArea rows={4} onChange={ this.handleChange }/>
        </div>
      </div>
    )
  }
}