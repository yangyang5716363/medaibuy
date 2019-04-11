import { Base64 } from 'js-base64'
import LzString from 'lz-string'

import _ from 'lodash'

export const clearPersist = () => {
  localStorage.removeItem('persist:idvert')
  localStorage.removeItem('authorization')
}

// 深层路径取数据
export function deepAt(object, path) {
  let result = _.at(object, path)
  return result && result[0]
}
// 映射函数
export const doMapping = (primary, tube) => {
  return _.reduce(tube, (pre, item, key) => {
    if (_.isString(item)) {
      return {
        ...pre,
        [key]: deepAt(primary, item)
      }
    } else if (_.isArray(item)) { 
      return {
        ...pre,
        [key]: item.map(d => deepAt(primary, d))
      }
    } else {
      return {
        ...pre,
        [key]: doMapping(primary, item)
      }
    }

  }, {})
}
// 使用data.sort(sortObj(type), 1)
// type为根据数组中某一字段进行排序
export function sortObj(propertyName,cond) {
  return function(object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if(cond == 1){//降序
      if (value2 < value1) {
        return - 1;
      } else if (value2 > value1) {
          return 1;
      } else {
          return 0;
      }
      }else if(cond == 0){//升序
        if (value2 < value1) {
          return  1;
      } else if (value2 > value1) {
          return - 1;
      } else {
          return 0;
      }
   }
 }
}
// URL query 加密压缩
export const compressToBase64 = (data) => {
  return LzString.compressToBase64(JSON.stringify(data))
}
// URL query 解密压缩

export const decompressFromBase64 = (str) => {
  return JSON.parse(LzString.decompressFromBase64(str))
}

// 思维导图
export const getRefferralData = ( refferralAndOutgoing = {} ) => {
  const { externalChainList = [], jumpOutList = [], domain } = refferralAndOutgoing
  const [ leftURL, leftCount, rightURL, rightCount ] = [ [], [], [], [] ]
  const fn = v => `${parseInt( v * 10000 ) / 100}%`

  externalChainList.forEach((v, key) => {
    leftURL.push({
      value: v.domain,
      key,
    })
  })

  externalChainList.forEach((v, key) => {
    leftCount.push({
      value: fn( v.ratio ),
      proportion: fn( v.mom ),
    })
  })

  jumpOutList.forEach((v, key) => {
    rightURL.push({
      value: v.domain,
      key,
    })
  })
  
  jumpOutList.forEach((v, key) => {
    rightCount.push({
      value: fn( v.ratio ),
      proportion: fn( v.mom ),
    })
  })

  return {
    leftURL,
    leftCount,
    rightURL,
    rightCount,
    content: domain,
  }
}

export const getURLParam = () => {
  const urlObj = {}
  const urls = location.search.replace('?', '')
  urls.split('&').forEach(value => {
    urlObj[value.split('=')[0]] = value.split('=')[1]
  })
  return urlObj
}

export const getBrowserInfo = () => {
  let Sys = {}
  let ua = navigator.userAgent.toLowerCase()
  let re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/
  let m = ua.match(re)
  Sys.browser = m[1].replace(/version/, "safari")
  Sys.ver = m[2]
  return Sys
}