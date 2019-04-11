import React, { PureComponent } from 'react'
import AdvertisingCard from '@/components/AdvertisingCard'
import CommonTable from '@/components/table/table'
import { deviceType, geo } from './data'
import { Table, Spin } from 'antd'
import { adultDetailList, adultDetaiAnalysis, collection, cancelCollection, } from '@/services/ads'
import './styles.scss'
import Crawl from '@/components/Crawl'
import { DspPieChart } from '@/components/Chart'
import OriginURL from '@/components/OriginURL/originURL'
const moment = require('moment')

let urlObj = {}

const columns = [
  {
    title: 'No',
    dataIndex: '',
    defaultSortOrder: 'descend',
    render:(text, record, index)=>`${index + 1}`,
  }, 
  {
    title: 'Site',
    dataIndex: 'domain',
    defaultSortOrder: 'descend',
    sorter: true,
    render: name => `${ name }`,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Network',
    dataIndex: 'network',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },

  /**
   * 
   *  PM 让 暂时隐藏 因为没给数据
   * 
   */

  // {
  //   title: 'Imoression Index',
  //   dataIndex: 'age4',
  //   defaultSortOrder: 'descend',
  //   sorter: (a, b) => a.age - b.age,
  // },
  {
    title: 'First Seen',
    dataIndex: 'firstDate',
    defaultSortOrder: 'descend',
    render: text => moment(text).format('YYYY-MM-DD'),
  },
  {
    title: 'Last Seen',
    dataIndex: 'lastDate',
    defaultSortOrder: 'descend',
    render: text => moment(text).format('YYYY-MM-DD'),
  },
  {
    title: 'Days',
    dataIndex: 'days',
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
]

export default class extends PureComponent {
  state = {
    result: '',
    basicInformationData: '',
    deviceType: '',
    geo: '',
    publisherData: [],
    originData: {},
    MoneyPageUrl: [],
    cacheMoneyPageUrl: [],
    offerInformationData: {},
    loading: true,
  }

  componentWillMount () {
    this.getURLParam()
    this.getAdsData()
  }

  // URL 参数列表
  getURLParam () {
    const urls = location.search.replace('?', '')
    urls.split('&').forEach(value => {
      urlObj[value.split('=')[0]] = value.split('=')[1]
    })
  }

  getAdsData () {
    this.getURLParam()

    const { adId } = urlObj
    const params = { adId }

    adultDetailList(params)
      .then(res => {
        this.mirrorData(res.data)
        this.offerInformation(res.data)
        this.basicInformation( res.data )
        this.publisherList( res.data )
        this.getOriginal( res.data )
        this.setState({
          loading: false,
        })
      })

    adultDetaiAnalysis({ adId })
      .then(res => {
        this.deviceTypeData( res.data )
        this.geoData( res.data )
      })
  }

  // 表格数据
  basicInformation (result) {
    const { adVO } = result
    const cache = {
      head: {
        label: 'Basic Information',
      },
      data: [
        {
          title: 'Geo',
          content: adVO.country,
        },
        {
          title: 'Device',
          content: adVO.device,
        },
        {
          title: 'Language',
          content: adVO.lanuage,
        },
        {
          title: 'Category',
          content: adVO.category,
        },
        {
          title: 'Advertiser',
          content: adVO.advertiserVO.domain,
        },
        {
          title: 'Size',
          content: `${adVO.adInfoVO[0].picWidth}*${adVO.adInfoVO[0].picHeight}`,
        },
        {
          title: 'Date',
          content: `${adVO.firstSeenDate}~${adVO.lastSeenDate}`,
        },
      ]
    }

    this.setState({
      basicInformationData: cache
    })
  }

  applications ({ cache, adVO }) {
    this.getURLParam()
    cache.applications = []

    cache.applications.push({
      type: 'time',
      value: adVO.days,
      title: 'duration',
    })
    
    cache.applications.push({
      type: 'mobile',
      value: adVO.deviceNum,
      title: 'Devices',
    })

    cache.applications.push({
      type: 'global',
      value: adVO.geoNum,
      title: 'Geo',
    })
    
    cache.applications.push({
      type: 'users',
      value: adVO.publiherNum,
      title: 'Publishers',
    })
  
    if ( adVO.firstSeenDate && adVO.lastSeenDate ) {
      cache.applications.push({
        type: 'eye',
        value: `${adVO.firstSeenDate}~${adVO.lastSeenDate}`,
        title: 'first seen~last seen',
      })
    }
  }

  // 图片拼接
  joinImages (showType, adInfoVO, cache) {
    if ( showType === '1' ) {
      cache.images = {
        type: 'static',
        src: adInfoVO.url,
      }
    }

    if ( showType === '3' ) {
      cache.images = {
        type: 'play',
        image: adInfoVO[0].url,
        src: adInfoVO[1].url,
      }
    }

    if ( showType === '4' ) {
      cache.images = {
        type: 'scroll',
        image: adInfoVO,
        src: adInfoVO,
      }
    }
  }

  // 卡片数据 重构数据
  mirrorData (result) {
    const cache = {}
    const { adVO } = result
    const { adInfoVO: [ adInfoVO ], advertiserVO } = adVO
    cache.collection = 'Collection'
    cache.adId = adVO.adId
    cache.id = adVO.socialAdId
    cache.logo = advertiserVO.picUrl
    cache.logoTitle = advertiserVO.name
    cache.description = advertiserVO.message
    cache.icon = adVO.followFlag ? 'collection' : 'collection-o' // 是否收藏
    this.joinImages(adVO.showType, adInfoVO, cache)
    cache.title = adInfoVO.title
    cache.introduction = advertiserVO.description
    this.applications({ cache, adVO })
    cache.original = {
      content: advertiserVO.domain,
      adSourceUrl: adVO.adSourceUrl
    }
    cache.more = adVO.action
    this.setState({ result: cache })
  }

  // Device Type 图标数据
  deviceTypeData (result) {
    deviceType.length = 0
    result.deviceAnalysis.forEach(({ value, key }) => {
      deviceType.push( { key, value } )
    })

    this.setState({
      deviceType,
    })
  }

  geoData (result) {
    geo.length = 0
    result.countryAnalysis.forEach(({ value, key }) => {
      geo.push( { key, value } )
    })

    this.setState({
      geo,
    })
  }

  publisherList (result) {
    const { publisherList } = result.adVO
    this.setState({
      publisherData: publisherList
    })
  }

  // DSP 广告数据
  getOriginal (result) {
    const { MoneyPageUrl, cacheMoneyPageUrl } = this.state
    const OutgoingLinks = []
    const { outgoingLinkList, offerPage, dspLdUrl, dspLpRedirect = [], dowloadFlag, socialAdId } = result.adVO

    outgoingLinkList.forEach((v, k) => {
      const object = {}
      object.url = v.key
      object.key = k
      OutgoingLinks.push(object)
      MoneyPageUrl.push(v.value || [])
      cacheMoneyPageUrl.push(v.value || [])
    })

    this.setState({
      MoneyPageUrl: MoneyPageUrl[0],
    })

    this.setState({
      originData: {
        OrigiRedirect: dspLpRedirect.map((url, key) => ({ key, url })),
        MoneyPage: {
          url: dspLdUrl,
          dowloadFlag,
          id: socialAdId,
          OutgoingLinks,
        },
        OfferPage: {
          key: 0,
          url: offerPage,
        }
      }
    })
  }

  setOutgoingLinks (key) {
    this.setState({
      MoneyPageUrl: this.state.cacheMoneyPageUrl[key],
    })
  }

  offerInformation (result) {
    const { adVO } = result
    const cache = {
      head: {
        label: 'Offer Information',
      },
      data: [
        {
          title: 'Offer Name',
          content: adVO.offerName,
        },
        {
          title: 'Network',
          content: adVO.networks,
        },
      ]
    }

    this.setState({
      offerInformationData: cache
    })
  }

  // 添加收藏 后期想下怎么优化
  collection (adId = '', icon) {
    const adType = 5

    if ( icon === 'collection' ) {
      cancelCollection({ adId })
        .then(res => {})

    } else {
      collection({ adId, adType })
        .then(res => {})
    }
  }

  onChange () {

  }

  render () {
    const { 
      result, 
      basicInformationData, 
      deviceType, 
      geo,
      publisherData,
      originData,
      MoneyPageUrl,
      loading,
      offerInformationData = [],
    } = this.state

    const sendArr = {
      collection: this.collection.bind(this),
    }
    
    return (
      <div className="native-detail">
        {/* <Loading loading={ loading } /> */}

        <div className="native-detail__advertising">
          <div className="advertising-card-box">
            <AdvertisingCard { ...result } { ...sendArr } />
          </div>
          
          <div className="native-detail__table">
            {
              basicInformationData ?
              <CommonTable { ...basicInformationData } /> : null
            }

            {
              offerInformationData ?
              <CommonTable { ...offerInformationData } /> : null
            }
          </div>
        </div>
        
        <div className="origin-url">
          <OriginURL 
            originData={ originData || [] } 
            MoneyPageUrl={ MoneyPageUrl || [] }
            setOutgoingLinks={ this.setOutgoingLinks.bind(this) }
          />
        </div>

        {/* Publisher */}
        <div className="native-detail__publisher">
          <Crawl
            label="Publisher"
            border="center"
          >
            <Crawl.Item span={8}>
              <Table
                columns={ columns } 
                dataSource={ publisherData } 
                onChange={ this.onChange.bind(this) } 
              />
            </Crawl.Item>
          </Crawl>
        </div>

        {/* Device Type */}
        <div className="native-detail__device-type">
          <div className="device-type">
            <h3>Device Type</h3>
            <article>
              { deviceType ? <DspPieChart height={315} width={315} data={ deviceType } /> : <Spin size="default" /> }
            </article>
          </div>

          <div className="geo">
            <h3>Geo</h3>
            <article>
              { geo ? <DspPieChart height={315} width={315} data={ geo } /> : <Spin size="default" /> }
            </article>
          </div>
        </div>
      </div>
    )
  }
}