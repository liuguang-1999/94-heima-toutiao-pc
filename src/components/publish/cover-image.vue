<template>
<div class="cover-image">
  <!-- 边框封面 组件 -->
    <div class="cover-image-item" v-for="(item,index) in list" :key="index"  @click=" openDialog(index) " style="cursor: pointer;">
    <!-- item 默认是空字符串的 是空字符串就显示默认图片 -->
    <img :src="item ? item : defaultImg" alt="">
    </div>
    <!-- 点击图片框内 弹出一个选择框选择图片 -->
    <el-dialog :visible="dialogVisible" @close="dialogVisible = false">
      <!-- 再次封装一个 素材库和上传素材组件使用 -->
      <select-image @selectOneImg=" receiveImg "></select-image>
    </el-dialog>
</div>
</template>

<script>
export default {
  props: ['list'], // 通过传入的空字符串 " " 的长度来进行循环 造出边框
  data () {
    return {
      defaultImg: require('../../assets/pic_bg.png'),
      dialogVisible: false, // 控制选择框的 显示与隐藏
      selectIndex: -1 // 用来记录当前点击了 那个索引
    }
  },
  methods: {
    openDialog (index) { // 选择弹框 显示
      this.dialogVisible = true
      this.selectIndex = index // 目的 记录了 你当前点击了那张图片
    },
    receiveImg (url) {
      // props 数据不能被直接修改
      // 所以 还需要再次传递 向父级传递参数 修改父级 后当前级 才会被修改
      // 不但 要有 url地址 还要有 点击那张图片的 索引  后追加的索引
      this.$emit('selectTwoImg', url, this.selectIndex)
      // 二次传之后 进行关闭 选择框
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image {
    display: flex;
    margin: 20px 100px;
    .cover-image-item {
        border: 1px solid #ccc;
        width: 250px;
        height: 250px;
        padding: 20px;
        img {
            width:100%;
            height: 100%;
        }
    }
}
</style>
