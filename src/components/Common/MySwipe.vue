<template>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(img_url, key) in imgs" :key="key">
        <img :src="img_url.img||img_url.src"/>
      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    name: 'my-swipe',
    props: ['url'],
    data () {
        return {
            imgs: []
        }
    },
    created() {
        this.$axios
        .get(this.url)
        .then(res => {
            this.imgs = res.data.message;
            console.log(res.data.message);
        })
        .catch(err => {
            console.log("轮播图获取异常", err);
        });
    }
}
</script>

<style scoped>
.mint-swipe {
  height: 200px;
}
img {
  width: 100%;
  height: 200px;
}
</style>
