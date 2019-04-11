import React, { PureComponent } from 'react'
import { Modal, Form, Input, Button, Row, Col } from 'antd';
import Vcode from '@/components/UserForm/Vcode';
const FormItem = Form.Item

@Form.create()
export default class ModalEmail extends PureComponent{
  constructor(props){
    super(props)
  }
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit('usercenter/sendChangeEmail',values) 
      }
    })
  }
  handleCancel = () => {
    this.props.onCancel({securityEmailVisible: false})
  }
  render(){
    const { key, visible, form, loading, email } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }
    return(
      <div>
        <Modal 
          title='Change Email'
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
          <FormItem label='Email' {...formItemLayout}>
            {getFieldDecorator('newEmail')(
              <span>{email}</span>
            )}
          </FormItem>
          <FormItem label='Password' {...formItemLayout}>
            {getFieldDecorator('password', {
              validateFirst: true,
              rules: [
                { required: true, message: 'Enter your password' },
              ],
            })(
              <Input type="password"/>
            )}
          </FormItem>
          <FormItem label='New Email' {...formItemLayout}>
            {getFieldDecorator('newEmail', {
              validateFirst: true,
              rules: [
                { required: true, message: 'Enter your newEmail' },
                { type: 'email', message: 'The input is not valid E-mail!' }
              ],
            })(
              <Input type="password"/>
            )}
          </FormItem>
          <FormItem label='verification code' {...formItemLayout}>
            {getFieldDecorator('valCode', {
              rules: [
                { required: true, message: 'Re-enter your new password' },
              ],
            })(
              <div>
                <Row gutter={16}>
                  <Col span={14}>
                    <Input 
                      style={{ height: '40px' }} 
                      prefix={<i className="icon iconfont icon-security" />} 
                      placeholder="Verification Code"
                    />
                  </Col>
                  <Col span={10}>
                    <Vcode url='/api_web/verify/code/account/change'/>
                  </Col>
                </Row>
              </div>
            )}
          </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
