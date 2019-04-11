import React, { PureComponent } from 'react'
import qs from 'qs'
import { Button } from 'antd'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import router from 'umi/router'
import Ecommerce from '@/components/Pay/Ecommerce'
import MediaBuy from '@/components/Pay/MediaBuy'
import {newUserBuyMonthlyProduct,newUserBuyColumns,instructions, media} from './config'
import './styles.scss'
const source = qs.parse(location.search, { ignoreQueryPrefix: true }).source
@withRouter
@connect(({ loading, user, pay }) => ({
  effects: loading.effects,
  user,
  pay
}))
export default class Pay extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      active: !source || source === 'mediabuy' ? true : false,
    }
  }
  onTabChange = (type) => {
    this.setState({
      active: type === 'MediaBuy' ? true : false
    })
  }
  onSelectClick = (val, opt) => {
    if(!localStorage.getItem('authorization')){
      router.push(`/user/login`)
      return 0;
    }
    const buyFlag = opt === 'buy' ? 'true' : 'false'
    if(opt === 'buy'){
      this.props.dispatch({
        type: 'pay/planValidate',
        payload:{
          pcode: val,
          buyFlag: buyFlag
        }
      })
    } else{
      router.push(`/pay/payConfirm?pcode=${val}&buyFlag=${buyFlag}`)
    }
  }
  render(){
    const { active } = this.state
    const { user, pay } = this.props
    const { productToShop } = pay
    return(
      <div style={{ height: "100%", overflowY: "auto" }}>
      <div className="pay">
        <div className="pay-title">
          <div>
            Pricing & Features
          </div>
        </div>
        <div className="pay-tab">
          {/* <Button 
            size='large'
            type='primary' 
            ghost={ active ? false : true }
            onClick={() => this.onTabChange('MediaBuy')}
            style={{ borderRight: "0 none", borderRadius: "4px 0 0 4px" }}
          >
            MediaBuy
          </Button>
          <Button 
            size='large'
            type='primary' 
            ghost={ !active ? false : true }
            onClick={() => this.onTabChange('E-commerce')}
            style={{ borderLeft: "0 none", borderRadius: "0 4px 4px 0" }}
          > E-commerce</Button> */}
        </div>
        {
          true ? 
          <MediaBuy 
            instructions={instructions}
            productToShop={productToShop}
            media={media}
            onSelectClick={this.onSelectClick}
          />: 
          <Ecommerce 
            newUserBuyMonthlyProduct={newUserBuyMonthlyProduct}
            newUserBuyColumns={newUserBuyColumns}
            instructions={instructions}
            productToShop={productToShop}
            user={user}
            onSelectClick={this.onSelectClick}
          />
        }
      </div>
      </div>
    )
  }
}