import React, { PureComponent } from 'react'
import { Divider, Form } from 'antd'
import SecurityRow from './SecurityRow'
import ModalPassword from './ModalPassword'
import ModalEmail from './ModalEmail'
import ModalQuestion from './ModalQuestion'
import { formatMessage } from 'umi-plugin-locale'
import moment from 'moment'
const FormItem = Form.Item
class Security extends PureComponent{
  constructor(props){
    super(props)
    this.state={
      title: '',
      key: Math.random(),
      loading: null
    }
  }
  onBtnClick = (visible) => {
    this.props.dispatch({
      type: 'usercenter/updateState',
      payload: visible
    })
    this.setState({
      key: Math.random(),
    })
  }
  onSubmit = (type,file) => {
    this.props.dispatch({
      type: type,
      payload: file
    })
  }
  render() {
    const { key } = this.state
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const { item, effects, securityQuestionData, userInfo} = this.props
    const { securityPasswordVisible, securityEmailVisible, securityQuestionVisible } = item
    const passwordDesc = 'Safe password can make the account more secured. We recommend you to change your password regularly, setting a password that contains at least two of the letters, symbols, or numbers and is longer than 6 digits.';
    const mailboxDesc = `You have bound mailbox ${userInfo.email}. It can be used for direct login, retrieve the password and so on`
    const securityDesc = 'It\'s one of the ways to retrive your login password. We suggest you to set up three privilged questions and answers only you know, this can protect your password security more effectively.';
    return(
      <div style={{ padding: "0 24px" }}>
        <div style={{ background: "white", padding: "24px 0" }}>
          <FormItem label={formatMessage({ id: 'app.account.infoSecurity.lable.email' })} {...formItemLayout}>
            <span>{userInfo.email}</span>
          </FormItem>
          <FormItem label={formatMessage({ id: 'app.account.infoSecurity.lable.account' })} {...formItemLayout}>
            <span>{userInfo.memberId}</span>
          </FormItem>
          <FormItem label={formatMessage({ id: 'app.account.infoSecurity.lable.register' })} {...formItemLayout}>
            <span>{moment(userInfo.registerTime).format('YYYY-MM-DD HH:MM:SS')}</span>
          </FormItem>
          <Divider />
          <SecurityRow 
            label={formatMessage({ id: 'app.account.infoSecurity.lable.password' })}
            isRight={true}
            formItemLayout={formItemLayout}
            desc={passwordDesc}
            isSet={true}
            btntext='Modify'
            onBtnClick={() => this.onBtnClick({securityPasswordVisible: true})}
          />
          <SecurityRow 
            label={formatMessage({ id: 'app.account.infoSecurity.lable.mailbox' })}
            isRight={true}
            formItemLayout={formItemLayout}
            desc={mailboxDesc}
            isSet={userInfo.isSetEmail}
            btntext='Modify'
            onBtnClick={() => this.onBtnClick({securityEmailVisible: true})}
          />
          <SecurityRow 
            label={formatMessage({ id: 'app.account.infoSecurity.lable.security' })}
            isRight={true}
            formItemLayout={formItemLayout}
            desc={securityDesc}
            isSet={userInfo.isSetSecurityQuestion}
            btntext='Modify'
            hideLine={true}
            onBtnClick={() => this.onBtnClick({securityQuestionVisible: true})}
          />
        </div>
        <ModalPassword 
          key={`${key}ModalPassword`}
          visible={securityPasswordVisible}
          loading={effects['usercenter/updatePassword']}
          onCancel={this.onBtnClick}
          onSubmit={this.onSubmit}
        />
        <ModalEmail 
          key={`${key}ModalEmail`}
          visible={securityEmailVisible}
          loading={effects['usercenter/accountChange']}
          onCancel={this.onBtnClick}
          onSubmit={this.onSubmit}
          email={userInfo.email}
        />
        <ModalQuestion 
          key={`${key}ModalQuestion`}
          visible={securityQuestionVisible}
          securityQuestionData={securityQuestionData}
          loading={effects['usercenter/saveSecurityQuestion']}
          onCancel={this.onBtnClick}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
} 
// export default Form.create(Security) 
export default Security 