/*
 * @Author: wanglijuan01
 * @Date: 2020-02-29 10:46:08
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-14 09:04:01
 * @Description: 入口文件
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/static/css/reset.less';
import '@static/css/animation/index.less';
import '@static/css/icon-front/iconfont.js';
import '@static/css/icon-front/iconfont.less';
import fetch from '@config/fetch/fetch.js';
import '@src/permission';
import * as consoleLog from '@common/consoleLog';
import util from '@common/utils';
import infiniteScroll from 'vue-infinite-scroll';
import tools from '@/utils/inject';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(infiniteScroll);
Vue.use(tools);
Vue.prototype.$service = fetch;
Vue.prototype.$log = consoleLog.log;
Vue.config.productionTip = false;

Vue.config.productionTip = false

Vue.filter('formatTime', function(date, formatType = 'yyyy-MM-dd HH:mm') {
  return util.formatDate(date * 1000, formatType);
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
