import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import HeaderDemo from '@/views/HeaderDemo.vue'
import HeaderDemoDefault from '@/views/HeaderDemoDefault.vue'
import HeaderDemoCustomTitle from '@/views/HeaderDemoCustomTitle.vue'
import HeaderDemoCustomActions from '@/views/HeaderDemoCustomActions.vue'
import HeaderDemoSlot from '@/views/HeaderDemoSlot.vue'
import HeaderDemoComponent from '@/views/HeaderDemoComponent.vue'
import HeaderDemoStyles from '@/views/HeaderDemoStyles.vue'

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
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: '仪表板',
      },
    },
    // AppHeader 演示页面
    {
      path: '/header-demo',
      name: 'header-demo',
      component: HeaderDemo,
      meta: {
        title: 'AppHeader 演示',
      },
    },
    {
      path: '/header-demo/default',
      name: 'header-demo-default',
      component: HeaderDemoDefault,
      meta: {
        title: '默认配置演示',
      },
    },
    {
      path: '/header-demo/custom-title',
      name: 'header-demo-custom-title',
      component: HeaderDemoCustomTitle,
      meta: {
        title: '自定义标题演示',
      },
    },
    {
      path: '/header-demo/custom-actions',
      name: 'header-demo-custom-actions',
      component: HeaderDemoCustomActions,
      meta: {
        title: '自定义操作按钮演示',
      },
    },
    {
      path: '/header-demo/slot',
      name: 'header-demo-slot',
      component: HeaderDemoSlot,
      meta: {
        title: '插槽方式演示',
      },
    },
    {
      path: '/header-demo/component',
      name: 'header-demo-component',
      component: HeaderDemoComponent,
      meta: {
        title: '组件对象方式演示',
      },
    },
    {
      path: '/header-demo/styles',
      name: 'header-demo-styles',
      component: HeaderDemoStyles,
      meta: {
        title: '样式控制演示',
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
