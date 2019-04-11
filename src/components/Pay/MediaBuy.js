import React, { PureComponent } from 'react';
import { routerRedux } from 'dva/router'
import { Icon, Button } from 'antd';
import mediabuy from '@/assets/mediabuy.png'
import './styles.scss';
export default class MediaBuy extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    };
  }
  mediaInit = (data) => {
    return Object.keys(data).map(k => (
      <div key={k} className="product-media__info">
        <h2>{k}</h2>
        <span>{data[k]}</span>
      </div>
    ))
  }
  handleClick(val, opt) {
    this.props.onSelectClick(val, opt)
  }
  render() {  
    const { instructions, productToShop, media } = this.props 
    return (
      <div style={{ width: '100%' }}>
        <div style={{ width: '1400px', margin: '0 auto' }}>
          <div className="product-media">
            <img src={mediabuy} className="product-media-img"/>
            <div className="product-media-left">
              <div className="product-media-left__pirce">
                <span>{media.price}</span>
                <span className="product-media-left__pirce-unit">{media.unit}</span>
              </div>
              <div>{this.mediaInit(media.info)}</div>
              <Button 
                  disabled={!productToShop ? false : !productToShop.upgradeCodeList.includes(media.productCode)} 
                  size='large' 
                  type= 'primary' 
                  style={{ width: '140px' }} 
                  onClick={!productToShop ? () => this.handleClick(media.productCode) : () => this.handleClick(media.productCode, productToShop.opt)}
                >
                { !productToShop ? 'Select' : productToShop.upgradeCodeList.includes(media.productCode)&&productToShop.opt !== 'buy' ? 'Upgrade' : 'Select'}
              </Button>
            </div>
          </div>
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
