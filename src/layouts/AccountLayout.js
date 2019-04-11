import React, { PureComponent } from 'react'
import NProgress from 'nprogress'
import withRouter from 'umi/withRouter'
import router from 'umi/router';
import moment from 'moment'
import { connect } from 'dva'
import { Layout, ConfigProvider } from 'antd'

import NoData from '@/components/NoData'
import Header from '@/components/Header'
import AccountInfo from '@/components/AccountInfo'
import { getUCMenuData } from './UserCenterMenu'
import SiderMenu from '@/components/SiderMenu'
import { clearPersist, deepAt } from '@/utils'
NProgress.configure({ showSpinner: false })

@withRouter
@connect(({ app, user, loading }) => ({
  app,
  loading,
  userInfo: user.userInfo,
}))
export default class  AccountLayout extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      layoutElement: null,
      isShowMenu: this.props.location.pathname.split('/')[1] === 'account' ? true : false
    }
    this.currHref = '';
  }
  onPromise = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { title: 'Offers', name: 'adultNum', value: 12 },
          { title: 'Fb Creatives', name: 'fbNum', value: 31 },
          { title: 'Native Creatives', name: 'nativeNum', value: 8 },
          { title: 'Offer Creatives', name: 'offerNum', value: 16 },
        ])
      }, 2000)
    })
  }
  onLogoutClick = () => {
    const { location, dispatch } = this.props
    // clearPersist()
    dispatch({ type: 'user/logout' })
  }
  locationListen = () => {
    this.setState({
      isShowMenu: this.props.location.pathname.split('/')[1] === 'account' ? true : false
    })
  }
  goPage= (item) => {
    this.props.dispatch(routerRedux.push({
      pathname: `/${item.path}/index`,
    }))
  }

  render() {
    const { children, location, userInfo } = this.props;
    const getProductMsg = deepAt(userInfo, 'useage.productMsg')
    let productMsgData = getProductMsg&&getProductMsg.map( item => {
      return { 
        name: item.key, 
        time: moment(item.value).format('YYYY-MM-DD'),
        isUpGrade: item.key === 'MediaBuy' ? false : true,
        to: '/pay/payBuy'
      }
    })
    const accountOption = [
      { icon: 'user', text:'User Center', to: '/account/info' }, 
      { icon: 'collection-o', text:'Favourites', to: '/account/favorites' }, 
      { icon: 'power', text:'Logout', click: this.onLogoutClick }
    ]
    return (
      <ConfigProvider
        getPopupContainer={trigger => trigger.parentNode}
        renderEmpty={() => (<NoData />)}
      >
      <div className="basic-layout">
        <div className="basic-layout__header">
          <Header
            navigation={[
              { name: 'Home', to: '/home'},
              { name: 'Offers', to: '/offer' },
              { name: 'Ads Samples', to: '/samples?domainName=&type=facebook' }
            ]}
            currNav={location.pathname}
            badge={20}
            infoRender={
              <AccountInfo 
                account={deepAt(userInfo, 'username')}
                status={deepAt(userInfo, 'useage.memberLevel')}
                option={accountOption}
                product={productMsgData}
              />
            }
          >
          </Header>
        </div>
        <Layout>
          <SiderMenu
            menuData={getUCMenuData(userInfo.channelFlag)}
            collapsed={true}
            location={location}
            goPage={this.goPage}
          />
          <div 
            className="basic-layout-container"
            ref={e => this.setState({ layoutElement: e })}
          >
            { children }
          </div>
        </Layout>
      </div>
      </ConfigProvider>
    )
  }
}
