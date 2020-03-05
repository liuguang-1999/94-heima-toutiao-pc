<template>
<el-card>
    <!-- 防止面包屑组件 -->
    <bread-crumb slot="header">
    <!-- 评论管理 通过具名插槽给面包屑组件的插槽了 -->
    <template slot="title">
     评论管理
    </template>
    </bread-crumb>
    <!-- 表格组件 -->
    <el-table :data="list">
        <!-- 可以通过 width去设置列宽 -->
        <el-table-column label="标题" width="600"></el-table-column>
        <el-table-column label="评论状态"></el-table-column>
        <el-table-column label="总评论数"></el-table-column>
        <el-table-column label="粉丝评论数"></el-table-column>
        <el-table-column label="操作"></el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [

      ]
    }
  }
}
</script>

<style>

</style>
