import * as userServices from '@/services/user'
import router from 'umi/router'
import pathToRegexp from 'path-to-regexp'
import qs from 'qs'
import { message } from 'antd'
import lodash from 'lodash'
import { formatMessage } from 'umi-plugin-locale'
import { clearPersist, deepAt } from '@/utils'
import cfgs from '@/cfgs'

export default {
  namespace: 'user',
  state: {
    loginError: false,
    registerError: false,
    randomCode: 0,
    progress: 'verification', // 重设密码进行到的阶段 
    findPasswordType: 'email',
    currentUser: {},
    encryptRecord: null,
    userInfo: {},
    channelFlag: false,
    emailSuccess: true,  // 邮箱验证状态标志
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathToRegexp('/home').exec(pathname)) {
          // dispatch({ type: 'initInfo', payload: {} })
        }
      })
    }
  },
  effects: {
    // 注册
    *register({ payload }, { call, put }) {
      let params = `email=${payload.account}&channelFlag=false&source=mediabuy`
      try{
        const res = yield call(userServices.register, payload);
        window.open(`${cfgs.normal}/user/message?${params}&kjbAuthKey=${res.authorization}`, '_self')
      } catch(err){
        yield put({
          type: 'updateState',
          payload: {
            loginError: true,
            errorMsg: formatMessage({ id: 'app.user.registerErrorTips' }),
          },
        })
      }
    },
    // 登录验证码校验
    *checkValCode({ payload }, { call, put }) {
      try{
        const {valCode, ...others} = payload
        const params = {valCode: valCode}
        const res = yield call(userServices.checkValCode, params);
        if (res.data) {
          yield put({
            type: 'login',
            payload: others
          })
        } else {
          yield put({
            type: 'updateState',
            payload: {
              loginError: true,
              errorMsg: 'Verification code error',
              randomCode: Math.random(),
            },
          })
        }
      } catch(err){
        message.error(err.message)
      }
    },
    // 登录
    *login({ payload }, { call, put }) {
      try {
        const searchObj = qs.parse(location.search, { ignoreQueryPrefix: true })
        let rest = searchObj.inviteId && searchObj.productId ? searchObj : {}
        let result = yield call(userServices.login, { ...payload, ...rest })
        let { data, account, useage, auth } = result
        let { authorization, ...otherUserInfo } = data
        let { productMsg } = useage
        let userInfo = { ...account, ...otherUserInfo, useage}
        // if(productMsg && productMsg.length){
          yield put({ type: 'updateState', payload: { userInfo } })
          let { member: authUser, sys: authSys } = auth
          let authInfo = { authorization, authSys, authUser }
          yield put({ type: 'app/updateBasic', payload: authInfo })
          localStorage.setItem('authorization', authorization)
          router.push('/')
        // } else{
        //   let params = `kjbAuthKey=${authorization}&email=${account.email}&channelFlag=${data.channelFlag}`
        //   window.open(`${cfgs.normalAds}?${params}`, '_self')
        // }
      } catch(err){
        yield put({
          type: 'updateState',
          payload: {
            loginError: true,
            errorMsg: err.message,
            randomCode: Math.random(),
          },
        });
      }
    },
    // 退出登录
    *logout({ payload = { } }, { call, put }) {
      yield call(userServices.logout, payload)
      router.push('/user/login')
      yield put({ type: 'loginoutClear' })
      clearPersist()
    },
    // 用户信息接口,其他事件时调用
    *getMyInfo({ payload = { } }, { call, put, select }) {
      let userInfoClone = yield select(d => d.user.userInfo )
      try{
        const result = yield call(userServices.getMyInfo, payload);
        let { account, useage } = result.data
        let newUserInfo = { ...account, useage}
        let userInfo = Object.assign(userInfoClone,newUserInfo)
        yield put({ type: 'user/updateState', payload: { userInfo } })
      } catch(err){

      }
    },
    // 产品使用量(右上角提示)
    *defaultUseage({ payload = { } }, { call, put, select }) {
      let userInfoClone = yield select(d => d.user.userInfo )
      try{
        const res = yield call(userServices.defaultUseage, payload)
        let newUserInfo = {
          useage:res.data
        }
        let userInfo = Object.assign(userInfoClone,newUserInfo)
        yield put({ type: 'updateState', payload: { userInfo } })
      } catch(err){

      }
    },
    // 
    *forgetCheck({ payload }, { call, put }) {
      try{
        const {valCode, ...others} = payload
        const params = {valCode: valCode}
        const res = yield call(userServices.checkValCode, params);
        if (res.data) {
          yield put({
            type: 'doforgetPassword',
            payload: others
          })
        }
      } catch(err) {

      }
    },
    // 验证忘记密码的邮箱是否注册
    *doforgetPassword({ payload }, { call, put }) {
      try{
        const res = yield call(userServices.querySafeSetByEmail, payload);
        yield put({
          type: 'querySafeSetByEmailSuccess',
          payload: { ...res.data, email: payload.email },
        });
      } catch(err){
        message.error(err.message)
      }
    },
    *querySafeSetByEmailSuccess({ payload }, { call, put }) {
      yield put({
        type: 'goProgress',
        payload: {
          progress: 'findType',
        },
      });
    },
    // 发送邮件重置密码
    *sendForgetPasswordEmail({ payload }, { call, put }) {
      try{
        yield call(userServices.sendForgetPasswordEmail, payload);
        yield put({
          type: 'goProgress',
          payload: {
            progress: 'verificationEmail',
          },
        });
      } catch(err){
        message.error(err.message)
      }
    },
    // 获取密保问题
    *querySecurityQuestion({ payload }, { call, put }) {
      try{
        const res = yield call(userServices.querySecurityQuestion, payload);
        yield put({
          type: 'querySecurityQuestionSuccess',
          payload: res.data,
        });
      } catch(err){
        message.error(err.message)
      }
    },
    // 验证密保问题
    *verifySecurityQuestion({ payload }, { call, put }) {
      try{
        yield call(userServices.verifySecurityQuestion, payload);
        yield put({
          type: 'goProgress',
          payload: {
            progress: 'passwordReset',
          },
        });
        yield put({
          type: 'setFindPasswordType',
          payload: {
            findType: 'question',
          },
        });
      } catch(err){
        message.error(err.message)
      }
    },
    // 密保方式更新密码
    *updatePasswordByQuestion({ payload }, { call, put }) {
      try{
        yield call(userServices.updatePasswordByQuestion, payload);
        yield put({
          type: 'goProgress',
          payload: {
            progress: 'finished',
          },
        });
      } catch(err){
        message.error(res.desc);
      }
    },
    // 邮件方式更新密码
    *updatePasswordByEmail({ payload }, { call, put }) {
      try{
        yield call(userServices.updatePasswordByEmail, payload);
        yield put({
          type: 'goProgress',
          payload: {
            progress: 'finished',
          },
        });
      } catch(err){
        message.error(res.desc);
      }
    },
    // 邮箱解密(找回密码验证)  邮件方式更新密码时,需先调用此接口
    *decryptEmail({ payload }, { call, put }) {
      try{
        const res = yield call(userServices.decryptEmail, payload);
        yield put({
          type: 'goProgress',
          payload: {
            email: res.data,
            encryptRecord: payload.encryptRecord,
            progress: 'passwordReset',
          },
        });
      } catch(err){
        message.error(res.desc);
      }
    },
    *emailDirect({ payload }, { call, put, select }) {
      const params = qs.parse(location.search, { ignoreQueryPrefix: true });
      let encryptRecord = null;
      if (params.encryptRecord) {
        encryptRecord = params.encryptRecord.trim();
        yield put({
          type: 'decryptEmail',
          payload: {
            encryptRecord,
          },
        });
      }
    },
    *changeEmail({ payload }, { call, put }) {
      try {
        yield call(userServices.changeEmail, payload)
        yield put({ type: 'updateState', payload: { emailSuccess: true }})
        yield put({ type: 'getMyInfo' })
      } catch(err) {
        yield put({ type: 'updateState', payload: { emailSuccess: false }})
      }
    },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    updateInitInfo(state, { payload }) {
      localStorage.setItem('email', payload.myInfo.email);
      return {
        ...state,
        privacyStatus: payload.myInfo.privacyStatus,
        myInfo: payload.myInfo,
        currentUser: { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', ...payload.myInfo },
      };
    },
    querySafeSetByEmailSuccess(state, { payload }) {
      return {
        ...state,
        currentUser: { ...state.currentUser, ...payload },
      };
    },
    querySecurityQuestionSuccess(state, { payload }) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          questionCode1: payload.questionCode1,
          questionCode2: payload.questionCode2,
          questionCode3: payload.questionCode3,
          id: payload.id,
          memberId: payload.memberId,
        },
      };
    },
    setFindPasswordType(state, { payload }) {
      return {
        ...state,
        findPasswordType: payload.findType,
      };
    },
    goProgress(state, { payload }) {
      return {
        ...state,
        progress: payload.progress,
        email: payload.email || state.email,
        encryptRecord: payload.encryptRecord || state.encryptRecord,
      };
    },
    loginoutClear(state, { payload }) {
      return {
        loginError: false,
        randomCode: 0,
        progress: 'verification',
        findPasswordType: 'email',
        currentUser: {},
        encryptRecord: null,
        userInfo: {},
        channelFlag: false,
        emailSuccess: true,  
      };
    },
  }, 
};
