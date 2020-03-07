<template>
   <!-- 文章列表 -->
   <el-card>
       <bread-crumb slot="header">
        <template slot="title">
            内容列表
        </template>
        <!-- 搜索工具栏 筛选 -->
    </bread-crumb>
       <!-- 表单容器 -->
       <el-form style="padding-left:70px;">
           <el-form-item label="文章状态:">
               <!-- 放置单选框组 -->
               <el-radio-group v-model="searchForm.status">
                   <el-radio :label="1">全部</el-radio>
                   <el-radio :label="2">草稿</el-radio>
                   <el-radio :label="4">待审核</el-radio>
                   <el-radio :label="5">审核通过</el-radio>
                   <el-radio :label="6">审核失败</el-radio>
               </el-radio-group>
           </el-form-item>
           <el-form-item label="频道类型:">
               <el-select placeholder="请选择频道"  v-model="searchForm.channel_id">
                     <!-- el-option是下拉的选项 label是显示值  value是绑定的值 -->
                   <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id">

                   </el-option>
               </el-select>
           </el-form-item>
           <el-form-item label="日期范围:" >
               <!-- 日期选择组件 -->
               <el-date-picker type='daterange' v-model="searchForm.dateRange">

               </el-date-picker>
           </el-form-item>
       </el-form>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 1, // 默认状态是全部
        channel_id: null, // 表示没有任何的频道
        dateRange: [] // 日期范围
      },
      channels: [] // 专门来接收频道的数据
    }
  },
  methods: {
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(ser => {
        this.channels = ser.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
