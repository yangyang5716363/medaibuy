import React, { PureComponent } from 'react'
import { Modal, Form, Input, Button, Select } from 'antd';
import securityQuestions from './SecurityQuestions';
const FormItem = Form.Item
const Option = Select.Option

@Form.create()
export default class SecurityModal extends PureComponent{
  constructor(props){
    super(props)
  }
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit('usercenter/saveSecurityQuestion',values) 
      }
    })
  }
  handleCancel = () => {
    this.props.onCancel({securityQuestionVisible: false})
  }
  render(){
    const { key, visible, securityQuestionData, form, loading } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }
    return(
      <div>
        <Modal 
          title='Change Password'
          key={key}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" loading={loading} type="primary" onClick={this.handleOk}>
              保存
            </Button>,
          ]}
        >
          <FormItem label='Password' {...formItemLayout}>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Enter your password' },
                {/* { validator: this.Verification } */}
              ],
            })(
              <Input type="password"/>
            )}
          </FormItem>
          <FormItem label='Question 1' {...formItemLayout}>
            {getFieldDecorator('questionCode1', {
              initialValue: securityQuestionData ? `${securityQuestionData.questionCode1}` : null,
              rules: [
                { required: true, message: 'Enter your new password' },
              ],
            })(
              <Select style={{width: "100%"}} size="large" placeholder='Please select security question'>
                { 
                  securityQuestions.map((item, index) => {
                    return (<Option key={index} value={`${index}`}>{item}</Option>)
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem label='Answer 1' {...formItemLayout}>
            {getFieldDecorator('answer1', {
              initialValue: securityQuestionData ? securityQuestionData.answer1 : null,
              rules: [
                { required: true },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label='Question 2' {...formItemLayout}>
            {getFieldDecorator('questionCode2', {              
              initialValue: securityQuestionData ? `${securityQuestionData.questionCode2}` : null,
              rules: [
                { required: true, message: 'Enter your new password' },
              ],
            })(
              <Select style={{width: "100%"}}  size="large" placeholder='Please select security question'>
                { 
                  securityQuestions.map((item, index) => {
                    return (<Option key={index} value={`${index}`}>{item}</Option>)
                  })
                }
              </Select>           
            )}
          </FormItem>
          <FormItem label='Answer 2' {...formItemLayout}>
            {getFieldDecorator('answer2', {
              initialValue: securityQuestionData ? securityQuestionData.answer2 : null,
              rules: [
                { required: true },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label='Question 3' {...formItemLayout}>
            {getFieldDecorator('questionCode3', {
              initialValue: securityQuestionData ? `${securityQuestionData.questionCode3}` : null,
              rules: [
                { required: true, message: 'Enter your new password' },
              ],
            })(
              <Select style={{width: "100%"}}  size="large" placeholder='Please select security question'>
                { 
                  securityQuestions.map((item, index) => {
                    return (<Option key={index} value={`${index}`}>{item}</Option>)
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem label='Answer 3' {...formItemLayout}>
            {getFieldDecorator('answer3', {
              initialValue: securityQuestionData ? securityQuestionData.answer2 : null,
              rules: [
                { required: true },
              ],
            })(
              <Input />
            )}
          </FormItem>
        </Modal>
      </div>
    )
  }
}
