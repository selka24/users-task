import Vue from 'vue'
import App from './App.vue'
import store from '../src/store'
import Vuelidate from 'vuelidate'
import './assets/tailwind.css'
import FontAwesome from './icons/fontAwesome'


Vue.component('font-icon', FontAwesome)
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
