import React, { PureComponent } from 'react'
import { formatMessage } from 'umi-plugin-locale'
import loginform from '@/assets/login_form.png'
import google from '@/assets/google.png'
import firefox from '@/assets/firefox.png'
import opera from '@/assets/opera.png'
import safari from '@/assets/safari.png'
export default class FormModal extends PureComponent{
  render(){
    const { showFormModal } = this.props
    return(
      <div className="userform-modal" style={{ display: showFormModal ? 'flex' : 'none' }}>
        <div className="userform-modal__content">
          <img src={loginform} />
          <div className="userform-modal__content-left">
            <h3>{formatMessage({ id: 'app.user.loginLimitTitle' })}</h3>
            <div className="left-word">
              {formatMessage({ id: 'app.user.loginLimitTips1' })}
            </div>
            <div className="left-word">
              {formatMessage({ id: 'app.user.loginLimitTips2' })}
            </div>
            <div className="left-pic">
              <img src={google} />
              <img src={firefox} />
              <img src={opera} />
              <img src={safari} />
            </div>
            <div className="left-word">
              {formatMessage({ id: 'app.user.loginLimitTips3' })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}