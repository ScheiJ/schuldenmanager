import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import (/* webpackPrefetch: true */'./views/Home.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import(/* webpackPrefetch: true */'./views/Settings.vue')
    },
    {
      path: '/selectPerson',
      name: 'SelectPerson',
      component: () => import(/* webpackPrefetch: true */'./views/SelectPerson.vue')
    },
    {
      path: '/modifyDebt',
      name: 'ModifyDebt',
      component: () => import(/* webpackPrefetch: true */'./views/ModifyDebt.vue')
    },
    {
      path: '/date',
      name: 'Date',
      component: () => import(/* webpackPrefetch: true */'./views/Date.vue')
    },
    {
      path: '/reminder',
      name: 'Reminder',
      component: () => import(/* webpackPrefetch: true */'./views/Reminder.vue')
    },
    {
      path: '/geolocation',
      name: 'Geolocation',
      component: () => import(/* webpackPrefetch: true */'./views/Geolocation.vue')
    },
    {
      path: '/camera',
      name: 'Camera',
      component: () => import(/* webpackPrefetch: true */'./views/Camera.vue')
    },
    {
      path: '/finishedDebt',
      name: 'FinishedDebt',
      component: () => import(/* webpackPrefetch: true */'./views/FinishedDebt.vue')
    },
    {
      path: '/debtsOfOnePerson',
      name: 'DebtsOfOnePerson',
      component: () => import(/* webpackPrefetch: true */'./views/DebtsOfOnePerson.vue')
    }
  ]
})