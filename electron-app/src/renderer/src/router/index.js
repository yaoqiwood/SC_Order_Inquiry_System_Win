import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainLayout from '../views/MainLayout.vue'
import HistoryOrderPage from '../views/pages/historyOrderPage/HistoryOrderPage.vue'
import Dashboard from '../views/pages/dashboard/Dashboard.vue'
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
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: '仪表台', closeable:  false}
      },
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
