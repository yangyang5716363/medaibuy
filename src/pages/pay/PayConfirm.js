import React, { Component } from 'react';
import {  Row, Col, Button } from 'antd';
import { connect } from 'dva';
import withRouter from 'umi/withRouter'
import router from 'umi/router';
import moment from 'moment';
import './styles.scss';
import payConfirmIcon from '@/assets/messagePageIcon3.png';

@withRouter
@connect(({ user, pay }) => ({
  payConfirmData: pay.payConfirmData,
  planId: pay.planId,
  pcode: pay.pcode,
  buyFlag: pay.buyFlag,
}))
export default class PayConfirm extends Component {
  constructor (props) {
    super(props);
  }
  goPayInfo() {
    const { planId, pcode, buyFlag } = this.props
    const planIdStr = planId && planId !== undefined ? `planId=${planId}` : ''
    const pcodeStr = pcode && pcode !== undefined ? `pcode=${pcode}` : ''
    const str = pcode && pcode !== undefined && planId && planId !== undefined ? '&' : ''
    const payload = `${planIdStr}${str}${pcodeStr}`
    router.push(`/pay/payInfo?${payload}&buyFlag=${buyFlag}`)
  }
  render() {
    const { payConfirmData } = this.props;
    return (
      <div style={{ width: "1200px", margin: "0 auto" }}>
        <div className="payConfirmTitle">Select Your Plan Subscription</div>
        <div className="payConfirmbox">
          <div className="payConfirmContent">
            <Row style={{ borderBottom: '1px solid #eee', paddingBottom: '50px' }}>
            <Col span={6} style={{ marginRight: '50px'}}>
                <div className="payConfirmContent3">
                  <div className="payConfirmContent3Title">
                    <p>{payConfirmData.productName}</p>
                    <span>{payConfirmData.currencyCycle} Subscription</span>
                  </div>
                  <div className="payConfirmContent3Icon">
                    <img src={payConfirmIcon} alt="" />
                  </div>
                </div>
              </Col>
              <Col span={16}>
                <div className="payConfirmContent1">
                  <div className="payConfirmContent1List">
                    <label>Your Account:</label>
                    <span>{payConfirmData.account}</span>
                  </div>
                  <div className="payConfirmContent1List">
                    <label>Account Type:</label>
                    <span>Recurring plan for ${payConfirmData.currencyPrice} for every {payConfirmData.currencyCycle === 'Monthly' ? '30 days' : '360 days'}</span>
                  </div>
                  <div className="payConfirmContent1List">
                    <label>Billing Frequency:</label>
                    <span>Every {payConfirmData.currencyCycle === 'Monthly' ? '30 days' : '360 days'}</span>
                  </div>
                  <div className="payConfirmContent1List">
                    <label>Starting Date：</label>
                    <span>{moment(new Date().getTime()).format('YYYY-MM-DD')}</span>
                  </div>
                  <div className="payConfirmContent1List">
                    <label>Estimate Billing Date：</label>
                    <span>{moment(payConfirmData.nextBillingTime).format('YYYY-MM-DD')}</span>
                  </div>
                  <div className="payConfirmContent1List">
                    <label>Next Billing Amount：</label>
                    <span>${payConfirmData.currencyPrice}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="payConfirmPrice">
            <div className="payConfirmPriceList clear">
              <p className="clear right">
                <span>{payConfirmData.currencyCycle} Plan:</span>
                <span>${payConfirmData.currencyPrice}</span>
              </p>
            </div>
            <div className="payConfirmPriceList">
              <p className="payConfirmTotalPrice">
                <span>Total:</span>
                <span>${payConfirmData.stepFeePrice}</span>
              </p>
            </div>
          </div>
          <div className="payConfirmSelectBtn">
            <Button 
              className="right" 
              type='primary' 
              size='large' 
              onClick={() => this.goPayInfo()}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
