import React, { PureComponent } from 'react'
import FaceBook from './facebook/facebook'
import PropTypes from 'prop-types'
import Loading from '@/components/Loading'
// combine 是 facebookSource 中的 select 数据, 单独提取是为了获取新数据容易操作
import { facebook, native, sortByArr, adult } from './data'
import router from 'umi/router'
import Scroll from '@/utils/scroll'
import { collection, cancelCollection } from '@/services/ads'
import { connect } from 'dva'
import cs from 'classnames'
import qs from 'qs'
import Search from '@/components/Search'
import './styles.scss'

const selectFilter = {
  facebook: ['socialDevice', 'showType', 'firstSeenDate', 'lastSeenDate', 'language',
'country', 'action', 'platform', 'network', 'trackingSystems', 'bhCategory'],
  native: ['country', 'language', 'device', 'network', 'picHeightRange', 'picWidthRange', 'trackingSystems', 'bhCategory']
}

let pageNo = 0  // 页数
let params = {} // Filter 参数
let urlObj = {} // URL 参数
let dspObject = {
  facebook: '',
  native: 2,
  adult: 1,
}

@connect(({ ads, loading }) => {
  return {
    dataSource: ads.list,
    isNative: ads.isNative,
    isFB: ads.isFB,
    loading: !!loading.effects['ads/fetch'] || !!loading.effects['ads/native'] || !!loading.effects['ads/nativeAdult'],
    fbParams: ads.fbParams,
    totalPages: ads.totalPages,
  };
})
export default class extends PureComponent {
  state = {
    formData: '',
    params: '',
    collection: { facebook, native, adult },
    sortType: 'facebook',
    // searchValue: '' // 搜索值
  }

  static contextTypes = {
    childElement: PropTypes.any
  }

  constructor (props) {
    super(props)
    this.searchValue = ''
    this.onSelected = this.onSelected.bind(this)
  }

  componentWillMount () {
    this.getURLParam()

    const { type, keyword = '' } = urlObj

    this.setSearchValue( keyword )
    
    // 渲染表单
    if ( type === 'facebook' ) {
      this.switchFacebookAds('facebook')
      
    } else if ( type === 'native' ) {
      this.switchNativeAds('native', 2)
      
    } else if ( type === 'adult' ) {
      this.switchNativeAds('adult', 1)
    }
  }

  componentDidMount () {
    const { location } = this.props
    
    // 滚动加载
    this.scrollPage = new Scroll(this.element, this.onNext.bind(this))
  }

  // 数组参数转字符串
  arrayTurnString (params, paramsArr) {
    paramsArr.filter(ar => {
      if ( params[ar] && ( typeof params[ar] === 'object') ) {
        params[ar] = params[ar].join()
      }
    })
  }

  // Ajax 请求参数
  joinParams ( options, dspAdType = '' ) {
    this.getURLParam()
    this.setPageNo(++pageNo)

    const { dispatch } = this.props
    const keyword = urlObj.keyword || ''

    dispatch({ 
      type: 'ads/updateFbParams', 
      payload: Object.assign(
        params, 
        options, 
        { pageNo, pageSize: 20, dspAdType, keyword } 
      )
    })

    Object.assign(params, options, { pageNo, pageSize: 20, dspAdType } )
  }

  // FB 数据
  // isNull 控制 是否点击表单 clear 过来的值, 如果是点击 clear 过来的值 清空请求参数
  getFacebook ({ options = {}, clear = false, event } = {}, isNull = true ) {
    const  { location, dispatch, fbParams } = this.props
    const { type, flag, advertisers, ...offerParams } = qs.parse( location.search, { ignoreQueryPrefix: true } )

    this.getURLParam()

    this.joinParams( options )

    let urlParmas = {}

    // 查询参数
    let domainName = urlObj.domainName ? decodeURIComponent(urlObj.domainName) : ''

    // 参数为数组格式的转成字符串格式
    this.arrayTurnString(params, selectFilter.facebook)

    // 点导航清空数据
    if ( clear ) {
      dispatch({ type: 'ads/updateList', payload: [] })
    }

    // 导航跳转
    // 如果是点击 clear 清空所有请求参数
    if ( event ) {
      if ( !flag ) {
        urlParmas = {
          type: 'ads/fetch', 
          payload: { domainName, dspAdType: '', pageNo: 1, pageSize: 20 },
        }

      } else {
        urlParmas = { 
          type: 'ads/fetch', 
          payload: { 
            domainName: '', 
            pageNo: 1, 
            pageSize: 20, 
            dspAdType: '',
          },
        }
      }

    } else {
      urlParmas = {
        type: 'ads/fetch', 
        payload: {
          ...fbParams,
          ...params,
          ...{ domainName, dspAdType: '' },
          ...offerParams,
        } 
      }
    }

    dispatch( urlParmas )
  }

