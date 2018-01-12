// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable global-require */

import Vue from 'vue';
import infiniteScroll from 'vue-infinite-scroll';  // 引入滑动模块
import VueLazyload from 'vue-lazyload';  // 引入图片懒加载模块
import App from './App';
import router from './router';
import store from './store/store';
// 这里有点坑，为什么引入字体文件需要在js里引入呀
import './common/css/index.styl'; // 引入公共样式

Vue.use(infiniteScroll);
// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
  error: require('./assets/404.png'),
  loading: require('./assets/loading.gif'),
  attempt: 1,
});
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
