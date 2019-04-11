import React, { Component } from 'react';
import { Button } from 'antd'
import './Button.scss'

export default class FindType extends Component {
	sendForgetPasswordEmail() {
		this.props.onSendEmail()
	}
	goVerificationQuestion() {
    this.props.upDateProgress('verificationQuestion')
	}
	render() {
		const { isSetSecurityQuestion } = this.props
		return (
			<div style={{ display: "flex", justifyContent: "center"}}>
				<div style={{width: 460}}>
			 		<div style={{marginBottom: 28}}>
				   	<Button 
						 	onClick={() => this.sendForgetPasswordEmail()} 
							style={{width: "100%", backgroundColor: "#0099e8", height: "40px"}}
						>
			      	<span style={{fontSize: "16px",color: "white"}}>
								<i className="icon iconfont icon-mail-o" /> 
								&nbsp;&nbsp;Retrive by Email
							</span>
			    	</Button>
			    </div>
			    <div>
				   <Button 
					 		disabled={!isSetSecurityQuestion} 
							className={isSetSecurityQuestion ? "button" : "disabledButton"} 
							onClick={() => this.goVerificationQuestion()} 
							style={{width: "100%", backgroundColor: "#0099e8", height: "40px"}}
						>
			      	<span style={{fontSize: "16px", color: isSetSecurityQuestion ? "white" : "#bdbdbd"}}>
								<i className="icon iconfont icon-question-circle-o" /> 
								&nbsp;&nbsp;Retrive by Security Questions
							</span>
			    	</Button>
			    </div>
				</div>
			</div>
		)
	}
}
