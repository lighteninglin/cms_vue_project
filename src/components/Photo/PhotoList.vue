<template>
    <div>
        <nav-bar title="图文列表"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="c in categorys" :key="c.id">
                    <a @click="loadImgsByCategoryId(c.id)" href="javascript:;">{{c.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link :to="{name: 'photo.detail', query: {id: img.id}}">
                        <img v-lazy="img.img_url">
                        <p>
                            <span>{{img.title}}</span>
                            <br>
                            <span>{{img.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            imgs: [],
            categorys: []
        }
    },
    beforeRouteUpdate (to, from, next) {
        // ...
        console.log(to);
        this.loadImgById(to.params.categoryId);
        next();
    },
    created () {
        // 1.获取路由参数
        let categoryId = this.$route.params.categoryId;
        this.loadImgById(categoryId);
        // 2.获取分类信息
        this.$axios.get('getimgcategory')
        .then(res => {
            this.categorys = res.data.message;

            // 向数组的第一个元素添加一个全部
            this.categorys.unshift(
                {
                    id: 0,
                    title: '全部'
                }
            );
        })
        .catch(err => {
            console.log('分类信息获取失败', err);
        })
    },
    methods: {
        loadImgsByCategoryId (categoryId) {
            this.$router.push({
                name: 'photo.list',
                params: {
                    categoryId
                }
            });
        },
        loadImgById (id) {
            this.$axios.get('getimages/' + id)
            .then(res => {
                this.imgs = res.data.message;
                if (this.imgs.length === 0) {
                    this.$toast({
                        message: '当前页面无图片'
                    });
                }
            })
            .catch(err => {
                console.log('图片列表获取失败', err);
            })
        }
    }
}
</script>

<style scoped>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /* 强制不换行 */
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5px;
}

image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 0;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}
</style>
