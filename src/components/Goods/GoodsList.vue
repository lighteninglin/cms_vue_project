<template>
    <div :style="{height: boxHeight+'px'}">
        <nav-bar title="商品展示"/>
        <mt-loadmore :auto-fill="false" :bottom-all-loaded="isAllLoad" :bottom-method="loadBottom" ref="loadmore">
            <ul>
            <li v-for="goods in goodsList" :key="goods.id">
                <router-link :to="{name: 'goods.detail', params: {id: goods.id}}">
                    <img :src="goods.img_url">
                    <div class="title">{{goods.title | convertStr(25)}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{goods.sell_price}}</span>
                            <s>￥{{goods.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{goods.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
        </mt-loadmore>
    </div>
</template>

<script>
export default {
    props: ['apprefs'],
    data () {
        return {
            goodsList: [],
            page: 1,
            isAllLoad: false,
            boxHeight: 0
        }
    },
    created () {
        this.page = this.$route.query.id || '1';
        this.loadByPage();
    },
    mounted () {
        let deviceHeight = document.body.clientHeight;
        let headerHeight = this.apprefs.appHeader.$el.offsetHeight;
        let footerHeight = this.apprefs.appFooter.$el.offsetHeight;
        this.boxHeight = deviceHeight - headerHeight - footerHeight;
    },
    methods: {
        loadByPage () {
            this.$axios.get('getgoods?pageindex='+this.page)
            .then(res => {
                this.goodsList = res.data.message;
                this.page ++;
            })
            .catch(err => {
                console.log(err, '商品列表获取失败');
            })
        },
        concatByPage () {
            this.$axios.get('getgoods?pageindex='+this.page)
            .then(res => {

                if (res.data.message.length === 0) {
                    this.$toast('没有更多数据了');
                    this.isAllLoad = true;
                }

                this.goodsList = this.goodsList.concat(res.data.message);
                this.$refs.loadmore.onBottomLoaded();
                this.page ++;
            })
            .catch(err => {
                console.log(err, '商品列表获取失败');
            })
        },
        loadBottom() {
            console.log('上拉刷新被执行了');
            this.concatByPage(this.page);
            this.$refs.loadmore.onBottomLoaded();
        }
    }
};
</script>

<style scoped>
ul {
  overflow: hidden;
}

li {
  width: 50%;
  float: left;
  padding: 6px;
  box-sizing: border-box;
}

li > a:not(.mui-btn) {
  margin: 0px;
  padding: 0px;
  border: 1px solid #5c5c5c;
  box-shadow: 0 0 4px #666;
  width: 100%;
  display: block;
}

li > a:not(.mui-btn) img {
  width: 100%;
}

.sell > span {
  float: left;
  color: red;
  text-align: left;
}

.detail > .hot {
  float: left;
  text-align: left;
  font-size: 15px;
}

.detail > .count {
  float: right;
  font-size: 15px;
}

.detail {
  overflow: hidden;
}

.desc {
  color: rgba(92, 92, 92, 0.8);
  background-color: rgba(0, 0, 0, 0.2);
}

img {
  height: 200px;
}

.mint-loadmore {
    margin-left: -40px;
    margin-bottom: 45px;
}
</style>
