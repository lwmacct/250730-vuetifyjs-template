import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
      meta: {
        title: '关于',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/Contact.vue'),
      meta: {
        title: '联系',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: '登录',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        title: '仪表板',
      },
    },
    // AppHeader 演示页面
    {
      path: '/header-demo',
      name: 'header-demo',
      component: () => import('@/pages/HeaderDemo/Main.vue'),
      meta: {
        title: 'AppHeader 演示',
      },
    },
    {
      path: '/header-demo/default',
      name: 'header-demo-default',
      component: () => import('@/pages/HeaderDemo/Default.vue'),
      meta: {
        title: '默认配置演示',
      },
    },
    {
      path: '/header-demo/custom-title',
      name: 'header-demo-custom-title',
      component: () => import('@/pages/HeaderDemo/CustomTitle.vue'),
      meta: {
        title: '自定义标题演示',
      },
    },
    {
      path: '/header-demo/custom-actions',
      name: 'header-demo-custom-actions',
      component: () => import('@/pages/HeaderDemo/CustomActions.vue'),
      meta: {
        title: '自定义操作按钮演示',
      },
    },
    {
      path: '/header-demo/slot',
      name: 'header-demo-slot',
      component: () => import('@/pages/HeaderDemo/Slot.vue'),
      meta: {
        title: '插槽方式演示',
      },
    },
    {
      path: '/header-demo/component',
      name: 'header-demo-component',
      component: () => import('@/pages/HeaderDemo/Component.vue'),
      meta: {
        title: '组件对象方式演示',
      },
    },
    {
      path: '/header-demo/styles',
      name: 'header-demo-styles',
      component: () => import('@/pages/HeaderDemo/Styles.vue'),
      meta: {
        title: '样式控制演示',
      },
    },
    // AppFooter 演示页面
    {
      path: '/footer-demo',
      name: 'footer-demo',
      component: () => import('@/pages/FooterDemo/Main.vue'),
      meta: {
        title: '页脚演示',
      },
    },
    {
      path: '/footer-demo/default',
      name: 'footer-demo-default',
      component: () => import('@/pages/FooterDemo/Default.vue'),
      meta: {
        title: '默认页脚演示',
      },
    },
    {
      path: '/footer-demo/fixed',
      name: 'footer-demo-fixed',
      component: () => import('@/pages/FooterDemo/Fixed.vue'),
      meta: {
        title: '固定页脚演示',
      },
    },
    {
      path: '/footer-demo/custom',
      name: 'footer-demo-custom',
      component: () => import('@/pages/FooterDemo/Custom.vue'),
      meta: {
        title: '自定义页脚演示',
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
