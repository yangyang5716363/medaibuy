import React, { PureComponent } from 'react'
import { getRefferralData } from '@/utils'
import numeral from 'numeral'
import AdvertisingCard from '@/components/AdvertisingCard'
import Loading from '@/components/Loading'
import Table from './table'
import { WorldMap } from '@/components/Chart/Map/WorldMap.js'
import { detailList, detailAnalysis, detailAdvertiser, collection, cancelCollection, } from '@/services/ads'
import './styles.scss'

let urlObj = {}

const scrollEl = () => {
  const el = document.querySelector('#primaryLayout')
  const advertisingCard = el.querySelector('.ads-detail__card')
  const childElement = el.querySelector('.ads-detail__table').offsetHeight
  const bodyHeight = document.body.offsetHeight + 64 + 24
  const difference = childElement - bodyHeight

  if ( el.scrollTop >= difference - 20 && ( advertisingCard.offsetHeight > document.body.offsetHeight - 64 - 24 )) { 
    advertisingCard.style.top = -( advertisingCard.offsetHeight - document.body.offsetHeight ) + 'px'

  } else {
    advertisingCard.style.top = '88px'
  }
}

export default class extends PureComponent {
  state = {
    result: '',
    basicInformationData: '',
    offerInformationData: '',
    chatData: '',
    originData: '',
    domainData: '',
    trafficRatioData: '',
    geoRankData: '',
    RefferralData: null,
    circleData: null,
    areaData: null,
    trafficRatioListData: null,
    simpleEncodeData: null,
    WorldMapData: [], // 地图数据
    loading: true,
  }

  componentDidMount () {
    this.getURLParam()
    this.getAdsData()
  }

  componentWillUnmount () {
    const el = document.querySelector('#primaryLayout')
    el.removeEventListener('scroll', scrollEl )
  }

  scroll () {
    const el = document.querySelector('#primaryLayout')
    el.addEventListener('scroll', scrollEl )
  }

  getAdsData () {
    const { adId, domain } = urlObj
    const params = { adId, type: 4 }

    detailList(params)
      .then(res => {
        const data = res.data
        this.mirrorData( data )
        this.basicInformation( data )
        this.offerInformation( data )
        this.getOriginal( data )
        this.scroll()
        this.setState({
          loading: false,
        })
      })

    detailAnalysis({ adId })
      .then(res => {
        this.setChatData( res.data )
        this.getCircleData( res.data )
        this.getAreaData( res.data )
        this.getSimpleEncodeData( res.data )
        this.getWorldMapData( res.data )
      })
    
    detailAdvertiser({ domain })
      .then(res => {
        const data = res.data || []
        this.trafficRatio( res )
        this.domainIconUrl( data )
        this.geoRank( res )
        this.setState({ 
          RefferralData: getRefferralData( data.refferralAndOutgoing )
        })
        this.getTrafficRatioListData( res )
      })
  }

  getSimpleEncodeData (result) {
    this.setState({
      simpleEncodeData: result.ageRatio[0].key
    })
  }

  getWorldMapData ({ countryDistribution = [] }) {
    const WorldMapData = []
    const newWorl = []
    const objGeo = {} // 保存国家简拼 对照表

    countryDistribution = countryDistribution.map(({ key, type }) => {
      objGeo[key] = type.toLowerCase()
      return key
    })
  
    WorldMap.forEach((map, key) => {
      const country = { features: [] }
      if ( countryDistribution.indexOf( map.properties.name ) !== -1 ) {
        country.features.push({
          properties: map.properties,
          geometry: map.geometry,
          type: 'Feature',
          geo: objGeo[map.properties.name],
        })
        newWorl.push( country )
      }
    })

    newWorl.map((map, key) => {
      WorldMapData[key] = []
      WorldMapData[key].push(...newWorl.splice(0, 3))
    })

    this.setState({
      WorldMapData,
    })
  }

  getTrafficRatioListData ( trafficRatioListData ) {
    this.setState({
      trafficRatioListData,
    })
  }

  getCircleData ({ interstsDistribution }) {
    const circleData = []
    const color = ['#5BBEF0', '#83D5AC', '#6879DC', '#1abbcc', '#f1a363' ]
    const xy = [
      {
        x: 90,
        y: 120,
        r: 60
      },
      {
        x: 220,
        y: 220,
        r: 70
      },
      {
        x: 350,
        y: 100,
        r: 65
      },
      {
        x: 50,
        y: 250,
        r: 65
      },
      {
        x: 350,
        y: 150,
        r: 55
      },
    ]
    
    interstsDistribution.forEach((v, k) => {
      circleData.push({
        value: v.key,
        key: 0,
        r: xy[k].r,
        x: xy[k].x,
        y: xy[k].y,
        color: color[k],
        left: parseInt( v.key.length * 7 / 2 ),
      })
    })
    
    this.setState({
      circleData,
    })
  }

