<template>
  <img v-lazy="imgObj" lazy="loading" class="bg-box" />
</template>
<script>
  export default {
    name: 'v-img',
    props: {
      imgUrl: {
        type: String,
      },
    },
    computed: {
      imgObj() {
        return `${this.imgUrl}?imageView2/0/w/200`;
      },
    },
  };
</script>

<style>
@-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  img[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }
  img[lazy=loading] {
    margin: auto;
  }
  
  img[lazy=error] {
    border-radius: 2px;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }
</style>