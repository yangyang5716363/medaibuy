import React, { Component } from 'react'
import { connect } from 'dva'
import Styles from './styles.scss'
import successImage from '@/assets/messagePageIcon1.png'
import errorImage from '@/assets/messagePageIcon2.png'
import qs from 'qs'

@connect(({ user }) => ({
  user,
  success: user.emailSuccess
}))
export default class RegisterSuccess extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      count: 5
    }
  }
  componentDidMount() {
    const { location, dispatch } = this.props
    let query = qs.parse(location.search, { ignoreQueryPrefix: true })
    const type = query.type == 'changeEmail' ? 'user/changeEmail' : 'user/emailActivation'
    const payload = query.type == 'changeEmail' ? { email: query.email, changeCode: query.code } : query
    dispatch({ type: type, payload: payload })
    .then(() => {
      this.timerLoop()
    })    
  }
  onRedirect() {
    const { history, location } = this.props
    history.push('/')
  }
  timerLoop = () => {
    if (this.state.count > 0) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setState({ 
          count: this.state.count - 1
        }, this.timerLoop)
      }, 1000)
    } else {
      this.onRedirect()
    }
  }
  render() {
    const { success } = this.props
    return (
      <div className="messageWarp">
        <div className="messageBox">
          <div className="messageIcon">
            <img src={success ? successImage : errorImage} alt="" />
          </div>
          <div className="messageDesc">
            <p className="messageInfo">
              {
                success ? 'Congratulations, email verification was successfully!'
                : 'The activation link has invalid. Please resend the activation email.'
              }
            </p>
            <p>
              You will automatically return to the ads samples page after
              {this.state.count}
              s
            </p>
          </div>
        </div>
      </div>
    )
  }
}