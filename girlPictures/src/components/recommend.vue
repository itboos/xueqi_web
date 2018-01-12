<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="slide in swiperSlides">
      <template>
        <div class="day bounceInRight" rel="dom">
          <h1>{{slide.title}}</h1>
          <div v-html="slide.content"></div>
        </div>
      </template>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>

</template>

<script>
/* eslint-disable no-shadow */
  import { swiper, swiperSlide } from 'vue-awesome-swiper';

  const TAB_NAME = ['今天', '昨天', '前天', '三天前', '四天前'];
  export default {
    name: 'v-recommend',
    components: {
      swiper,
      swiperSlide,
    },
    created() {
      console.log('recommend');
      this.$store.commit('UPDATE_LOADING', true);
      const path = 'history/content/5/1';
      this.$store.dispatch('get', {
        path,
        other: '其它的参数...',
        callback: (data) => {
          console.log('推荐的值为:', data);
          // 将新返回的数据添加到原来的数据数组中
          this.swiperSlides = data.results;
          console.log(this.swiperSlides);
          this.$nextTick(() => {
            this.$store.commit('UPDATE_LOADING', false);
          });
        },
      });
    },
    data() {
      return {
        swiperSlides: [],
        TAB_NAME: [],
        playPageShow: false,
        blurBgShow: false,
        rankshow: true,
        routerViewAnimation: 'page-slide',
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          paginationBulletRender(swiper, index, className) {
            return `<div class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</div>`;
          },
          onSlideChangeEnd: (swiper) => {
            console.log('onSlideChangeEnd', swiper.realIndex);
          },
        },
      };
    },
    mounted() {
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  img  {
    width: 100%;
  }
  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .swiper-slide {
    float: left;
  }
  .swiper-wrapper {
    overflow:  hidden;
    width: 2000px;
  }
  .swiper-item {
    height: 100%;
  }

  .swiper-pagination-bullet-custom {
    width: 100% !important;
    height: 100% !important;
    margin:0 !important;
    text-align: center;
    line-height: 50px;
    color: #999999;
    border-radius: 0 !important;
    background: #fff !important;
    opacity: 1 !important;
  }

  .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
    color: #03a9f4;
    background: #03a9f4;
    font-size: 20px

  }

  .swiper-pagination{
    top:0;
    height:50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width:100%;
  }

  .day
  padding: 50px 10px 20px 10px
  p
   font-size: 0
   img
    width: 100%
  h1
   text-align: left;
   font-weight: 700;
   font-size: 16px;
   line-height 32px
   margin: 10px 0;
   display: -webkit-box;
   overflow: hidden;
   text-overflow: ellipsis;
   word-wrap: break-word;
   white-space: normal !important;
   -webkit-line-clamp: 1;
   -webkit-box-orient: vertical;
  h3
   color: #000000;
   text-align: left;
   padding: 10px 0
   font-size: 16px;
   font-weight: 700;
  ul
   color: #000000;
   text-align: left;
   padding-left: 10px;
   font-size: 14px;
   font-weight: 400;
   li
    line-height: 20px;
    padding: 5px 0
    -webkit-animation-name: bounceInRight;
    animation-name: bounceInRight;


</style>
