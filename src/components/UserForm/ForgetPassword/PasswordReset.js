import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';


const FormItem = Form.Item;
class PasswordReset extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    });
  }
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Inconsistent passwords');
    } else {
      callback();
    }
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    // Only show error after a field is touched.
    const verificationCodeError = isFieldTouched('verificationCode') && getFieldError('verificationCode');
    return (
    	<div style={{width: '100%', display:'flex', justifyContent:'center'}}>
	      <Form style={{width: 460}} onSubmit={this.handleSubmit}>
	        <FormItem>
	          {getFieldDecorator('newPassword', {
	            rules: [
								{ required: true, message: 'Password cannot be empty' },
								{ pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/, 
									message: 'The password must be 6-20 digits long, containing no less than 2 letters, numbers, and special symbols.' 
								},
							],
	          })(
	            <Input style={{height:'40px'}} prefix={<i className="icon iconfont icon-lock" />} placeholder="Enter your new password" type={'password'} />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('repeatPassword', {
	            rules: [
								{ required: true, message: 'Re-enter your new password' },
								{ validator: this.compareToFirstPassword },
							],
	          })(
	            <Input style={{height:'40px'}} prefix={<i className="icon iconfont icon-lock" />} placeholder="Re-enter your new password" type={'password'} />
	          )}
	        </FormItem>
	        <FormItem>
	          <Button 
							style={{width: '100%', backgroundColor:'#0099e8',height:'40px'}} 
							htmlType="submit"
							loading={this.props.loading}
						>
	            <span style={{fontSize:'16px',color:'white'}}>OK</span>
	          </Button>
	        </FormItem>
	      </Form>
      </div>
    );
  }
}

export default Form.create()(PasswordReset)
