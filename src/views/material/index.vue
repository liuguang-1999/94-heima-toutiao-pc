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
  <!-- el-row可以布局 -->
        <!-- 放置一个上传的组件 -->
        <el-row type='flex' justify="end">
          <!-- 上传组件要求必须传action属性 不传就会报错 可以给一个空字符串 show-file-list 是否显示已上传文件列表-->
          <el-upload :show-file-list="false" :http-request="uploadImg" action="">
           <el-button size="small" type='primary'>上传素材</el-button>
           <!-- 传入一个内容 点击内容就会传出上传文件框 -->
          </el-upload>
        </el-row>

    <!-- 放置标签页 -->
    <el-tabs v-model="activeName" @tab-click="changeTab" v-loading="loading" element-loading-text="玩命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <!-- label是 当前页签的名称 name是 选中页签值 -->
        <el-tab-pane label="全部素材" name="all" class="">
          <!-- 生成页面 结构 -->
          <div class='img-list'>
            <el-card v-for="(item,index) in list" :key="item.id" class="img-card">
              <img :src="item.url" alt="" @click="selectImg(index)">
              <el-row class="operate" type='flex' align="middle" justify="space-around">
                 <i class='el-icon-star-on' @click="collectOrCancel(item)" :style="{color:item.is_collected?'red':'black'}" style="cursor: pointer;"></i>
                 <i class='el-icon-delete-solid' @click="delMaterial(item)" style="cursor: pointer;"></i>
              </el-row>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏素材" name="collect">
          <!-- 生成页面 结构 -->
          <div class='img-list'>
            <el-card v-for="(item,index) in list" :key="item.id" class="img-card">
              <img :src="item.url" alt="" @click="selectImg(index)">
            </el-card>
          </div>
        </el-tab-pane>
    </el-tabs>
    <!-- 放置公共分页 -->
    <el-row type="flex" justify="center" align="middle" style="height:80px;">
  <!-- 放置分页total总条数 current-page当前页码page-size 每页多少条数据 -->
  <el-pagination background :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" layout="prev, pager, next" @current-change="changePage">

  </el-pagination>
    </el-row>
    <!-- 放置一个查看大图组件  -->
    <el-dialog :visible="dialogVisible" @close="dialogVisible = false" @opened="openEnd">
      <!-- 放置一个 轮播图 -->
      <el-carousel indicator-position="outside" height='400px' ref="myCarousel">
        <el-carousel-item v-for="item in list" :key="item" >
          <img :src="item.url" alt="" style="width:100%;height:100%;">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认的选中 状态
      list: [], // 定义list 空数组 向接口中获取数据 赋值给这个list 空数组
      loading: false, // 遮罩层
      page: { // 放置一个page 对象 储存分页信息
        currentPage: 1, // 默认第一页
        total: 0, // 当前总数
        pageSize: 10 // 每页多少条
      },
      dialogVisible: false, // 控制显示隐藏
      clickIndex: -1
    }
  },
  methods: {
    openEnd () {
      // 这个时候已经打开结束 ref已经有值 可以通过ref进行设置了
      this.$refs.myCarousel.setActiveItem(this.clickIndex) // 尝试通过这种方式设置index
    },
    // 图片记忆 点击时调用
    selectImg (index) {
      this.clickIndex = index // 将索引赋值
      this.dialogVisible = true // 打开索引
    },
    // 删除方法
    delMaterial (row) {
      this.$confirm('您确定要删除该图片吗?', '提示').then(() => {
        this.$axios({
          url: `/user/images/${row.id}`,
          method: 'DELETE'
        }).then(ser => {
          this.getMaterial()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 取消收藏&收藏方法
    collectOrCancel (row) {
      this.$axios({
        url: `/user/images/${row.id}`, // 请求地址
        method: 'put',
        data: {
          collect: !row.is_collected // 取反 收藏&不收藏相互取反
        }
      }).then(ser => {
        this.getMaterial()
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },
    // 上传文件自定义方法
    uploadImg (params) {
      //  params.file 就是需要上传的图片文件
      // 接口参数类型要求是 formData
      const data = new FormData() // 实例化一个formData对象
      data.append('image', params.file) // 加入文件参数
      // 开始发送上传请求了
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 上传或者新增一般都是post类型
        data // es6简写
      }).then(() => {
        // 如果成功了 我们应该 重新来取数据啊
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    },
    changePage (newPage) {
      // 传入一个新页码
      this.page.currentPage = newPage // 将新页码赋值给页码数据
      this.getMaterial() // 获取数据
    },
    // 获取数据 接口
    getMaterial () {
      this.loading = true // 打开遮罩层
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: this.activeName === 'collect', // 传入 标签页值获取数据
          page: this.page.currentPage, // 取页码变量中的值 因为只要页码变量一变 获取的数据跟着变
          per_page: this.page.pageSize // 获取每页数量
        },
        data: {}
      }).then(ser => {
        this.list = ser.data.results
        this.page.total = ser.data.total_count // 总数  全部素材的总数  收藏素材的总数 总数 跟随 当前页签变化而变化
        this.loading = false // 请求完毕 关闭遮罩层
      })
    },
    // 切换页签事件
    changeTab () {
      this.page.currentPage = 1 // 将页码重置为第一页 因为分类变了 数据变了
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
