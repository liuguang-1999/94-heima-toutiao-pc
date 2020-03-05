import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home'
import login from '@/views/login'
import second from '@/views/home/second_home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/home',
  component: home,
  children: [{
    path: '',
    component: second
  }, {
    path: 'comment',
    component: () => import('@/views/comment')
  }]
}, {
  path: '/login',
  component: login
}

  /* ,
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/About.vue')
  } */
]

const router = new VueRouter({
  routes
})

export default router
