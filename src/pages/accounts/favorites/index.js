import React, { PureComponent } from 'react'
import { Tabs }  from 'antd'
import { connect } from 'dva'
// import Card from '@/components/Card'
// import WaterWall from '@/components/WaterWall'
// import Scroll from '@/utils/scroll'
import Offers from './Offers'
import Ad from './Ad.js'
import './styles.scss'
const TabPane = Tabs.TabPane

@connect(({ loading, user, usercenter }) => ({
  effects: loading.effects,
  usercenter,
  user
}))
export default class Favorites extends PureComponent {
  render(){
    return(
      <div className="usercenter">
        <div className="usercenter-header">Favorites</div>
        <Tabs className="usercenter-contenerTap" defaultActiveKey='1'>
          <TabPane tab="Offers" key="1">
            <Offers />
          </TabPane>
          <TabPane tab="Ads Samples" key="2">
            <Ad />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}