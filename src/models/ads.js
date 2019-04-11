import * as offerServices from '@/services/ads'
import Immutable from 'immutable'
import { facebook, combine, native, adult } from '@/pages/ads/data'
import { getURLParam } from '@/utils'

// Native Audlt Filter 数据
const setNativeSource = res => {
  if ( !res ) return false

  let object = {}

  if ( getURLParam().type === 'native' ) {
    object = native[0]

  } else {
    object = adult[0]
  }
  
  object.option.map(op => {
    // 日期过滤掉 不重新赋值
    if ( op.field !== 'firstSeenDate' && 
      op.field !== 'lastSeenDate' &&
      op.field !== 'picWidthRange' &&
      op.field !== 'offerName' ) {
      op.option = []
    }
    if ( res[op.field] ) {
      res[op.field].forEach(ro => {
        op.option.push({ value: ro.value, name: ro.key })
      })
    }
  })

  return [object]
}

// Facebook Filter 数据
const setFacebookSource = res => {
  if ( !res ) return false

  combine.option.map(op => {
    if ( op.field !== 'offerName' ) {
      op.option = []
    }

    if ( res[op.field] ) {
      res[op.field].forEach(ro => {
        op.option.push({ value: ro.value, name: ro.key })
      })
    }
  })

  return facebook
}

const applications = ({ obj, v }) => {
  obj.applications = []

  if ( getURLParam().type === 'facebook' ) {
    obj.applications.push({
      type: 'thumbs-up',
      value: v.likes,
      title: 'like',
    })

    obj.applications.push({
      type: 'message',
      value: v.comments,
      title: 'comments',
    })

    obj.applications.push({
      type: 'bounce',
      value: v.shares,
      title: 'forward',
    })
  }
  
  obj.applications.push({
    type: 'time',
    value: v.days,
    title: 'duration',
  })
  
  if ( getURLParam().type !== 'facebook' ) {
    obj.applications.push({
      type: 'mobile',
      value: v.deviceNum,
      title: 'Devices',
    })

    obj.applications.push({
      type: 'global',
      value: v.geoNum,
      title: 'Geo',
    })
    
    obj.applications.push({
      type: 'users',
      value: v.publiherNum,
      title: 'Publishers',
    })
  }

  if ( v.firstSeenDate && v.lastSeenDate ) {
    obj.applications.push({
      type: 'eye',
      value: `${v.firstSeenDate}~${v.lastSeenDate}`,
      title: 'first seen~last seen',
    })
  }
}

// 根据类型拼接图片 1: 图片 2: 文字 3: 视频 4: 轮播
const getImages = (obj, v) => {
  const { showType, adInfoVO } = v
  const imagesType = {
    '1': () => 'static',
    '3': () => 'staticPlay',
    '4': () => 'staticScroll'
  }
  obj.images = { 
    type: imagesType[showType](), 
    src: adInfoVO[0].url 
  } 
}

const mirrorData = result => {
  const cache = {}
  const keyword = getURLParam().keyword

  result.forEach(v => {
    const adInfoVO = v.adInfoVO[0]
    const advertiserVO = v.advertiserVO
    cache[v.adId] = {}
    let obj = cache[v.adId]
    obj.height = adInfoVO.picHeight
    obj.width = adInfoVO.picWidth
    obj.adId = v.adId // 参数
    obj.domain = advertiserVO.domain // 参数
    obj.domainId = advertiserVO.domainId // 参数
    obj.codFlag = v.codFlag  // COD 参数
    obj.icon = v.followFlag ? 'collection' : 'collection-o' // 是否收藏
    obj.logo = advertiserVO.picUrl
    obj.collection = 'Collection'
    obj.logoTitle = advertiserVO.name
    obj.description = adInfoVO.message
    getImages(obj, v)
    const reg = new RegExp('(' + advertiserVO.domain + ')', 'gim')
    obj.title = keyword ? adInfoVO.title.replace(reg, `<b class="red">$1</b>`) : adInfoVO.title
    obj.introduction = adInfoVO.description
    applications({ obj, v })
    obj.original = {
      content: advertiserVO.domain,
      adSourceUrl: advertiserVO.url,
      color: keyword ? true : false
    }
    obj.more = v.action
  })

  return Object.values(cache)
}

const searchData = result => {
  return result.map((value, key) => ({
    name: value,
    value,
  }))
}

