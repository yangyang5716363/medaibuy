import React, { PureComponent } from 'react'
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { statusData } from './config'
import { Col, Row, Button, Modal, Spin, Icon } from 'antd';
import './styles.scss'

const confirm = Modal.confirm
@connect(({ loading, order }) => ({
  effects: loading.effects,
  order,
  subStatus: order.subStatus,
}))

export default class Order extends PureComponent {
  constructor(props){
    super(props)
  }
  goDetail(orderNo) {
    if (!orderNo) {
      return 0;
    }
    this.props.dispatch(routerRedux.push('/account/order/detail?orderNo=' + orderNo));
  }
  showConfirm = (orderNo, index) => {
    let _this = this
    confirm({
      title: 'Cancel Subscription plan now？',
      content: 'After the cancellation, the next month will revert to the registered user status, unable to view more content.',
      onOk() {
        _this.props.dispatch(routerRedux.push(`/common/unsubscribe?orderNo=${orderNo}`))
      },
      onCancel() {
      },
    });
  }
  orderCancelClick = (orderNo) => {
    console.log(orderNo)
    this.props.dispatch({
      type: 'order/orderCancel',
      payload: { orderNo: orderNo },
    });
  }
  continuePayClick = (orderNo) =>  {
    this.props.dispatch({
      type: 'order/continuePay',
      payload: { orderNo: orderNo },
    });
  }
  PayNowhandleClick = (val) => {
    this.props.dispatch(routerRedux.push(`/pay/PayInfo?orderNo=${val}`));
  }
  orderlistFun = (item, statusData, dingyue2, isHasPaying) => {
    return (
      <div key={item.orderNo} className={item.orderPayType === 1 ? "listItem" : "subOrdersListItem" }>
        <Row className="itemTime">
          <Col span={12}>
            <div>
              <span className="span1">{moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              <span className="span2">Order number: {item.orderNo}</span>
            </div>
          </Col>
        </Row>
        <div className="itemInfo" style={{ paddingRight: '272px', position: 'relative' }}>
          <Row style={{ width: '100%' }}>
            <Col className="orderName" span={12}>
              {item.orderContent}-
              { item.orderPayType === 2 ? 
                dingyue2 ? ` ${item.secondCycleUnit}` : ` ${item.firstCycleValue} ${item.firstCycleUnit}` : 
                ` ${item.cycleValue} ${item.cycleUnit}`
              }
            </Col>
            <Col className="orderAmountTotal" span={3}>{item.paymentSystem}</Col>
            <Col className="paymentTime" span={5} style={{ whiteSpace: 'nowrap' }}>
              {moment(item.paymentTime).format('YYYY-MM-DD HH:mm:ss')}
            </Col>
            <Col className="orderAmountTotal" span={4}>
              {item.currency === 2 ? '$' : '¥'} {item.actualAmount}
            </Col>
          </Row>
          <Row style={{ width: '272px', right: '0', position: 'absolute', top: '0' }}>
            <Col className="status" span={4}>
              <p className="statusP1" style={{ lineHeight: '80px' }} data-success={item.status === 2}>
                {item.status === 0 && item.subStatus && item.subStatus === 3 ? 'Paying' : statusData[item.status]}
              </p>
            </Col>
            <Col className="operating" span={4}>
              {item.status === 1 ?
                <div>
                  <p>
                    <a href="javascript:void(0)" onClick={() => this.continuePayClick(item.orderNo)}>
                    Continue payment
                    </a>
                  </p>
                </div> : ''}
              {item.status === 0 && item.subStatus && item.subStatus !== 3 ?
                <div>
                  <p style={{ height: '40px', lineHeight: '50px', marginBottom: '0' }}>
                    <Button 
                      type='primary' 
                      disabled={isHasPaying} 
                      onClick={() => this.PayNowhandleClick(item.orderNo)}
                    >
                      Pay Now
                    </Button>
                  </p>
                  <p style={{ height: '40px', lineHeight: '40px', marginBottom: '0' }}>
                    <a href="javascript:void(0)" onClick={() => this.orderCancelClick(item.orderNo)}>Cancel</a>
                  </p>
                </div> : ''
              }
            </Col>
          </Row>
        </div>
      </div>
    )
  }
  render(){
    const { effects, order }= this.props
    const { orderList, isHasPaying, isShowTips } = order
    console.log(orderList,isShowTips)
    return(
      <Spin spinning={!!effects['order/orderList']} wrapperClassName="orderloading">
        <div className="usercenter">
          <div className="usercenter-header usercenter-headeshadow">Order Center</div>
          <div className="usercenter-container">
            <div style={{ background: 'white' }}>
              <div className="usercenter-container__header">Order List</div>
            </div>
            <div className="usercenter-container__content" style={{ background: "white" }}>
              {
                isShowTips ?
                  <div className="listTips">
                    <Icon type="info-circle" theme="outlined" />
                    <span>
                    If your account status is still paying after the payment, please clean&nbsp;&nbsp;
                    your browser cache and refresh the page in case of internet delay
                    </span>
                  </div> : null
              }
              <div>
                {
                  orderList.length ? 
                  orderList.map((item, index) => {
                    if (item.orderPayType === 1) {
                      return this.orderlistFun(item, statusData, false, isHasPaying);
                    } else if (item.orderPayType === 2) {
                      return (
                        <div className="subOrders" key={Math.random()*10000}>
                          <div className="subOrdersListheader">
                            <Row>
                              <Col span={12}>
                                <div className="div1">{item.orderContent}</div>
                                <div className="div2">
                                  {item.currency === 2 ? '$' : '¥'}
                                  {item.firstCyclePrice} for the first {item.firstCycleValue}&nbsp;&nbsp;
                                  {item.firstCycleUnit}, subsequently with {item.currency === 2 ? '$' : '¥'}
                                  {item.secondCyclePrice} for every {item.secondCycleUnit === 'month' ? '30 days' : '360 days'}
                                </div>
                              </Col>
                              <Col style={{ textAlign: 'right', lineHeight: '80px' }} span={12}>
                                { (item.subStatus != 2 && item.subStatus != 3) ?
                                  <Button 
                                    disabled={this.props.subStatus[index].subStatus === 1 ? false : true} 
                                    type="danger" 
                                    ghost 
                                    onClick={() => this.showConfirm(item.orderNo,index)}
                                  >
                                    {this.props.subStatus[index].text}
                                  </Button>
                                  : ''
                                }
                              </Col>
                            </Row>
                          </div>
                          <div className="subOrdersListTitle">
                            <Row style={{ width: '100%' }}>
                              <Col span={12}>Order content</Col>
                              <Col span={3}>Payment System</Col>
                              <Col span={5}>Payment time</Col>
                              <Col span={4}>Actual amount</Col>
                            </Row>
                            <Row style={{ width: '272px', right: '0', position: 'absolute', top: '0' }}>
                              <Col style={{ width: '136px', textAlign: 'center' }} span={4}>Status</Col>
                              <Col style={{ width: '136px', textAlign: 'center' }} span={4}>Operating</Col>
                            </Row>
                          </div>
                          {this.orderlistFun(item, statusData, false, isHasPaying)}
                          {item.subOrders && item.subOrders.length > 0 && item.subOrders.map((val, i) => {
                            return this.orderlistFun(val, statusData, true, isHasPaying)
                          })}
                        </div>
                      )
                    }
                  }) : null
                }
              </div>
            </div>
          </div>
        </div>
      </Spin>
      
    )
  }
}