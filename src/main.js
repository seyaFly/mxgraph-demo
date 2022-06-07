import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import x2js from 'x2js'

Vue.config.productionTip = false
// Vue.prototype.$x2js = new x2js() 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
