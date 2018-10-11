<template>
  <div>
    <my-swipe url="getlunbo"></my-swipe>
    <div class="grid">
      <my-ul>
        <my-li v-for="(grid,key) in grids" :key="key">
          <router-link :to="grid.router">
            <span :class="grid.className"></span>
            <div>{{grid.title}}</div>
          </router-link>
        </my-li>
      </my-ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [],
      grids: [
        {
          className: "cms-news",
          title: "新闻资讯",
          router: { name: "news.list" }
        },
        {
          className: "cms-photo",
          title: "图文分享",
          router: { name: "photo.list", params: { categoryId: 0 } }
        },
        {
          className: "cms-goodsshow",
          title: "商品展示",
          router: { name: "goods.list", query: { id: 1 } }
        },
        {
          className: "cms-feedback",
          title: "留言反馈",
          router: { name: "news.list" }
        },
        {
          className: "cms-searchnews",
          title: "搜索资讯",
          router: { name: "news.list" }
        },
        {
          className: "cms-contactus",
          title: "联系我们",
          router: { name: "news.list" }
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a div {
  margin-top: -50px;
}
.cms-news {
  background-image: url(../../assets/Images/news.png);
  background-repeat: round;
  height: 50px;
  width: 50px;
  margin: 10px 0;
  display: inline-block;
}
.cms-photo {
  background-image: url(../../assets/Images/photo.png);
  background-repeat: round;
  height: 50px;
  width: 50px;
  margin: 10px 0;
  display: inline-block;
}
.cms-goodsshow {
  background-image: url(../../assets/Images/goodsshow.png);
  background-repeat: round;
  height: 50px;
  width: 50px;
  margin: 10px 0;
  display: inline-block;
}
.cms-feedback {
  background-image: url(../../assets/Images/feedback.png);
  background-repeat: round;
  height: 50px;
  width: 50px;
  margin: 10px 0;
  display: inline-block;
}
.cms-searchnews {
  background-image: url(../../assets/Images/searchnews.png);
  background-repeat: round;
  height: 50px;
  width: 50px;
  margin: 10px 0;
  display: inline-block;
}
.cms-contactus {
  background-image: url(../../assets/Images/contactus.png);
  background-repeat: round;
  height: 50px;
  width: 50px;
  margin: 10px 0;
  display: inline-block;
}
</style>
