import React, { PureComponent } from 'react'
import { Button, Icon, Row, Col, Table, Spin } from 'antd'
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { connect } from 'dva';
import { statusData } from './config'
import './styles.scss'

@connect(({ loading, user, order }) => ({
  effects: loading.effects,
  user,
  order
}))

export default class OrderDetail extends PureComponent {
  constructor(props){
    super(props)
  }
  goback = () => {
    this.props.dispatch(routerRedux.goBack())
  }
  initTable = (data) => {
    let configMap;
    if (data && data.orderNo) {
      configMap = JSON.parse(data.orderDetailVOList[0].productDTO).configMap;
    }
    const newArr = []
    if (configMap) {
      for (const i in configMap) {
        const itemArray = configMap[i];
        itemArray.forEach((item) => {
          const obj = {};
          obj.itemNameEn = item.itemNameEn;
          obj.itemValue = item.itemValue;
          newArr.push(obj);
        });
      }
    }
    return newArr
  }
  render(){
    const { effects, order } = this.props
    const { orderDetail } = order
    const columns = [{
      title: 'Product item',
      dataIndex: 'itemNameEn',
      key: 'itemNameEn',
    }, {
      title: 'Monthly total',
      dataIndex: 'itemValue',
      key: 'itemValue',
    }]
    return(
      <Spin spinning={!!effects['order/orderInfo']} wrapperClassName='why'>
      <div className="usercenter">
        <div className="usercenter-header">Order Center</div>
        <div className="usercenter-container">
          <div style={{ background: 'white' }}>
            <div className="usercenter-container__header">
              Order Detail
              <Button onClick={() => this.goback()} style={{ marginLeft: "20px" }} size="small">
                <Icon type="rollback" />Return
              </Button>
            </div>
            <div className="usercenter-container__content">
              <div style={{ border: "1px solid #eee", marginBottom: "24px" }}>
                <div className="usercenter-container__infotitle">
                  <span style={{color:'#777'}}>
                    Order number: 
                    <span style={{color:'#444'}}>{orderDetail&&orderDetail.orderNo}</span>
                  </span>                   
                  <span style={{ marginLeft: '15px',color:'#777' }}>
                    Order time: 
                    <span style={{color:'#444'}}>
                      {moment(orderDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                  </span>
                </div>
                <Row className="usercenter-container__head">
                  <Col span={6}>OrderContent</Col>
                  <Col span={2}>Use time</Col>
                  <Col span={4}>Payment time</Col>
                  <Col span={3}>Product price</Col>
                  <Col span={4}>Conversion amount</Col>
                  <Col span={3}>Amount amount</Col>
                  <Col span={2}>Status</Col>
                </Row>
                <Row className="usercenter-container__data">
                  <Col span={6}>OrderContent</Col>
                  <Col span={2}>{orderDetail.orderDetailVOList && orderDetail.orderDetailVOList[0].number}</Col>
                  <Col span={4}>{moment(orderDetail.paymentTime).format('YYYY-MM-DD HH:mm:ss')}</Col>
                  <Col span={3}>{orderDetail.productAmountTotal}</Col>
                  <Col span={4}>{orderDetail.discountAmount}</Col>
                  <Col span={3}>{orderDetail.orderAmountTotal}</Col>
                  <Col span={2}>{statusData[orderDetail.orderStatus]}</Col>
                </Row>
              </div>
              <div className="usercenter-container__platinumInfo">
                <p>Platinum infomation</p>
                {
                  orderDetail ? 
                    <Table
                      rowKey={(record, index )=> index}
                      pagination={false} 
                      dataSource={this.initTable(orderDetail)} 
                      columns={columns} 
                    /> : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      </Spin>
    )
  }
}