<template>
  <div class="menu">
    <div class="menu-list" :class="{'show': show}">
      <div class="menu-header">
        <img src="https://ws1.sinaimg.cn/large/610dc034ly1fgdmpxi7erj20qy0qyjtr.jpg?imageView2/0/w/100" class="head">
        <div class="menu-title">
           jus do it -- Zack Zhong
        </div>
      </div>
      <div class="menu-ul">
        <div class="menu" v-for='menu in menus' @click="updateHeader(MENUS[menu], menu)">
           <router-link class="icon-quanbu iconfont item" :to="menu">
            <div class="menu-icon">
              <i class="iconfont" :class="'icon-'+ menu"></i>
            </div>
            <span class="menu-text">{{MENUS[menu]}}</span>
            <div class="menu-new" v-show="menu ==='day' && news > 0">
              <span class="news-num">5</span>
            </div>
           </router-link>
        </div>
      </div>
    </div>
    <div class="menu-other"></div>
  </div>
</template>
<script type="text/ecmascript-6">
/* eslint-disable no-alert, no-console, no-unused-vars*/
import { mapState } from 'vuex';

console.log(mapState(['menus', 'news']));
const MENUS = { welfare: '福利', day: '每日推荐', ios: 'IOS', android: 'Android', web: '前端' };
export default {
  name: 'v-menu',
  props: {
    show: {
      type: Boolean,
    },
  },
  data() {
    return {
      MENUS,
    };
  },
  computed: {
    ...mapState([
      'menus', 'news',
    ]),
  },
  methods: {
    menuShow() {
    },
    updateHeader(title, menu) {
      this.$store.commit('UPDATE_TITLE', title);
      this.$store.commit('UPDATE_MENUSHOW');
      if (menu === 'day') {
        this.$store.commit('UPDATE_NEWS');
      }
    },
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/css/mixin.styl"
  .menu-list 
      position: fixed;
      top: 0;
      bottom: 0;
      left: -250px;
      // left: 0;
      background-color: #22262a;
      width: 250px;
      transition: all 0.3s ease;
      z-index: 99;
      &.show {
        transform: translateX(250px);
      }
  .menu-header {
    .head {
      width: 40%;
      height: auto;
      border-radius: 9999px;
      vertical-align: middle;
      margin: 20px 0;
    }
    .menu-title {
      font-size: 14px;
      color: #fff;
      line-height: 28px;
      font-weight: 500;
    }
  }
  .menu
    .item {
      line-height: 15px;
      border-half(#40474a);
      &.active {
        color: #01aef3;
        .menu-icon {
          background-color: #01aef3;
        }
        .iconfont {
          color: #fff;
        }
      }
    }
    a {
      color: #a6adb3;
      display: block;
      text-align: left;
      padding: 10px 13px;
      .menu-icon {
        text-align: center;
        display: inline-block;
        width: 30px;
        height: 30px;
        background-color: #383c40;
        border-radius: 999px;
        .iconfont {
          color: #999;
          line-height: 30px;
          font-weight: 700;
        }
      }
      .menu-text {
        font-size: 15px;
        font-weight: 700;
        vertical-align: top;
        margin-left: 10px;
        line-height: 32px;
        display: inline-block;
      }
       .menu-new {
          > span {
            color: #fff;
            font-size: 15px;
            line-height: 30px;
            font-weight: 500;
          }
          float: right;
          width: 30px;
          height: 30px;
          text-align: center;
          vertical-align: top;
          background: #d81229;
          border-radius: 999px;
      }
    } 
</style>