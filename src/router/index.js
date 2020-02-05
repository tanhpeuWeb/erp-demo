import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  // const isLogin = localStorage.tsToken || sessionStorage.tsToken ? true: false;
  // const isLogin = sessionStorage.isLogin ? true: false;
  // if (to.path == "/login" || to.path == "/password") {
  //   next();
  // } else {
  //   isLogin ? next(): next("/login")
  // }
  next()
})

export default router