export default {
  namespace: 'ads',
  state: {
    list: Immutable.List([]),
    facebookFilter: [],
    nativeFilter: [],
    adultFilter: [],
    isNative: false,
    isFB: false,
    fbParams: { 
      pageNo: 1, 
      pageSize: 20, 
      dspAdType: '',
    },
    pageSum: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      
    }
  },

  // 异步
  effects: {
    *fetch({ payload }, { call, put, select }) {
      let result = yield call(offerServices.facebookList, payload)
      let { list, totalCount, totalPages } = result.data
      let __list = yield select(d => d.ads.list)
      let pageSum = result.data.pageNo
      list = mirrorData(list)
      
      if ( payload.pageNo !== 1 ) {
        __list = yield select(d => d.ads.list)
        __list = __list.push(...list) || []
      } else {
        __list = Immutable.List( list )
      }
      
      yield put({ type: 'updateIsFB', payload: false })
      yield put({ type: 'updateList', payload: { __list, totalCount, totalPages, pageSum }})
    },

    *native({ payload }, { call, put, select }) {
      let result = yield call(offerServices.nativeList, payload)
      let { list, totalCount, totalPages } = result.data
      let __list = yield select(d => d.ads.list)
      let pageSum = result.data.pageNo
      list = mirrorData(list)

      if ( payload.pageNo !== 1 ) {
        __list = yield select(d => d.ads.list)
        __list = __list.push(...list)

      } else {
        __list = Immutable.List( list )
      }

      yield put({ type: 'updateIsNative', payload: false })
      yield put({ type: 'updateList', payload: { __list, totalCount, totalPages, pageSum } })
    },

    *nativeAdult({ payload }, { call, put, select }) {
      let result = yield call(offerServices.adultList, payload)
      let { ipLimitFlag } = result
      let { list, totalCount, totalPages } = result.data
      let __list = yield select(d => d.ads.list)
      let pageSum = result.data.pageNo
      list = mirrorData(list)

      if ( payload.pageNo !== 1 ) {
        __list = yield select(d => d.ads.list)
        __list = __list.push(...list)

      } else {
        __list = Immutable.List( list )
      }

      yield put({ type: 'updateIsNative', payload: false })
      yield put({ type: 'updateList', payload: { __list, totalCount, totalPages, ipLimitFlag, pageSum } })
    },

    *search({ payload }, { call, put, select }) {
      let result = yield call(offerServices.search, payload)
      return searchData(result.data.keywords)
    },

    *searchNativeDsp({ payload }, { call, put, select }) {
      let result = yield call(offerServices.searchNativeDsp, payload)
      return searchData(result.data.keywords)
    },

    *searchAdultDsp({ payload }, { call, put, select }) {
      let result = yield call(offerServices.searchAdultDsp, payload)
      return searchData(result.data.keywords)
    },

    *fetchFacebookFilter({ payload }, { call, put, select }) {
      let result = yield call(offerServices.facebookFilter, payload)
      let facebookFilter = setFacebookSource( result.data )
      yield put({ type: 'updateFacebookFilter', payload: facebookFilter })
    },

    *fetchNativeFilter({ payload }, { call, put, select }) {
      let result = yield call(offerServices.nativeFilter, payload)
      let nativeFilter = setNativeSource( result.data )
      yield put({ type: 'updateNativeFilter', payload: nativeFilter })
    },
    
    *fetchAdultFilter({ payload }, { call, put, select }) {
      let result = yield call(offerServices.adultFilter, payload)
      let adultFilter = setNativeSource( result.data )
      yield put({ type: 'updateAdultFilter', payload: adultFilter })
    }
  },

  // 同步
  reducers: {
    updateList(state, { payload }) {
      return {
        ...state,
        list: payload.__list,
        totalCount: payload.totalCount, 
        totalPages: payload.totalPages,
        ipLimitFlag: payload.ipLimitFlag,
        pageSum: payload.pageSum,
      }
    },
    updateFacebookFilter(state, { payload }) {
      return {
        ...state,
        facebookFilter: payload
      }
    },
    updateNativeFilter(state, { payload }) {
      return {
        ...state,
        nativeFilter: payload
      }
    },
    updateAdultFilter(state, { payload }) {
      return {
        ...state,
        adultFilter: payload
      }
    },
    updateIsNative(state, { payload }) {
      return {
        ...state,
        isNative: payload
      }
    },
    updateIsFB(state, { payload }) {
      return {
        ...state,
        isFB: payload
      }
    },
    updateFbParams(state, { payload }) {
      return {
        ...state,
        fbParams: payload
      }
    },
  }
}