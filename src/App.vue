<template>
  <div id="app">
    <mt-header title="信息管理系统" ref="appHeader"></mt-header>
    <transition name="rv" mode="out-in">
      <router-view class="tmpl" :apprefs="$refs"/>
    </transition>
    <mt-tabbar fixed v-model="selected" ref="appFooter">
      <mt-tab-item id="home">
        <img @click="changeHash" slot="icon" src="./assets/Images/home.png" width="100" height="100">
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img @click="changeHash" slot="icon" src="./assets/Images/vip.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img @click="changeHash" slot="icon" src="./assets/Images/shopcart.png">
        购物车<mt-badge type="error" size="small">{{num}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="search">
        <img @click="changeHash" slot="icon" src="./assets/Images/search.png">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import EventBus from './EventBus'
import GoodsTools from './GoodsTools'

export default {
  data () {
    return {
      selected: '',
      num: 0
    }
  },
  methods: {
    changeHash () {
      // Vue在完成渲染任务以后的行为
      this.$nextTick(function () {
        this.$router.push({
          name: this.selected 
        });
      });
    }
  },
  created() {
    this.num = GoodsTools.getTotalCount();

    EventBus.$on('addShopcart', data => {
      // console.log(data);
      this.num += data;
    });

    EventBus.$on('substractShopcart', data => {
      // console.log(data);
      this.num = data;
    });
  }
}
</script>

<style>
.tmpl {
  margin-bottom: 55px;
}

.rv-enter-active {
  transition: opacity .5s;
}

.rv-enter, .rv-leave-to {
  opacity: 0;
}
</style>
