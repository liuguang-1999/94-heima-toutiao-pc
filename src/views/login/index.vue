<template>
<div class="login">
    <el-card class="box-card">
      <div class="title">
        <!-- Log 部分 -->
        <img src="../../assets/logo_index.png" alt="">
      </div>
      <!-- 表单控件 -->
      <el-form style=" margin-top:20px; "  :model="ruleForm" :rules="rules" ref="loginForm">
        <!-- 手机号框 -->
        <el-form-item  prop="mobile">
           <el-input placeholder="请输入手机号" v-model="ruleForm.mobile"></el-input>
       </el-form-item>
       <!-- 验证码框 -->
        <el-form-item prop="code">
           <el-input placeholder="请输入验证码"  style=" width:70% " v-model="ruleForm.code"></el-input>
           <el-button plain style="float:right" >发送验证码</el-button>
       </el-form-item>
       <!-- 用户条款 -->
        <el-form-item prop="delivery">
           <el-checkbox style="margin-left: 100px;" v-model="ruleForm.delivery" >我已阅读<el-link type="primary">用户协议</el-link>同意 <el-link type="primary">隐私条款</el-link></el-checkbox>
       </el-form-item>
       <!-- 点击登录 -->
        <el-form-item >
            <el-button type="primary" @click="login" style="width:100%" >登录</el-button>
       </el-form-item>
      </el-form>
  </el-card>
</div>

</template>

<script>
export default {
  data () {
    return {
      ruleForm: { // 数据绑定
        mobile: '', // 手机号
        code: '', // 验证码
        delivery: false // 是否同意条款协议
      },
      rules: { // 表单内容校验规则表达式
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, {
          pattern: /^1[34578]\d{9}$/, message: '您输入的手机号格式不正确' // 正则表达式
        }], // 手机号的验证规则
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }, {
          pattern: /^\d{6}$/, message: '您输入的验证码格式不正确' // 正则表达式
        }], // 验证码的验证规则
        // 自定义校验 复选框  因为: required 不能校验 true 和 false
        delivery: [{
          validator: function (rule, value, callback) {
            // rule 是当前的 校验规则
            // value 是当前要校验 的字段 或 值
            // callback 是一个回调 无论成功与否 它都会执行
            // 代码成功、执行 callback 代码错误、执行 callback 但需要(new Error('错误信息'))
            // 代码中 value 为true 则表示校验成功 反之校验失败
            // 判断 value 为true 或 false 可以利用三元表达式 来进行证明
            value ? callback() : callback(new Error('您必须同意我们的霸王条款否则我们不和你玩')) // new Error('错误信息 就是页面的提示信息')
          }
        }]// 复选框是否被选中
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate().then(() => {
        this.$axios({
          url: '/authorizations', // 请求地址
          data: this.ruleForm,
          method: 'post'
        }).then(ser => {
          window.localStorage.setItem('user-token', ser.data.token)
          this.$router.push('/home')
          this.$message({
            showClose: true,
            message: '登陆成功',
            type: 'success'
          })
        }).catch(() => {
          this.$message({
            showClose: true,
            message: '用户名或密码错误',
            type: 'error'
          })
        })
      })
    }
  }
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
    background-color: rgba(3,24,10,0.1);
    width: 500px;
    height: 360px;
    .title {
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