  getAreaData (result) {
    result = {
      displayModel: 2,
      trendList: [
        {date: "2019-03-30", total: 58}, 
        {date: "2019-03-31", total: 61}, 
        {date: "2019-04-01", total: 62}
      ]
    }

    this.setState({
      areaData: {
        displayModel: result.displayModel,
        trendList: result.trendList.map(v => ({ x: v.date, y: v.total }))
      }
    })
  }

  /*
   * FB
   * 
    Original Ads URL
      链接字段: adSourceUrl
    
    MP
      链接字段: moneyPage

    Redirect: 
      链接字段: offerTrace

    OP
      链接字段: offerPage
  

    * DPS
    *
    Redirect: ?

    MP
      链接字段: offerPage

    Outgoing Links 折叠展示
      链接字段: outgoingLinkList

    Redirect

    
    Offer Pape
      链接字段: ?
  */

  // 原始数据列表
  getOriginal (result) {
    const { adSourceUrl, offerTrace = [], offerPage, moneyPageTrace = [], dowloadFlag, socialAdId } = result.adVO
    let redirect = offerTrace.map((url, key) => ({
      key,
      url,
    }))
    let moneyRedirect = moneyPageTrace.map((url, key) => ({
      key,
      url,
    }))

    this.setState({
      originData: {
        url: adSourceUrl,
        MoneyPage: {
          dowloadFlag,
          id: socialAdId,
          url: result.landerVO && result.landerVO.length && result.landerVO[0].url,
          redirect,
        },
        OfferPage: {
          url: offerPage
        }
      }
    })
  }

  // URL 参数列表
  getURLParam () {
    const urls = location.search.replace('?', '')
    urls.split('&').forEach(value => {
      urlObj[value.split('=')[0]] = value.split('=')[1]
    })
  }

