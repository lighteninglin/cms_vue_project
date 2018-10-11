<template>
  <div>
    <nav-bar title="购物车"></nav-bar>
    <div class="pay-detail">
      <ul>
        <li class="p-list" v-for="(goods, index) in shopcart" :key="goods.id">
          <mt-switch v-model="goods.isSelected"></mt-switch>
          <img :src="goods.thumb_path">
          <div class="pay-calc">
            <p>{{goods.title}}</p>
            <div class="calc">
              <span>￥{{goods.sell_price}}</span>
              <span @click="substract(goods)">-</span>
              <span>{{goods.num}}</span>
              <span @click="add(goods)">+</span>
              <a href="javascript:;" @click="del(index)">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <p>总计(不含运费):</p>
        <span>已经选择商品{{payment.count}}件，总价￥{{payment.price}}</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsTools from "@/GoodsTools";
import EventBus from "@/EventBus";

export default {
  computed: {
    payment() {
      let price = 0;
      let count = 0;
      this.shopcart.forEach(goods => {
        if (goods.isSelected) {
          count += goods.num;
          price += goods.num * goods.sell_price;
        }
      });
      return { count, price };
    }
  },
  beforeRouteLeave(to, from, next) {
    // 当导航离开该组件对应的路由时
    if (confirm("真的要离开吗？")) {
      // 保存当前的剩余购物车数据
      let obj = {};
      this.shopcart.forEach(goods => {
        obj[goods.id] = goods.num;
      });
      GoodsTools.saveGoods(obj);
      EventBus.$emit("substractShopcart", GoodsTools.getTotalCount());
      next();
    } else {
      // 取消导航行为
      next(false);
    }
  },
  methods: {
    substract(goods) {
      goods.num--;
    },
    add(goods) {
      goods.num++;
    },
    del(index) {
      this.shopcart.splice(index, 1);
    }
  },
  created() {
    let goodsList = GoodsTools.getGoodsList();
    let ids = Object.keys(goodsList).join(",");
    this.$axios
      .get("goods/getshopcarlist/" + ids)
      .then(res => {
        this.shopcart = res.data.message;
        this.shopcart.forEach(goods => {
          // 判断是否有该商品
          if (goodsList[goods.id]) {
            this.$set(goods, "num", goodsList[goods.id]);
          }
          this.$set(goods, "isSelected", true);
        });
      })
      .catch(err => console.log("购物车数据异常", err));
  },
  data() {
    return {
      msg: "我是购物车...",
      shopcart: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay-detail ul li {
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 3px;
}

.pay-detail ul {
  padding-left: 5px;
  margin-top: 5px;
}

.pay-detail ul li img {
  width: 80px;
  height: 80px;
  display: inline-block;
  vertical-align: top;
  margin-top: 10px;
}

.pay-detail ul li > :nth-child(1),
.pay-detail ul li > :nth-child(3) {
  display: inline-block;
}

.pay-detail ul li > :nth-child(1) {
  line-height: 80px;
}

.calc:nth-child(1) {
  color: red;
  font-size: 20px;
}

.calc span:not(:nth-child(1)) {
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: inline-block;
  width: 20px;
  text-align: center;
}

.calc a {
  margin-left: 20px;
}

.show-1,
.show-2 {
  display: inline-block;
  margin-left: 30px;
}

.show-price {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>