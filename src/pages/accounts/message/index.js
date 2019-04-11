import React, { Component } from 'react'
import { connect } from 'dva'
import lodash from 'lodash'
import { Pagination, Spin } from 'antd'
import './styles.scss'
@connect(({ loading, message }) => ({
  effects: loading.effects,
  message,
  list: message.list,
  pageNo: message.pageNo,
  pageSize: message.pageSize,
  total: message.total,
}))
export default class MessageManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  handleFold = (index, read) => {
    const { list, dispatch } = this.props
    !read&&console.log('no read')
    const clone = lodash.clone(list)
    clone.forEach((item, i) => {
      item.fold = index === i ? !item.fold : item.fold
      item.read = index === i ? true : item.read
    });
    dispatch({
      type: 'message/updateState',
      list: clone
    })
  }
  onChange = (pagetion) => {
    this.props.dispatch({
      type: 'message/updateState',
      pageNo: pagetion
    })
  }
  render() {
    const { list, pageNo, pageSize, total } = this.props
    return (
      <div className="usercenter">
        <div className="usercenter-header usercenter-headeshadow">Message Manger</div>
        <div className="usercenter-message">
          <div className="usercenter-message-content">
            <div className="usercenter-message-content-header">
              Message List
            </div>
            <Spin tip="Loading..." spinning={false}>
            <div className="listcontent">
              {
                list.map( (item, index) => {
                  return(
                    <div className="usercenter-message-list" data-read={item.read} key={index}>
                      <div className="messageTitleDate">
                        <span className="messageTitle">{item.title}</span>
                        <span className="messageDate">{item.date}</span>
                      </div>
                      <div className="messageInfobox">
                        <div className="messageInfoContent" data-fold={item.fold}>
                          {item.text}                        
                        </div>
                      </div>
                      <a href='javascript:;' 
                        data-fold={item.fold}
                        className="message-seemore" 
                        onClick={() => this.handleFold(index, item.read)}>
                        {item.fold ? 'See More' : 'Hide'}
                      </a>
                    </div>
                  )
                })
              }
            </div>
            {
              pageSize > 1 && (
              <div className="usercenter-message-pagination">
                <Pagination 
                  defaultCurrent={pageNo} 
                  total={list.length} 
                  onChange={(pagetion) => this.onChange(pagetion)}
                />
              </div>
              ) 
            }
            </Spin>
          </div>
        </div>
      </div>
    )
  }
}
