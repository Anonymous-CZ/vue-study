/*
 * @Author: CZ
 * @Date: 2022-04-18 10:41:57
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-21 10:54:52
 * @Description: 路由文件
 * @FilePath: \vue-study\src\router\index.js
 */
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/otherView',
    name: 'otherView',
    component: () => import( /* webpackChunkName: "otherView" */ '../views/OtherView.vue')
  },
  {
    path: '/map',
    name: 'MapView',
    component: () => import( /* webpackChunkName: "otherView" */ '../views/MapView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router