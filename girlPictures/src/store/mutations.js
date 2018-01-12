// 改变store 的数据， 是提交commit 变化
/* eslint-disable no-param-reassign,no-unused-vars, */
import Vue from 'vue';

const mutations = {
  UPDATE_MENUSHOW(state, params) {
    state.menuShow = !state.menuShow;
    //console.log('其它的参数为:', params);
  },
  UPDATE_TITLE(state, title) {
    state.headerTitle = title;
  },
  UPDATE_LOADING(state, value) {
    state.loadingShow = value;
    console.log('更新加载中:', value);
  },
  UPDATE_NEWS(state, params) {
    state.new = 0;
  },
};
export default mutations;