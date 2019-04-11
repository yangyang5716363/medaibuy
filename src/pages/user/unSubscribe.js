import React, {Component} from 'react'
import { connect } from 'dva'
import { Form, Button, Spin, message } from 'antd'
import './styles.scss'
// import RadioQuest from '@/components/Questionnaire'
import RadioQuest from '@/components/Questionnaire/NewIndex'
import TextAreaQuest from '@/components/Questionnaire/TextAreaQuest'

const FormItem = Form.Item

@connect(({ questionnaire, user, loading, order }) => ({
  questionData: questionnaire.questionData,
  questionnaireId: questionnaire.questionnaireId,
  currentUser: user.currentUser,
  effects: loading.effects,
  user,
}))

@Form.create({
})
export default class Question extends Component {
  handleSubmit = (e) => {
    const { dispatch, user, questionnaireId } = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.config({
          getContainer: () => document.getElementById('messageBox')
        });
        for(let k in values) {
          if(!values[k] || JSON.stringify(values[k]) === "{}") {
            message.warning('Please complete the survey to unsubscribe, your feedback values a lot to us on constantly improving our product')
            return
          }
        }
        dispatch({
          type: 'questionnaire/sendAnswer',
          payload: {
            email: user.userInfo.email,
            questionnaireId: questionnaireId,
            answers: values
          }
        }).then(
          console.log('sfjwidfjw')
        )
      }
    });
  }
  render() {
    const { effects } = this.props
    const { getFieldDecorator } = this.props.form
    const { info, id, questions } = this.props.questionData
    return (
      <Spin spinning={!!effects['questionnaire/getQuestionnaireList']} wrapperClassName="questionloading">
        <div style={{ height: "100%", overflowY: "auto" }}>
          <div className="questWrap">
            <div className="title">
              {info}
            </div>
            <div className="content">
              <Form onSubmit={this.handleSubmit}>
                {
                  questions && questions.map(item => {
                    if(item.questionType === 3) {
                      return (
                        <FormItem>
                          {
                            getFieldDecorator(`${item.id}`,{
                            
                            })(
                              <TextAreaQuest dataSource={item}/>
                            )
                          }
                        </FormItem>
                      )
                    }
                    return(
                      <FormItem>
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
                <FormItem>
                  <div id="messageBox"></div>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="next"
                    loading={effects['questionnaire/sendAnswer'] || effects['order/orderSubCancel']}
                  > 
                    Next
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </Spin>
    )
  }
}