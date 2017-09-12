/**
 * created by zack zhong 2017-09-02 17:22:56
 */
// 全局store对象
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);
const vuex = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
console.log('vuex为: ', vuex);
export default vuex;
