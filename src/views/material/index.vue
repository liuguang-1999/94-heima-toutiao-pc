<template>
    <!-- 利用el-card 的布局属性 -->
    <el-card>
      <!-- 放置面包屑组件 -->
    <bread-crumb slot="header">
    <!-- 使用具名插槽 -->
     <template slot="title">
     素材管理
     </template>
    </bread-crumb>
    <!-- 放置标签页 -->
    <el-tabs v-model="activeName">
        <!-- label是 当前页签的名称 name是 选中页签值 -->
        <el-tab-pane label="全部素材" name="all">全部素材</el-tab-pane>
        <el-tab-pane label="收藏素材" name="collect">收藏素材</el-tab-pane>
    </el-tabs>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'
    }
  }
}
</script>

<style>

</style>
