import React, { PureComponent } from 'react'
import cs from 'classnames'
import router from 'umi/router'
import NProgress from 'nprogress'
import withRouter from 'umi/withRouter'
import { clearPersist } from '@/utils'
import { connect } from 'dva'
import { ConfigProvider } from 'antd'

import NoData from '@/components/NoData'

import logo1 from '@/assets/logo1.png'
import Header from '@/components/Header'
import Footer from '@/components/LayoutFooter'
import cfgs from '@/cfgs'
console.log()
NProgress.configure({ showSpinner: false })

@withRouter
@connect(({ app, loading, dispatch, user }) => ({
  app,
  loading,
  user,
}))
export default class BasicLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.currHref = '';
  }
  onBtnClick = (type) => {
    clearPersist()
    router.push(type) 
    this.props.dispatch({
			type:'user/goProgress',
			payload: {
				progress: 'verification',
			},
		})
  }
  render() {
    const { children, location } = this.props;
    const props = {
      footerLeft: 'Copyright © idvert group limted. All Rights Reserved', 
      footerRight: [
        {
          href: 'http://www.idvert.com/privacy.html',
          text: 'Privacy'
        },
        {
          href: 'http://www.idvert.com/toc.html',
          text: 'TOC'
        }
      ]
    }
    const leftNav = [
      {
        href: cfgs.home,
        text: 'Home'
      },
      {
        href: cfgs.affPage,
        text: 'MediaBuy'
      },
      {
        href: cfgs.normalPage,
        text: 'e-Commerce'
      },
    ]
    const loginPage = location.pathname === '/user/login' ? true : false
    const registerPage = location.pathname === '/user/register' ? true : false
    return (
      <ConfigProvider
        getPopupContainer={trigger => trigger.parentNode}
        renderEmpty={() => (<NoData />)}
      >
      <div
        style={{ paddingTop: "0"}}
        className={cs('basic-layout', { 'basic-layout__bg': loginPage || registerPage })}
      >
        <div className="basic-layout-header">
          <Header 
            theme={!loginPage && !registerPage ? 'light' : false}
            help={false}
            logoTheme={!loginPage && !registerPage ? 'paylogo' : false}
            logo={ loginPage || registerPage ? true : logo1} 
            opacity
            style={{ background: !(loginPage || registerPage) ? 'white' : 'auto' }} 
            isButton={!loginPage && !registerPage}
            btnClick={this.onBtnClick}
            leftNav={ loginPage ? leftNav : false}
          />
        </div>
        <div className="basic-layout-container" style={{ overflowY: "auto" }}>
          { children }
        </div>
        {
          registerPage || loginPage ? 
            <Footer {...props}/> : null
        }
      </div>
      </ConfigProvider>
    )
  }
}
