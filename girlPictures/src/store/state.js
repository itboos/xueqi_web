// 初始化应用的状态,保存一些常用的方法
import axios from 'axios';

// 下拉菜单
const menus = ['welfare', 'day', 'android', 'ios', 'web'];

const state = {
  axios,
  headerTitle: '福利',
  menus,
  menuShow: false,
  loadingShow: false,
  news: 5,
  message: '我是初始化的消息',
  showWefare: true,
};
export default state;