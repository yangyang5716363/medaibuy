import request from '@/utils/request';
import api from './api';

export const login = data => request(api.user.login, data, { other: true, response: true });
export const logout = data => request(api.user.logout, data, { other: true, response: true });
export const register = data => request(api.user.register, data, { response: true });
export const getMyInfo = data => request(api.user.getMyInfo, data, { response: true });
export const checkValCode = data => request(api.user.checkValCode, data, { response: true });
export const querySafeSetByEmail = data => request(api.user.querySafeSetByEmail, data, { response: true });
export const sendForgetPasswordEmail = data => request(api.user.sendForgetPasswordEmail, data, { response: true });
export const querySecurityQuestion = data => request(api.user.querySecurityQuestion, data, { response: true });
export const verifySecurityQuestion = data => request(api.user.verifySecurityQuestion, data, { response: true });
export const updatePasswordByEmail = data => request(api.user.updatePasswordByEmail, data, { response: true });
export const updatePasswordByQuestion = data => request(api.user.updatePasswordByQuestion, data, { response: true });
export const decryptEmail = data => request(api.user.decryptEmail, data, { response: true });
export const changeEmail = data => request(api.user.changeEmail, data, { response: true });
export const defaultUseage = data => request(api.user.defaultUseage, data, { response: true });

export const updateInfo = data => request(api.user.updateInfo, data, { other: false, response: true });
export const checkPassword = data => request(api.user.checkPassword, data, { other: false, response: true });
export const updatePassword = data => request(api.user.updatePassword, data, { other: false, response: true });
export const saveSecurityQuestion = data => request(api.user.saveSecurityQuestion, data, { other: false, response: true });
export const queryCenterSecurityQuestion = data => request(api.user.queryCenterSecurityQuestion, data, { other: false, response: true });
export const accountChange = data => request(api.user.accountChange, data, { other: false, response: true });
export const sendChangeEmail = data => request(api.user.sendChangeEmail, data, { other: false, response: true });
export const channelUserList = data => request(api.user.channelUserList, data, { other: false, response: true });
export const channelOrderList = data => request(api.user.channelOrderList, data, { other: false, response: true });
export const channelUserCount = data => request(api.user.channelUserCount, data, { other: false, response: true });
export const channelOrderCount = data => request(api.user.channelOrderCount, data, { other: false, response: true });