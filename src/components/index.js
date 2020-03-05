import layoutheader from './home/layout-header.vue' // 头部
import layoutaside from './home/layout-aside.vue' // 主视图
import BreadCrumb from './common/bread-crumb.vue' // 面包屑
// 导出全局组件
export default {
  // 注册全局组件
  install: function (Vue) {
    // 注册全局组件 一旦注册 在全局任意位置都可以使用
    Vue.component('layoutheader', layoutheader) // 注册 头部组件
    Vue.component('layoutaside', layoutaside) // 注册  左侧导航组件
    Vue.component('BreadCrumb', BreadCrumb) // 注册面包屑 组件
  }
}
