// import * as usercenterServices from '@/services/usercenter';
import * as usercenterServices from '@/services/user';
import router from 'umi/router';
import pathToRegexp from 'path-to-regexp'
import MD5 from 'md5'
import moment from 'moment'
import qs from 'qs';
import { message } from 'antd';

export default {
  namespace: 'usercenter',
  state: {
    securityPasswordVisible: false,
    securityEmailVisible: false,
    securityQuestionVisible: false,
    securityQuestionData: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathToRegexp('/account/info').exec(pathname)) {
          dispatch({ type: 'querySecurityQuestion', payload: {} })
        }
        if (pathToRegexp('/account/channel').exec(pathname)) {
          dispatch({ type: 'channelUserList', payload: { } })
          dispatch({ 
            type: 'channelUserCount', 
            payload: { 
              date: moment().format('YYYY-MM-DD'),
              timeZone: new Date().getTimezoneOffset()/60+'' 
            } 
          })
          dispatch({ type: 'channelOrderList', payload: { } })
          dispatch({ type: 'channelOrderCount', payload: { timeZone: new Date().getTimezoneOffset()/60+'' } })
        }
      })
    }
  },
  effects: {
    // 更新用户信息
    *updateInfo({ payload }, { call, put }) {
      try{
        yield call(usercenterServices.updateInfo, payload);
        message.success('Info update success!');
        yield put({type: 'user/getMyInfo'})
      } catch(err){
        message.error(err.message)
      }
    },
    // 更新用户密码
    *updatePassword({ payload }, { call, put }) {
      try{
        const params = {
          newPassword: MD5(payload.newPassword),
          oldPassword: MD5(payload.oldPassword),
        }
        const res = yield call(usercenterServices.updatePassword, params);
        message.success('Password update success!');
        yield put({
          type: 'updateState',
          payload:{
            securityPasswordVisible: false,
          }
        })
      } catch(err){
        message.error(err.message)
      }
    },
    // 更新用户密保问题
    *saveSecurityQuestion({ payload }, { call, put, select }) {
      let securityQuestionData = yield select(d => d.usercenter.securityQuestionData )
      try{
        const { password, ...other } = payload
        const params = {
          password: MD5(password),
          id: securityQuestionData ? securityQuestionData.id : null ,
          ...other
        }
        yield call(usercenterServices.saveSecurityQuestion, params);
        yield put({
          type: 'updateState',
          payload:{
            securityQuestionVisible: false,
          }
        })
        yield put({type: 'user/getMyInfo'})
        yield put({type: 'querySecurityQuestion'})
      } catch(err){
        message.error(err.message)
      }
    },
    // 查看密保信息
    *querySecurityQuestion({ payload }, { call, put }) {
      try{
        const res = yield call(usercenterServices.queryCenterSecurityQuestion);
        yield put({
          type: 'updateState',
          payload:{
            securityQuestionData: res.data ? res.data : null,
          }
        })
      } catch(err){
        message.error(err.message)
      }
    },
    // 更换邮箱 发送邮件
    *sendChangeEmail({ payload }, { call, put }) {
      const { password, ...other } = payload
      const params = {
        password: MD5(password),
        ...other
      }
      try{
        const res = yield call(usercenterServices.sendChangeEmail, params);
        message.success('Email send success!');
        yield put({
          type: 'updateState',
          payload:{
            securityEmailVisible: false,
          }
        })
      } catch(err){
        message.error(err.message)
      }
    },
    // 渠道用户列表
    *channelUserList({ payload }, { call, put }) {
      const res = yield call(usercenterServices.channelUserList, payload);
      let data = res.data
      let { list, ..._pagination } = data
      let { pageNo: current, pageSize, totalCount: total } = _pagination
      let pagination = { current, pageSize, total } 
      yield put({ 
        type: 'updateState', 
        payload:{ 
          channelUserList: list,
          channelUserPagination: pagination,
        } 
      })
    },
    // 渠道订单列表
    *channelOrderList({ payload }, { call, put }) {
      const res = yield call(usercenterServices.channelOrderList, payload);
      let data = res.data
      let { list, ..._pagination } = data
      let { pageNo: current, pageSize, totalCount: total } = _pagination
      let pagination = { current, pageSize, total } 
      yield put({ 
        type: 'updateState', 
        payload:{ 
          channelOrderList: list,
          channelOrderPagination: pagination,
        } 
      })
    },
    // 渠道用户统计
    *channelUserCount({ payload }, { call, put }) {
      const res = yield call(usercenterServices.channelUserCount, payload);
      yield put({ 
        type: 'updateState', 
        payload:{ 
          channelUserCount: res.data,
        } 
      })
    },
    // 渠道用订单统计
    *channelOrderCount({ payload }, { call, put }) {
      const res = yield call(usercenterServices.channelOrderCount, payload);
      yield put({ 
        type: 'updateState', 
        payload:{ 
          channelOrderCount: res.data,
        } 
      })
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
