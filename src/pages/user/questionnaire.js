import React, {Component} from 'react'
import qs from 'qs'
import { sortObj } from '@/utils/index'
import { connect } from 'dva'
import { Form, Button, Spin, message } from 'antd'
import './styles.scss'
import RadioQuest from '@/components/Questionnaire'
import ComplexQuest from '@/components/Questionnaire/ComplexQuest'

const FormItem = Form.Item
function recursion(obj) {
  return Object.keys(obj).reduce((pre, curr) => {
    if (typeof obj[curr] === 'object') {
      return {
        ...pre,
        [curr]: recursion(obj[curr])
      }
    } else {
      return !!obj[curr] ? {...pre, [curr]: obj[curr] } : {...pre}
    }
  }, {})
}
@connect(({ questionnaire, loading }) => ({
  questionData: questionnaire.questionData,
  questionnaireId: questionnaire.questionnaireId,
  code: questionnaire.code,
  effects: loading.effects,
}))

@Form.create({
})
export default class Question extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      questionnaireId: 1
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { location, dispatch, questionnaireId, code } = this.props
    let query = qs.parse(location.search, { ignoreQueryPrefix: true })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.config({
          getContainer: () => document.getElementById('messageBox')
        });
        for(let k in values) {
          if (typeof(values[k]) === "object") {
            for (let j in values[k]) {
              if (JSON.stringify(values[k][j]) === "{}") {
                message.warning('Please complete the survey to activate 3 days free trial')
                return
              }
            }
          } else {
            if(!values[k] || JSON.stringify(values[k]) === "{}") {
              message.warning('Please complete the survey to activate 3 days free trial')
              return
            }
          }
        }
        console.log('Received values of form: ', values);
        console.log(recursion(values));
        dispatch({
          type: 'questionnaire/sendAnswer',
          payload: {
            email: query.email,
            questionnaireId: questionnaireId,
            answers: recursion(values),
            code
          }
        })
      }
    });
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
                            getFieldDecorator(`${item.id}`)(
                              <ComplexQuest dataSource={item}/>
                            )
                          }
                        </FormItem>
                      )
                    }
                    return(
                      <FormItem key={`${Math.random()}RadioQuest`}>
                        {
                          getFieldDecorator(`${item.id}`)(
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