import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'ads', ...(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/models/ads.js').default) });
app.model({ namespace: 'app', ...(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/models/app.js').default) });
app.model({ namespace: 'dashboard', ...(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/models/dashboard.js').default) });
app.model({ namespace: 'home', ...(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/models/home.js').default) });
app.model({ namespace: 'message', ...(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/models/message.js').default) });
app.model({ namespace: 'offer', ...(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/models/offer.js').default) });
app.model({ namespace: 'order', ...(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/models/order.js').default) });
app.model({ namespace: 'pay', ...(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/models/pay.js').default) });
app.model({ namespace: 'questionnaire', ...(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/models/questionnaire.js').default) });
app.model({ namespace: 'user', ...(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/models/user.js').default) });
app.model({ namespace: 'usercenter', ...(require('/Users/vampireyy/Desktop/idvert/affiliate-frontend/src/models/usercenter.js').default) });
