import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainLayout from '../views/MainLayout.vue'
// import Main from '../views/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/mainLayout',
    component: MainLayout,
    children: [
      // 更多路由...
    ]
  }
  // {
  //   path: '/main',
  //   name: 'Main',
  //   component: Main
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
