import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
// import Main from '../views/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
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
