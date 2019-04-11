import * as testServices from '@/services/test';

export default {
  namespace: 'app',
  state: {
    authSys: null,
    authUser: null
  },

  effects: {
  },

  reducers: {
    updateBasic(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
};
