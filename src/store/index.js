import Vue from 'vue'
import Vuex from 'vuex'

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
export default new Vuex.Store({
  state: {
    token: {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    }
  }
})
