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
    <el-tab-pane label="上传素材" name="upload">
        <!-- 放置一个上传的组件 -->
            <!-- action为空为空 不写会报错 -->
        <el-upload action="" class="upload-img" :http-request="uploadImg">
            <!-- 放置一个点击元素 用来上传 -->
             <i class='el-icon-plus'> </i>
        </el-upload>
    </el-tab-pane>
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
    // 上传 图片的方法
    uploadImg (params) {
      // 调用上传接口
      //  params.file 就是需要上传的图片文件
      // 接口参数类型要求是 formData
      const data = new FormData() // 实例化一个formData对象
      data.append('image', params.file) // 加入文件参数
      // 开始发送上传请求了
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 上传或者新增一般都是post类型
        data // es6简写
      }).then(result => {
        // 如果成功了  此时 我们的接口会返回给我们一个上传成功之后的图片地址
        // 拿到了返回的url地址 应该做什么
        // 根刚才一样 往外传
        this.$emit('selectOneImg', result.data.url) // 将url参数传出去
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    },
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
