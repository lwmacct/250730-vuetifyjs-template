import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: '关于',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        title: '联系',
      },
    },
    // 404 页面重定向到首页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
