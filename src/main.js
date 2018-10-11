// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import MintUI from 'mint-ui'
import MyUl from './components/Common/MyUl'
import MyLi from './components/Common/MyLi'
import MySwipe from './components/Common/MySwipe'
import NavBar from './components/Common/NavBar'
import Comment from './components/Common/Comment'
import 'mint-ui/lib/style.css'
import './assets/css/global.css'
import Moment from 'moment'
import VuePreview from 'vue-preview'

Vue.use(MintUI)
Vue.use(VuePreview)

Vue.component(MyUl.name, MyUl)
Vue.component(MyLi.name, MyLi)
Vue.component(NavBar.name, NavBar)
Vue.component(Comment.name, Comment)
Vue.component(MySwipe.name, MySwipe)

Moment.locale('zh-cn')

Vue.filter('convertTime', function (data, formatStr) {
  return Moment(data).format(formatStr);
})
Vue.filter('relativeTime', function (previousTime) {
  return Moment(previousTime).fromNow();
})
Vue.filter('convertStr', function(str, count) {
  return str.substring(0, count) + '...';
})

Axios.defaults.baseURL = 'https://www.sinya.online/api/'
Axios.interceptors.request.use(function (config) {
  MintUI.Indicator.open({
    text: '正在加载中...'
  });
  return config;
})
Axios.interceptors.response.use(function (response) {
  // response.config类似上面config
  MintUI.Indicator.close();
  return response;
});

Vue.prototype.$axios = Axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
