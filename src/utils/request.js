/**
 *封装axios拦截器
 *用于统一 管理token 令牌的使用
 */
// 请求拦截器
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {} // 褪去一层 data外壳 在layout-header.vue 中第 40 行可以看出
}, function () {

})
// 导出拦截器 在man.js 中被引用
export default axios
