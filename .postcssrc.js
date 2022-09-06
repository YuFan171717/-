// 引入插件
const pxToRem = require('postcss-pxtorem')
module.exports = {
  // 插件
  plugins: [
    pxToRem({
      // rootValue: 37.5,
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*'] // 所有属性都转成rem
    })
  ]
}
