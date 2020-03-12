<template>
<!-- 头部导航栏 -->
  <el-row class="layout-header" type="flex" align="middle">
   <!-- 左侧头部栏 -->
      <el-col :span="12" class="leftr">
          <i @click="collapse = !collapse" :class="{ 'el-icon-s-unfold':!collapse,'el-icon-s-fold':collapse }" style="cursor: pointer; transition: all 2s;"></i>
          <span style="user-select: none; ">江苏传智播客教育科技股份有限公司</span>
      </el-col>
  <!-- 右侧头部栏 -->
      <el-col :span="12" class="right">
         <el-row type="flex" justify="end" align="middle">
          <img :src="userinfor.photo" alt="">
          <!-- 下拉菜单 -->
          <el-dropdown trigger="hover" @command="handleCommand">
              <span class="el-dropdown-link" style="cursor: pointer;">
                <span style="user-select: none;">{{userinfor.name}}</span><i class="el-icon-arrow-down el-icon--right"></i>
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
import eventBus from '@/utils/eventBus.js' // 公共监听 文件
export default {
  data () {
    return {
      userinfor: {}, // 用户个人信息
      collapse: true // 顶部栏 初始状态 不是折叠
    }
  },
  watch: { // 用来监听 我的 collapse 折叠开关的 值改变事件 利用 eventBus 来通知 侧边栏组件 做出响应
    collapse () {
      eventBus.$emit('changeCollapse', this.collapse)
    }
  },
  created () {
    this.gitAlldata() // 组件初始化 执行获取数据 方法
    // 在这个位置开启监听
    eventBus.$on('updataUser', () => {
      // 如果触发了 updataUser 事件 事件内部 就会执行逻辑
      // 有人修改信息 触发了 updataUser 方法 内部就会执行 gitAlldata方法 来重新渲染页面数据
      this.gitAlldata()
    })
  },
  methods: {
    // 获取 信息数据方法
    gitAlldata () {
      this.$axios({
        url: '/user/profile' // 请求地址
      }).then(ser => {
        this.userinfor = ser.data // 获取的数据赋值给 userinfor:用户个人信息
      })
    },
    handleCommand (command) {
      if (command === 'infor') {
        alert('敬请期待!')
        return
      }
      if (command === 'site') {
        window.location.href = 'https://github.com/liuguang-1999?tab=repositories'
        return
      }
      if (command === 'out') {
        localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
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
