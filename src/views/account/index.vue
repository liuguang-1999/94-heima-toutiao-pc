<template>
    <!-- 卡片组件 -->
        <el-card>
            <!-- 面包屑组件 -->
            <bread-crumb slot="header">
            <!-- 传入面包屑的 账户信息 -->
            <template slot="title">账户信息</template>
            </bread-crumb>
            <!-- 放置表单容器 -->
            <el-form label-width="150px" :model="formData" :rules=" rules " ref="myForm">
                <el-form-item label="用户名:" prop="name">
                    <!-- 放置input框显示信息 -->
                    <el-input style="width:30%;" v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="简介:">
                    <el-input style="width:30%;" v-model="formData.intro"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input style="width:30%;" v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input disabled="" style="width:30%;" v-model="formData.mobile"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click=" saveUser ">保存</el-button>
                </el-form-item>
            </el-form>
            <!-- 头像信息 -->
            <!-- :show-file-list="false" 不显示上传内容 -->
            <el-upload title="点击上传头像" :http-request="uploadImg" :show-file-list="false">
            <img :src="formData.photo ? formData.photo :defaultImg" alt="" class="head-upload">
            </el-upload>
        </el-card>
</template>

<script>
import eventBus from '@/utils/eventBus.js'
export default {
  data () {
    return {
      // 表单校验 规则
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { min: 1, max: 7, message: '用户名的长度为1-7位', trigger: 'blur' }], // 用户名 校验
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }, { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' }] // 邮箱 校验
      },
      formData: { // 表单数据
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像信息
        email: '', // 邮箱
        mobile: ''// 手机号
      },
      defaultImg: require('../../assets/home.jpg')
    }
  },
  methods: {
    // 上传头像方法
    uploadImg (params) {
      const data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data // ES6 简写方式
      }).then(ser => {
        this.formData.photo = ser.data.photo
        eventBus.$emit('updataUser') // 头像 监听修改
      })
    },
    // 保存数据并手动校验表单
    saveUser () {
      this.$refs.myForm.validate().then(() => {
        // 校验成功 就会 进then
        // 调用保存信息接口
        this.$axios({
          url: '/user/profile',
          method: 'patch', // 类型
          data: this.formData
        }).then(ser => {
          this.$message.success('保存用户信息成功')
          // 在这里 写 eventBus 的触发事件
          eventBus.$emit('updataUser') // 用户名 监听修改
        }).catch(() => {
          this.$message.error('修改失败')
        })
      })
    },
    // 获取公户个人信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(ser => {
        this.formData = ser.data // 请求会的数据 复制给我的 表单数据
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style>
.head-upload {
    position: absolute;
    right: 350px;
    top:160px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
