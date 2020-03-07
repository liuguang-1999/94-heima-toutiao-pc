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
               <el-radio-group v-model="value">
                   <el-radio :label="1">全部</el-radio>
                   <el-radio :label="2">草稿</el-radio>
                   <el-radio :label="4">待审核</el-radio>
                   <el-radio :label="5">审核通过</el-radio>
                   <el-radio :label="6">审核失败</el-radio>
               </el-radio-group>
           </el-form-item>
           <el-form-item label="频道类型:">
               <el-select placeholder="请选择频道">

               </el-select>
           </el-form-item>
           <el-form-item label="日期范围:">
               <!-- 日期选择组件 -->
               <el-date-picker type='daterange'>

               </el-date-picker>
           </el-form-item>
       </el-form>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      value: '2'
    }
  }
}
</script>

<style>

</style>
