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
        <!-- 文章的主体结构 flex布局  -->
      <el-row class='total' type='flex' align="middle">
         <span>共找到1000条符合条件的内容</span>
      </el-row>
      <!-- 内容列表 -->
      <div class="article-item">
          <div class="left">
              <img src="../../assets/default.gif" alt="">
              <div class="info">
                  <span>祖国</span>
                   <el-tag class="tag"> 草稿 </el-tag>
                  <span class="date">07点52分</span>
              </div>
          </div>
          <div class="right">
             <span><i class="el-icon-edit"></i> 修改</span>
            <span><i class="el-icon-delete"></i> 删除</span>
          </div>
      </div>
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
