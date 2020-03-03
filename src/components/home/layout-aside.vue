<template>
  <div class="layout-aside">
      <!-- 头部Log -->
      <div class="title">
          <img src="../../assets/logo_admin.png" alt="">
      </div>
      <!-- 侧边栏菜单 -->
      <el-menu background-color = "#323745" text-color = "#adafb5">
        <el-menu-item index="4">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <!-- 二级菜单 -->
        <!-- 内容管理 -->
        <el-submenu index = "1">
        <template slot="title">
            <i  class='el-icon-s-grid'></i>
            <span>内容管理</span>
        </template>
        <el-menu-item index="1-1">发布文章</el-menu-item>
        <el-menu-item index="1-2">内容列表</el-menu-item>
        <el-menu-item index="1-3">评论列表</el-menu-item>
        <el-menu-item index="1-4">素材管理</el-menu-item>
        </el-submenu>
        <!-- 粉丝管理 -->
         <el-submenu index = "2">
             <template slot="title">
            <i class='el-icon-s-opportunity'></i>
            <span>粉丝管理</span>
        </template>
         <el-menu-item index="1-1">图文数据</el-menu-item>
        <el-menu-item index="1-2">粉丝概况</el-menu-item>
        <el-menu-item index="1-3">粉丝画像</el-menu-item>
        <el-menu-item index="1-4">粉丝列表</el-menu-item>
         </el-submenu>
        <el-menu-item index="5">
            <i class="el-icon-user-solid"></i>
            <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.layout-aside {
    width: 230px;
    background-color: #2e2f32;
    height: 100vh;
    .title {
        text-align: center;
        padding: 10px 0;
        img {
            height: 35px;
        }
    }
     .el-menu {
            border-right: none;
      }
}

</style>
