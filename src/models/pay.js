import pathToRegexp from 'path-to-regexp';
import qs from 'qs';
import { message } from 'antd'
import router from 'umi/router';
import * as payServices from '@/services/pay';
export default {
  namespace: 'pay',
  state: {
    payConfirmDataKey: '',
    agreementLink: '', // 有用
    planId: null, // 订单确认页面，pay/payConfirm
    pcode: null, // 订单确认页面，pay/payConfirm
    buyFlag: true,
    payConfirmData: {}, // 有用
    orderDetailData: {}, // 有用
    isBuy: false, // 有用
    isBuy2: true, // 有用
    isBuy3: false, // 有用
    isMoreBuy1: false, // 有用
    isMoreBuy2: false, // 有用
    isMoreBuy3: false, // 有用
    isMoreBuy4: false, // 有用
    isMoreBuy5: false, // 有用
    productToShop: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathToRegexp('/pay/payBuy').exec(pathname)) {
          const payBuymatch = qs.parse(location.search, { ignoreQueryPrefix: true })
          // normal平台过来,携带token,需要强制登录
          payBuymatch.kjbAuthKey&&localStorage.setItem('authorization',payBuymatch.kjbAuthKey)
          payBuymatch.kjbAuthKey&&dispatch({ type: 'user/getMyInfo' });
          // 在购买页面，当是登陆用户的时候，我们要进行一下判断
          if (localStorage.getItem('authorization')) {
            dispatch({ type: 'productToShop', payload: { payNo: 1} });
          }
        }
        if (pathToRegexp('/pay/payConfirm').exec(pathname)) {
          const match = qs.parse(location.search, { ignoreQueryPrefix: true })
          if (match && (match.planId || match.pcode) && match.buyFlag) {
            const buyFlag = match.buyFlag === 'true' ? true : false
            dispatch({ type: 'planPrebuy', payload: { planId: match.planId, pcode: match.pcode, buyFlag: buyFlag }});
            dispatch({ type: 'updateState', payload: { planId: match.planId, pcode: match.pcode, buyFlag: buyFlag }});
          } else {
            history.push('/')
          }
        }
        if (pathToRegexp('/pay/payInfo').exec(pathname)) {
          const payOrdermatch = qs.parse(location.search, { ignoreQueryPrefix: true })
          if (payOrdermatch && (payOrdermatch.planId || payOrdermatch.pcode) && payOrdermatch.buyFlag) {
            // 从购买页面过来执行if语句，从订单中心过来执行else语句，直接查看订单详情
            const buyFlag = payOrdermatch.buyFlag === 'true' ? true : false
            dispatch({ type: 'orderDetail', payload: { planId: payOrdermatch.planId, pcode: payOrdermatch.pcode, buyFlag: buyFlag } });
          } else if (payOrdermatch && payOrdermatch.orderNo) {
            dispatch({ type: 'planRebuy', payload: { orderNo: payOrdermatch.orderNo } });
          }
        }

      });
    },
  },
  effects: {
    *orderDetail({ payload }, { call, put }) {
      const res = yield call(payServices.orderDetail, payload);
      if (res.data.success) {
        yield put({
          type: 'updateState',
          payload: {
            orderDetailData: res.data,
          },
        });
      }
    },

    *planRebuy({ payload }, { call, put }) {
      try{
        const res = yield call(payServices.planRebuy, payload)
        if (res.data.success) {
          yield put({
            type: 'updateState',
            payload: {
              orderDetailData: res.data,
              buyFlag: res.data.opt === 'buy' ? true : false
            },
          });
        }
      } catch(err){
        message.error(err.message)
      }
    },

    *planPrebuy({ payload }, { call, put }) {
      const res = yield call(payServices.planPrebuy, payload);
      if (res.data.success) {
        yield put({
          type: 'updateState',
          payload: {
            payConfirmData: res.data,
          },
        });
      }
    },

    *planValidate({ payload }, { call }) {
      console.log(payload)
      const parmas = { pcode: payload.pcode }
      yield call(payServices.planValidate, parmas);
      router.push(`/pay/payConfirm?pcode=${payload.pcode}&buyFlag=${payload.buyFlag}`)
    },

    *planAgreement({ payload }, { call }) {
      const res = yield call(payServices.planAgreement, payload);
      window.location.href = res.data.agreementLink;
    },
    *productToShop({ payload }, { call, put }) {
      const res = yield call(payServices.productToShop, payload);
      yield put({
        type: 'updateState',
        payload: {
          productToShop: res.data,
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
  },
};
