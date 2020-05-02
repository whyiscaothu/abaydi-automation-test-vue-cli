import Vue from 'vue'
import store from './store'
import App from './App.vue'
import vuetify from './plugins/vuetify';
console.log('main.js')

Vue.config.productionTip = false
let isSuccess = 'success'
console.log(isSuccess)
new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
