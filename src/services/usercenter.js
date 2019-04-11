import request from '@/utils/request';
import api from './api';
export const updateInfo = data => request(api.usercenter.updateInfo, data, { other: false, response: true });
export const checkPassword = data => request(api.usercenter.checkPassword, data, { other: false, response: true });
export const updatePassword = data => request(api.usercenter.updatePassword, data, { other: false, response: true });
export const saveSecurityQuestion = data => request(api.usercenter.saveSecurityQuestion, data, { other: false, response: true });
export const querySecurityQuestion = data => request(api.usercenter.querySecurityQuestion, data, { other: false, response: true });
export const accountChange = data => request(api.usercenter.accountChange, data, { other: false, response: true });
export const sendChangeEmail = data => request(api.usercenter.sendChangeEmail, data, { other: false, response: true });
export const channelUserList = data => request(api.usercenter.channelUserList, data, { other: false, response: true });
export const channelOrderList = data => request(api.usercenter.channelOrderList, data, { other: false, response: true });
export const channelUserCount = data => request(api.usercenter.channelUserCount, data, { other: false, response: true });
export const channelOrderCount = data => request(api.usercenter.channelOrderCount, data, { other: false, response: true });