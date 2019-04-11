import React, { Component } from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import Vcode from '@/components/UserForm/Vcode'
import { checkValCode } from '@/services/user'

const FormItem = Form.Item;
class Verification extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
				this.props.onSubmit(values)
      }
    });
  }
	VerificationCode = async (rule, value, callback) => {
    if (!value) {
      callback()
    } else {
      const res = await checkValCode({ valCode: value })
      if (!res.data) {
        callback('Verification code error')
      }
    }
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { loading } = this.props
    const verificationCodeError = isFieldTouched('verificationCode') && getFieldError('verificationCode');
    return (
    	<div style={{width: '100%', display:'flex', justifyContent:'center'}}>
	      <Form style={{width: 460}} onSubmit={this.handleSubmit}>
	        <FormItem>
	          {getFieldDecorator('emailAddress', {
	            rules: [
								{ type: 'email', message: 'The input is not valid E-mail!' },
								{ required: true, message: 'Please enter your e-mail address' }
							],
	          })(
	            <Input 
								style={{height:'40px'}} 
								prefix={<i className="icon iconfont icon-mail-o" />} 
								placeholder="E-mail address" 
							/>
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('verificationCode', {
							validateFirst: true,
	            rules: [
								{ required: true, message: 'The verification code cannot be empty' },
								{/* { validator: this.VerificationCode }, */}
							],
							//validateTrigger: 'onBlur'
	          })(
	          	<div>
		            <Row gutter={16}>
		              <Col span={14}>
		                <Input 
											style={{height:'40px'}} 
											prefix={<i className="icon iconfont icon-security" />} 
											placeholder="Verification Code"
										/>
		              </Col>
		              <Col span={10}>
		                <Vcode url='/api_web/verify/code/login'/>
		              </Col>
		            </Row>
	            </div>
	          )}
	        </FormItem>
	        <FormItem>
	          <Button 
							style={{width: '100%', backgroundColor:'#0099e8',height:'40px'}} 
							htmlType="submit"
							loading={loading}
						>
	            <span style={{fontSize:'16px',color:'white'}}>Next</span>
	          </Button>
	        </FormItem>
	      </Form>
      </div>
    );
  }
}

export default Form.create()(Verification)
