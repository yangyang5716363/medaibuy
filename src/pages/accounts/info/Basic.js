import React, { PureComponent } from 'react'
import { Form, Input, Button } from 'antd'
import { formatMessage } from 'umi-plugin-locale'
import router from 'umi/router';
import moment from 'moment'
const FormItem = Form.Item;
import './styles.scss'
 
class Basic extends PureComponent {
  constructor(props){
    super(props)
  }
  onSubmit = () => {
    const file = this.props.form.getFieldsValue()
    this.props.onSubmit(file)
  }

  render(){
    const { isEdit, userInfo } = this.props
    const { useage } = userInfo
    console.log(userInfo)
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    }
    const formItemLayout2 = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    return(
      <div style={{ padding: "0 24px" }}>
        <div style={{ background: "white", padding: "24px 0" }}>
          <Form >
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.email' })} {...formItemLayout2}>
              {getFieldDecorator('email', {
                initialValue: userInfo.email,
              })(
                <div>
                  <span>{userInfo.email}</span>
                  <span style={{ marginLeft: '30px', color: '#444' }}>
                    <i
                      style={{ color: '#0099e8' }}
                      className="icon iconfont icon-info-cirlce-o"
                    /> 
                    Please go to&nbsp;&nbsp;
                    <span
                      onClick={() => this.props.onTabChange()}
                      style={{ cursor: 'pointer', color: '#0099e8', textDecoration: 'underline' }}
                    >
                    Security Settings
                    </span> 
                    &nbsp;&nbsp;to edit
                  </span>
                </div>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.username' })} {...formItemLayout}>
              {getFieldDecorator('username', {
                initialValue: userInfo.username,
              })(
                isEdit ? <Input /> : <span>{userInfo.username}</span>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.firstname' })} {...formItemLayout} >
              {getFieldDecorator('name', {
                initialValue: userInfo.name,
              })(
                isEdit ? <Input /> : <span>{userInfo.name}</span>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.lastname' })} {...formItemLayout}>
              {getFieldDecorator('surname', {
                initialValue: userInfo.surname,
              })(
                isEdit ? <Input /> : <span>{userInfo.surname}</span>
              )}
            </FormItem>
            <hr style={{ border: "0 none", borderTop: "1px solid rgb(238, 238, 238)"}}/>
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.companyname' })} {...formItemLayout}>
              {getFieldDecorator('companyName', {
                initialValue: userInfo.companyName,
              })(
                isEdit ? <Input /> : <span>{userInfo.companyName}</span>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.industry' })} {...formItemLayout}>
              {getFieldDecorator('companyIndustry', {
                initialValue: userInfo.companyIndustry,
              })(
                isEdit ? <Input /> : <span>{userInfo.companyIndustry}</span>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.contact' })} {...formItemLayout}>
              {getFieldDecorator('companyContact', {
                initialValue: userInfo.companyContact,
              })(
                isEdit ? <Input /> : <span>{userInfo.companyContact}</span>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.tel' })} {...formItemLayout}>
              {getFieldDecorator('companyPhone', {
                initialValue: userInfo.companyPhone,
              })(
                isEdit ? <Input /> : <span>{userInfo.companyPhone}</span>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.address' })} {...formItemLayout}>
              {getFieldDecorator('companyAddress', {
                initialValue: userInfo.companyAddress,
              })(
                isEdit ? <Input /> : <span>{userInfo.companyAddress}</span>
              )}
            </FormItem>
            <hr style={{ border: "0 none", borderTop: "1px solid rgb(238, 238, 238)"}}/>
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.version' })} {...formItemLayout}>
              {getFieldDecorator('Version')(
                <div>
                  <span style={{ marginRight: "20px" }}>
                    {
                      useage.productMsg&&useage.productMsg.length ?
                      useage.productMsg[0].key : null
                    }
                  </span>
                  <a 
                    style={{ color: "#0099e8", textDecoration: "underline", }}
                    onClick={() => router.push('/account/order')}
                  >
                    Details
                  </a>
                  {
                    !useage.productMsg || useage.productMsg.length&&useage.productMsg[0].key != 'mediabuy' ?
                    <a className="upgrage" onClick={() => router.push('/pay/payBuy')}>
                      Upgrade
                    </a> : null
                  }
                </div>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.lastlogin' })} {...formItemLayout}>
              {getFieldDecorator('lastLoginTime',{
                initialValue: userInfo.lastLoginTime
              })(
                <span>{moment(userInfo.lastLoginTime).format('YYYY.MM.DD')}</span>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.account.infoBasic.lable.lastloginip' })} {...formItemLayout}>
              {getFieldDecorator('lastIp')(
                <span>{userInfo.lastIp}</span>
              )}
            </FormItem>
            <Button 
              type="primary" 
              loading={this.props.loading}
              onClick={() => this.onSubmit()}
              className="usercenter-info-editbtn"
            >
              { isEdit ? null : <i className="iconfont icon-edit-square"></i>}
              { isEdit ? 'Save' : ' Edit'}
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}
export default Form.create()(Basic)