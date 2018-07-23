// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/reset.css'
import Common from '@/assets/js/utils.js'

Vue.use(MintUI)
Vue.use(Common)

Vue.config.productionTip = false

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