  // Native 数据
  // isNull 控制 是否点击表单 clear 过来的值, 如果是点击 clear 过来的值 清空请求参数
  getNativeList ( { options = {}, dspAdType = '', clear = false, event } = {}, isNull = true ) {
    this.getURLParam()
    
    let { dispatch, isNative, fbParams, location } = this.props
    let { type, flag, ...offerParams } = qs.parse( location.search, { ignoreQueryPrefix: true } )
    let urlParams = {}

    if ( isNative ) return false

    dspAdType = dspObject[urlObj.type]

    this.joinParams(options, dspAdType)

    // 参数为数组格式的转成字符串格式
    this.arrayTurnString(params, selectFilter.native)

    if ( clear ) {
      dispatch({ type: 'ads/updateList', payload: [] })
    }

    dispatch({ type: 'ads/updateIsNative', payload: true })

    if ( event ) {
      if ( urlObj.type == 'native' ) {
        if ( !flag ) {
          urlParams = { 
            type: 'ads/native', 
            payload: { dspAdType, sortField: 'updateTime', pageNo: 1, pageSize: 20 },
          }

        } else {
          urlParams = { 
            type: 'ads/native', 
            payload: { 
              ...params, 
              ...{ dspAdType },
              ...{ sortField: 'updateTime', pageNo: 1 },
              ...offerParams,
            } 
          }
        }

      } else {
        if ( !flag ) {
          urlParams = { 
            type: 'ads/nativeAdult', 
            payload: { dspAdType, sortField: 'updateTime', pageNo: 1, pageSize: 20 },
          }

        } else {
          urlParams = { 
            type: 'ads/nativeAdult', 
            payload: { 
              ...params, 
              ...{ dspAdType },
              ...{ sortField: 'updateTime', pageNo: 1 },
              ...offerParams,
            } 
          }
        }
      }

    } else {
      if (urlObj.type == 'native') {
        urlParams = { 
          type: 'ads/native', 
          payload: { 
            ...fbParams, 
            ...params, 
            ...{ dspAdType },
            ...offerParams,
          }
        }

      } else {
        urlParams = { 
          type: 'ads/nativeAdult', 
          payload: { 
            ...fbParams, 
            ...params, 
            ...{ dspAdType },
            ...offerParams, 
          }
        }
      }
    }

    dispatch( urlParams )
  }

  getFacebookFilter () {
    const { dispatch } = this.props
    dispatch({ type: 'ads/fetchFacebookFilter', payload: {} })
  }

  getNativeFilter () {
    const { dispatch } = this.props
    
    this.getURLParam()

    if ( urlObj.type === 'native' ) {
      dispatch({ type: 'ads/fetchNativeFilter', payload: {} })

    } else {
      dispatch({ type: 'ads/fetchAdultFilter', payload: {} })
    }
  }

  // 切换过滤条数据
  setFormData (key) {
    this.setState({
      formData: this.state.collection[key],
    })
  }
  
  // 设置页数
  setPageNo (flag) {
    pageNo = flag
  }

  // 设置搜索框值
  setSearchValue (value = '') {
    this.searchValue = value
  }

