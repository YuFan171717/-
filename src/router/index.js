import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '@/views/login'
Vue.use(VueRouter)

// 路由懒加载
// 可以在使用该路由 后再请求,可以让首屏加载速度变快
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
