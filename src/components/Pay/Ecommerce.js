import React, { PureComponent } from 'react';
import { routerRedux } from 'dva/router'
import { Icon, Button, Row, Col } from 'antd';
import './styles.scss';
export default class Ecommerce extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    };
  }
  childCard(list, key) {
    return list.map((item) =>{
        const child = item.data.map((val,i) => (
          <div 
            key={`${Math.random()}childCard`}
            style={{ 
              background: i === 0 ? '#deedf5' : 'white',
              borderLeftWidth: val ? '1px' : '0px',
              height: i === 0 ? '32px' : '44px',
              lineHeight: i === 0 ? '32px' : val === 'Unlimited(Human Use Only)' ? 'auto' : '44px',
            }}
            className="product-info__listitem"
          >
            { val === 'check' || val === 'close' ? 
              <Icon type={val} style={{ color: val === 'check' ? '#2eabec' : '#ddd'}} /> : 
              val === 'Unlimited(Human Use Only)' ? <div style={{ lineHeight: '20px' }}>Unlimited<p>(Human Use Only)</p></div> : <span style={{ color: key === 0 && i !== 0 ? '#777' : '#444' }}>{val}</span>
            }
          </div>
        ))
        return child
    })
  }
  btnCard(productToShop,newUserBuyColumns){
    return  newUserBuyColumns.map((list,key) => {
        return (
          <Col className="product-info__list" span={6} key={`${Math.random()}btnCard`}>
            <div className="product-info__selectBtn" style={{ borderLeftColor: key === 0 ? '#ddd' : '#eee'}}>
              {
                list.isShowBtn ? 
                <Button 
                  disabled={!productToShop ? false : !productToShop.upgradeCodeList.includes(list.productCode)} 
                  size='large' 
                  type= 'primary' 
                  style={{ width: '140px' }} 
                  onClick={!productToShop ? () => this.handleClick(list.productCode) : () => this.handleClick(list.productCode, productToShop.opt)}
                >
                  { !productToShop ? 'Select' : productToShop.upgradeCodeList.includes(list.productCode)&&productToShop.opt !== 'buy' ? 'Upgrade' : 'Select'}
                </Button>
                : null
              }
            </div> 
          </Col>
        )
      })
  }
  handleClick(val, opt) {
    this.props.onSelectClick(val, opt)
  }
  render() {
    const { newUserBuyMonthlyProduct, newUserBuyColumns, user,instructions, productToShop } = this.props;
    const newUserBuyMonthlyProductCard = newUserBuyMonthlyProduct.map((item,key) => (
      <Col className="product-ecommerce__item" span={6} key={`${Math.random()}Monthly`}>
        <div className="plansName">{item.name}</div>
        <div>
          <span className="plansPrice">{item.unit}{item.price}</span>
          <span>{item.cycle != null ? ` / ${item.cycle}` : ''}</span>
        </div>
      </Col>
    ))
    const newUserBuyColumnsCard = newUserBuyColumns.map((list,key) => {
      return (
        <Col key={`${Math.random()}Columns`} className="product-info__list" span={6}>
          {this.childCard(list.content,key)}
        </Col>
      )
    })
    return (
      <div style={{ width: '100%' }}>
        <div style={{ width: '1200px', margin: '0 auto' }}>
          <Row className="product-ecommerce">
            {newUserBuyMonthlyProductCard}
          </Row>
          <Row className="product-info">
            {newUserBuyColumnsCard}
            {!user ? this.btnCard(false,newUserBuyColumns) : this.btnCard(productToShop,newUserBuyColumns)}
          </Row>
          <div className="instructions">
            <div className="instructionsTitle">
              <Icon 
                type="exclamation-circle" 
                style={{ fontSize: '16px', marginRight: '10px', color: '#eebf4e' }}
              />
              <span>Product instructions</span>
            </div>
            <div className="instructionsContent">
              {
                instructions.map((item, index) => {
                  return (
                    <div key={item.key}>
                      {item.message}
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
