import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/home.vue'
import Login from '../pages/login.vue'
import Users from '../pages/users.vue'
import Roles from '../pages/roles.vue'
import Rights from '../pages/rights.vue'

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
