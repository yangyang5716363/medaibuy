import React, { PureComponent } from 'react'
import { Spin, Button } from 'antd'
import AdvertisingCard from '@/components/AdvertisingCard'
import WaterWall from '@/components/WaterWall'
import Partition from '@/components/Partition'
import NoData from '@/components/NoData'
import router from 'umi/router';
import Scroll from '@/utils/scroll'
import { connect } from 'dva';
import './styles.scss'

@connect(({ dashboard, loading }) => {
  return {
    dataSource: dashboard.FbList,
    FbListClone: dashboard.FbListClone,
    fbParams: dashboard.fbParams,
    loading: !!loading.effects['dashboard/fetchFb'] || !!loading.effects['dashboard/collectList'],
  };
})

export default class Ad extends PureComponent { 
  state = {
    active: 'All',
  }
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  componentDidMount() {
    this.scrollPage = new Scroll(this.element, this.onNext.bind(this))
  }
  btnTabChange = (key, type) => {
    const { FbListClone, dispatch } = this.props
    let arr = type === 'all' ? FbListClone : FbListClone.filter( item => item.type === type)
    this.setState({
      active: key
    })
    dispatch({
      type: 'dashboard/updateState',
      payload: {
        FbList: arr
      }
    })
  }
  // 滚动加载
  onNext () {
    // const { dispatch, fbParams, dataSource,loading } = this.props
    // if (!loading && dataSource.size < fbParams.totalCount) {
    //   let payload = {
    //     ...fbParams,
    //     pageNo: fbParams.pageNo + 1
    //   }
    //   dispatch({ type: 'dashboard/fetchFb', payload })
    // }  
  }
  collection (adId = '', icon) {
    const { dispatch } = this.props
    dispatch({
      type: 'dashboard/collectCancel',
      payload: { 
        adId,
        type: 'ads' 
      }
    })
  }
  // 卡片名 跳转
  jumpName (event, type) {
    const title = encodeURIComponent( decodeURIComponent( event.target.innerHTML ) )
    let domainName = title
    let param = `type=${type.type}&domainName=${domainName}`
    window.open(`/advertisers?${param}`)
  }

  routerDetail ({ adId, id, domain, domainId, type }) {
    let pathname = type === 'facebook' ? '/samples/detail' : '/samples/nativeDetail'
    let param = `type=${type}&adId=${adId}&id=${id}&domain=${domain}&domainId=${domainId}`
    window.open(`${pathname}?${param}`)
  }
  render () {
    const { dataSource, loading, fbParams } = this.props
    const { active } = this.state
    const sendArr = {
      collection: this.collection.bind(this),
      jumpName: this.jumpName.bind(this),
      routerDetail: this.routerDetail.bind(this),
    }
    const btnInit = [
      { key: 'All', type: 'all' },
      { key: 'Facebook', type: 'facebook' },
      { key: 'Native', type: 'native' },
      { key: 'Adult', type: 'adult' },
    ]
    return (
      <div className="favorties-ads" ref={node => this.element = node } style={{ padding: "40px 0"}}>
        <Spin spinning={loading} tip="Loading..."/>
        <div className="favorties-ads-btn">
          {
            btnInit.map( item => {
              return (
                <Button
                  key={item.key}
                  className="favorties-ads-btn__item"
                  data-checked={ active === item.key }
                  onClick={() => this.btnTabChange(item.key, item.type)}
                >
                  {item.key}
                </Button>
              )
            })
          }
        </div>
        <div className="favorties-ads-facebook js-ads-facebook">
          <div className="favorties-ads-facebook__list js-ads-facebook__list">
          {
            !loading && dataSource.size === 0 ? (
              <NoData />
            ) : (
            <WaterWall
              getInstance={c => this.waterWall = c}
              onScroll={ this.onScroll }
              gutter={24}
              columnWidth={292}
              dataSource={dataSource}
              render={(item, index) => {
                return (
                  <AdvertisingCard 
                    { ...item }
                    { ...sendArr }
                  />
                )
              }}
            />)
          }
          </div>
          {
            fbParams.pageNo >= 1 && fbParams.totalCount !== 0 && (
              <Partition>
                {
                  dataSource.size === fbParams.totalCount 
                  ? (<div>没有更多数据</div>) : 
                  (
                    <Spin spinning={loading} tip="Loading More..."/>
                  )
                }
              </Partition>
            )
          }
        </div>
      </div>
    )
  }
}