<template>
<!-- 主页框架搭建 -->
 <el-container>
   <!-- 左侧导航区域 -->
   <el-aside style="width: 230px;">
     <layoutaside>
     </layoutaside>
     </el-aside>
   <!-- 右侧模块搭建 -->
 <el-container>
   <!-- 顶部操作栏 -->
   <el-header>
     <layoutheader></layoutheader>
   </el-header>
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
import layoutaside from '@/components/home/layout-aside.vue'
import layoutheader from '@/components/home/layout-header.vue'
export default {
  components: {
    layoutaside,
    layoutheader
  }
}
</script>

<style>

</style>
