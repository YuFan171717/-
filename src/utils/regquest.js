import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000

// const request = axios.create({})  克隆axios

const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器，请求做些事
// config 是每一次请求的配置对象
// 必须要有返回值config
request.interceptors.request.use(
  function (config) {
    // 每一次发送请求都会执行
    // 在发送请求前做什么
    // 登录了，所有的请求都加上Authorization

    const {
      getters: { isLogin },
      state: { token }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${token.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default request
