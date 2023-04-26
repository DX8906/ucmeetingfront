import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI,{ Table } from 'element-ui';
import less from 'less';

import axios from 'axios'
Vue.prototype.$http=axios

// 引入组件文件
import AdminSide from './components/AdminSideComponents'
import UserSide from './components/UserSideComponents'
import Head from './components/HeadComponents'
// 直接使用Vue.component 对组件进行注册, 该组件名就是 Vue.component 的第一个参数
Vue.component('admin-side', AdminSide)
Vue.component('user-side', UserSide)
Vue.component('all-head', Head)

// 解决 ElTable 自动宽度高度导致的「ResizeObserver loop limit exceeded」问题
const fixElTableErr = (table) => {
  const oldResizeListener = table.methods.resizeListener;
  table.methods.resizeListener = function () {
      window.requestAnimationFrame(oldResizeListener.bind(this));
  };
};

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (localStorage.getItem("token")) {
    alert("interceptors");
    config.headers.token = localStorage.getItem("token");
    // config.headers.common['token'] = localStorage.getItem("token");
  }
  return config
}, function (error) {
  router.push('/login')
  return Promise.reject(error)
})

// 一定要在Vue.use之前执行此函数
fixElTableErr(Table);

Vue.use(less)
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
