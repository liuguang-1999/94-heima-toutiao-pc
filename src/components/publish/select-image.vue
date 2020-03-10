<template>
                <!-- 素材库和上传素材组件 -->
  <!-- 通过页签组件形式来显示 -->
  <el-tabs v-model=" activeName ">
    <el-tab-pane label="素材库" name="material" :list="list">
              <div class="select-image-list">
             <!-- 循环容器 分出若干份 -->
                <el-card v-for="item in list" :key="item.id" class='img-card' style="cursor: pointer;">
                 <!-- 循环体值 给img 显示出来 -->
                 <img :src="item.url" alt="" @click="clickImg(item.url)">
             </el-card>
            </div>
             <!-- 分页功能 -->
            <el-row type="flex" justify="center" align="middle" style="height:80px;">
                <el-pagination layout="prev,pager,next" background
                :current-page="page.currentPage"
                @current-change="changePage"
                :page-size="page.pageSize"
                :total="page.total"
                ></el-pagination>
             </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传素材" name="upload">上传素材</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  // 定义默认激活项
  data () {
    return {
      activeName: 'material', // 当前默认激活 素材库
      list: [], // 图片容器
      page: {
        currentPage: 1, // 当前第几页
        pageSize: 12, // 当前页 显示多少条数据
        total: 0 // 总条目
      }
    }
  },
  methods: {
    // 子传父 传递参数
    clickImg (url) {
      this.$emit('selectOneImg', url)
    },
    // 改变页码 发送请求
    changePage (newpage) {
      this.page.currentPage = newpage
      this.getAllImg()
    },
    // 获取图片数据
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(ser => {
        this.list = ser.data.results
        this.page.total = ser.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card {
        width: 150px;
        height: 150px;
        margin: 20px 0;
        img {
            width: 100%;
            height: 100%;
        }
    }

}
.upload-img {
  display: flex;
  justify-content: center;
  i {
    font-size: 20px;
    padding: 50px;
    border:2px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
