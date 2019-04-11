import pathToRegexp from 'path-to-regexp';
import * as dashboardServices  from '@/services/dashboard';
import { doMapping, deepAt } from '@/utils'
import Immutable from 'immutable'
const itemCfgs = {
  id: 'id',
  logo: 'iconUrl',
  title: 'name',
  desc: 'title',
  grid: {
    Ads: 'adNum',
    Category: 'category',
    Geo: 'geoNum',
    Update: 'updateTime',
    Engagement: 'engagement',
    Impression: 'impression',
    Traffic: 'traffic'
  },
  sources: ['adultFlag', 'socialFlag', 'nativeFlag'],
  isFollow: 'followFlag'
}
const applications = ({ obj, item, v }) => {
  obj.applications = []
  if ( item.adType === 4 ) {
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
  if ( item.adType !== 4 ) {
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
const mirrorData = result => {
  const cache = {}
  result.forEach(item => {
    let v = item.objVO
    if(v) {
      const adInfoVO = v.adInfoVO[0]
      const advertiserVO = v.advertiserVO
      cache[v.adId] = {}
      let obj = cache[v.adId]
      obj.type = item.adType === 4 ? 'facebook' : (v.dspAdType === 1 ? 'adult' : 'native')
      obj.adId = v.adId // 参数
      obj.id = v.socialAdId // 参数
      obj.domain = advertiserVO.domain // 参数
      obj.domainId = advertiserVO.domainId // 参数
      obj.codFlag = v.codFlag  // COD 参数
      obj.icon = 'collection' // 是否收藏
      obj.logo = advertiserVO.picUrl
      obj.collection = 'Collection'
      obj.logoTitle = advertiserVO.name
      obj.description = adInfoVO.message
      obj.images = { ...obj.images, ...{ type: 'static', src: adInfoVO.url } }
      obj.title = adInfoVO.title
      obj.introduction = adInfoVO.description
      applications({ obj, item, v })
      obj.original = {
        content: advertiserVO.domain,
        adSourceUrl: advertiserVO.url
      }
      obj.more = v.action
    }
  })
  return Object.values(cache)
}
export default {
  namespace: 'dashboard',
  state: {
    queryHotSearchHistory: [{ search: 'google.com' }, { search: 'Flore App' }, { search: 'fireworks' }, { search: 'sanygroup.com' }, { search: 'taobao.com' }], // 查询热门搜索
    queryThreeMonthsLatelyCollectMessage: [], // 查询关注/收藏消息列表
    queryCollectList: [], // 关注收藏列表
    queryLatestSearchHistory: [], // 查询最近搜索历史记录
    FbList: Immutable.List([]),
    OfferList: Immutable.List([]),
    FbListClone: Immutable.List([]),
    updateParams: {},
    fbParams: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // const match = pathToRegexp('/account/dashboard').exec(pathname)
        // if (match) {
        //   dispatch({ type: 'collectList', payload: { pageNo: 1, pageSize: 20 } })
        //   dispatch({ type: 'historyList', payload: { pageNo: 1, pageSize: 20 } })
        // }
        if (pathToRegexp('/account/favorites').exec(pathname)) {
          dispatch({ type: 'collectList', payload: { pageNo: 1, pageSize: 20 } })
        }
      });
    },
  },
  effects: {
    //查询关注收藏--> offer, ads 列表
    *collectList({ payload }, { call, put }) {
      const result = yield call(dashboardServices.collectList, payload)
      let { list } = result.data
      let offerData = list.filter( item => item.collectType === 3 && item.objVO)
      let _offerlist = Immutable.List([])
      offerData.forEach(item => {
        item.objVO.followFlag = true
      })
      offerData = offerData.map(item => doMapping(item.objVO, itemCfgs))
      offerData = Immutable.List(offerData)
      let fbData = list.filter( item => item.collectType === 2)
      let _fblist = Immutable.List([])
      fbData = mirrorData(fbData)
      fbData = Immutable.List(fbData)
      yield put({ 
        type: 'updateState', 
        payload: { 
          OfferList: _offerlist.push(...offerData),
          updateParams: {
            totalCount: offerData.size,
          },
          FbList: _fblist.push(...fbData),
          FbListClone: _fblist.push(...fbData),
          fbParams: {
            totalCount: fbData.size
          },
        } 
      })
    },
    //查询关注收藏--> offer列表
    *collectListOffer({ payload: _payload }, { call, put, select }) {
      let { totalCount: _totalCount, ...payload } = _payload
      const result = yield call(dashboardServices.collectList, payload)
      let { list, pageNo, totalCount } = result.data
      let _list = Immutable.List([])
      list.forEach(item => {
        item.objVO.followFlag = true
      })
      list = list.map(item => doMapping(item.objVO, itemCfgs))
      list = Immutable.List(list)
      if (payload.pageNo >= 1) {
        _list = yield select(d => d.dashboard.OfferList)
      }
      yield put({ 
        type: 'updateState', 
        payload: { 
          OfferList: _list.push(...list),
          updateParams: {
            totalCount,
            pageNo,
          }
        } 
      })
    },
    //offer取消关注
    *collectCancel({ payload }, { call, put, select }) {
      let dashboardData = yield select(d => d.dashboard)
      let _offerlist = dashboardData.OfferList
      let _FbList = dashboardData.FbList
      let _FbListClone = dashboardData.FbListClone
      let params = null
      if(payload.type === 'offers') {
        _offerlist = dashboardData.OfferList.delete(payload.index)
        params = { offerId: payload.data.id }
      }
      if(payload.type === 'ads') {
        _FbList = dashboardData.FbList.filter(item => item.adId != payload.adId)
        _FbListClone = dashboardData.FbListClone.filter(item => item.adId != payload.adId)
        params = { adId: payload.adId }
      }
      yield call(dashboardServices.collectCancel, params)
      yield put({ 
        type: 'updateState', 
        payload: { 
          OfferList: _offerlist,
          updateParams: {
            totalCount: _offerlist.size,
            pageNo: Math.ceil(dashboardData.updateParams.pageNo/20),
          },
          FbList: _FbList,
          FbListClone: _FbListClone,
          fbParams: {
            totalCount: _FbList.size
          },
        } 
      })
    },
    //查询最近搜索历史记录
    *historyList({ payload }, { call, put }) {
      const res = yield call(dashboardServices.historyList, payload)
      yield put({
        type: 'updateState',
        payload: {
          queryLatestSearchHistory: res.data,
        },
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateParams(state, { payload }) {
      return {
        ...state,
        params: payload
      }
    },
  },
};
