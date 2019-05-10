// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store/store'

Vue.use(ElementUI);
require( './assets/common.less');


Vue.config.productionTip = false;
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.RetCode==1001) {
      //登录失效
    	router.push({ path: "/login" })
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

Vue.prototype.$axios = axios;
/*router.beforeEach((to, from, next) => {
  console.log(to)
  debugger
  let routeData =to.fullPath
  next();
  //window.open(routeData.href, '_blank');
})*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
