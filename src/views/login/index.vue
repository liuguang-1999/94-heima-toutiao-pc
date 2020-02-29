<template>
<div class="login">
    <el-card class="box-card">
      <div class="title">
        <!-- Log 部分 -->
        <img src="../../assets/logo_index.png" alt="">
      </div>
      <!-- 表单控件 -->
      <el-form style=" margin-top:20px; ">
        <!-- 手机号框 -->
        <el-form-item >
           <el-input placeholder="请输入手机号"></el-input>
       </el-form-item>
       <!-- 验证码框 -->
        <el-form-item>
           <el-input placeholder="请输入验证码" style=" width:70% "></el-input>
           <el-button plain style="float:right">发送验证码</el-button>
       </el-form-item>
       <!-- 用户条款 -->
        <el-form-item >
           <el-checkbox style="margin-left: 100px;">我已阅读<el-link type="primary">用户协议</el-link>同意 <el-link type="primary">隐私条款</el-link></el-checkbox>
       </el-form-item>
       <!-- 点击登录 -->
        <el-form-item >
            <el-button type="primary" @click="onSubmit" style="width:100%">登录</el-button>
       </el-form-item>
      </el-form>
  </el-card>
</div>

</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.login {
  background-image: url('../../assets/877.jpg');
  height: 100vh;// 当前屏幕可视区域分成100份
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 500px;
    height: 400px;
    .title {
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
