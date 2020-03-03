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
          <img :src="userinfor.photo" alt="">
          <!-- 下拉菜单 -->
          <el-dropdown trigger="hover" @command="handleCommand">
              <span class="el-dropdown-link" style="cursor: pointer;">
                {{userinfor.name}}<i class="el-icon-arrow-down el-icon--right"></i>
             </span>
             <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="infor">个人信息</el-dropdown-item>
                <el-dropdown-item command="site">Github地址</el-dropdown-item>
                <el-dropdown-item command="out">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userinfor: {} // 用户个人信息
    }
  },
  created () {
    const token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile', // 请求地址
      headers: {
        Authorization: `Bearer ${token}` // 格式要求 Bearer +token
      }
    }).then(ser => {
      this.userinfor = ser.data.data
    })
  },
  methods: {
    handleCommand (command) {
      this.$message('你点击的是' + command)
    }
  }
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
