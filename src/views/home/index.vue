<template>
<!-- 主页框架搭建 -->
<!-- 左侧导航区域 -->
 <el-container>
   <el-aside><h1>侧边栏</h1></el-aside>
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
export default {

}
</script>

<style>

</style>
