import * as orderServices from '@/services/order'
import pathToRegexp from 'path-to-regexp'

export default {
  namespace: 'message',
  state: {
    list:[
      { read: false, fold: true, title: 'Renewal Reminder', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazi'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please rene.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
      { read: false, fold: true, title: 'Renewal Reminder unread', date: '2019.04.04', text: 'Please note that your account will be expired on xxxx-xx-xx. If you prefer to continue enjoy our amazing service please renew your subscription.please renew your subscription.please renew your subscription.please renew your subscription.'},
    ],
    pageNo: 1,
    pageSize: 2,
    total: 5,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathToRegexp('/account/message').exec(pathname)) {
          
        }
      })
    }
  },
  effects: {
    
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  }, 
};
