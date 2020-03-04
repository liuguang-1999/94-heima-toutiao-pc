/**
 *专门处理 守卫拦截
 */

import router from '@/router'

router.beforeEach(function (to, from, next) {
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
