// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import './assets/tool.css'
//导入 导出 功能
// import Blob from 'Blob'
// // import
// import Blob from './vendor/Blob'
// import Export2Excel from './vendor/Export2Excel'
//引用 + 使用VUEX
import Vuex from 'vuex';
Vue.use(Vuex)
//引用 + 使用el ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引用axios
import axios from 'axios'
Vue.prototype.$axios = axios;

Vue.prototype.$url = '';
Vue.prototype.$urls = '';


import store from './store/store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
