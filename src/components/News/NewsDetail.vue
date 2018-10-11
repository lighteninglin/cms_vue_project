<template>
    <div>
        <nav-bar :title="title"/>
        <div class="news-title">
            <p>{{newsDetail.title}}</p>
            <div>
                <span>{{newsDetail.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{newsDetail.add_time | convertTime('YYYY-MM-DD')}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetail.content"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      newsDetail: {},
      title: ""
    };
  },
  created() {
    // 获取路由查询字符串参数id
    let id = this.$route.query.id;

    this.$axios
      .get("getnew/" + id)
      .then(res => {
        this.newsDetail = res.data.message[0];
      })
      .catch(err => {});
  },
  // 路由进入之前即此组件实例创建之前!故不能用this引用此实例
  beforeRouteEnter(to, from, next) {
    let title = "";
    if (from.name == null) {
      if (to.name === "news.detail") {
        title = "新闻详情";
      } else if (to.name === "photo.info") {
        title = "商品图文";
      }
    } else if (from.name === "news.list") {
      title = "新闻详情";
    } else if (from.name === "goods.detail") {
      title = "商品图文";
    }

    next(vm => {
      // 通过 vm 访问组件实例
      // vm 就是未来组件对象的this
      vm.title = title;
    });
  }
};
</script>

<style scoped>
.news-title p {
  color: #0a87f8;
  font-size: 20px;
  font-weight: bold;
}
.news-title span {
  margin-left: 5px;
}
.news-title {
  margin-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
