<template>
    <!-- 卡片组件 -->
        <el-card>
            <!-- 面包屑组件 -->
            <bread-crumb slot="header">
            <!-- 传入面包屑的 账户信息 -->
            <template slot="title">账户信息</template>
            </bread-crumb>
            <!-- 放置表单容器 -->
            <el-form label-width="150px">
                <el-form-item label="用户名:">
                    <!-- 放置input框显示信息 -->
                    <el-input style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="简介:">
                    <el-input style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:">
                    <el-input style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input disabled="" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">保存</el-button>
                </el-form-item>
            </el-form>
            <img src="../../assets/home.jpg" alt="" class="head-upload">
        </el-card>
</template>

<script>
export default {

}
</script>

<style>
.head-upload {
    position: absolute;
    right: 350px;
    top:160px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
