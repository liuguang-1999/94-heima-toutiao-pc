/**
 *封装axios拦截器
 *用于统一 管理token 令牌的使用
 */
import axios from 'axios'
import router from '@/router'
import JSONBig from 'json-bigint' // 引入 大数字处理包
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头
// 解析框架
axios.defaults.transformResponse = [function (data) {
  // 解析大数字 代码方式
  return data ? JSONBig.parse(data) : {}
}]

// 请求拦截器
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
}, function (error) {
  if (error.response.status === 401) { // 401 错误处理方式 检测到了401报错
    localStorage.removeItem('user-token') // 删除有问题的钥匙
    router.push('/login') // 遣回登录页 去重新获取钥匙
  }
  // 抛出错误
  return Promise.reject(error)
})
// 导出拦截器 在man.js 中被引用
export default axios
