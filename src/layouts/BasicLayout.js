import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import cs from 'classnames'
import moment, { min } from 'moment'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import withRouter from 'umi/withRouter'
import router from 'umi/router';
import { connect } from 'dva';
import { ConfigProvider, BackTop, message } from 'antd';
import NoData from '@/components/NoData'
import Header from '@/components/Header'
import Search from '@/components/Search'
import AccountInfo from '@/components/AccountInfo'
import { getUCMenuData } from './UserCenterMenu';
import SiderMenu from '@/components/SiderMenu';
import { clearPersist, deepAt } from '@/utils'
import Link from 'umi/link';
NProgress.configure({ showSpinner: false });

@withRouter
@connect(({ app, user, loading }) => ({
  app,
  loading,
  userInfo: user.userInfo,
}))
export default class BasicLayout extends PureComponent {
  static childContextTypes = {
    childElement: PropTypes.any,
    
  }
  constructor(props) {
    super(props);
    this.state = {
      childElement: null,
      container: null
    }
    this.currHref = '';
  }

  getChildContext() {
    return { 
      childElement: this.state.childElement
    }
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

  goPage= (item) => {
    this.props.dispatch(routerRedux.push({
      pathname: `/${item.path}/index`,
    }))
  }

  render() {
  
    const { children, location, userInfo } = this.props;
    const getProductMsg = deepAt(userInfo, 'useage.productMsg')
    let productMsgData = getProductMsg && getProductMsg.map( item => {
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
        <div className="basic-layout" id="primaryLayout">
          <div className="basic-layout__header">
            <Header
              getInstance={d => this.setState({ childElement: d })}
              navigation={[
                { name: 'Home', to: '/home'},
                { name: 'Offers', to: '/offer' },
                { name: 'Ads Samples', to: '/samples?domainName=&type=facebook' }
              ]}
              currNav={location.pathname}
              badge={1}
              infoRender={
                <AccountInfo 
                  account={deepAt(userInfo, 'username')}
                  status={deepAt(userInfo, 'useage.memberLevel')}
                  option={accountOption}
                  remaining={deepAt(userInfo,'useage.useageInfo.COUNT_SOCIAL_DATA.remain')}
                  product={productMsgData}
                  hideOverlay={false}
                />
              }
            />
          </div>
          <div className="basic-layout-container">
            { 
              children
            }
          </div>
          <BackTop 
            target={() => document.querySelector('#primaryLayout')}
            visibilityHeight={40}
          />
        </div>
      </ConfigProvider>
    )
  }
}
