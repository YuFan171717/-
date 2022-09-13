import Vue from 'vue'
import Vuex from 'vuex'
//  安装yarn add vuex@3.6.2
// 配置好后引入到main。中

// 引入持久化包
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

// vuex声明的变量要放到state里面
// - 在state里面声明
// - 通过$store.state.属性名取
// vue修改数据
// - 自产自销
// - mutations：写在mutations里面
//  - mutations函数规范：函数命名采用大驼峰
//  - mutations函数的参数
//  - state:数据
//  - payload:载荷，触发mutation的参数
// 触发mutations里面的方法
// - this.$store.commit(mutations的方法名)

// getters  相当于computed 计算属性
// export default new Vuex.Store({
//   state: {
//     count: 0
//   },
//   getters: {
//     sum(state) {
//       return state.count * 10
//     }
//   },
//   mutations: {
//     SET_COUNT(state, payload) {
//       state.count += payload
//     }
//   }
// })

// 下载持久化状态包 yarn add vuex-persistedstate@3.2.1
export default new Vuex.Store({
  // vuex-persistedstate ——> 持久化state

  // 1.下载
  // - yarn add vuex-persistedstate@3.2.1
  // 2.引入
  // - import createPersistatedState from 'vuex-persistedstate'
  // 3.调用
  // -plugins : [createPersistatedState()]

  // 配置项
  // key：默认值是vuex 想修改传入key
  // storage：存储的方式 默认值是本地存储
  // reducer：指定持久化哪些数据，函数。return出来一个对象，对象就作为存储的value
  // 调用持久化包
  plugins: [
    createPersistedstate({
      key: 'HEIMATOUTIAO_TOKEN',
      // storage: window.sessionStorage,
      reducer(state) {
        const { token } = state
        console.log(token)
        return { token }
      }
    })
  ],

  state: {
    // token: JSON.parse(window.localStorage.getItem('HEIMATOUTIAO_TOKEN')) || {}
    token: {},
    a: 1
  },
  getters: {
    isLogin(state) {
      return !!state.token.token
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      // 把token存在vuex

      state.token = payload
      // token持久存在本地存储
      // payload这个参数就是穿过来的参数
      // window.localStorage.setItem('HEIMATOUTIAO_TOKEN', JSON.stringify(payload))
    }
  }
})
