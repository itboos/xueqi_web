<template>
  <div>
    <div class="page-cover" v-show="menuShow" @click="isShow"></div>
    <header class="header" :class="{'show': menuShow}" @click="isShow">
      <div class="nav">
        <div class="pull-left">
          <span class="iconfont icon-fenlei"></span>       
        </div>
        <div class="title">{{headerTitle}}</div>
        <div class="pull-right">
          <span class="iconfont icon-sousuo_sousuo"></span>
        </div>
      </div>
    </header>
    <v-menu :show="menuShow"></v-menu>
  </div>
</template>
<script type="text/ecmascript-6">
 import { mapState } from 'vuex';
 import vMenu from './menu';


 export default {
   name: 'v-header',
   components: {
     vMenu,
   },
   data() {
     return {
     };
   },
   computed: {
     ...mapState([
       'headerTitle', 'menuShow',
     ]),
   },
   methods: {
     isShow() {
       console.log('切换菜单遮罩层....');
       this.$store.commit('UPDATE_MENUSHOW');
     },
   },
 };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .header
     line-height: 50px;
     position:fixed;
     z-index: 10;
     top: 0;
     left: 0;
     right: 0;
     width: 100%;
     color: #fff;
     background: #03a9f4;
     transition: all 0.3s ease;
     &.show {
       transform: translateX(250px);
     }
  .page-cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 7;
  }
  .nav
    .pull-left {
      float: left;
      padding: 0 10px;
      font-size: 18px;
      font-weight: 400;
      box-sizing: border-box;
      height: 50px;
    }
    .pull-right {
      float: right;
      padding: 0 10px;
      font-size: 16px;
      font-weight: 400;
    }
    .title {
      min-height: 50px;
      position:absolute;
      left:100px;
      right: 100px;
      top: 0;
    }
    .pull-left .iconfont {
      font-size: 18px;
    }
</style>