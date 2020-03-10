<template>
  <el-card>
    <bread-crumb slot="header">
        <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form style="margin-left:50px;" label-width="100px" :model=" publishForm " :rules=" publishRules " ref="myForm">
      <!-- 标题框 -->
     <el-form-item label="标题" prop="title">
       <!-- 输入框 -->
      <el-input style="width:60%;" placeholder="请输入标题" v-model="publishForm.title"></el-input>
     </el-form-item>
     <el-form-item label="内容" prop="content">
       <!-- 多行输入框 -->
       <el-input type="textarea" :rows="5" placeholder="请输入内容" style="width:40%;" v-model="publishForm.content"></el-input>
     </el-form-item>
     <el-form-item label="封面" prop="cover">
       <!-- 单选框组 -->
       <!-- model 需要绑定的数据是 封面cover下面的type(是个只是标制) -->
       <el-radio-group v-model="publishForm.cover.type">
         <el-radio :label="1">单图</el-radio>
         <el-radio :label="3">三图</el-radio>
         <el-radio :label="0">无图</el-radio>
         <el-radio :label="-1">自动</el-radio>
       </el-radio-group>
     </el-form-item>
     <!-- 频道下拉框 -->
     <el-form-item label="频道" prop="channel_id">
       <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
         <!-- 下拉选项 被循环造出来的 -->
         <el-option  v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
       </el-select>
     </el-form-item>
     <el-form-item>
       <el-button type="primary" @click="publish(false)">发表文章</el-button>
       <el-button @click="publish(true)">存入草稿</el-button>
     </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 被赋值
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 封面
          type: 0, // 封面类型 -1 是自动 0是无图  1 是单图 3 是三图
          images: [] // 对应type  假如 type 为1 images中应该有一个值 假如为3 images应该有三个值 0 images为空
        },
        channel_id: null // id频道
      },
      // 表单校验规则
      publishRules: {
        title: [{
          required: true, // 必填项
          message: '文章标题不能为空', // 错误信息提示文本
          trigger: 'blur' // 校验规则 光标离开时进行校验表单
        }, {
          min: 5,
          max: 30,
          message: '标题在5-30位数之间',
          trigger: 'blur' // 校验规则 光标离开时进行校验表单
        }],
        content: [{
          required: true, // 必填项
          message: '文章标题不能为空', // 错误信息提示文本
          trigger: 'blur' // 校验规则 光标离开时进行校验表单
        }],
        channel_id: [{
          required: true, // 必填项
          message: '频道内容不能为空', // 错误信息提示文本
          trigger: 'blur' // 校验规则 光标离开时进行校验表单
        }]
      }
    }
  },
  methods: {
    // 根据id 获取文章详情
    getArticleById (id) {
      this.$axios({
        url: `articles/${id}`
      }).then(ser => {
        this.publishForm = ser.data // 将请求回来的数据 赋值给表单数据
      })
    },
    getChannels () {
      // 获取频道数据
      this.$axios({
        url: '/channels' // 获取频道数据
      }).then(ser => {
        // 获取到的频道数据 赋值给 channels
        this.channels = ser.data.channels
      })
    },
    publish (draft) {
      this.$refs.myForm.validate().then(() => {
        const { articleId } = this.$route.params
        this.$axios({
          url: articleId ? `/articles/${articleId}` : '/articles', // 根据场景决定用什么地址
          method: articleId ? 'put' : 'post',
          params: { draft },
          data: this.publishForm // 请求体参数
        }).then(() => {
          this.$message.success('操作成功!') // 成功提示
          // 如果发布成功了 就应该去 内容列表
          this.$router.push('/home/articles')
        }).catch(() => {
          debugger
          this.$message.error('操作失败!') // 失败提示
        })
      })
    }
  },
  created () {
    // 调用获取频道数据 方法
    this.getChannels()
    const { articleId } = this.$route.params
    // 第一种写法
    /*  if (articleId) {
      this.getArticleById(articleId)
    } */
    // 优化写法
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>

</style>
