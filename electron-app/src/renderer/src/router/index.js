import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainLayout from '../views/MainLayout.vue'
import HistoryOrderPage from '../views/pages/historyOrderPage/HistoryOrderPage.vue'
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
    meta: { title: '主页面', closeable: false },
    children: [
      {
        path: '/orders/historyOrderList',
        name: 'HistoryOrderPage',
        component: HistoryOrderPage,
        meta: { title: '历史单据查询', closeable: true }
      }
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
