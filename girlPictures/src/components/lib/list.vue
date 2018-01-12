<template>
  <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
      <a v-for="(data, index) in datas" :href="data.url " target="view_window" :key="index">
         <v-card :data="data" ></v-card>
      </a>
  </div>

</template>
<script type="text/ecmascript-6">
  import vCard from './card';

  export default {
    name: 'v-list',
    props: {
      type: {
        type: String,
      },
    },
    components: {
      vCard,
    },
    data() {
      return {
        datas: [],
        page: 1,
        busy: false,
      };
    },
    computed: {
    },
    methods: {
      loadTop() {
        const path = `data/${this.type}/10/${this.page}`;
        console.log('加载资源...', this.type, path);
        this.$store.commit('UPDATE_LOADING', true);
        this.$store.dispatch('get', {
          path,
          other: '其它的参数...',
          callback: (data) => {
            // 将新返回的数据添加到原来的数据数组中
            this.datas = this.datas.concat(data.results);
            this.busy = false;
            this.$nextTick(() => {
              this.$store.commit('UPDATE_LOADING', false);
            });
            // this.$store.commit('UPDATE_LOADING', false);
          },
        });
      },
      loadMore() {
        console.log('加载更多....');
        this.busy = true;
        this.loadTop();
        this.page += 1;
      },
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .list {
    padding: 15px;
  }
</style>