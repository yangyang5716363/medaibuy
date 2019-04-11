import * as orderServices from '@/services/order'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import qs from 'qs'
import { message } from 'antd'

export default {
  namespace: 'order',
  state: {
    orderNo: null,
    orderDetail: {},
    orderList: [],
    subStatus: [],
    isHasPaying: false, // 如果有正在paying的订单，则其他订单不显示pay now按钮,
    isShowTips: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathToRegexp('/account/order/detail').exec(pathname)) {
          let query = qs.parse(location.search, { ignoreQueryPrefix: true })
          dispatch({ type: 'orderInfo', payload: query })
        }
        if (pathToRegexp('/account/order').exec(pathname)) {
          dispatch({ type: 'orderList' })
        }
      })
    }
  },
  effects: {
    // 
    *orderList({ payload }, { call, put }) {
      try{
        const res = yield call(orderServices.orderList, payload);
        const subStatusData = [];
        res.data.map((item) => {
          if (item.orderPayType) {
            subStatusData.push({
              subStatus: item.subStatus,
              text: item.subStatus === 1 ? 'Unsubscribe' : 'Subscription canceled',
            })
          } else {
            subStatusData.push(3)
          }
        })
        const isHasPaying = (list, arr) =>{
          list.length&&list.map(item => {
            arr.push(item.status)
            if(item.subOrders&&item.subOrders.length){
              isHasPaying(item.subOrders,arr)
            }
          })
          return arr
        }
        const isShowTips = (list) => {
          let key = false;
          list.length&&list.map(item => {
            if (item.status === 0 && item.subStatus && item.subStatus === 3 || item.status === 1) {
              key = true;
              return false
            }
          })
          return key
        }
        yield put({ 
          type: 'updateState',
          payload: {
            orderList: res.data,
            subStatus: subStatusData,
            isHasPaying: isHasPaying(res.data,[]).indexOf(1) === -1 ? false : true,
            isShowTips: isShowTips(res.data)
          }
        })
      } catch(err){
        message.error(err.message)
      }
    },
    // 
    *orderInfo({ payload }, { call, put }) {
      try{
        const res = yield call(orderServices.orderInfo, payload)
        yield put({
          type: 'updateState',
          payload: {
            orderDetail: res.data
          }
        })
      } catch(err){
        message.error(err.message)
      }
    },
    *orderSubCancel({ payload }, { call, put }) {
      try{
        yield call(orderServices.orderSubCancel, payload);
        yield put(routerRedux.push('/usercenter/order'))
      } catch(err){
        message.error(err.message)
      }
    },
    *orderCancel({ payload }, { call, put }) {
      try{
        yield call(orderServices.orderCancel, payload);
        message.success('Unsubscribe Success!')
        yield put({ type: 'orderList' });
      } catch(err){
        message.error(err.message)
      }
    },
    *continuePay({ payload = {} }, { call, put }) {
      const res = yield call(orderServices.continuePay, payload)
      window.open(res.data, '_blank')
    },
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  }, 
};
