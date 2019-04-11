/*
 * @Author: wangjingbo 
 * @Date: 2019-03-24 16:04:53 
 * @Last Modified by: wangjingbo
 * @Last Modified time: 2019-04-11 16:06:41
 */
import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'

const API_MOCK = '/api_mock'
const API_WEB = '/api_web'
const API_LOGIN = '/api_user'

let CancelToken = axios.CancelToken // 创建取消令牌

window.REQUEST_LIST = [] // 创建所有请求表

// 寻找相同请求，并关闭
function cancelHandle(config) {
  for (let idx in window.REQUEST_LIST ) {
    let item = window.REQUEST_LIST[idx]
    if (item.url === config.url) {
      item.cancel && item.cancel()
      window.REQUEST_LIST.splice(idx, 1)
    }
  }
}
// // 添加统一拦截请求器
axios.interceptors.request.use(config => {
  cancelHandle(config)
  config.cancelToken = new CancelToken(c => {
    window.REQUEST_LIST.push({
      url: config.url,
      cancel: c
    })
  })
  return config
}, error => {
})

axios.interceptors.response.use(response=>{
  cancelHandle(response.config)
  return response;
}, error => {
  window._axiosList = []
  if (axios.isCancel(error)) {
    return Promise.reject(new CustomError({ 
      10001: 'request is cancel' 
    }))
  } else {
    return Promise.reject(error)
  }
});


/**
 *
 * @param {*} endpoint API端口指向
 * @param {*} payload 参数对象
 */
export default function request(endpoint, payload, option = {}) {
  return new Promise((resolve, reject) => {
    let baseURL = option && option.other ? API_LOGIN : API_WEB
    axios({
      method: 'post',
      url: `${baseURL}${endpoint}`,
      headers: {
        'platType': 2,
        'authorization': localStorage.getItem('authorization')
      },
      data: payload
    })
    .then(response => {
      const data = response.data
      if (option && option.resp) {
        resolve(data)
      } else {
        if (data.result === 1) {
          resolve(data.resultMap)
        } else {
          let key = data.result || 20001
          reject(new CustomError({ [key]: data.desc }))
        }
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}
