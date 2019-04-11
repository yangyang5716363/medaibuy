import React, { Component } from 'react';
import styles from './VerificationEmail.less'

export default class VerificationEmail extends Component {
	sentEmail() {
		this.props.onSendEmail()
	}
	render() {
		return (
			<div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
		 		<div>
			   	<i className="icon iconfont icon-check-circle-o" style={{color:'#3dbd7d', fontSize:'48px'}}/>
		    </div>
		    <div>
			   	<span style={{color:'#3dbd7d', fontSize:'36px'}}>
						Verification email sent!
					</span>
		    </div>
		    <div>
			   	<span style={{color:'#999', fontSize:'12px'}}>
						A Verification email has been sent to {this.props.email}.&npsp;&npsp;
						Please log in your email and complete the verification
					</span>
		    </div>
		    <div style={{margin:'25px 0 20px 0'}} onClick={() => this.sentEmail()}>
		    	<span className={styles.resent} style={{fontSize:'16px',color:'#0099e8'}}>
						Resend
					</span>
		    </div>
		    <div>
		    	<span style={{fontSize:'16px',color:'#444'}}>
						Tip: Still not received, may have been classified as spam 
					</span>
		    </div>
			</div>
		)
	}
}
