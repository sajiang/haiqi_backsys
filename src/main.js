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


Vue.config.productionTip = false
Vue.prototype.$axios = axios;
/*router.afterEach((to, from) => {

	
})*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
