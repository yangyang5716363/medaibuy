import * as offerServices from '@/services/offer'
import * as dashboardServices from '@/services/dashboard'
import pathToRegexp from 'path-to-regexp'
import _ from 'lodash'
import { doMapping, deepAt } from '@/utils'
import convert from '@/utils/convert'

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
    Traffic: 'traffic',
    'Affiliate Network': 'network',
    Update: 'updateTime',
    Engagement: 'engagement',
    Impression: 'impression',

  },
  sources: ['adultFlag', 'socialFlag', 'nativeFlag'],
  isFollow: 'followFlag'
}
export default {
  namespace: 'offer',
  state: {
    list: Immutable.List([]),
    total: 0,
    filter: [
      { _m: 'country', field: 'country', label: 'Geo', type: 'select', multiple: true,
        option: []
      },
      { _m: 'category', field: 'category', label: 'Category', type: 'select',  multiple: true, 
        option: []
      }, 
      { field: 'updateDate', label: 'Datepick', type: 'datePicker',
        placeholder: 'updateDate',
        option: [
          { value: 1, name: 'Last 1 Month', type: 'month' },
          { value: 3, name: 'Last 3 Month', type: 'month' },
          { value: 6, name: 'Last 6 Month', type: 'month' }
        ]
      },  
      { _m: 'adsSource', field: 'adsSource', label: 'Ads Source', type: 'select', multiple: true, 
        option: []
      },
      { _m: 'affiliateNetwork', field: 'affiliateNetwork', label: 'Affiliate Network', type: 'select', multiple: true, 

        option: []
      },
      { _m: 'trafficNetwork', field: 'trafficNetwork', label: 'Traffic Network', type: 'select', multiple: true, 
        option: [] 
      },

      { field: 'offerName', label: 'Offer Name', type: 'input', onSearch: offerServices.fetchOfferName },
      { field: 'publisher', label: 'Publisher', type: 'input', onSearch: offerServices.fetchPublisher },
    ],
    overview: {}, // 概况
    analysis: {}, // 分析
    domain: {} // 域名
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query, ...pre }) => {
        if (pathToRegexp('/offer').exec(pathname)) {
          dispatch({ type: 'fetch', payload: { ...query }})
        }
        if (pathToRegexp('/offer/:id').exec(pathname)) {
          let param = pathToRegexp('/offer/:id').exec(pathname)
          dispatch({ type: 'fetchDetail', payload: { id: param[1], ...query } })
        }
      })
    }
  },
  effects: {
    // 获取列表
    *fetch({ payload }, { call, put, select }) {
      let result = yield call(offerServices.fetchList, payload)
      let { list, totalCount } = result.data
      let _list = Immutable.List([])
      list = list.map(item => doMapping(item, itemCfgs))
      list = Immutable.List(list)
      if (payload.pageNo > 1) {
        _list = yield select(d => d.offer.list)
      }
      yield put({ type: 'updateList', payload:  _list.push(...list)})
      yield put({ type: 'updateTotal', payload: totalCount })
    },
    // 获取筛选条件
    *fetchFilter({ payload }, { call, put, select }) {
      let filter = yield select(d => d.offer.filter )
      let result = yield call(offerServices.fetchFilter, payload)
      let data = result.data
      filter = filter.map(d => {
        return !d._m ? d : {
          ...d,
          option: data[d._m] ? data[d._m].map(s => ({ value: s.value, name: s.key})) : []
        }
      })
      yield put({ type: 'updateFilter', payload: filter })
    },
    // 获取关键字的数据
    *fetchKeyword({ payload }, { call }) {
      let res = yield call(offerServices.fetchKeyword, payload)
      let data = res.data
      let option = Object.keys(data).reduce((array, key) => {
        return [
          ...array,
          ...data[key].map(d => ({ name: d, value: d }))
        ]
      }, [])
      return option
    },
    // 关注
    *doFollow({ payload }, { call, put, select }) {  
      const list = yield select(d => d.offer.list)
      const { index, data } = payload
      const params = { offerId: data.id }
      if (data.isFollow) {
        yield call(dashboardServices.collectAdd, params)
      } else {
        yield call(dashboardServices.collectCancel, params)
      }
      const _list = list.setIn([index, 'isFollow'], data.isFollow)
      yield put({ type: 'updateList', payload: _list })
    },
    *doDetailFollow({ payload }, { call, put, select }) {
      const params = { offerId: payload.id }
      const overview = yield select(d => d.offer.overview)
      if (payload.isFollow) {
        yield call(dashboardServices.collectAdd, params)
      } else {
        yield call(dashboardServices.collectCancel, params)
      }
      yield put({ 
        type: 'updateDetailOverview', 
        payload: {
            ...overview,
            followFlag: payload.isFollow
          } 
        })
    },
    // 获取详情概况信息
    *fetchDetail({ payload }, { call, put, select }) {
      yield put({ type: 'fetchDetailOverview', payload})
      yield put({ type: 'fetchDetailAnalysis', payload })
      // yield put({ type: 'fetchDetailDomain', payload: { domain: payload.id} })
    },
    // 获取详情概况信息
    *fetchDetailOverview({ payload }, { call, put,  select }) {
      let result = yield call(offerServices.fetchDetailOverview, payload)
      let overview = yield select(d => d.offer.overview)
      let { domain, domainId, ...data} = result.data
      yield put({ type: 'updateDetailOverview', payload: data })
      yield put({ type: 'fetchDetailDomain', payload: { domain: domain } })
    },
    // 获取详情的分析数据
    *fetchDetailAnalysis({ payload }, { call, put }) {
      let result = yield call(offerServices.fetchDetailAnalysis, payload)

      yield put({ type: 'updateDetailAnalysis', payload: result.data })
    },
    // 
    *fetchDetailDomain({ payload }, { call, put }) {
      let result = yield call(offerServices.fetchDetailDomain, payload)
      yield put({ type: 'updateDetailDomain', payload: result.data })
    }
  },

  reducers: {
    updateList(state, { payload }) {
      return {
        ...state,
        list: payload
      }
    },
    updateTotal(state, { payload }) {
      return {
        ...state,
        total: payload
      }
    },
    updateFilter(state, { payload }) {
      return {
        ...state,
        filter: payload
      }
    },
    updateDetailOverview(state, { payload }) {
      return {
        ...state,
        overview: payload
      }
    },
    updateDetailAnalysis(state, { payload }) {
      return {
        ...state,
        analysis: payload
      }
    },
    updateDetailDomain(state, { payload }) {
      return {
        ...state,
        domain: payload
      }
    },
  },
};
