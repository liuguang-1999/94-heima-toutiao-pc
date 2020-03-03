<template>
<!-- 头部导航栏 -->
  <el-row class="layout-header" type="flex" align="middle">
   <!-- 左侧头部栏 -->
      <el-col :span="12" class="leftr">
          <i class="el-icon-s-fold"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
  <!-- 右侧头部栏 -->
      <el-col :span="12" class="right">
         <el-row type="flex" justify="end" align="middle">
          <img src="http://00.minipic.eastday.com/20170511/20170511110829_30d8ac8a4f22796d356187d5aa489584_5.jpeg" alt="">
          <!-- 下拉菜单 -->
          <el-dropdown trigger="hover">
              <span class="el-dropdown-link" style="cursor: pointer;">
                鎏光<i class="el-icon-arrow-down el-icon--right"></i>
             </span>
             <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>Github地址</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="less">
.layout-header {
height: 60px;
 .leftr {
     i {
         font-size:20px;
     }
     span {
         margin-left: 5px;
     }
 }
 .right {
     img {
         width: 50px;
         height: 50px;
         border-radius: 50%;
     }
     .el-dropdown-link {
         margin-left: 20px;
     }
 }
}
</style>