  switchFacebookAds (key, event) {
    let query = {}
    let { dispatch, location, history } = this.props
    let { domainName, keyword, flag, offerName, lastSeenDate } = qs.parse(location.search, { ignoreQueryPrefix: true })

    if ( flag ) {
      query = { keyword, flag, offerName, domainName, lastSeenDate, type: 'facebook' }
      
    } else {
      query = { keyword, type: 'facebook', domainName }
    }

    if ( event ) {
      history.push(`${location.pathname}?${qs.stringify( query )}`)

      dispatch({ 
        type: 'ads/updateFbParams', 
        payload: Object.assign(
          { pageNo, pageSize: 20, dspAdType: '' } 
        )
      })

      // 清空sortBy 数组当前选中值 切换后标签后需要清空当前内容
      this.clearSortBy()
    }
    params = {}
    // this.setSearchValue() // 清空搜索内容
    this.setPageNo(0)
    this.setSortName('facebook')
    this.setFormData(key)
    this.getFacebookFilter()  // 切换 select 内容
    this.navsActive(event)  // 导航选中
    dispatch({ type: 'ads/updateList', payload: [] })
    setTimeout(() => {
      this.getFacebook({ event })  // FB 数据
    }, 0)
  }

  // dspAdType 导航类型 facebook native adui
  switchNativeAds (key, dspAdType, event) {
    this.getURLParam()
    let query = {}
    let { dispatch, location, history } = this.props
    let { domainName, keyword, flag, offerName, lastSeenDate, ...options } = qs.parse(location.search, { ignoreQueryPrefix: true })
    let type = dspAdType === 1 ? 'adult' : 'native'
    
    if ( flag ) {
      query = { keyword, flag, domainName, offerName, lastSeenDate, type }
      
    } else {
      query = { keyword, domainName, type }
    }

    if ( event ) {
      history.push(`${location.pathname}?${qs.stringify( query )}`)

      dispatch({ 
        type: 'ads/updateFbParams', 
        payload: Object.assign(
          { pageNo, pageSize: 20, dspAdType, } 
        )
      })

      // 清空sortBy 数组当前选中值 切换后标签后需要清空当前内容
      this.clearSortBy()
    }
    params = {}
    // this.setSearchValue() // 清空搜索内容
    this.setPageNo(0)
    this.setSortName('native')
    this.setFormData(key)
    this.getNativeFilter() // 切换 select 内容
    this.navsActive(event)  // 导航选中
    this.clearData()
    setTimeout(() => {
      this.getNativeList({ event })  // Native 数据
    }, 0);
  }

  // 切换 FB NA AU 清空当前数据
  clearData () {
    const { dispatch } = this.props
    dispatch({ type: 'ads/updateList', payload: [] })
  }

  // 添加收藏 后期想下怎么优化
  collection (adId = '', icon) {
    const adType = urlObj.type === 'facebook' ? 4 : 5

    if ( icon === 'collection' ) {
      cancelCollection({ adId })
        .then(res => {})

    } else {
      collection({ adId, adType })
        .then(res => {})
    }
  }

  setSortName (sortType) {
    this.setState({ sortType })
  }

  // 导航选中
  navsActive (event) {
    const navs = document.querySelector('.js-ads-samples__navs')
    if ( !navs ) return false
    const children = [...navs.children]
    const target = event ? event.target : navs[0]
    children.map(el => el.className = '')
    target.className = 'active'
  }

  // 跳转详情
  routerDetail ({ adId, id, domain, domainId }) {
    this.getURLParam()

    let type = urlObj.type
    
    let pathname = {
      facebook: '/samples/detail',
      native: '/samples/detailNative',
      adult: '/samples/detailAdult',
    }

    window.open(`${pathname[type]}?adId=${adId}&domain=${domain}`)
  }

  // 卡片名 跳转
  jumpName (event) {
    let str = 'advertisers=1&' // advertisers 代表广告主
    let title = encodeURIComponent( decodeURIComponent( event.target.innerHTML ) )
    
    this.getURLParam()

    urlObj.domainName = title

    // 拼接所有 url 参数 
    for (let [key, value] of Object.entries(urlObj)) {
      str += `${key}=${value}&`
    }

    window.open(`/samples?${str.substr(0, str.length - 1)}`)
  }

