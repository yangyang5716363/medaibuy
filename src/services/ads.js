import request from '@/utils/request'
import api from './api'
export const facebookList = data => request(api.ads.facebookList, data)
export const facebookFilter = data => request(api.ads.facebookFilter, data)
export const nativeList = data => request(api.ads.nativeList, data)
export const adultList = data => request(api.ads.adultList, data)
export const nativeFilter = data => request(api.ads.nativeFilter, data)
export const adultFilter = data => request(api.ads.adultFilter, data)
export const collection = data => request(api.ads.collection, data)
export const cancelCollection = data => request(api.ads.cancelCollection, data)
export const detailList = data => request(api.ads.detail.list, data)
export const detailAnalysis = data => request(api.ads.detail.analysis, data)
export const detailAdvertiser = data => request(api.ads.detail.advertiser, data)
export const nativeDetailList = data => request(api.ads.nativeDetail.list, data)
export const adultDetailList = data => request(api.ads.adultDetail.list, data)
export const nativeDetaiAnalysis = data => request(api.ads.nativeDetail.analysis, data)
export const adultDetaiAnalysis = data => request(api.ads.adultDetail.analysis, data)
export const search = data => request(api.ads.search, data)
export const searchNativeDsp = data => request(api.ads.searchNativeDsp, data)
export const searchAdultDsp = data => request(api.ads.searchAdultDsp, data)
export const download = ({ adId, type }) => request(api.ads.download, { adId, type }).then(res => {
  const element = document.createElement('a')
  element.href = res.data 
  // 异常处理 没有值的时候处理
  element.click()
})


