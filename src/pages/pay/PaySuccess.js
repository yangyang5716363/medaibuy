import React, { Component } from 'react';
import { Icon, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import './styles.scss';
import qs from 'qs';
@connect(({ pay }) => ({
  pay,
}))
export default class PaySuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNo: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).orderNo,
    };
  }
  render() {
    return (
      <div style={{ width: '100%' }}>
        <div className="payCongratulationsbox">
          <div>
            <div>
              <Row gutter={16}>
                <Col span={6} className="checkCircleIcon">
                  <Icon type='check-circle' style={{verticalAlign:'top'}}/>
                </Col>
                <Col span={18}>
                  <div className="Congratulationsbox">
                    <p className="Congratulations">Congratulations, payment succeed!</p>
                    <p>Order Number: { this.state.orderNo }</p>
                    <div>
                      <Button type="primary" ghost style={{ marginRight: '20px' }}>
                        <a onClick={() => window.location.href = '/account/order'}>Check Order</a>
                      </Button>
                      <Button type="primary" ghost>
                        <a onClick={() => window.location.href = '/'} >Back Home</a>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
