import React, { PureComponent } from 'react'
import cs from 'classnames'
import moment, { min } from 'moment'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import withRouter from 'umi/withRouter'
import router from 'umi/router'
import { connect } from 'dva'
import { ConfigProvider } from 'antd'
import NoData from '@/components/NoData'
import Header from '@/components/Header'
import Search from '@/components/Search'
import AccountInfo from '@/components/AccountInfo'
import { clearPersist, deepAt } from '@/utils'
import Link from 'umi/link';
NProgress.configure({ showSpinner: false });

@withRouter
@connect(({ app, user, loading }) => ({
  app,
  loading,
  userInfo: user.userInfo,
}))
export default class CommonLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.currHref = '';
  }
  onBtnClick = (type) => {
    clearPersist()
    router.push(type) 
  }
  goPage= (item) => {
    this.props.dispatch(routerRedux.push({
      pathname: `/${item.path}/index`,
    }))
  }
  onLogoutClick = () => {
    const { location, dispatch } = this.props
    // clearPersist()
    dispatch({ type: 'user/logout' })
  }
  render() {
    // NProgress.done()
    const { children, location, userInfo } = this.props;
    const authorization = localStorage.getItem('authorization')
    const getProductMsg = deepAt(userInfo, 'useage.productMsg')
    let productMsgData = getProductMsg&&getProductMsg.map( item => {
      return { 
        name: item.key, 
        time: moment(item.value).format('YYYY-MM-DD'),
        isUpGrade: item.key === 'MediaBuy' ? false : true,
        to: '/pay/payBuy'
      }
    })
    let remaining = deepAt(userInfo,'useage.useageInfo.COUNT_SOCIAL_DATA.remain')
    const accountOption = [
      { icon: 'user', text:'User Center', to: '/account/info' }, 
      { icon: 'collection-o', text:'Favourites', to: '/account/favorites' }, 
      { icon: 'power', text:'Logout', click: this.onLogoutClick }
    ]
    const hideOverlay = location.pathname === '/pay/payBuy' ? false : true
    return (
      <ConfigProvider
        getPopupContainer={trigger => trigger.parentNode}
        renderEmpty={() => (<NoData />)}
      >
      <div className="basic-layout basic-layout__bg" style={{ background: "none", paddingTop: "0"}}>
        <div className="basic-layout-header">
          <Header
            currNav={location.pathname}
            theme='light'
            logo
            isButton={ authorization ? false : true }
            logoTheme='paylogo'
            help={false}
            infoRender={
              authorization ? 
              <AccountInfo
                theme='pay' 
                account={deepAt(userInfo, 'username')}
                status={deepAt(userInfo, 'useage.memberLevel')}
                remaining={ authorization ? remaining : false }
                product={ authorization ? productMsgData: false}
                option={ !hideOverlay ? accountOption : false }
                hideOverlay={hideOverlay}
              /> : false
            }
            btnClick={this.onBtnClick}
          />
        </div>
        <div className="basic-layout-container" style={{ height: 'calc(100% - 116px)'}}>
          { children }
        </div>
      </div>
      </ConfigProvider>
    )
  }
}