  // 根据类型拼接图片 1: 图片 2: 文字 3: 视频 4: 轮播
  joinImages (showType, adInfoVO, cache) {
    if ( showType === '1' ) {
      cache.images = {
        type: 'static',
        src: adInfoVO[0].url,
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

  applications ({ cache, adVO }) {
    this.getURLParam()
    cache.applications = []

    cache.applications.push({
      type: 'thumbs-up',
      value: adVO.likes,
      title: 'like',
    })

    cache.applications.push({
      type: 'message',
      value: adVO.comments,
      title: 'comments',
    })

    cache.applications.push({
      type: 'bounce',
      value: adVO.shares,
      title: 'forward',
    })
    
    cache.applications.push({
      type: 'time',
      value: adVO.days,
      title: 'duration',
    })
  
    if ( adVO.firstSeenDate && adVO.lastSeenDate ) {
      cache.applications.push({
        type: 'eye',
        value: `${adVO.firstSeenDate}~${adVO.lastSeenDate}`,
        title: 'first seen~last seen',
      })
    }
  }

  // 卡片数据 重构数据
  mirrorData (result) {
    const cache = {}
    const { adVO } = result
    const { adInfoVO, advertiserVO, adInfoShowVO = {} } = adVO
    cache.collection = 'Collection'
    cache.adId = adVO.adId
    cache.id = adVO.socialAdId
    cache.icon = adVO.followFlag ? 'collection' : 'collection-o' // 是否收藏
    cache.logo = advertiserVO.picUrl
    cache.logoTitle = advertiserVO.name || ''
    cache.description = adInfoShowVO.message
    this.joinImages(adVO.showType, adInfoVO, cache)
    cache.title = adInfoShowVO.title = ''
    cache.introduction = adInfoShowVO.description = ''
    this.applications({ cache, adVO })
    
    cache.original = {
      content: advertiserVO.domain,
      adSourceUrl: adVO.adSourceUrl
    }
    cache.more = adVO.action
    this.setState({ result: cache })
  }

  mirrorChatData (result) {
    const interstsDistribution = () => {
      result.interstsDistribution.map((value, key) => ({
        key,
        value: value.key,
        num: value.value,
      }))
    }
    this.setState({
      chatData: {
        key: result.genderRetio[0].key,
        value: result.genderRetio[0].value,
      },
    })
  }

  // 表格数据
  basicInformation (result) {
    const { adVO } = result
    const data = []
    
    if ( adVO.viewCount === '' ) {
      data.push({
        title: 'Viewed',
        content: adVO.viewCount,
      })
    }

    const cache = {
      head: {
        label: 'Basic Information',
      },
      data: [...data, ...[
        {
          // 暂时写死 后台没地方取这个值 我们的平台目前都是这种
          title: 'Ads Position',
          content: 'News feed',
        },
        {
          title: 'First Seen',
          content: adVO.firstSeenDate,
        },
        {
          title: 'Last Seen',
          content: adVO.lastSeenDate,
        },
        {
          title: 'Device',
          content: adVO.device,
        },
        // {
        //   title: 'Marketing Objective',
        //   content: adVO.socialPpeWcFlag,
        // },
        {
          title: 'Category',
          content: adVO.bhCategory,
        },
        {
          title: 'Geo',
          content: adVO.country,
        },
        // 后期问
        // {
        //   title: 'E-Commerce Platform',
        //   content: adVO.buildStationSystem,
        // },
      ]]
    }

    this.setState({
      basicInformationData: cache
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
          title: 'Affiliate Network',
          content: adVO.networks,
        },
      ]
    }
    this.setState({
      offerInformationData: cache
    })
  }

  // 图标数据
  setChatData (result) {
    this.mirrorChatData(result)
    this.setState({
      chatData: result.genderRetio[0].key
    })
  }

  // domainIconUrl
  domainIconUrl (result) {
    const { 
      domain = '', 
      domainIconUrl = '', 
      desc = '', 
      worldRanking = 0,
      naturalRanking = 0,
      monthlyVisit = 0,
      bounceRate = 0,
      perPages = 0,
      durationTime = 0,
      countryCode = '',
    } = result

    this.setState({
      domainData: {
        head: {
          label: 'Advertiser Domain Analysis',
        },

        data: {
          image: domainIconUrl,
          title: domain,
          content: desc,
        },
        // naturalRanking: 国家
        // monthlyVisit: 第三个参数
        // perPages: 5
        // bounceRate: 4
        // durationTime: 6
        geo: [
          {
            type: 'global',
            count: numeral(worldRanking).format(),
            description: 'worldRanking'
          },
          {
            type: countryCode.toLowerCase(),
            count: numeral(naturalRanking).format(),
            description: 'Country Rank'
          },
          {
            type: 'barschart',
            count: numeral(monthlyVisit).format(),
            description: 'Monthly Visits'
          },
          {
            type: 'linechart',
            count: numeral(bounceRate).format('0%'),
            description: 'Bounce Rate'
          },
          {
            type: 'paste',
            count: Math.ceil(perPages),
            description: 'Pages Visits'
          },
          {
            type: 'time',
            count: numeral(durationTime).format('00:00:00'),
            description: 'Avg Visit Duration'
          },
        ]
      }
    })
  }

  // Visits Stats
  trafficRatio (trafficRatioData) {
    this.setState({ 
      trafficRatioData,
    })
  }

  geoRank (geoRankData) {
    this.setState({
      geoRankData,
    })
  }

  // 添加收藏 后期想下怎么优化
  collection (adId = '', icon) {
    const adType = 4

    if ( icon === 'collection' ) {
      cancelCollection({ adId })
        .then(res => {})

    } else {
      collection({ adId, adType })
        .then(res => {})
    }
  }

  render () {
    let { 
      result, 
      basicInformationData, 
      offerInformationData, 
      chatData,
      originData,
      domainData,
      trafficRatioData,
      geoRankData,
      RefferralData,
      circleData,
      areaData,
      trafficRatioListData,
      simpleEncodeData,
      loading,
      WorldMapData,
    } = this.state

    const sendArr = {
      collection: this.collection.bind(this),
    }

    return (
      <div className="ads-detail">
        {/* <Loading loading={ loading } /> */}

        <div className="ads-detail__card">
          <AdvertisingCard { ...result } { ...sendArr } />
        </div>

        <div className="ads-detail__list">
          {/* 搜下这里为什么需要这么写 否则报错 */}
          {
            <Table 
              basicInformationData={ basicInformationData } 
              offerInformationData={ offerInformationData }
              chatData={ chatData }
              originData={ originData }
              domainData={ domainData }
              trafficRatioData={ trafficRatioData }
              geoRankData={ geoRankData }
              RefferralData={ RefferralData }
              circleData={ circleData }
              areaData={ areaData }
              trafficRatioListData={ trafficRatioListData }
              simpleEncodeData={ simpleEncodeData }
              WorldMapData={ WorldMapData }
            />
          }
          {/* {
            ( basicInformationData && offerInformationData ) 
              ? <Table 
                basicInformationData={ basicInformationData } 
                offerInformationData={ offerInformationData }
                chatData={ chatData }
                originData={ originData }
                domainData={ domainData }
                trafficRatioData={ trafficRatioData }
                geoRankData={ geoRankData }
                RefferralData={ RefferralData }
                circleData={ circleData }
                areaData={ areaData }
                trafficRatioListData={ trafficRatioListData }
                simpleEncodeData={ simpleEncodeData }
                WorldMapData={ WorldMapData }
              />
              : null
          } */}
        </div>
      </div>
    )
  }
}