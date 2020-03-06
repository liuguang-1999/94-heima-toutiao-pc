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
        <el-table-column prop="title" label="标题" width="600"></el-table-column>
        <!-- 不能显示布尔值 给这列 -->
        <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button @click="openOrClose(obj.row)" type="text" size="small">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 分页器 加了一个 外容器 需要外容器的布局属性控制分页器 -->
    <el-row style="height:80px;" type="flex" justify="center" align="middle">
    <!-- 分页器 -->
    <el-pagination background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size="page.PageSize" @current-change="changepage">

    </el-pagination>
    </el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        total: 0, // 默认的评论总条数
        currentPage: 1, // 默认的 页码 是第一页 这个属性决定当前页码是第几页 current-page
        PageSize: 10 // 每页 显示的条数
      },
      list: [

      ]
    }
  },
  methods: {
    // 点击且页码 newPage 可以拿到最新页码
    changepage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment', // 此参数用来 控制获取数据的类型
          page: this.page.currentPage, // 查第几页的评论数据
          per_page: this.page.PageSize // 要获取条评论数据
        }
      }).then(ser => {
        this.list = ser.data.results
        this.page.total = ser.data.total_count
      })
    },
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 请求类型
          params: {
            article_id: row.id.toString() // 要求参数的文章id
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(ser => {
          //   成功了 提示个消息 然后 重新拉取数据4
          this.$message.success(`${mess}评论成功`)
          //  重新拉取数据
          this.getComment() // 调用重新拉取数据的方法
        }).catch(() => {
          //   表示失败了 会进入到catch
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
