import * as homeServices from '@/services/home';
import pathToRegexp from 'path-to-regexp'
import _ from 'lodash'
import { doMapping, deepAt } from '@/utils'
import convert from '@/utils/convert'
import Immutable from 'immutable'
const searchCfgs = {
  1: {
    name: 'Fb Creatives',
    link: '/samples?type=facebook&keyword='
  },
  2: {
    name: 'Native Creatives',
    link: '/samples?type=native&keyword='
  },
  3: {
    name: 'Adult Creatives',
    link: '/samples?type=adult&keyword='
  },
  4: {
    name: 'Offers',
    link: '/offer?keyword='
  }
}
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
    Engagement: 'engagement',
    Impression: 'impression',
    Update: 'updateTime',
  },
  sources: ['adultFlag', 'socialFlag', 'nativeFlag'],
  isFollow: 'followFlag'
}

export default {
  namespace: 'home',
  state: {
    list: Immutable.List(['1', '1', '1', '1', '1', '1']),
    analysis: {},
    params: {
      offer: {
        timeRange: '3'
      },
      ranking: {}
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathToRegexp('/home').exec(pathname)) {
          dispatch({ type: 'fetch', payload: { ...query }})
          dispatch({ type: 'fetchAnalysis', payload: {...query}})
        }
      })
    }
  },
  effects: {
    // 获取列表
    *fetch({ payload }, { call, put }) {
      let result = yield call(homeServices.fetchRecommend, payload)
      let list = result.data
      list = list.map(item => doMapping(item, itemCfgs))
      yield put({ type: 'updateList', payload: Immutable.List(list).slice(0, 6) })
    },
    *fetchAnalysis({ payload }, { call, put }) {
      let result = yield call(homeServices.fetchAnalysis, payload)
      let data = result.data
      yield put({ type: 'updateAnalysis', payload: data })
    },
    *fetchAnalysisOffer({ payload }, { call, put }) {
      let result = yield call(homeServices.fetchAnalysis, payload)
      let data = result.data
      yield put({ type: 'updateAnalysis', payload: data })
      yield put({ type: 'updateParmas', payload: { offer: payload }})
    },
    *fetchAnalysisRanking({ payload }, { call, put }) {
      let result = yield call(homeServices.fetchAnalysis, payload)
      let data = result.data
      yield put({ type: 'updateAnalysis', payload: data })
      yield put({ type: 'updateParmas', payload: { ranking: payload }})
    },
    *fetchKeyWord({ payload }, { call, put }) {
      let result = yield call(homeServices.fetchKeyword, payload)
      let data = result.data
      return data.filter(d => d.num !==0).map(({ num, type }) => {
        return {
          name: searchCfgs[type].name,
          link: searchCfgs[type].link,
          value: num
        }
      })
    }
  },

  reducers: {
    updateList(state, { payload }) {
      return {
        ...state,
        list: payload
      }
    },
    updateParmas(state, { payload }) {
      return {
        ...state,
        params: {
          ...state.params,
          ...payload
        }
      }
    },
    updateAnalysis(state, { payload }) {
      return {
        ...state,
        analysis: { ...state.analysis, ...payload }
      }
    }
  },
};
