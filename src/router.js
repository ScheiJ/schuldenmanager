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
      path: '/date',
      name: 'Date',
      component: () => import('./views/Date.vue')
    },
    {
      path: '/reminder',
      name: 'Reminder',
      component: () => import('./views/Reminder.vue')
    },
    {
      path: '/geolocation',
      name: 'Geolocation',
      component: () => import('./views/Geolocation.vue')
    },
    {
      path: '/camera',
      name: 'Camera',
      component: () => import('./views/Camera.vue')
    },
    {
      path: '/finishedDebt',
      name: 'FinishedDebt',
      component: () => import('./views/FinishedDebt.vue')
    },
    {
      path: '/debtsOfOnePerson',
      name: 'DebtsOfOnePerson',
      component: () => import('./views/DebtsOfOnePerson.vue')
    }
  ]
})