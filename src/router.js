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
      path: '/settings',
      name: 'Settings',
      component: () => import('./views/Settings.vue')
    },
    {
      path: '/selectPerson',
      name: 'SelectPerson',
      component: () => import('./views/SelectPerson.vue')
    },
    {
      path: '/modifyDebt',
      name: 'ModifyDebt',
      component: () => import('./views/ModifyDebt.vue')
    },
    {
      path: '/time',
      name: 'Time',
      component: () => import('./views/Time.vue')
    },
    {
      path: '/finishedDebt',
      name: 'FinishedDebt',
      component: () => import('./views/FinishedDebt.vue')
    }
  ]
})