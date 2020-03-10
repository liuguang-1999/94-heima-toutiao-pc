<template>
<div class="cover-image">
    <div class="cover-image-item" v-for="(item,index) in list" :key="index">
    <!-- item 默认是空字符串的 是空字符串就显示默认图片 -->
    <img :src="item ? item : defaultImg" alt="">
    </div>
</div>
</template>

<script>
export default {
  props: ['list'], // 通过传入的空字符串 " " 的长度来进行循环 造出边框
  data () {
    return {
      defaultImg: require('../../assets/pic_bg.png')
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
