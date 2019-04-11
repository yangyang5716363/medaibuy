import request from '@/utils/request';
import api from './api';

export const fetch = data => request(api.test.fetch, data, { other: true});

