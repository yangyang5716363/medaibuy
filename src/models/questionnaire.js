
import { getQuestionnaireList, answerSave } from '@/services/questionnaire'
import qs from 'qs'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { sortObj } from '@/utils/index'

export default {
  namespace: 'questionnaire',
  state: {
    questionData: {},
    questions: [],
    // inputData: {},
    questionnaireId: 1,
    code: 1,
    isOk: false,
  },
  effects: {
    *getQuestionnaireList({ payload }, { call, put, select}) {
      try{
        const res = yield call(getQuestionnaireList, payload)
        const { data, active } = res
        if(active){
          yield put({ type: 'user/updateState', payload: { emailSuccess: true }})
          yield put(routerRedux.push('/'))
        } else {
          yield put({
            type: 'updateState',
            payload: {
              questionData: data,
              questions: data.questions.sort(sortObj('questionSequence', 0)),
              questionnaireId: data.id,
              code: data.code
            }
          })
        }
      } catch(err){

      }
    },
    *sendAnswer({ payload }, { call, put, select}) {
      try{
        const res = yield call(answerSave, payload)
        let query = qs.parse(location.search, { ignoreQueryPrefix: true })
        let data = res.data
        const { orderNo } = query
          yield put({
            type: 'order/orderSubCancel',
            payload: { orderNo }
          })
        if (payload.questionnaireId === 2 && data) {
          
        } else if (payload.questionnaireId === 1 && data) {
          query.type == 'changeEmail' 
          ? 
          yield put(routerRedux.push(`/user/activation?email=${query.email}&code=${query.code}&type=changeEmail`))
          :
          yield put(routerRedux.push(`/user/activation?email=${query.email}&code=${query.code}`))
        }
      } catch(err){
        message.config({
          getContainer: () => document.getElementById('messageBox')
        });
        message.error(err.message)
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const search = qs.parse(location.search, { ignoreQueryPrefix: true })
        if (location.pathname === '/user/question' || location.pathname === '/user/question1' || location.pathname === '/user/question2') {
          dispatch({
            type: 'getQuestionnaireList',
            payload: { 
              code: 1,
              activeCode: search.code
            },
          });
        } else if (location.pathname === '/user/unsubscribe') {
          dispatch({
            type: 'getQuestionnaireList',
            payload: { 
              code: 2,
              activeCode: search.code ? search.code : null
            },
          });
        }
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        ...payload,
      }
    }
  }
}