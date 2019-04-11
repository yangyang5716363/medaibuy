import request from '@/utils/request'

import api from './api'
// offer 推荐
export const fetchRecommend = data => request(api.home.recommend, data)
export const fetchKeyword = data => request(api.home.keyword, data)
export const fetchAnalysis = data => request(api.home.analysis, data)