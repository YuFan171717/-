import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '@/views/login'
Vue.use(VueRouter)

// 路由懒加载
// 可以在使用该路由 后再请求,可以让首屏加载速度变快

// 懒加载的chunk 默认的名字是模块的路径
// webpack魔法注释
// /* webpackChunkName:"新名字" */
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/home')
      },
      {
        path: '/login',
        component: () => import('@/views/login')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:"base" */ '@/views/video')
      },
      {
        path: '/QA',
        component: () => import(/* webpackChunkName:"base" */ '@/views/QA')
      },
      {
        path: '/my',
        component: () => import('@/views/my')
      },
      {
        path: '/search',
        component: () => import('@/views/search')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
