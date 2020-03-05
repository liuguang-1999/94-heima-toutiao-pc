import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 引入权限模块
import ElementUI from 'element-ui' // 引入组件
import axios from '@/utils/request.js' // 引入请求拦截器
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/style/index.less' // 引入初始化文件
import Components from '@/components'
Vue.config.productionTip = false
Vue.use(Components)
Vue.use(ElementUI) // 注册全局组件

Vue.prototype.$axios = axios // 赋值给vue 全局属性

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
