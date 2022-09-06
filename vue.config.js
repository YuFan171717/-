const { defineConfig } = require('@vue/cli-service')
// const path = require('path')
// const {join} = path
const { join } = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭 eslint检查
  //   关闭的是编译的时候
  lintOnSave: false, // 配置原生选项
  configureWebpack: {
    devServer: {
      open: true,
      port: 8888,
      host: 'localhost'
    }, // 路径别名
    resolve: {
      alias: {
        cpns: join(__dirname, 'src/components')
      }
    }
  }
})
