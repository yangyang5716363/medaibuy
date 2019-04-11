export default {
  user: {
    login: `/member/login`,
    logout: `/member/logout`,
    register: `/member/register`,
    getMyInfo: `/member/info`,  // 获取用户信息
    checkValCode: `/validation/login/code`,
    querySafeSetByEmail: `/member/query/safeset`, //获取安全设置(找回密码验证邮箱)
    sendForgetPasswordEmail: `/email/send/account/password/forget`, //获取安全设置(找回密码验证邮箱)
    updatePasswordByEmail: `/member/forget/password`, //找回密码(邮件方式)
    querySecurityQuestion: `/member/security/question/query`, //获取密保问题
    verifySecurityQuestion: `/member/security/question/verify`, //验证密保问题填写是否正确
    updatePasswordByQuestion: `/member/security/update/password`, //找回密码(密保方式)
    decryptEmail: `/member/decrypt/email`, //邮箱解密(找回密码验证)
    changeEmail: `/member/account/change`, //更新邮箱地址
    defaultUseage: `/product/default/useage`, //产品用量(右上角提示)
    updateInfo: '/member/center/info/update',
    checkPassword: '/member/center/password/check',
    updatePassword: '/member/center/password/update',
    saveSecurityQuestion: '/member/center/security/question/save',
    queryCenterSecurityQuestion: `/member/center/security/question/query`, //获取密保问题
    accountChange: `/member/account/change`, //更新邮箱地址
    sendChangeEmail: `/email/send/account/change`, //更新邮箱地址
    channelUserList: `/member/channel/user/list`, //渠道用户列表
    channelUserCount: `/member/channel/user/count`, // 渠道用户统计信息
    channelOrderList: `/order/channel/list`, //渠道订单列表
    channelOrderCount: `/order/channel/count`, //渠道订单统计信息
    getQuestionnaireList: `/questionnaire/query`, //查询问卷
    answerSave: `/answer/save`, //查询问卷
  },
  usercenter: {
    // updateInfo: '/member/center/info/update',
    // checkPassword: '/member/center/password/check',
    // updatePassword: '/member/center/password/update',
    // saveSecurityQuestion: '/member/center/security/question/save',
    // querySecurityQuestion: `/member/center/security/question/query`, //获取密保问题
    // accountChange: `/member/account/change`, //更新邮箱地址
    // sendChangeEmail: `/email/send/account/change`, //更新邮箱地址
    // channelUserList: `/member/channel/user/list`, //渠道用户列表
    // channelUserCount: `/member/channel/user/count`, // 渠道用户统计信息
    // channelOrderList: `/order/channel/list`, //渠道订单列表
    // channelOrderCount: `/order/channel/count`, //渠道订单统计信息
    // getQuestionnaireList: `/questionnaire/query`, //查询问卷
    // answerSave: `/answer/save`, //查询问卷
  },
  order:{
    orderList: '/order/list', // 订单列表
    orderInfo: '/order/info', // 订单详情
    orderSubCancel: '/order/sub/cancel', // 取消订阅
    orderCancel: '/order/cancel', // 取消订单
    continuePay: '/order/plan/agreement/link', // 获取订阅订单支付链接
  },
  pay:{
    productToShop: '/product/shop', // 产品信息检查
    orderDetail: `/order/plan/buy`,
    planAgreement: `/order/plan/agreement`,
    planRebuy: `/order/plan/rebuy`,
    planValidate: `/order/plan/validate`,
    planPrebuy: `/order/plan/prebuy`,
  },
  dashboard:{
    collectList: '/control/panel/collect/list', // 查询关注收藏列表
    historyList: '/control/panel/search/history', // 查询最近搜索历史记录 
    // favoriteList: '/control/panel/favorite/list', // 查询收藏夹列表 
    collectCancel: '/control/panel/collect/cancel', // 取消关注/收藏 
    collectAdd: '/control/panel/collect/add' // 添加关注
  },
  offer: {
    list: '/offer/list', // Offer列表
    filter: '/offer/filter', // offer 筛选器,
    keyword: '/offer/search/tip', // 关键字列表
    detailOverview: '/offer/detail/overview', // 
    detailDomain: '/offer/detail/domain',
    detailAnalysis: '/offer/detail/analysis',
    offerName: '/offer/filter/match/offer', // 匹配publisher
    publisher: '/offer/filter/match/publisher'
  },
  home: {
    recommend: '/home/offer/recommend', // offer 推荐页,
    keyword: '/home/search/result',
    analysis: '/home/offer/analysis'
  },
  ads: {
    facebookList: `/ad/social/list`,
    facebookFilter: `/ad/social/filter`,
    nativeList: `/ad/dsp/native/list`,
    adultList: `/ad/dsp/adult/list`,
    nativeFilter: `/ad/dsp/native/filter`,
    adultFilter: `/ad/dsp/adult/filter`,
    collection: `/control/panel/collect/add`,
    cancelCollection: `/control/panel/collect/cancel`,
    nativeDetail: {
      list: `/ad/dsp/native/info`,
      analysis: `/ad/dsp/native/info/analysis`
    },
    adultDetail: {
      list: `/ad/dsp/adult/info`,
      analysis: `/ad/dsp/adult/info/analysis`
    },
    detail: {
      list: `/ad/social/info`,
      analysis: `/ad/social/analysis`,
      advertiser: `/ad/social/advertiser`,
    },
    search: `/ad/social/search/tip`,
    searchNativeDsp: `/ad/dsp/native/search/tip`,
    searchAdultDsp: `/ad/dsp/adult/search/tip`,
    download: `/page/download/ad/mp`,
  }
};
