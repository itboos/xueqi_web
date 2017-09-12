<template>
  <transition name="fade">
     <div v-show="showFlag" class="details">
       <div>
          <div class="header">
            <header class="bar bar-nav" @click="hide">
                <div class="pull-left">
                    <span class="iconfont icon-left"></span>
                </div>
                <div class="title">{{detailsData.publishedAt && detailsData.publishedAt || time | formatDate}}</div>
            </header>
          </div>

          <div class="day bounceInRight day-content" rel="dom" id="domElemnt">
              <h1>{{detailsData.title}}</h1>
              <div v-html="detailsData.content"></div>
          </div>
       </div>
     </div>
  </transition>
</template>

<script>
  import { formatDate } from '../../common/js/utils';

  export default {
    name: 'v-detail',
    props: {
      time: {
        type: String,
      },
      detailsData: {
        type: Object,
      },
    },
    data() {
      return {
        showFlag: false,
      };
    },
    created() {
    },
    methods: {
      show() {
        console.log('显示....');
        this.showFlag = true;
        this.busy = true;
      },
      hide() {
        console.log('隐藏....');
        this.showFlag = false;
        // 开启无限滚动....
        this.busy = false;
        console.log(this.busy);
        this.$store.state.showWefare = true;
      },
    },
    omponents: {
     // vDay,
    },
    filters: {
      formatDate(time) {
        const date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .details {
    position: fixed;
    //position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 30;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #fff;
    // 这个左右切换的动画效果挺好的， 配和vue的transtion 动画，同时自定义了进入时和离开时的动画
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.2s linear;
      transform translate3d(0, 0, 0);
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0;
      transform translate3d(100%, 0, 0);
    }
    .header{  
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 10;
      width: 100%;
      min-height: 50px;
      font-size: 1.8px;
      line-height: 50px;
      background-color: #03a9f4;
      color: #fff;
      text-align: center;
      display: table;
      .pull-left {
        padding: 0 10px;
        font-size: 16px;
        font-weight: 400;
        z-index: 2;
        box-sizing: border-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        float: left !important;
      }
      .title {
        min-height: 50px;
        position: absolute;
        margin: 0;
        white-space: nowrap;
        // 左右居中新方法
        right: 100px;
        left: 100px;
        font-size: 16px;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        z-index: 2;
        font-weight: 500;
      }
    }
    .day-content {
      padding: 50px 10px 20px 10px;
      h1 {
        text-align: left;
        font-weight: 700;
        font-size: 16px;
        line-height: 32px;
        margin: 10px 0;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        white-space: normal !important;
        -webkit-line-clamp: 1;
      }
      img {
        width:100%;
      }
      h3 {
        color: #000;
        text-align: left;
        padding: 10px 0;
        font-size: 16px;
        font-weight: 700;
      }
      ul {
        color: #000;
        text-align: left;
        padding-left: 10px;
        font-size: 14px;
        font-weight: 400;
      }
      li {
        line-height: 20px;
        padding: 5px 0;
        animation-name: bounceInRight;
      }
      span {
        font-weight: normal;
      }
    }
  }
  #domElemnt {
    overflow: auto;
  }
    
</style>
