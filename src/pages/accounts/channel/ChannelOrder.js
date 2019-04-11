import React, { PureComponent } from 'react'
import { Table, Spin } from 'antd';
import moment from 'moment'
import './styles.scss'
export default class ChannerOrder extends PureComponent {
  constructor(props){
    super(props)
  }
  onTableChange = (pagination, filters, sorter) => {
    this.props.onTableChange(pagination, filters, sorter,'usercenter/channelOrderList')
  }
  render(){
    const { channelOrderList, channelOrderPagination, effects,channelOrderCount } = this.props
    const statusObj={
      2: 'successful',
      8: 'Canceled',
      0: 'Unpaid',
      1: 'Paying',
      3: 'Failed',
      4: '退款申请中',
      5: '部分退款',
      6: '全部退款',
      9: 'Expired',
    }
    const columns = [
      { title: 'Order Number', dataIndex: 'orderNo'}, 
      { title: 'Email', dataIndex: 'email' }, 
      { title: 'Order Content', dataIndex: 'orderContent' }, 
      { title: 'Order Time', dataIndex: 'orderTime',
        render(text) {
          return text ? moment(Number(text)).format('YYYY-MM-DD HH:mm:ss') : null
        },
      }, 
      { title: 'Payment System', dataIndex: 'payTypeEnName', 
        render(text) {
          return text ? <span>{text}</span> : '-'
        },
      }, 
      { title: 'Payment Time', dataIndex: 'paymentTime', 
        render(text) {
          return text ? moment(Number(text)).format('YYYY-MM-DD HH:mm:ss') : null
        }
      }, 
      { title: 'Actual Amount', dataIndex: 'showOrderAmountTotal',
        render(text, record) {
          if (record.payUnit === 1) {
            return <span>￥ {text}</span>
          } else if (record.payUnit === 2) {
            return <span>$ {text}</span>
          } else if (!record.payUnit) {
            return <span>{text}</span>
          }
        },
      }, 
      { title: 'Status', dataIndex: 'orderStatus',
        render(text) {
          return statusObj[text]
        },
      }
    ];
    return(
      <Spin spinning={!!effects['usercenter/channelOrderList']}>
        <div style={{ padding: "0 24px" }}>
          <div className="channel-content" style={{ background: "white", padding: "24px 0" }}>
            <div className='channel-content__header' style={{ textAlign: "right" }}>
              <div>
                <h4 className="paddingRow">Order</h4>
                <span className="paddingRow">Today: {channelOrderCount.dayCount}</span>
                <span className="paddingRow">This Week: {channelOrderCount.weekCount}</span>
                <span className="paddingRow">This Month: {channelOrderCount.monthCount}</span>
                <span className="paddingRow">Total: {channelOrderCount.totalCount}</span>
              </div>
            </div>
            <Table 
              rowKey={(record, index )=> index}
              dataSource={channelOrderList}
              columns={columns}
              onChange={this.onTableChange}
              pagination={{
                ...channelOrderPagination,
                showTotal: total => `共 ${total} 条数据，每页显示 ${channelOrderPagination.pageSize}条`
              }}
            />
          </div>
        </div>
      </Spin>
    )
  }
}
