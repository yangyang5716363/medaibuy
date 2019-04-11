import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import SetTransform from '@/utils/SetTransform'
import onError from '@/utils/onError'

const persistConfig = {
  key: 'idvert',
  storage,
  whitelist: ['app', 'user'],
  transforms: [SetTransform] // 持久化数据转换
}
// 数据持久化
const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store);
  return {...store, persist };
}

export const dva = {
  config: {
    onError: onError,
    extraEnhancers: [persistEnhancer()]
  }
}
