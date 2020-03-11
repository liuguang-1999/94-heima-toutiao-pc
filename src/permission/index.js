/**
 *专门处理 守卫拦截
 */

import router from '@/router'
import progress from 'nprogress' // 进度条包 包引入
import 'nprogress/nprogress.css' // 样式文件
router.beforeEach(function (to, from, next) {
  // 开启进度条
  progress.start()
  // startsWith方法是 已什么字符串开头
  if (to.path.startsWith('/home')) { // 判断是否 直接访问 /home 路径
    const token = localStorage.getItem('user-token') // 获取来访者的令牌
    if (!token) {
      next('/login') // 遣返登录页
      return
    }
    next() //  有钥匙通过
  }
  next() // 路过放行
})
// 应该在全局后置守卫的位置关闭 此时已经完成了路由的跳转
router.afterEach(() => {
  // 处理 进度条关闭的问题
  // setTimeout(() => progress.done(), 300)
  progress.done()
})
