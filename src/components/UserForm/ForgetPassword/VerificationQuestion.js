import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import questions from './securityQuestions'

const FormItem = Form.Item;
class VerificationQuestion extends Component {
	componentDidMount() {
		this.props.getQuestionList()
	}
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
				this.props.onSubmit(values)
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError } = this.props.form;
    const { questionCode1, questionCode2, questionCode3 } = this.props

    return (
    	<div style={{width: '100%', display:'flex', justifyContent:'center'}}>
	      <Form layout={'vertical'} style={{width: 460}} onSubmit={this.handleSubmit}>
	        <FormItem label={questions[questionCode1]}>
	          {getFieldDecorator('answer1', {
	            rules: [{ required: true, message: 'Please fill in the answer' }],
	          })(
	            <Input style={{height:'40px'}} placeholder="Please fill in the answer" />
	          )}
	        </FormItem>
	        <FormItem label={questions[questionCode2]}>
	          {getFieldDecorator('answer2', {
	            rules: [{ required: true, message: 'Please fill in the answer' }],
	          })(
	            <Input style={{height:'40px'}} placeholder="Please fill in the answer" />
	          )}
	        </FormItem>
	        <FormItem label={questions[questionCode3]}>
	          {getFieldDecorator('answer3', {
	            rules: [{ required: true, message: 'Please fill in the answer' }],
	          })(
	            <Input style={{height:'40px'}} placeholder="Please fill in the answer" />
	          )}
	        </FormItem>
	        <FormItem>
	          <Button 
							loading={this.props.loading}
							style={{width: '100%', backgroundColor:'#0099e8',height:'40px'}} 
							htmlType="submit"
						>
	            <span style={{fontSize:'16px',color:'white'}}>Next</span>
	          </Button>
	        </FormItem>
	      </Form>
      </div>
    );
  }
}

export default Form.create()(VerificationQuestion)
