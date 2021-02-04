import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import api from '@/api'

// 插件
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/swiper-bundle.css'
import ElementUI from 'element-ui'
import VChart from 'vue-echarts'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// 本地
import '@/assets/styles/reset.css'
import '@/assets/styles/common.less'
import global from '@/common/global'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.prototype.$api = api
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.component('VChart', VChart)
Vue.use(global)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
