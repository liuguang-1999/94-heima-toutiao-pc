import layoutheader from './home/layout-header.vue' // 头部
import layoutaside from './home/layout-aside.vue' // 主视图
import BreadCrumb from './common/bread-crumb.vue' // 面包屑
import VueQuillEditor from 'vue-quill-editor' // 富文本编辑器 组件
import CoverImage from './publish/cover-image.vue' // 引入封面组件
import SelectImage from './publish/select-image.vue' // 引入 素材库和上传素材组件
// 富文本编辑器 样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导出全局组件
export default {
  // 注册全局组件
  install: function (Vue) {
    // 注册全局组件 一旦注册 在全局任意位置都可以使用
    Vue.component('layoutheader', layoutheader) // 注册 头部组件
    Vue.component('layoutaside', layoutaside) // 注册  左侧导航组件
    Vue.component('bread-crumb', BreadCrumb) // 注册面包屑 组件
    Vue.component('cover-image', CoverImage) // 封面组件全局注册
    Vue.component('select-image', SelectImage) // 素材库和上传素材组件 全局注册
    // 注册富文本编辑器
    Vue.use(VueQuillEditor)
  }
}
