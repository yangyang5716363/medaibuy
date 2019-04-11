import React, { Component } from 'react';
const ON = 1, OFF = 0;

class ResetPasswordSteps extends Component {
	constructor(props) {
		super(props)
		this.progress = 'verificationEmail'
	}

	render() {
		const { progress } = this.props
		let stateList = []
		if ( progress === 'verificationEmail' || progress === 'verificationQuestion' ) {
			this.progress = progress
			stateList = [1, 0, 0]
		} else if ( progress === 'passwordReset' ) {
			stateList = [ON, ON, OFF]
		} else if ( progress === 'finished' ) {
			stateList = [ON, ON, ON]
		}
		return (
			<div style={{display:'flex'}}>
		    <Step title={ titleMap[this.progress]} index ={0} status = { stateList[0] } />
		    <Step title={'Password reset'} index ={1} status = { stateList[1] } />
		    <Step title="Finished" index ={2} status = { stateList[2] } />
		  </div>
		)
	}
}

const titleMap = {
	verificationEmail: 'Verification email',
	verificationQuestion: 'Verify security question',
}

const offCircleStyle = {
	border: '1px solid #999',
	backgroundColor: 'white',
	color: '#999',
	width: '20px',
	height: '20px',
	lineHeight: '20px',
	borderRadius: '50%',
	textAlign:'center',
	display:'flex',
	justifyContent:'center', 
	alignItems:'center',
}
const onCircleStyle = {
	border: '1px solid #0099e8',
	backgroundColor: '#0099e8',
	color: 'white',
	width: '20px',
	height: '20px',
	lineHeight: '20px',
	borderRadius: '50%',
	textAlign:'center',
	display:'flex',
	justifyContent:'center', 
	alignItems:'center',
}
const offTitleStyle = {
	color: '#999',
	marginLeft: '5px',
	transition:'color 2s',
}
const onTitleStyle = {
	color: '#0099e8',
	marginLeft: '5px',
	transition:'color 2s',
}
const offLineStyle = {
	backgroundColor: '#ddd',
	width:24, 
	height:'2px', 
	margin: '0 5px',
	transition:'background-color 2s',
}
const onLineStyle = {
	backgroundColor: '#0099e8',
	width:24, 
	height:'2px', 
	margin: '0 5px',
	transition:'background-color 2s',
}

class Step extends Component {
	render() {
		const { title, index, status } = this.props
		let circleStyle = null
		let titleStyle = null
		let lineStyle = null
		if ( status === OFF ) {
			circleStyle = offCircleStyle
			titleStyle = offTitleStyle
			lineStyle = offLineStyle
		} else {
			circleStyle = onCircleStyle
			titleStyle = onTitleStyle
			lineStyle = onLineStyle
		}
		return (
			<div style={{display:'flex', alignItems:'center'}}>
				{ index > 0 ? <div style={lineStyle}/> : null }
				<div style={circleStyle}>
					{index}
				</div>
				<div>
					<span style={titleStyle}>{title}</span>
				</div>
			</div>
		)
	}
}

export default ResetPasswordSteps
