<template>
<!-- 主页框架搭建 -->
 <el-container>
   <!-- 左侧导航区域 -->
   <el-aside style="width: 230px; background-color: #2e2f32">
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
   <el-main style="padding:0;">
     <!-- 主要容器区 -->
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
