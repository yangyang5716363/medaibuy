import React, { PureComponent } from 'react'
import { Modal, Form, Input, Button } from 'antd';
import MD5 from 'md5'
const FormItem = Form.Item
import { checkPassword } from '@/services/usercenter'

@Form.create()
export default class ModalQuestion extends PureComponent{
  constructor(props){
    super(props)
  }
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit('usercenter/updatePassword',values) 
      }
    })
  }
  handleCancel = () => {
    this.props.onCancel({securityPasswordVisible: false})
  }
  Verification = async (rule, value, callback) => {
    if (!value) {
      callback()
    } else {
      const res = await checkPassword({ password: MD5(value) })
      if (!res.data) {
        callback('password error')
      }
    }
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Inconsistent passwords');
    } else {
      callback();
    }
  }
  render(){
    const { key, visible, form, loading } = this.props
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
        ><Form>
          <FormItem label='Old password' {...formItemLayout}>
            {getFieldDecorator('oldPassword', {
              rules: [
                { required: true, message: 'Enter your password' },
                { validator: this.Verification }
              ],
            })(
              <Input type="password"/>
            )}
          </FormItem>
          <FormItem label='New password' {...formItemLayout}>
            {getFieldDecorator('newPassword', {
              rules: [
                { required: true, message: 'Enter your new password' },
                { pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/, 
                  message: 'The password must be 6-20 digits long, containing no less than 2 letters, numbers, and special symbols.' 
                },
              ],
            })(
              <Input type="password"/>
            )}
          </FormItem>
          <FormItem label='Confirm password' {...formItemLayout}>
            {getFieldDecorator('confirmpassword', {
              rules: [
                { required: true, message: 'Re-enter your new password' },
                { validator: this.compareToFirstPassword}
              ],
            })(
              <Input type="password"/>
            )}
          </FormItem></Form>
        </Modal>
      </div>
    )
  }
}