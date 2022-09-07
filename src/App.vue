<template>
  <div>
    <router-view></router-view>
    <!-- <h1>{{ $store.state.count }}</h1> -->
    <!-- <h1>{{ count }}</h1> -->
    <!-- <h1>count的十倍------{{ $store.getters.sum }}</h1> -->
    <!-- <h1>count的十倍------{{ sum }}</h1> -->

    <!-- <button @click="count3">点击++</button> -->
    <!-- <button @click="SET_COUNT(10)">点击++</button> -->
  </div>
</template>
// ``````````````````````````

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

export default {}

// -----------

// --------
/* import { mapGetters, mapState, mapMutations } from 'vuex'
console.log(mapState(['count']))
export default {
  methods: {
    // count3() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    // sum() {
    //   return this.$store.state.count * 10
    // }

    // mapState    将vuex中的state映射到computed
    // 引入mapState  函数，返回一个对象
    // 参数：['映射的属性']

    //  mapGetters   将vuex 的getters映射到computed

    //     // mapMutations    将vuex中的方法映射到methods
    count2() {
      return this.$store.state.count
    },
    ...mapState(['count']),
    ...mapGetters(['sum'])
  }
} */
</script>

<style scoped>
.btn {
  width: 700px;
  height: 88px;
  background-color: yellow;
}
</style>
