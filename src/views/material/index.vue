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
    <el-tabs v-model="activeName" @tab-click="changeTab" v-loading="loading" element-loading-text="玩命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <!-- label是 当前页签的名称 name是 选中页签值 -->
        <el-tab-pane label="全部素材" name="all" class="">
          <!-- 生成页面 结构 -->
          <div class='img-list'>
            <el-card v-for="item in list" :key="item.id" class="img-card">
              <img :src="item.url" alt="">
              <el-row class="operate" type='flex' align="middle" justify="space-around">
                <i class='el-icon-star-on'></i>
                <i class='el-icon-delete-solid'></i>
              </el-row>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏素材" name="collect">
          <!-- 生成页面 结构 -->
          <div class='img-list'>
            <el-card v-for="item in list" :key="item.id" class="img-card">
              <img :src="item.url" alt="">
            </el-card>
          </div>
        </el-tab-pane>
    </el-tabs>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认的选中 状态
      list: [], // 定义list 空数组 向接口中获取数据 赋值给这个list 空数组
      loading: false // 遮罩层
    }
  },
  methods: {
    // 获取数据 接口
    getMaterial () {
      this.loading = true // 打开遮罩层
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: this.activeName === 'collect' // 传入 标签页值获取数据
        },
        data: {}
      }).then(ser => {
        this.list = ser.data.results
        this.loading = false // 请求完毕 关闭遮罩层
      })
    },
    changeTab () {
      this.getMaterial()
    }
  },
  // 切换 页签事件
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list{
  display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .img-card {
          width: 220px;
          height: 240px;
          margin: 20px 40px;
          position: relative;
            img {
                width: 100%;
                height: 100%;
            }
            .operate {
              position: absolute;
              left:0;
              bottom:0;
              width: 100%;
              background: #f4f5f6;
              height: 30px;
              i  {
                  font-size:20px;
              }
          }
      }
}
</style>
