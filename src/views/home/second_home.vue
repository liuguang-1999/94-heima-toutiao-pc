<template>
  <!-- 二级路由的默认组件 -->
  <div class="second-home">
  </div>
</template>

<script>
export default {
  // http://attach.bbs.miui.com/forum/201111/21/205700txzuacubbcy91u99.jpg
  data () {
    return {
      list: [
        'http://attach.bbs.miui.com/forum/201311/17/174124tp3sa6vvckc25oc8.jpg',
        'http://attach.bbs.miui.com/forum/201311/07/092441ln1zfzdqf92ded65.jpg',
        'http://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201601/24/175433rossj7cn74vksn4p.jpg',
        'http://pic1.win4000.com/wallpaper/b/55597435bb036.jpg']
    }
  }
}
</script>

<style>
.second-home {
  /* calc 计算的意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
  height: calc(100vh - 60px);
  background-size: cover;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583497055660&di=b69a7b98968854b05037e8b0b20ea4a6&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-16%2F59e426c79a278.jpg")
}
</style>
