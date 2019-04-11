import request from '@/utils/request'
import api from './api'
export const fetchList = data => request(api.offer.list, data)
export const fetchFilter = data => request(api.offer.filter, data)

export const fetchKeyword = data => request(api.offer.keyword, data)

// 获取详情
export const fetchDetailOverview = data => request(api.offer.detailOverview, data)
export const fetchDetailDomain = data => request(api.offer.detailDomain, data)
export const fetchDetailAnalysis = data => request(api.offer.detailAnalysis, data)

// 一些关键字匹配

export const fetchOfferName = data => {
  return new Promise((resolve, reject) => {
    request(api.offer.offerName, { offerName: data })
    .then(({ data }) => {
      resolve(data)
    })
  })
}

export const fetchPublisher = data => {
  return new Promise((resolve, reject) => {
    request(api.offer.publisher, { publisher: data })
    .then(({ data }) => {
      resolve(data)
    })
  })
}
