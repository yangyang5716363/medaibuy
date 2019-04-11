import React, { PureComponent } from 'react'
import { Tabs } from 'antd'
import { connect } from 'dva'
import ChannelUser from './ChannelUser'
import ChannelOrder from './ChannelOrder'
import './styles.scss'
const TabPane = Tabs.TabPane

@connect(({ loading, user, usercenter }) => ({
  effects: loading.effects,
  usercenter,
  user
}))
export default class ChannelManage extends PureComponent {
  constructor(props){
    super(props)
    this.state={
    }
  }
  userTableChange = (pagination, filters, sorter, type) => {
    const { dispatch} = this.props
    dispatch({ 
      type: type, 
      payload:{ 
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      } 
    })
  }
  render(){
    const { usercenter, effects, user } = this.props
    const { channelUserList, channelUserPagination, channelUserCount, 
      channelOrderList, channelOrderPagination, channelOrderCount,  
    } = usercenter
    const channelUserProps={
      channelUserList,
      channelUserPagination,
      effects,
      channelUserCount,
      user
    }
    const channelOrderProps={
      channelOrderList,
      channelOrderPagination,
      effects,
      channelOrderCount
    }
    return(
      <div className="usercenter">
        <div className="usercenter-header">Channel Manage</div>
        <div style={{ height: "100%", overflowY: "auto", position: "relative" }}>
        <Tabs className="usercenter-contenerTap" defaultActiveKey='1'>
          <TabPane tab="Channel User" key="1" style={{ background: "none", margin: "8px 0" }}>
            <ChannelUser {...channelUserProps} onTableChange={this.userTableChange}/>
          </TabPane>
          <TabPane tab="Channel Order" key="2" style={{ background: "none", margin: "8px 0" }}>
            <ChannelOrder {...channelOrderProps} onTableChange={this.userTableChange}/>
          </TabPane>
        </Tabs>
        </div>
        
      </div>
    )
  }
}