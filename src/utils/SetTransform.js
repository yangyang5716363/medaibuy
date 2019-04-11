import { createTransform } from 'redux-persist'
import { Base64 } from 'js-base64'
// 在state被序列化和持久化的过程中进行转换
function inBound(inboundState, key) {
  // return Object.keys(inboundState).reduce((pre, key) => {
  //   return {
  //     ...pre,
  //     [key]: typeof inboundState[key] === 'object' ? 
  //       Base64.encode(JSON.stringify(inboundState[key])) 
  //       : Base64.encode(inboundState[key]) 
  //   }
  // }, {})
  return inboundState
}
// 从缓存中取出数据转换工程
function outBound(outboundState) {
  // return Object.keys(outboundState).reduce((pre, key) => {
  //   return {
  //     ...pre,
  //     [key]: JSON.parse(Base64.decode(outboundState[key]))
  //   }
  // }, {})
  return outboundState
}

// 白名单
const whitelist = {
  whitelist: ['app', 'user']
}

export default createTransform(inBound, outBound, whitelist)
