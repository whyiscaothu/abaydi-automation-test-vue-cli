import Vue from 'vue'
import './plugins/axios'
import store from './store'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
let isSuccess = 'success'
console.log(isSuccess)
new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
