<template>
  <div class="card">
    <img  v-lazy="data.images?data.images[0]+'?imageView2/0/w/200':null" class="img">
    <div class="card-content">
      <div class="desc">{{data.desc}}</div>
      <div class="card-content-bottom">
        <div class="who">{{data.who}}</div>
        <div class="time">2017-11-30</div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'v-card',
    props: {
      data: {
        type: Object,
      },
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .card {
    position:relative;
    max-height: 200px;
    overflow: hidden;
    margin-bottom: 10px;
    border-radius: 4px;
     > img {
       width: 100%;
     }
    .card-content {
      position: absolute;
      width: 90%;
      left:0;
      bottom:0;
      padding: 10px 5%;
      color: #fff;
      background: rgba(0,0,0,.4);
      .desc {
        width:100%;
        height: auto;
        text-align: left;
        font-size: 16px;
        line-height: 16px;
        word-wrap: break-word;
      }
      .card-content-bottom {
        display: flex;
        font-size: 14px;
        .who {
          flex: 1;
          text-align: left;
        }
        .time {
          flex: 1;
          text-align: right;
        }
      }
    }
  }
</style>
