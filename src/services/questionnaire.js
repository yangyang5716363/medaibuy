import request from '@/utils/request';
import api from './api';
export const answerSave = data => request(api.user.answerSave, data, { other: false, response: true });
export const getQuestionnaireList = data => request(api.user.getQuestionnaireList, data, { other: false, response: true });
