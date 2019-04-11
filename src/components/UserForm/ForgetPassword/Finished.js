import React, { Component } from 'react';
import { Button } from 'antd'
import { routerRedux } from 'dva/router'
export default class Finished extends Component {
	goLogin() {
		this.props.dispatch(routerRedux.replace('/user/login'))
		this.props.upDateProgress('verification')
	}
	render() {
		return (
			<div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
		 		<div>
			   	<i 
            className="icon iconfont icon-check-circle-o" 
            style={{color:'#3dbd7d', fontSize:'48px'}}
          />
		    </div>
		    <div>
			   	<span style={{color:'#3dbd7d', fontSize:'36px'}}>
            Password Reset Successfully
          </span>
		    </div>
		    <div>
			   	<span style={{color:'#999', fontSize:'12px'}}>
            You will use the new password to log in your idvert account.Please keep it in mind~
          </span>
		    </div>
		    <div>
			  	<Button onClick={() => this.goLogin()} style={{width: '380px', marginTop:'25px', backgroundColor:'#0099e8',height:'40px'}}>
		    		<span style={{fontSize:'16px',color:'white'}}>Log in again</span>
		    	</Button>
		    </div>
			</div>
		)
	}
}