  // URL 参数列表
  getURLParam () {
    urlObj = {}
    const urls = location.search.replace('?', '')
    urls.split('&').forEach(value => {
      urlObj[value.split('=')[0]] = value.split('=')[1]
    })
  }

  // Filter 回调
  onFilterChange ( options = {} ) {
    this.getURLParam()

    let { dispatch, fbParams, location, history } = this.props

    let { type, keyword } = qs.parse(location.search, { ignoreQueryPrefix: true })

    history.push(`${location.pathname}?${qs.stringify( { type, keyword, ...options } )}`)

    // 清空sortBy 数组当前选中值 切换后标签后需要清空当前内容
    this.clearSortBy()
    
    const types = urlObj.type

    dispatch({ type: 'ads/updateFbParams', payload: { ...fbParams, ...options } } )

    this.setPageNo(0)

    dispatch({ type: 'ads/updateList', payload: [] })
  
    this.clearData()

    if ( types === 'facebook' ) {
      setTimeout(() => {
        this.getFacebook({ 
            options: { 
              ...fbParams, 
              ...options 
            } 
          }
        )
      }, 0);

    } else if (types === 'native') {
      setTimeout(() => {
        this.getNativeList({ 
            options: { 
              ...fbParams, 
              ...options, 
              ...{ dspAdType: 2 } 
            } 
          }
        )
      }, 0);
      
    } else if ( types === 'adult' ) {
      setTimeout(() => {
        this.getNativeList({ 
            options: { 
              ...fbParams, 
              ...options, 
              ...{ dspAdType: 1 } 
            } 
          }
        )
      }, 0);
    }
  }

  // Filter 回调
  onFilterSortByChange ( options = {} ) {
    this.getURLParam()

    let { dispatch, fbParams } = this.props

    // 清空sortBy 数组当前选中值 切换后标签后需要清空当前内容
    // this.clearSortBy()
    
    const type = urlObj.type

    dispatch({ type: 'ads/updateFbParams', payload: { ...fbParams, ...options } } )

    this.setPageNo(0)

    dispatch({ type: 'ads/updateList', payload: [] })

    if ( type === 'facebook' ) {
      this.getFacebook({ 
          options: { 
            ...fbParams, 
            ...options 
          } 
        } 
      )

    } else if (type === 'native') {
      this.getNativeList({ 
          options: { 
            ...fbParams, 
            ...options, 
            ...{ dspAdType: 2 } 
          } 
        }
      )

    } else if ( type === 'adult' ) {
      this.getNativeList({ 
          options: { 
            ...fbParams, 
            ...options, 
            ...{ dspAdType: 1 } 
          } 
        }
      )
    }
  }

  // 滚动加载
  onNext () {
    this.getURLParam()
    
    const { type } = urlObj
    const { dispatch, isFB, fbParams, totalPages } = this.props
    
    if ( totalPages < pageNo + 1 ) {
      return false
    }
    
    if ( type === 'facebook') {
      // 防止多次请求
      if ( isFB ) return false

      dispatch({ type: 'ads/updateIsFB', payload: true })
      this.getFacebook({ options: { ...fbParams, ...{ dspAdType: '' } } })

    } else if ( type === 'native' ) {
      this.getNativeList({ 
        options: { ...fbParams, ...{ dspAdType: 2 } }
      })
    
    } else {
      this.getNativeList({ 
        options: { ...fbParams, ...{ dspAdType: 1 } }
      })
    }
  }

