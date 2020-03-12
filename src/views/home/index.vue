<template>
<!-- 主页框架搭建 -->
 <el-container>
   <!-- 左侧导航区域 -->
   <el-aside style="background-color: #2e2f32; transition: all 1s;" :style="{width: collapse ?  '60px' : '230px'}">
     <layoutaside :collapse="collapse">
     </layoutaside>
     </el-aside>
   <!-- 右侧模块搭建 -->
 <el-container>
   <!-- 顶部操作栏 -->
   <el-header>
     <layoutheader></layoutheader>
   </el-header>
   <!-- 主要容器区 -->
   <el-main style="padding:0;">
     <!-- 主要容器区 -->
     <!-- 路由视口 -->
     <router-view></router-view>
     </el-main>
 </el-container>
 </el-container>
</template>

<script>
import eventBus from '@/utils/eventBus.js'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    // 头部组件 折叠按钮被点击了 切换了状态 这里就会监听到 头部的改变 这个方法就会做出响应
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>

</style>
