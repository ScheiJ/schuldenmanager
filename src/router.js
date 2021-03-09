import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/selectPerson',
      name: 'SelectPerson',
      component: () => import('./views/SelectPerson.vue')
    },
    {
      path: '/newDebt',
      name: 'NewDebt',
      component: () => import('./views/NewDebt.vue')
    },
    {
      path: '/time',
      name: 'Time',
      component: () => import('./views/Time.vue')
    }
  ]
})
