import React, { PureComponent } from 'react'
import { Table, Spin } from 'antd';
import router from 'umi/router';
import moment from 'moment'
import copy from 'copy-to-clipboard'
import './styles.scss'
export default class ChannerUser extends PureComponent {
  constructor(props){
    super(props)
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  onTableChange = (pagination, filters, sorter) => {
    this.props.onTableChange(pagination, filters, sorter, 'usercenter/channelUserList')
  }
  onCopy = (url) => {
    copy(url, {
      debug: true,
      message: 'Press #{key} to copy',
    });
  }
  render(){
    const { channelUserList, channelUserPagination, effects, channelUserCount, user } = this.props
    const columns = [
      { title: 'User Name', dataIndex: 'username' }, 
      { title: 'Email', dataIndex: 'email' }, 
      { title: 'Register Time', dataIndex: 'createLongTime',
        render(text){
          return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-'
        }
      }, 
      { title: 'Active Time', dataIndex: 'activityTime',
        render(text){
          return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-'
        }
      }, 
      { title: 'Product', dataIndex: 'product' }
    ]
    const url = window.location.origin + '/user/registerChannel?inviteId=' + user.userInfo.memberId
    return(
      <Spin spinning={!!effects['usercenter/channelUserList']}>
      <div style={{ padding: "0 24px" }}>
        <div className="channel-content" style={{ background: "white", padding: "24px 0" }}>
          <div className='channel-content__header'>
            <p>Channel Register Url</p>
            <div className='channel-content__flex'>
              <div>
                <input readOnly value={`${url}`}/>
                <button onClick={() => this.onCopy(url)}>
                  Copy
                </button>
              </div>
              <div>
                <h4 className="paddingRow" style={{ display: "inline-block" }}>Register</h4>
                <span className="paddingRow">
                  Today: {channelUserCount ? channelUserCount.dayCount : null}
                </span>
                <span className="paddingRow">
                  This Week: {channelUserCount ? channelUserCount.weekCount : null}
                </span>
                <span className="paddingRow">
                  This Month: {channelUserCount ? channelUserCount.monthCount : null}
                </span>
                <span className="paddingRow">
                  Total: {channelUserCount ? channelUserCount.totalCount : null}
                </span>
              </div>
            </div>
          </div>
          <Table 
            rowKey={(record, index )=> index}
            dataSource={channelUserList}
            columns={columns}
            onChange={this.onTableChange}
            pagination={{
              ...channelUserPagination,
              showTotal: total => `共 ${total} 条数据，每页显示 ${channelUserPagination.pageSize}条`
            }}
          />
        </div>
      </div>
      </Spin>
    )
  }
}
