import React, { PureComponent } from 'react'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import MD5 from 'md5'
import UserForm from '@/components/UserForm'
import FormModal from '@/components/UserForm/Modal'
import { getBrowserInfo } from '@/utils'
import { checkValCode } from '@/services/user'
import cfgs from '@/cfgs'
import './styles.scss'
const browserArr = ['firefox','chrome','opera','safari']
const browser = getBrowserInfo()
@connect(({ loading, user }) => ({
  loading: loading.effects['user/login'] || loading.effects['user/checkValCode'],
  effects: loading.effects,
  user: user,
  loginError: user.loginError,
  errorMsg: user.errorMsg,
  randomCode: user.randomCode,
}))

export default class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
      showFormModal: !browserArr.includes(browser.browser) || !(window.screen.availWidth >= 1366),
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        loginError: false,
        errorMsg: null
      }
    })
  }
  onSubmit = (values) => {
    browserArr.includes(browser.browser) && window.screen.availWidth >=1366 && this.props.dispatch({ 
      // type: 'user/login', 
      type: 'user/checkValCode', 
      payload: { 
        valCode: values.valCode, 
        account: values.emailAddress, 
        password: MD5(values.password), 
        timeZone: new Date().getTimezoneOffset()/60+'',
      } 
    })
  }
  loginInputChange = () => {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        loginError: false,
        errorMsg: null
      }
    })
  }
  render() {
    const { loading, dispatch, effects, loginError, errorMsg, randomCode } = this.props
    const { showFormModal } = this.state
    const formProps= {
      loading,
      dispatch,
      effects
    }
    return(
      <div className="flex">
        <UserForm 
          {...formProps}
          isSignUp={false}
          randomCode={randomCode}
          errorMsg={errorMsg}
          loginError={loginError}
          title='Account Login'
          btnText='Log in'
          btnBottomText={{
            left: `Don't have an account?`,
            right: 'Sign up'
          }}
          link='/user/register'
          onSubmit={this.onSubmit}
          loginInputChange={this.loginInputChange}
        />
        <FormModal showFormModal={showFormModal}/>
      </div>
    )
  }
}