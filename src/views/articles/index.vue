<template>
   <!-- 文章列表 -->
   <el-card class='articles'>
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
               <!-- 监听=>值 改变的第一种方式 -->
               <!-- <el-radio-group v-model="searchForm.status" @change="changeCondition"> -->
               <el-radio-group v-model="searchForm.status">
                   <el-radio :label="5">全部</el-radio>
                   <el-radio :label="0">草稿</el-radio>
                   <el-radio :label="1">待审核</el-radio>
                   <el-radio :label="2">审核通过</el-radio>
                   <el-radio :label="3">审核失败</el-radio>
               </el-radio-group>
           </el-form-item>
           <el-form-item label="频道类型:">
              <!-- 监听=>值 改变的第一种方式 -->
               <!-- <el-select placeholder="请选择频道"  v-model="searchForm.channel_id" @change="changeCondition"> -->
               <el-select placeholder="请选择频道"  v-model="searchForm.channel_id">
                     <!-- el-option是下拉的选项 label是显示值  value是绑定的值 -->
                   <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id">

                   </el-option>
               </el-select>
           </el-form-item>
           <el-form-item label="日期范围:" >
               <!-- 日期选择组件 -->
                <!-- 监听=>值 改变的第一种方式 -->
               <!-- <el-date-picker type='daterange' v-model="searchForm.dateRange"   value-format="yyyy-MM-dd" @change="changeCondition"> -->
               <el-date-picker type='daterange' v-model="searchForm.dateRange"   value-format="yyyy-MM-dd">

               </el-date-picker>
           </el-form-item>
       </el-form>
        <!-- 文章的主体结构 flex布局  -->
      <el-row class='total' type='flex' align="middle">
         <span>共找到1000条符合条件的内容</span>
      </el-row>
      <!-- 内容列表 -->
      <div v-loading="loading" element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="article-item" v-for="item in list" :key="item.id.toString()">
          <div class="left">
              <img :src=" item.cover.images.length ?  item.cover.images[0] : defaultImg " alt="">
              <div class="info">
                  <span>{{item.title}}</span>
                  <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
                   <!-- 只是改变显示的格式 可以用过滤器   两个过滤器 分别处理   显示文本 和 标签类型-->
                   <el-tag class="tag" :type="item.status | filterType"> {{item.status | filterStatus}} </el-tag>
                  <span class="date">{{item.pubdate}}</span>
              </div>
          </div>
          <div class="right">
             <span><i class="el-icon-edit"></i> 修改</span>
            <span><i class="el-icon-delete"></i> 删除</span>
          </div>
       </div>
      </div>
      <!-- 放置分页组件 -->
      <el-row type="flex" justify="center" align="middle" style='height:80px;'>
        <!-- 放置分页器 -->
        <el-pagination background layout="prev, pager, next" :current-page="pageSize.CurrentPage" :page-size="pageSize.PageSize" :total="pageSize.total" @current-change=" changePage ">

        </el-pagination>
      </el-row>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      pageSize: {
        CurrentPage: 1, // 当前页码
        PageSize: 10, // 每页显示多少条
        total: 0 // 总条目数量
      },
      searchForm: {
        status: 5, // 默认状态是全部
        channel_id: null, // 表示没有任何的频道
        dateRange: [] // 日期范围
      },
      channels: [], // 专门来接收频道的数据
      list: [], // 定义个list 数组接收文章列表
      defaultImg: require('../../assets/default.gif'), // 地址对应的文件变成了变量 在编译的时候会被拷贝到对应位置
      loading: false // 等待加载功能
    }
  },
  // 第二种 监听数据变换的方案
  watch: {
    searchForm: {
      deep: true, // 固定写法 表示 开启深度监听模式 searchForm中的任何值发生改变 都会被获取到
      handler () { // 固定写法 表示 统一调用改变条件的 方法
        this.pageSize.CurrentPage = 1
        this.changeCondition()
      }
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2 :
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning' // 草稿的时候 警告
        case 1:
          return 'info' // 待审核
        case 2 :
          return '' // 已发表
        case 3:
          return 'danger' // 失败 错误
      }
    }
  },
  methods: {
    // 监听方法 监听页码改变
    changePage (newPage) {
      this.pageSize.CurrentPage = newPage
      this.getArticles() // 直接去调用 方法
    },
    // 第一种监听模块改变事件方案
    changeCondition () {
      // 收集改变的数据
      const params = {
        page: this.pageSize.CurrentPage, // 获取当前最新页码 发请求
        per_page: this.pageSize.PageSize, // 获取当前最新 每页显示多少条 发请求
        // 文章状态，2-草稿，4-待审核，5-审核通过，6-审核失败，4-已删除，不传为全部1
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)
    },
    // 获取文章列表
    getArticles (params) {
      this.loading = true // 发请求之前打开 等待加载
      this.$axios({
        url: '/articles', // 请求地址
        params // ES6 简写
      }).then(ser => {
        this.list = ser.data.results // 获取文章列表 赋值给list
        this.loading = false // 求情回来了 关闭等待加载
        this.pageSize.total = ser.data.total_count // 将求回来的总页码 赋值给total
      })
    },
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
    this.getArticles() // 手动调用获取文章数据
  }
}
</script>

<style lang="less" scoped>
    .articles{
        .total{
            height: 60px;
            border-bottom: 1px dashed #ccc;
        }

    .article-item{
        display: flex;
        justify-content: space-between;
         padding: 20px  0;
         border-bottom: 1px solid #ccc;
    .left {
        display: flex;
        img {
             width:180px;
             height: 100px;
             border-radius: 4px;
           }
           .info {
                 display: flex;
             flex-direction: column;
             height: 100px;
             justify-content: space-around;
             margin-left: 10px;
               .date {
               color: #999;
               font-size:12px;
             }
               .tag {
               width: 60px;
               text-align: center;
             }
           }
         }
           .right {
           span {
             font-size: 12px;
             margin-right: 8px;
             cursor: pointer;
             user-select: none;
           }
        }
      }
    }
</style>
