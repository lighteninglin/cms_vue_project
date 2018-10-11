<template>
<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @top-status-change="handleTopChange" ref="loadmore">
  <ul>
    <li v-for="item in list" :key="item">{{ item }}</li>
  </ul>
  <div slot="top" class="mint-loadmore-top">
    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
    <span v-show="topStatus === 'loading'">Loading...</span>
  </div>
</mt-loadmore>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6],
      topStatus: ""
    };
  },
  methods: {
    loadTop() {
      // load more data
      console.log('函数被触发了');
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // load more data
      //this.allLoaded = true; // if all data are loaded
      this.$refs.loadmore.onBottomLoaded();
    },
    handleTopChange(status) {
      // status:pull, drop, loading三种状态
      this.topStatus = status;
    }
  }
};
</script>
