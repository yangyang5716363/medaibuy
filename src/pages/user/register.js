import React, { PureComponent } from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import MD5 from 'md5'
import UserForm from '@/components/UserForm';
import './styles.scss'
@connect(({ loading, user, dispatch }) => ({
  loading: loading.effects['user/register'],
  user: user,
  loginError: user.loginError,
  errorMsg: user.errorMsg,
}))
export default class RegisterForm extends PureComponent {
  constructor(props) {
    super(props);
  }
  onSubmit = (values) => {
    const { emailAddress, password } = values
    console.log(values)
    this.props.dispatch({ 
      type: 'user/register', 
      payload: { 
        account: emailAddress, 
        password: MD5(password), 
        timeZone: new Date().getTimezoneOffset()/60+'',
      } 
    }) 
  }
  render() {
    const { loading, user, dispatch, errorMsg, loginError } = this.props
    const formProps= {
      loading,
      dispatch,
    }
    return(
      <div className="flex">
        <UserForm 
          {...formProps}
          isSignUp={true}
          loginError={loginError}
          errorMsg={errorMsg}
          title='Create Your Idvert Account'
          btnText='Sign up'
          btnBottomText={{
            left: `Already have an account?`,
            right: 'Log in'
          }}
          link='/user/login'
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}
