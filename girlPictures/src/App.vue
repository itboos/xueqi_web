<template>
  <div id="app">
    <v-header ></v-header>
    <loading :show="loadingShow"></loading>
    <router-view></router-view>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import vHeader from './components/header';
import loading from './components/lib/loading';


export default {
  name: 'app',
  components: {
    vHeader,
    loading,
  },
  data() {
    return {};
  },
  created() {
  },
  computed: {
    ...mapState(['loadingShow']),
    // 相当于 这样
    // loadingShow() {
    //   return this.$store.state.loadingShow;
    // },
  },
  methods: {
  },
};
</script>

<style>
/*rese*/ 
body,p,h3,figure,ul{
  margin:0;
  padding: 0;
}
li {
  padding-left: 0;
  list-style-type: none;
}
a {
  text-decoration: none;
  color: #7e8c8d;
}
body {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 100%;
  padding-top: 50px;
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
</style>