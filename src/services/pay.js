import request from '@/utils/request';
import api from './api';
export const planPrebuy = data => request(api.pay.planPrebuy, data, { other: false, response: true });
export const planValidate = data => request(api.pay.planValidate, data, { other: false, response: true });
export const planRebuy = data => request(api.pay.planRebuy, data, { other: false, response: true });
export const planAgreement = data => request(api.pay.planAgreement, data, { other: false, response: true });
export const orderDetail = data => request(api.pay.orderDetail, data, { other: false, response: true });
export const productToShop = data => request(api.pay.productToShop, data, { other: false, response: true });
