import React, { Component } from 'react';
import { Icon, Button, Checkbox, Popover } from 'antd';
import { connect } from 'dva';
// import jstz from 'jstz';
import './styles.scss';
import paypalAcitve from '@/assets/paypal-active.png';
import paypalNomral from '@/assets/paypal-nomral.png';

@connect(({ pay, loading }) => ({
  pay,
  orderDetailData: pay.orderDetailData,
  buyFlag: pay.buyFlag,
  loading: loading,
}))
export default class PayInfo extends Component {
  constructor (props) {
    super(props);
  }
  state = {
    isDisabled: true,
    paypalClick: true,
    creditClick: false,
  };
  onChange() {
    this.setState({ isDisabled: !this.state.isDisabled });
  }
  onPaypalClick() {
    this.setState({ paypalClick: true });
    this.setState({ creditClick: false });
  }
  onCreditClick() {
    this.setState({ paypalClick: false });
    this.setState({ creditClick: true });
  }
  goPaySuccess() {
    // const timezone = jstz.determine();
    this.props.dispatch({
      type: 'pay/planAgreement',
      payload: {
        orderNo: this.props.orderDetailData.orderNo,
        // timeZone: timezone.name(),
        timeZone: new Date().getTimezoneOffset()/60+'',
        buyFlag: this.props.buyFlag
      },
    });
  }
  render() {
    const { orderDetailData } = this.props;
    const popoverContent = (
      <div style={{width: '230px'}}>
        Please contact our Support Email 
        <a href="mailto:support@idvert.com"> support@idvert.com</a> or through the customer
        service system on the right corner.
      </div>
    )
    return (
      <div style={{ width: '100%' }}>
        <div className="payContent">
          <div className="payInfoTitle">Order Payment</div>
          <div className="payInfobox">
            {
              orderDetailData ?
                <div className="payInfoList">
                  <div className="payorder clear">
                    <Icon type='check-circle' className="checkCircle"/>
                    <span className="paySelected">
                      ${orderDetailData.stepFeePrice} for {orderDetailData.stepFeeCycleValue} days,&nbsp;&nbsp; 
                      automatic deducation every {orderDetailData.currencyCycle === 'Monthly' ? '30 days' : '360 days'}.
                      <br /> Please make the payment as soon as possible!
                    </span>
                    <p className="right">
                      <span style={{ marginRight: '20px' }}>Amounts:</span>
                      <span className="payPrice">${orderDetailData.stepFeePrice}</span>
                    </p>
                  </div>
                  <div className="payorder" style={{ paddingLeft: '70px' }}>
                    <p>Order Number: {orderDetailData.orderNo}</p>
                    <p>
                      Order Content: ${orderDetailData.stepFeePrice} for&nbsp;&nbsp; 
                      {orderDetailData.stepFeeCycleValue} days, automatic deducation every&nbsp;&nbsp; 
                      {orderDetailData.currencyCycle === 'Monthly' ? '30 days' : '360 days'}
                    </p>
                  </div>
                </div> : ''
            }
            <div className="payInfoList">
              <div className="payMethodTitle">Choose the payment method below to pay</div>
              { 
                !this.props.buyFlag &&
                  <div className={styles.payInfoTip}>
                    Please be noticed that after the upgrade the new plan will take effect immediately, 
                    the previous plan will automatically be unsubscribed and the payment charged already 
                    will not be able to refund, if you have further queries you can contact our customer 
                    service through <a href="mailto:support@idvert.com">support@idvert.com</a> or the support live chat on the right corner.
                  </div>
              }
              <div className="payMethod">
                <img 
                  src={this.state.paypalClick ? paypalAcitve : paypalNomral}
                  style={{verticalAlign: 'top'}} 
                />
                <Popover content={popoverContent}>
                  <Button 
                    style={{height: '54px', width: '256px', fontSize: '24px'}}
                  >
                    Other
                  </Button>
                </Popover>
              </div>
            </div>
            <div className="payInfoCheck">
              <div className="payInfoCheckList">
                <Checkbox onChange={() => this.onChange()}>
                  I agree the &lt;
                  <a target="_blank" href="http://www.idvert.com/toc.html">Terms of Use</a> 
                  &nbsp;&nbsp;and&nbsp;&nbsp; 
                  <a target="_blank" href="http://www.idvert.com/privacy.html">Privacy Policy</a>&gt;
                  </Checkbox>
              </div>
              <div className="payInfoCheckList">
                <Button 
                  className="payInfoButton" 
                  loading={this.props.loading.effects['pay/planAgreement']} 
                  onClick={() => this.goPaySuccess()} 
                  disabled={this.state.isDisabled} 
                  type='primary'
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
