<template>
  <el-card>
    <bread-crumb slot="header">
        <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form style="margin-left:50px;" label-width="100px">
      <!-- 标题框 -->
     <el-form-item label="标题">
       <!-- 输入框 -->
      <el-input style="width:60%;" placeholder="请输入标题"></el-input>
     </el-form-item>
     <el-form-item label="内容">
       <el-input type="textarea" :rows="5" placeholder="请输入内容" style="width:40%;"></el-input>
     </el-form-item>
     <el-form-item label="封面">
       <el-radio-group>
         <el-radio>单图</el-radio>
         <el-radio>三图</el-radio>
         <el-radio>无图</el-radio>
         <el-radio>自动</el-radio>
       </el-radio-group>
     </el-form-item>
     <el-form-item label="频道">
       <el-select placeholder="请选择频道">
         <el-option  v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
       </el-select>
     </el-form-item>
     <el-form-item label="">
       <el-button type="primary">发表文章</el-button>
       <el-button>存入草稿</el-button>
     </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
    getChannels () {
      // 获取频道数据
      this.$axios({
        url: '/channels' // 获取频道数据
      }).then(ser => {
        this.channels = ser.data.channels
      })
    }
  },
  created () {
    // 调用获取频道数据 方法
    this.getChannels()
  }
}
</script>

<style>

</style>
