import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/home.vue'
import Login from '../pages/login.vue'
import Users from '../pages/users.vue'
import Roles from '../pages/roles.vue'
import Rights from '../pages/rights.vue'
import Categories from '../pages/categories.vue'
import Goods from '../pages/goods.vue'
import Orders from '../pages/orders.vue'
import Params from '../pages/params.vue'
import Reports from '../pages/reports.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/users',
          component: Users
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/categories',
          component: Categories
        },
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/orders',
          component: Orders
        },
        {
          path: '/params',
          component: Params
        },
        {
          path: '/reports',
          component: Reports
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})

export default router
