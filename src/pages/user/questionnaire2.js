import React, {Component} from 'react'
import qs from 'qs'
import { sortObj } from '@/utils/index'
import { connect } from 'dva'
import { Form, Button, Spin, message } from 'antd'
import './styles.scss'
import lodash from 'lodash'
import RadioQuest from '@/components/Questionnaire/index2'
import ComplexQuest from '@/components/Questionnaire/ComplexQuest'
const FormItem = Form.Item
@connect(({ questionnaire, loading }) => ({
  questionData: questionnaire.questionData,
  questions: questionnaire.questions,
  inputData: questionnaire.inputData,
  questionnaireId: questionnaire.questionnaireId,
  code: questionnaire.code,
  effects: loading.effects,
}))

@Form.create({
})
export default class Question2 extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      questionnaireId: 1,
      inputData: {}
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log(values)
    }) 
  }
  onChange = (data,index) => {
    const { questions, dispatch } = this.props
    let cloneData = lodash.cloneDeep(questions)
    cloneData.splice(index,1,data)
    dispatch({
      type: 'questionnaire/updateState',
      payload: {
        questions: cloneData
      }
    })
  }
  inputChange = (obj) => {
    console.log(obj)
    const { inputData, dispatch } = this.props
    let data = inputData ? inputData : {}
    dispatch({
      type: 'questionnaire/updateState',
      payload: {
        inputData: Object.assign(data, obj)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { info, id } = this.props.questionData
    const { questions, inputData } = this.props
    console.log(inputData)
    // questions && questions.sort(sortObj('questionSequence', 0))
    console.log(questions)
    const { effects } = this.props
    return (
      <Spin spinning={!!effects['questionnaire/getQuestionnaireList']}>
          <div className="questWrap">
            <div className="title">
              {info}
            </div>
            <div className="content">
              <Form onSubmit={this.handleSubmit}>
                {
                  questions && questions.map((item,questionsIndex) => {

                    if(item.options.length === 0 && item.cQuestions) {
                      return (
                        <FormItem key={`${Math.random()}cQuestions`}>
                          {
                            getFieldDecorator(`${item.id}`,{
                            })(
                              <ComplexQuest dataSource={item}/>
                            )
                          }
                        </FormItem>
                      )
                    }
                    return(
                      <FormItem key={`${Math.random()}RadioQuest`}>
                        <RadioQuest 
                          questionsIndex={questionsIndex} 
                          dataSource={item} 
                          inputData={inputData}
                          onChange={(data,index) => this.onChange(data,index)}
                          inputChange={(obj) => this.inputChange(obj)}
                        />
                      </FormItem>
                    )
                  }
                  )
                }
                <FormItem style={{ textAlign: 'right'}}>
                  <div id="messageBox"></div>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="next"
                    loading={effects['questionnaire/sendAnswer']}
                  > 
                    Next
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
      </Spin>
    )
  }
}