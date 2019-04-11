import React, { Component } from 'react';
import { connect } from 'dva'
import Link from 'umi/link';
import MD5 from 'md5'
import Verification from '@/components/UserForm/ForgetPassword/Verification'
import FindType from '@/components/UserForm/ForgetPassword/FindType'
import VerificationEmail from '@/components/UserForm/ForgetPassword/VerificationEmail'
import VerificationQuestion from '@/components/UserForm/ForgetPassword/VerificationQuestion'
import PasswordReset from '@/components/UserForm/ForgetPassword/PasswordReset'
import Finished from '@/components/UserForm/ForgetPassword/Finished'
import ResetPasswordSteps from '@/components/UserForm/ForgetPassword/ResetPasswordSteps'
import './styles.scss'

@connect(({ user, loading }) => ({
	user,
	effects: loading.effects
}))
export default class Content extends Component {
	componentDidMount() {
    this.props.dispatch({
      type:'user/emailDirect'
    })
	}
	verificationSubmit = (values) => {
		this.props.dispatch({
			// type:'user/doforgetPassword', 
			type:'user/forgetCheck', 
			payload: { valCode: values.verificationCode, email: values.emailAddress }
		})
	}
	sendForgetPasswordEmail = () => {
		this.props.dispatch({
			type:'user/sendForgetPasswordEmail',
			payload:{
				email: this.props.user.currentUser.email,
			},
		})
	}
	getQuestionList = () => {
		this.props.dispatch({
			type:'user/querySecurityQuestion',
			payload: {
				memberId: this.props.user.currentUser.memberId,
			},
		})
	}
	verifySecurityQuestionSubmit = (values) => {
		const { user } = this.props
		this.props.dispatch({ 
			type:'user/verifySecurityQuestion', 
			payload: { 
				id: user.currentUser.id,
				answer1: values.answer1,
				answer2: values.answer2,
				answer3: values.answer3,
				memberId: user.currentUser.memberId,
			}} 
		 )
	}
	passwordResetSubmit = (values) => {
		const { user } = this.props
		const charge = user.findPasswordType === 'email'
		const type =  charge ? 'user/updatePasswordByEmail' : 'user/updatePasswordByQuestion'
		const params = charge ? { encryptRecord: user.encryptRecord } : { memberId: user.currentUser.memberId }
		this.props.dispatch({
			type: type, 
			payload: { 
				newPassword: MD5(values.newPassword),
				...params
			},
		})
	}
	upDateProgress = (values) => {
		this.props.dispatch({
			type:'user/goProgress',
			payload: {
				progress: values,
			},
		})
	}
	render() {
		const { dispatch, user, effects } = this.props
		const { encryptRecord, findPasswordType, progress } = user
		const { email, memberId, isSetSecurityQuestion, id,
						questionCode1, questionCode2, questionCode3, 
					} = user.currentUser
		const findTypeObj = { email, memberId, isSetSecurityQuestion, dispatch }
		const verificationQuestionObj = { 
			memberId, isSetSecurityQuestion, questionCode1,
			questionCode2, questionCode3, id, dispatch,
			loading: effects['user/verifySecurityQuestion']
		}
		const passwordResetObj = { 
			memberId, encryptRecord, findPasswordType,
			loading: findPasswordType === 'email' ? effects['user/updatePasswordByEmail'] : effects['user/updatePasswordByQuestion'] 
		}
    const progressMap = {
      verification: <Verification 
											dispatch={dispatch} 
											onSubmit={this.verificationSubmit} 
											loading={effects['user/forgetCheck'] || effects['user/doforgetPassword']}
										/>,
      findType: <FindType 
									{...findTypeObj} 
									onSendEmail={this.sendForgetPasswordEmail}
									upDateProgress={this.upDateProgress}
								/>,
      verificationEmail: <VerificationEmail email={email} onSendEmail={this.sendForgetPasswordEmail}/>,
      verificationQuestion: <VerificationQuestion 
															{...verificationQuestionObj} 
															onSubmit={this.verifySecurityQuestionSubmit}
															getQuestionList={this.getQuestionList}
														/>,
      passwordReset: <PasswordReset {...passwordResetObj} onSubmit={this.passwordResetSubmit}/>,
      finished: <Finished dispatch={dispatch} upDateProgress={this.upDateProgress}/>,
    }
		return (
		<div className="forgetPassword">
		  <div className="forgetPassword-flex">
		  	<div className="forgetPassword-flex__title">
		  		<span style={{color:'#444', fontSize:'22px'}}>Forget your password</span>
		  		<div>
		  			{ (progress === 'verification' || progress === 'findType') ? 
							(<span style={{color:'#999999'}}>Already have an account ?&nbsp;&nbsp;
								<Link style={{color:'#0099e8',textDecoration:'none'}} to='/user/login'>
									Log in
								</Link>
							</span>) :
		  				<ResetPasswordSteps progress={progress}/> 
						}
		  		</div>
		  	</div>
		  	<div className="forgetPassword-flex__content">
		  		<div style={{width:'100%'}}>
		  			{ progressMap[progress] || null }
		  		</div>
		  	</div>
		  </div>
	  </div>
	 )
	}
}