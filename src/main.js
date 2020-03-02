import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/style/index.less' // 引入初始化文件
Vue.config.productionTip = false
const axios = () => import('axios') // 引入网络请求协议包
Vue.use(ElementUI) // 注册全局组件
Vue.proyotype.$http = axios // 赋值给vue 全局属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
