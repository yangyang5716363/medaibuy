export default [
  // user 路由下
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user/login', component: './user/login', title: 'Login - Idvert' },
      { path: '/user/register', component: './user/register', title: 'Register - Idvert' },
      { path: '/user/forgetPassword', component: './user/forgetPassword', title: 'ForgetPassword - Idvert' },
      { path: '/user/activation', component: './user/emailActivation', title: 'EmailActivation - Idvert' },
      { path: '/user/question', component: './user/questionnaire', title: 'Question - Idvert' },
      { path: '/user/question1', component: './user/newquestionnaire', title: '1Question - Idvert' },
      { path: '/user/question2', component: './user/questionnaire2', title: '1Question - Idvert' },
      { path: '/user/unsubscribe', component: './user/unSubscribe', title: 'Message Info - Idvert' },
    ],
  },
  {
    path: '/exception',
    component: '../layouts/ExceptionLayout',
    routes: [
      { path: '/exception/403', title: '无权限', component: './exception/403' },
      { path: '/exception/500', title: '服务器出错了', component: './exception/500' },
    ],
  },
  {
    path: '/pay',
    component: '../layouts/PayLayout',
    routes: [
      { path: '/pay/payBuy', component: './pay', title: 'Pay - Idvert' },
      { path: '/pay/payConfirm', component: './pay/PayConfirm', title: 'PayConfirm - Idvert' },
      { path: '/pay/payInfo', component: './pay/PayInfo', title: 'PayInfo - Idvert' },
      { path: '/pay/paySuccess', component: './pay/PaySuccess', title: 'PaySuccess - Idvert' },
    ],
  },
  // 用户中心
  {
    path: '/account',
    component: '../layouts/AccountLayout',
    Routes: ['src/utils/Authorized'] ,
    routes: [
      { path: '/account/info', component: './accounts/info/index', title: 'Account - Idvert' },
      { path: '/account/order', component: './accounts/order', title: 'Arder - Idvert' },
      { path: '/account/order/detail', component: './accounts/order/Detail', title: 'ArderDetail - Idvert' },
      { path: '/account/channel', component: './accounts/channel', title: 'ChannelManage - Idvert' },
      { path: '/account/dashboard', component: './accounts/dashboard', title: 'Dashboard - Idvert' },
      { path: '/account/favorites', component: './accounts/favorites', title: 'Favorites - Idvert' },
      { path: '/account/message', component: './accounts/message', title: 'Message - Idvert' },
    ]
  },
  // 正常app 路由
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/utils/Authorized'] ,
    routes: [
      { path: '/', redirect: '/home' },
      { path: '/home', component: './home/index', title: 'Home - Idvert' },
      { path: '/offer', component: './offer/list', title: 'Offers - Idvert' },
      { path: '/offer/:id', component: './offer/detail', title: 'Offers Detail - Idvert'},
      { path: '/samples', component: './ads/ads-index', title: 'Samples - Idvert'},
      { path: '/samples/detail', component: './ads/detail/detail', title: 'SamplesDetail - Idvert'},
      { path: '/samples/detailNative', component: './ads/detailNative/detailNative', title: 'DetailNative - Idvert'},
      { path: '/samples/detailAdult', component: './ads/detailAdult/detailAdult', title: 'DetailAdult - Idvert'},
    ]
  },
  { component: '404', title: '页面没找到' },
];
