import React, { PureComponent } from 'react'
import { Tabs } from 'antd';
import { connect } from 'dva'
import Basic from './Basic'
import Security from './Security'
import './styles.scss'
const TabPane = Tabs.TabPane;

@connect(({ loading, user, usercenter }) => ({
  effects: loading.effects,
  user,
  usercenter
}))
export default class Account extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      isEdit: false,
      defaultActiveKey: '1',
      tab1Name: 'active'
    }
  }
  onBasicSubmit = (data) => {
    if(!this.state.isEdit){
      this.setState({
        isEdit: true
      })
    } else {
      this.props.dispatch({
        type: 'usercenter/updateInfo',
        payload: data
      }).then(
        this.setState({
          isEdit: false
        })
      )
    }
  }
  onTabChange = () => {
    this.setState({
      defaultActiveKey: '2'
    })
  }
  render(){
    const { isEdit } = this.state
    const { user, effects, usercenter, dispatch } = this.props
    const { securityPasswordVisible, securityEmailVisible, securityQuestionVisible,
      securityQuestionData
    } = usercenter
    const SecurityItem = {
      securityPasswordVisible, securityEmailVisible, securityQuestionVisible,
    }
    return(
      <div className="usercenter">
        <div className="usercenter-header">Account Information</div>
        <div style={{ height: "100%", overflowY: "auto", position: "relative", marginTop: "-2px" }}>
        <Tabs 
          className="usercenter-content usercenter-contenerTap"
          onTabClick={key => this.setState({ defaultActiveKey: key })}
          activeKey={this.state.defaultActiveKey}
        >
          <TabPane tab="Basic Information" key="1" style={{ background: "none", margin: "8px 0" }}>
            <Basic 
              userInfo={user.userInfo}
              isEdit={isEdit} 
              loading={ isEdit ? effects['usercenter/updateInfo'] : null}
              onSubmit={this.onBasicSubmit}
              onTabChange={this.onTabChange}
            />
          </TabPane>
          <TabPane tab="Security Settings" key="2" style={{ background: "none", margin: "8px 0" }}>
            <Security
              userInfo={user.userInfo} 
              item={SecurityItem} 
              dispatch={dispatch} 
              effects={effects}
              securityQuestionData={securityQuestionData}
            />
          </TabPane>
        </Tabs>
        </div>
        
      </div>
    )
  }
}