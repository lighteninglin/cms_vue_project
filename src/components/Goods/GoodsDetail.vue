<template>
    <div>
        <nav-bar title="商品详情"/>
        <div class="outer-swiper">
            <div class="swiper">
                <my-swipe :url="'getthumimages/'+imgId"></my-swipe>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li>
                    <span class="product-desc-sapn">{{goodsInfo.title}}</span>
                </li>
                <li class="price-li">
                    市场价：<s>￥{{goodsInfo.market_price}}</s> 销售价：<span>￥{{goodsInfo.sell_price}}</span>
                </li>
                <li class="number-li">
                    购买数量：<span @click="substract">-</span><span>{{pickNum}}</span><span @click="add">+</span>
                </li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="insertBall">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball" v-on:after-enter="afterEnter">
            <div class="ball" v-if="isExist"></div>
        </transition>
        <div class="product-prop">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{goodsInfo.goods_no}}</li>
                <li>库存情况：{{goodsInfo.stock_quantity}}件</li>
                <li>上架时间：{{goodsInfo.add_time | convertTime('YYYY-MM-DD')}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button @click="showPhotoInfo" type="primary" size="large" plain>图文介绍</mt-button>
                </li>
                <li>
                    <mt-button @click="goodsComment" type="danger" size="large" plain>商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import EventBus from '@/EventBus'
import GoodsTools from '@/GoodsTools'

export default {
  data() {
    return {
      goodsInfo: {},
      isExist: false,
      imgId: 87,
      pickNum: 1
    };
  },
  created() {
    this.imgId = this.$route.params.id;
    this.$axios
      .get("goods/getinfo/" + this.imgId)
      .then(res => {
        this.goodsInfo = res.data.message[0];
      })
      .catch(err => {
        console.log("商品详情获取失败", err);
      });
  },
  methods: {
    insertBall() {
      this.isExist = true;
    },
    afterEnter() {
      this.isExist = false;
      
      // 通知App组件增加小球数量
      EventBus.$emit('addShopcart', this.pickNum);

      GoodsTools.add({
        id: this.goodsInfo.id,
        num: this.pickNum
      });
    },
    add() {
      // 判断库存量再自增
      if(this.goodsInfo.stock_quantity <= this.pickNum) return;
      this.pickNum ++;
    },
    substract(){
      if(this.pickNum <= 1) return;
      this.pickNum --;
    },
    showPhotoInfo() {
      this.$router.push({
        name: 'photo.info',
        query: {
          id: this.$route.params.id
        }
      });
    },
    goodsComment() {
      // 编程导航 使用评论子组件
      this.$router.push({
        name: 'goods.comment',
        query: {
          id: this.$route.params.id
        }
      })
    }
  }
};
</script>


<style scoped>
.ball-enter-active {
  animation: bounce-in 1s;
}

.ball-leave {
    opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(140px, -50px, 0);
  }
  75% {
    transform: translate3d(160px, 0px, 0);
  }
  100% {
    transform: translate3d(140px, 300px, 0);
  }
}

.swiper {
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 8px;
  width: 95%;
  border-radius: 15px;
  overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-info,
.product-prop {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 3px;
}

.outer-swiper ul,
.product-desc ul,
.product-info ul,
.product-prop ul {
  padding: 0;
}

.product-desc ul li,
.product-info ul li,
.product-prop ul li {
  list-style: none;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 8px;
}

.product-desc ul > :nth-child(1) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-prop ul {
  padding-left: 10px;
}

.price-li span {
  color: red;
  font-size: 25px;
}

.price-li s {
  margin-right: 16px;
}

.number-li span {
  display: inline-block;
  border: 2px solid rgba(0, 0, 0, 0.1);
  width: 25px;
}

/* 商品参数 */
.product-prop ul > :nth-child(1) {
  text-align: left;
}

.product-prop ul:not(:nth-child(1)) {
  margin-left: 40px;
}

.product-info ul {
  margin-bottom: 70px;
  padding: 0 5;
}

.number-li span {
  text-align: center;
}

.number-li > :nth-child(2) {
  width: 40px;
}

.ball {
  border-radius: 50%;
  background-color: red;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 440px;
  left: 120px;
  display: inline-block;
  z-index: 9999;
}
</style>
