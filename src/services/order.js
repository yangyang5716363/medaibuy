import request from '@/utils/request';
import api from './api';
export const orderList = data => request(api.order.orderList, data, { other: false, response: true });
export const orderInfo = data => request(api.order.orderInfo, data, { other: false, response: true });
export const orderSubCancel = data => request(api.order.orderSubCancel, data, { other: false, response: true });
export const orderCancel = data => request(api.order.orderCancel, data, { other: false, response: true });
export const continuePay = data => request(api.order.continuePay, data, { other: false, response: true });
