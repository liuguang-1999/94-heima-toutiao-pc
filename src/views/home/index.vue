<template>
<!-- 主页框架搭建 -->
<!-- 左侧导航区域 -->
 <el-container>
   <el-aside style="width: 230px;">
     <layout>
     </layout>
     </el-aside>
   <!-- 右侧模块搭建 -->
 <el-container>
   <!-- 顶部操作栏 -->
   <el-header><h1>顶部操作栏</h1></el-header>
   <!-- 主要容器区 -->
   <el-main>
     <h1>主要容器区</h1>
     <!-- 路由视口 -->
     <router-view></router-view>
     </el-main>
 </el-container>
 </el-container>
</template>

<script>
import layout from '@/components/home/layout-aside.vue'
export default {
  components: {
    layout
  }
}
</script>

<style>

</style>
