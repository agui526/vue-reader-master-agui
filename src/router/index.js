import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../components/Home'], resolve)
    },
    {
      path: '/category',
      name: 'category',
      component: resolve => require(['@/components/link/Category'],resolve)
    },
    {
      path: '/bookdetail/:id',
      name: 'bookdetail',
      component: resolve => require(['@/components/link/BookDetail'], resolve)
    },
    {
      path: '/reader/:id',
      name: 'reader',
      component: resolve => require(['@/components/reader/Reader'],resolve)
    },
  ]
})
