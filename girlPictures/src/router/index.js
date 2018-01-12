/*eslint-disable global-require*/
import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';

Vue.use(Router);

// require.ensure 是路由懒加载
export default new Router({
  // 路由选中时添加的类名
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      component(resolve) {
        require.ensure(['../App.vue'], () => {
          resolve(require('../App.vue'));
        });
      },
    },
    {
      path: '/welfare',
      name: 'welfare',
      component(resolve) {
        require.ensure(['../components/welfare.vue'], () => {
          resolve(require('../components/welfare.vue'));
        });
      },
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello,
    },
    {
      path: '/ios',
      name: 'ios',
      component(resolve) {
        require.ensure(['../components/ios.vue'], () => {
          resolve(require('../components/ios.vue'));
        });
      },
    },
    {
      path: '/android',
      name: 'android',
      component(resolve) {
        require.ensure(['../components/android.vue'], () => {
          resolve(require('../components/android.vue'));
        });
      },
    },
    {
      path: '/web',
      name: 'web',
      component(resolve) {
        require.ensure(['../components/web.vue'], () => {
          resolve(require('../components/web.vue'));
        });
      },
    },
    {
      path: '/day',
      name: 'day',
      component(resolve) {
        require.ensure(['../components/recommend.vue'], () => {
          resolve(require('../components/recommend.vue'));
        });
      },
    },
  ],
});
