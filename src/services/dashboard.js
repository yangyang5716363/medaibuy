import request from '@/utils/request';
import api from './api';

export const collectList = data => request(api.dashboard.collectList, data, { response: true });
export const historyList = data => request(api.dashboard.historyList, data, { response: true });
export const favoriteList = data => request(api.dashboard.favoriteList, data, { response: true });
export const collectCancel = data => request(api.dashboard.collectCancel, data);

export const collectAdd = data => request(api.dashboard.collectAdd, data)