  // 搜索列表回调
  onSubmit = (keyword) => {
    this.getURLParam()
    const { type } = urlObj
    const { dispatch, isFB, fbParams, location } = this.props
    const offerParams = qs.parse( location.search, { ignoreQueryPrefix: true } )

    this.setPageNo(0)

    params.keyword = keyword
    
    dispatch({ type: 'ads/updateFbParams', payload: { ...fbParams, ...{ keyword } } })

    // keyword 带入搜索框
    router.push({
      pathname: '/samples',
      query: {
        domainName: '',
        type: location.query.type,
        ...offerParams,
        ...{ keyword },
      }
    })

    if ( type === 'facebook') {
      // 防止多次请求
      if ( isFB ) return false

      dispatch({ type: 'ads/updateIsFB', payload: true })
      
      setTimeout(() => this.getFacebook({ options: { ...fbParams }, clear: true }), 0)
      // this.getFacebook({ options: { ...fbParams, ...{ keyword } }, clear: true })

    } else if ( type === 'native' ) {
      setTimeout(() => {
        this.getNativeList({ options: Object.assign({ dspAdType: 2 }), clear: true })
      }, 0)
      
      // this.getFacebook({ options: Object.assign({ dspAdType: 2 }, { keyword }), clear: true })
    } else {
      setTimeout(() => {
        this.getNativeList({ options: Object.assign({ dspAdType: 1 }), clear: true })
      }, 0)
      // this.getFacebook({ options: Object.assign({ dspAdType: 1 }, { keyword }), clear: true })
    }
  }

  // 设置 Search Position 是否可筛选
  setSearchPosition (v) {
    facebook[0].option.forEach(op => op.disabled = !v )
  }

  // Promise
  onSearchKeyword = (v) => {
    const { dispatch } = this.props
    let payload = { keyword: v, dspAdType: dspObject[ urlObj.type ] }
    this.setSearchPosition(v)
    this.getURLParam()

    if ( urlObj.type === 'facebook' ) {
     return dispatch({ type: 'ads/search', payload })

    } else if ( urlObj.type === 'native' ) {
      return dispatch({ type: 'ads/searchNativeDsp', payload })
    
    } else if ( urlObj.type === 'adult' ) {
      return dispatch({ type: 'ads/searchAdultDsp', payload })
    }
  }

  // 切换 FB Native Audlt 清空当前 Sort by 选中
  clearSortBy () {
    Object.values( sortByArr ).map( value => {
      value.map( (value2, key2) => value2.active = !key2 )
    })
  }

  // Sort by 按钮排序
  onSelected ( options ) {
    let { sortType } = this.state

    // 设置当前 Sort By 选中 
    sortByArr[sortType].map(btn => {
      btn.active = btn.key === options.sortField
    })

    // 帅选数据
    this.onFilterSortByChange( options )
  }

  render () {
    this.getURLParam()

    let { sortType } = this.state
    let { dataSource, loading, location } = this.props
    let sendArr = {
      onFilterChange: this.onFilterChange.bind(this),
      collection: this.collection.bind(this),
      jumpName: this.jumpName.bind(this),
      routerDetail: this.routerDetail.bind(this),
      onSubmit: this.onSubmit.bind(this),
    }

    return (
      <div className={ cs({ 'ads-samples': true, 'ads-samples-top': urlObj.advertisers }) } ref={node => this.element = node }>
        <Search 
          node={ this.context.childElement } 
          onSearch={ this.onSearchKeyword }
          onSubmit={ this.onSubmit }
          placeholder="Enter  keyword or domain"
          value={ this.searchValue }
          placeholder="Enter  keyword or domain"
        />
      
        {/* 元素导航 */}
        {
          ( !urlObj.advertisers ) && (
            <ul className="ads-samples__navs js-ads-samples__navs">
              <li 
                onClick={ event => this.switchFacebookAds('facebook', event) } 
                className={cs({ 'active': urlObj.type === 'facebook' })}
              >
                Facebook
              </li>
              <li 
                onClick={ event => this.switchNativeAds('native', 2, event) }
                className={cs({ 'active': urlObj.type === 'native' })}
              >
                Native
              </li>
              <li
                onClick={ event => this.switchNativeAds('adult', 1, event) }
                className={cs({ 'active': urlObj.type === 'adult' })}
              >
                Adult
              </li>
            </ul>
          )
        }

        <FaceBook
          location = { location } 
          data = { dataSource }
          sendArr = { sendArr }
          sortByArr = { sortByArr[sortType] }
          pageNo = { pageNo }
          onSelected = { this.onSelected }
          offerQuery = { this.offerQuery }
        />

        <Loading loading={ ( pageNo === 1 && loading ) } />
        
      </div>
    )
  }
}