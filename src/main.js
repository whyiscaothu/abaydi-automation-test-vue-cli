import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
let sss = 'word'
console.log(sss)
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
