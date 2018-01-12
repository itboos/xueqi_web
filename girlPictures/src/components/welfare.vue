<template>
  <div class="welfare-wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" id="app-wrapper">
    <div class="welfare" :class="showWefare ? '': 'hidden' " >
      <figure v-show="leftData.length > 0" v-for="(data,index) in leftData" @click="showDetails(data.createdAt)" :key="index">
        <v-img :imgUrl="data.url"></v-img>
      </figure>
    </div>
    <!-- v-if="showWefare" -->
    <div class="welfare"  :class="showWefare ? '': 'hidden' ">
      <figure v-show="rightData.length > 0" v-for="(data,index) in rightData" @click="showDetails(data.createdAt)" :key="index">
        <v-img :imgUrl="data.url"></v-img>
      </figure>
    </div>
    <vDetails  :time="time" :detailsData="detailsData" ref="details"> </vDetails>
  </div>
</template>

<script>
/*思路 左滑动后，记录在滚动的位置，福利透明度变成0， 显示详情页，滚动条位置到顶部， 回到富力时，滚动条设置成之前的位置 2017年09月07日00:54:45 */
/* eslint-disable arrow-body-style */
import vImg from './lib/lazyImg';
import vDetails from './lib/details';
// 引入工具方法
import { objectDate } from '../common/js/utils';

export default {
  name: 'welfare',
  props: {
    show: {
      type: Boolean,
    },
  },
  components: {
    vImg,
    vDetails,
  },
  data() {
    return {
      leftData: [],
      rightData: [],
      busy: false,
      page: 1,
      detailsData: {},
      time: '',
      // showWefare: true,
    };
  },
  computed: {
    showWefare() {
      return this.$store.state.showWefare;
    },
  },
  created() {
  },
  methods: {
    getData() {
      this.$store.commit('UPDATE_LOADING', true);
      const path = `data/福利/10/${this.page}`;
      this.$store.commit('UPDATE_LOADING', true);
      this.$store.dispatch('get', {
        path,
        callback: (data) => {
          console.log('数据为:', data);
          // 将整个数组根据奇偶分为两个数组
          const leftData = data.results.filter((item, i) => {
            return (i + 1) % 2 === 1;
          });
          const rightData = data.results.filter((item, i) => {
            return (i + 1) % 2 === 0;
          });
          this.leftData = this.leftData.concat(leftData);
          this.rightData = this.rightData.concat(rightData);

          this.$store.commit('UPDATE_LOADING', false);
          this.busy = false;
        },
      });
    },
    loadMore() {
      console.log('加载更多....');
      this.busy = true;
      this.getData();
      this.page += 1;
    },
    showDetails(time) {
      this.time = time;
      const date = objectDate(time);
      this.$store.commit('UPDATE_LOADING', true);
      this.$store.state.showWefare = false;
      const path = `history/content/day/${date.Y}/${date.M}/${date.D}`;
      this.$store.dispatch('get', {
        path,
        callback: (data) => {
          // $nextTick() 在dom 重新渲染完后执行
          if (!data.error) {
            this.detailsData = data.results[0] || {};
            // 调用子组件的方法，拿到子组件，直接使用子组件的方法。
            this.$refs.details.show();
          }
          this.$nextTick(() => {
            this.$store.commit('UPDATE_LOADING', false);
            const domElement = document.querySelector('#domElemnt');
            // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView
            // 进入详细页时，把滚动条设置为0  元素的顶端将和其所在滚动区的可视区域的顶端对齐。
            if (domElement) {
              domElement.scrollIntoView(true);
            }
          });
        },
      });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .welfare-wrapper {
    display: flex;
    figure {
      width: 95%;
      display: inline-block;
      padding: 2%;
      background: #fefefe;
      // border: 2px solid #fcfcfc;
      box-shadow: 0 1px 2px rgba(34,25,25,0.4);
      margin-bottom: 10px;
    }
    .welfare {
     &.hidden {
       opacity: 0;
     }
       width: 50%;;
       img {
         width:100%;
         height: auto;
         vertical-align: top;
       }
      &.welfare:nth-child(2) {
        margin-left: 4px;
      }
    }
  }
</style>