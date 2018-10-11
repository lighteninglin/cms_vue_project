<template>
    <div>
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a>返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="newComment"></textarea>
                </li>
                <li>
                    <mt-button size="large" type="primary" @click="sendMsg">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(msg, index) in msgs" :key="index">
                    {{msg.user_name}}: {{msg.content}} {{msg.add_time | relativeTime}}
                </li>
            </ul>
            <mt-button size="large" type="danger" plain @click="loadMore">加载更多</mt-button>
        </div>
    </div>
</template>

<script>
export default {
  name: "comment",
  props: ["cid"],
  data() {
    return {
      msgs: [],
      page: 1,
      newComment: ""
    };
  },
  created() {
    // 使用此组件时，是否有页码，若有则对了，没有就是第一页
    this.page = this.$route.query.page || "1";
    this.loadMore();
  },
  methods: {
    // firstLoad () {
    //     this.$axios.get(`getcomments/${this.cid}?pageindex=${this.page}`)
    //     .then(res => {
    //         if (res.data.message.length === 0) {
    //             this.$toast('没有数据了');
    //         }
    //         this.msgs = res.data.message;
    //         this.page ++;
    //     })
    //     .catch(err => {
    //         console.log('评论获取失败！', err);
    //     })
    // },
    // 该函数传参，表示页面点击按钮，这个时候数据是追加，否则不传参数，就是赋值
    // 一般来讲是针对第一次或者刷新第n页数据的时候
    loadMore(page) {
      this.$axios
        .get(`getcomments/${this.cid}?pageindex=${this.page}`)
        .then(res => {
          if (res.data.message.length === 0) {
            this.$toast("没有数据了");
          }
          if (page) {
            this.msgs = this.msgs.concat(res.data.message);
          } else {
            this.msgs = res.data.message;
          }
          this.page++;
        })
        .catch(err => {
          console.log("评论获取失败！", err);
        });
    },
    sendMsg() {
      // 发表评论之前判断文本框是否为空
      if (this.newComment.trim() === "") {
        return this.$toast("评论信息不能为空!");
      }

      // 发表评论信息 this.cid是父组件传过来的属性
      this.$axios
        .post(`postcomment/${this.cid}`, `content=${this.newComment}`)
        .then(res => {
          // 发表之后，清空评论框
          this.newComment = "";
          // 加载第一页的数据就是最新的数据
          this.page = 1;
          this.loadMore();
        })
        .catch(err => {
          console.log("发表评论信息失败", err);
        });
    }
  }
};
</script>

<style scoped>
.photo-comment > div span:nth-child(1) {
  float: left;
  font-weight: bold;
  margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
  float: right;
}

.photo-comment {
  height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  line-height: 30px;
  margin-bottom: 5px;
}

.txt-comment {
  padding: 5 5;
}

.txt-comment textarea {
  margin-bottom: 5px;
  width: 100%;
}

.comment-list li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
}

li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
