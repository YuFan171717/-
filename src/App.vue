<template>
  <div>
    <span class="toutiao toutiao-gengduo"></span>

    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <button class="btn">登录</button>
  </div>
</template>

<script>
// git log 查看commit记录
// git reset xxx --hard  回退版本
// git status 查看当前仓库的状态
// git add . 提交到暂存区

// 下载rem插件
// yarn add amfe-flexible

// 使用 post-css把项目中所有的px转换成rem
// post-css 是css的预处理器，需要配置webpack
//  post-css 自己能干的事很少，下载插件
// yarn add postcss-pxtorem
// 插件下载后，告诉postcss，我要使用这个插件， 在 .postcssrc.js中配置
export default {
  methods: {},
  computed: {}
}
</script>

<style scoped>
.btn {
  width: 700px;
  height: 88px;
  background-color: yellow;
}
</style>
