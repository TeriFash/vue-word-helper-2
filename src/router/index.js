import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '@/views/Todo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/words',
    name: 'Words',
    component: () => import('@/views/Words.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
