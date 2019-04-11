import React, {Component} from 'react'
import qs from 'qs'
import { sortObj } from '@/utils/index'
import { connect } from 'dva'
import { Form, Button, Spin, message } from 'antd'
import './styles.scss'
import RadioQuest from '@/components/Questionnaire/NewIndex'
import ComplexQuest from '@/components/Questionnaire/ComplexQuest'
const FormItem = Form.Item
@connect(({ questionnaire, loading }) => ({
  questionData: questionnaire.questionData,
  questionnaireId: questionnaire.questionnaireId,
  code: questionnaire.code,
  effects: loading.effects,
}))

@Form.create({
})
export default class NewQuestion extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      questionnaireId: 1
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log(values)
    }) 
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { info, id, questions } = this.props.questionData
    questions && questions.sort(sortObj('questionSequence', 0))
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
                  questions && questions.map(item => {

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
                        {
                          getFieldDecorator(`${item.id}`,{
                          })(
                            <RadioQuest dataSource={item}/>
                          )
                        }
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