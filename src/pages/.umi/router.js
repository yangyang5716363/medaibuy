import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "redirect": "/home",
    "exact": true,
    "_title": "idvert",
    "_title_default": "idvert"
  },
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  
}),
    "routes": [
      {
        "path": "/user/login",
        "component": _dvaDynamic({
  
  component: () => import('../user/login'),
  
}),
        "title": "Login - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Login - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/user/register",
        "component": _dvaDynamic({
  
  component: () => import('../user/register'),
  
}),
        "title": "Register - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Register - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/user/forgetPassword",
        "component": _dvaDynamic({
  
  component: () => import('../user/forgetPassword'),
  
}),
        "title": "ForgetPassword - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "ForgetPassword - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/user/activation",
        "component": _dvaDynamic({
  
  component: () => import('../user/emailActivation'),
  
}),
        "title": "EmailActivation - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "EmailActivation - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/user/question",
        "component": _dvaDynamic({
  
  component: () => import('../user/questionnaire'),
  
}),
        "title": "Question - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Question - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/user/question1",
        "component": _dvaDynamic({
  
  component: () => import('../user/newquestionnaire'),
  
}),
        "title": "1Question - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "1Question - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/user/question2",
        "component": _dvaDynamic({
  
  component: () => import('../user/questionnaire2'),
  
}),
        "title": "1Question - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "1Question - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/user/unsubscribe",
        "component": _dvaDynamic({
  
  component: () => import('../user/unSubscribe'),
  
}),
        "title": "Message Info - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Message Info - Idvert",
        "_title_default": "idvert"
      },
      {
        "component": () => React.createElement(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "idvert",
        "_title_default": "idvert"
      }
    ],
    "_title": "idvert",
    "_title_default": "idvert"
  },
  {
    "path": "/exception",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/ExceptionLayout'),
  
}),
    "routes": [
      {
        "path": "/exception/403",
        "title": "无权限",
        "component": _dvaDynamic({
  
  component: () => import('../exception/403'),
  
}),
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "无权限",
        "_title_default": "idvert"
      },
      {
        "path": "/exception/500",
        "title": "服务器出错了",
        "component": _dvaDynamic({
  
  component: () => import('../exception/500'),
  
}),
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "服务器出错了",
        "_title_default": "idvert"
      },
      {
        "component": () => React.createElement(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "idvert",
        "_title_default": "idvert"
      }
    ],
    "_title": "idvert",
    "_title_default": "idvert"
  },
  {
    "path": "/pay",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/PayLayout'),
  
}),
    "routes": [
      {
        "path": "/pay/payBuy",
        "component": _dvaDynamic({
  
  component: () => import('../pay'),
  
}),
        "title": "Pay - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Pay - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/pay/payConfirm",
        "component": _dvaDynamic({
  
  component: () => import('../pay/PayConfirm'),
  
}),
        "title": "PayConfirm - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "PayConfirm - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/pay/payInfo",
        "component": _dvaDynamic({
  
  component: () => import('../pay/PayInfo'),
  
}),
        "title": "PayInfo - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "PayInfo - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/pay/paySuccess",
        "component": _dvaDynamic({
  
  component: () => import('../pay/PaySuccess'),
  
}),
        "title": "PaySuccess - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "PaySuccess - Idvert",
        "_title_default": "idvert"
      },
      {
        "component": () => React.createElement(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "idvert",
        "_title_default": "idvert"
      }
    ],
    "_title": "idvert",
    "_title_default": "idvert"
  },
  {
    "path": "/account",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/AccountLayout'),
  
}),
    "Routes": [require('../../utils/Authorized').default],
    "routes": [
      {
        "path": "/account/info",
        "component": _dvaDynamic({
  
  component: () => import('../accounts/info/index'),
  
}),
        "title": "Account - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Account - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/account/order",
        "component": _dvaDynamic({
  
  component: () => import('../accounts/order'),
  
}),
        "title": "Arder - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Arder - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/account/order/detail",
        "component": _dvaDynamic({
  
  component: () => import('../accounts/order/Detail'),
  
}),
        "title": "ArderDetail - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "ArderDetail - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/account/channel",
        "component": _dvaDynamic({
  
  component: () => import('../accounts/channel'),
  
}),
        "title": "ChannelManage - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "ChannelManage - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/account/dashboard",
        "component": _dvaDynamic({
  
  component: () => import('../accounts/dashboard'),
  
}),
        "title": "Dashboard - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Dashboard - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/account/favorites",
        "component": _dvaDynamic({
  
  component: () => import('../accounts/favorites'),
  
}),
        "title": "Favorites - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Favorites - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/account/message",
        "component": _dvaDynamic({
  
  component: () => import('../accounts/message'),
  
}),
        "title": "Message - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Message - Idvert",
        "_title_default": "idvert"
      },
      {
        "component": () => React.createElement(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "idvert",
        "_title_default": "idvert"
      }
    ],
    "_title": "idvert",
    "_title_default": "idvert"
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  
}),
    "Routes": [require('../../utils/Authorized').default],
    "routes": [
      {
        "path": "/home",
        "component": _dvaDynamic({
  
  component: () => import('../home/index'),
  
}),
        "title": "Home - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Home - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/offer",
        "component": _dvaDynamic({
  
  component: () => import('../offer/list'),
  
}),
        "title": "Offers - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Offers - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/offer/:id",
        "component": _dvaDynamic({
  
  component: () => import('../offer/detail'),
  
}),
        "title": "Offers Detail - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Offers Detail - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/samples",
        "component": _dvaDynamic({
  
  component: () => import('../ads/ads-index'),
  
}),
        "title": "Samples - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "Samples - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/samples/detail",
        "component": _dvaDynamic({
  
  component: () => import('../ads/detail/detail'),
  
}),
        "title": "SamplesDetail - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "SamplesDetail - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/samples/detailNative",
        "component": _dvaDynamic({
  
  component: () => import('../ads/detailNative/detailNative'),
  
}),
        "title": "DetailNative - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "DetailNative - Idvert",
        "_title_default": "idvert"
      },
      {
        "path": "/samples/detailAdult",
        "component": _dvaDynamic({
  
  component: () => import('../ads/detailAdult/detailAdult'),
  
}),
        "title": "DetailAdult - Idvert",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "DetailAdult - Idvert",
        "_title_default": "idvert"
      },
      {
        "component": () => React.createElement(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "idvert",
        "_title_default": "idvert"
      }
    ],
    "_title": "idvert",
    "_title_default": "idvert"
  },
  {
    "component": _dvaDynamic({
  
  component: () => import('../404'),
  
}),
    "title": "页面没找到",
    "exact": true,
    "Routes": [require('./TitleWrapper.jsx').default],
    "_title": "页面没找到",
    "_title_default": "idvert"
  },
  {
    "component": () => React.createElement(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
    "_title": "idvert",
    "_title_default": "idvert"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
