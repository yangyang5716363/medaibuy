import { Form, Input, Button, Row, Col, Checkbox, Icon } from 'antd'
import React from 'react'
import Link from 'umi/link'
import cs from 'classnames'
import Vcode from './Vcode'
import { formatMessage } from 'umi-plugin-locale'
import { checkValCode } from '@/services/user'

const FormItem = Form.Item;

class LoginForm extends React.Component {
  componentDidMount() {
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.props.onSubmit(values)
      }
    });
  }
  VerificationCode = async (rule, value, callback) => {
    if (!value) {
      callback()
    } else {
      const res = await checkValCode({ valCode: value })
      if (!res.data) {
        callback('Verification code error')
      }
    }
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Inconsistent passwords');
    } else {
      callback();
    }
  }
  loginInputChange = () => {
    this.props.loginInputChange()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, title, isSignUp, loginError, randomCode,
      btnBottomText, btnText, link, errorMsg, loginInputChange,
    } = this.props;
    return (
      <div style={{ height: "calc(100vh - 132px)", padding: '0 10px' }}>
        <div className="login-container">
          <div 
            className={cs('login-container__flex', {
              'login-container__flex-register': isSignUp&&loginError
            })}
          >
            <div className="login-content">
              <h1 className="login-content__title">
                {formatMessage({ id: 'app.user.loginContentTitle' })}
              </h1>
              <p className="login-content__word">
                {formatMessage({ id: 'app.user.loginContent' })}
              </p>
            </div>
            <div>
              <div className="login-form">
                <div className="login-form__title">
                  <span>{title}</span>
                </div>
                {
                  loginError ?
                  <div className="login-form__error">
                    <Icon 
                      type={ isSignUp ? 'exclamation-circle' : "close-circle"} 
                      style={{ marginRight: "8px" }}
                    /> 
                      {errorMsg}
                  </div> : null
                }
                <div className="login-form__box">
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                      {getFieldDecorator('emailAddress', {
                        rules: [
                          { type: 'email', message: formatMessage({ id: 'app.user.invalidEmail' }) },
                          { required: true, message: formatMessage({ id: 'app.user.enterEmail' }) }
                        ],
                        validateTrigger: 'onBlur',
                      })(
                        <Input
                          onChange={loginInputChange ? () => this.loginInputChange() : null }
                          style={{ height: '40px' }} 
                          prefix={<i className="icon iconfont icon-mail-o" />} 
                          placeholder="E-mail address" 
                        />
                      )}
                    </FormItem>
                    {
                      !isSignUp ?
                      <FormItem>
                        {getFieldDecorator('password', {
                          rules: [
                            { required: true, message: formatMessage({ id: 'app.user.enterPassword' }) },
                          ],
                        })(
                          <Input 
                            onChange={loginInputChange ? () => this.loginInputChange() : null }
                            style={{ height: '40px' }} 
                            prefix={ <i className="icon iconfont icon-lock" /> } 
                            type="password" 
                            placeholder="Password" 
                          />
                        )}
                      </FormItem> : 
                      <FormItem style={{ marginBottom: "32px"}} colon={false}>
                        {getFieldDecorator('password', {
                          rules: [
                            { required: true, message: formatMessage({ id: 'app.user.enterPassword' }) },
                            { pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/, 
                              message: formatMessage({ id: 'app.user.setPassword' })
                            },                          
                          ],
                          validateTrigger: 'onBlur',
                        })(
                          <Input 
                            style={{ height: '40px' }} 
                            prefix={ <i className="icon iconfont icon-lock" /> } 
                            type="password" 
                            placeholder="Password" 
                          />
                        )}
                      </FormItem>
                    }
                    {
                      !isSignUp ? 
                      <FormItem>
                        {getFieldDecorator('valCode', {
                          validateFirst: true,
                          rules: [
                            { required: true, message: formatMessage({ id: 'app.user.enterVerificationCode' }) },
                            {/* { validator: this.VerificationCode }, */}
                          ],
                          //validateTrigger: 'onBlur'
                        })(
                          <div style={{ position: "relative"}}>
                            <Row gutter={16}>
                              <Col span={14}>
                                <Input
                                  onChange={loginInputChange ? () => this.loginInputChange() : null }
                                  style={{ height: '40px' }} 
                                  prefix={<i className="icon iconfont icon-security" />} 
                                  placeholder="Verification Code"
                                />
                              </Col>
                              <Col span={10}>
                                <Vcode url='/api_web/verify/code/login' randomCode={randomCode} />
                              </Col>
                            </Row>
                          </div>
                        )}
                      </FormItem> : 
                      <FormItem colon={false}>
                        {getFieldDecorator('repeatPassword', {
                          rules: [
                            { required: true, message: formatMessage({ id: 'app.user.enterPassword' }) },
                            { validator: this.compareToFirstPassword },
                          ],
                        })(
                          <Input 
                            style={{ height: '40px' }} 
                            type="password" 
                            placeholder="Repeat Password"
                            prefix={ <i className="icon iconfont icon-lock" /> } 
                          />
                        )}
                      </FormItem>
                    }
                    
                    {
                      !isSignUp ?
                      <FormItem style={{ marginBottom: "10px"}} className='forgotPassword'>
                        <Link to="/user/forgetPassword">
                            Forgot password ?
                        </Link>
                      </FormItem> : 
                      <FormItem className="login-form__agreement">
                        {getFieldDecorator('agreement', {
                          valuePropName: 'checked',
                          rules: [{
                            validator: (rule, value, callback) => {
                              if (value == false) {
                                callback(true);
                              }
                              callback();
                            },
                            message: formatMessage({ id: 'app.user.readeTrms' })
                          },
                          { required: true, message: formatMessage({ id: 'app.user.readeTrms' }) }],
                      })(
                          <Checkbox style={{ color: '#0099e8' }}>
                          <span style={{ color: '#777' }}>
                            I have read and accept
                          </span>
                          <a 
                            href="http://www.idvert.com/toc.html" 
                            target="_blank" 
                            style={{ color: '#0099e8' }}
                          > 
                            {'<Terms of Service>'} 
                          </a>
                          </Checkbox>
                      )}
                      </FormItem>
                    }
                    <FormItem className="login-form__btn">
                      <Button loading={loading} htmlType="submit">
                        <span>{btnText}</span>
                      </Button>
                    </FormItem>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: '#999999' }}>
                        {btnBottomText.left}&nbsp;&nbsp;
                        <Link style={{ color: '#0099e8' }} to={link}>
                            {btnBottomText.right}
                        </Link>
                      </span>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="login-form__tips">
                <span>Tips:</span>
                { isSignUp ? 
                  formatMessage({ id: 'app.user.registerTips' }) : 
                  formatMessage({ id: 'app.user.loginTips' })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(LoginForm);
