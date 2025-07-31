<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import CustomHeaderContent from '@/components/CustomHeaderContent.vue'

// 示例：自定义操作按钮
const customActions = [
  {
    icon: 'mdi-bell',
    text: '通知',
    color: 'warning',
    variant: 'text' as const,
    onClick: () => {
      console.log('点击了通知按钮')
    },
  },
  {
    icon: 'mdi-account',
    text: '用户',
    color: 'info',
    variant: 'text' as const,
    onClick: () => {
      console.log('点击了用户按钮')
    },
  },
  {
    icon: 'mdi-cog',
    text: '设置',
    color: 'white',
    variant: 'text' as const,
    onClick: () => {
      console.log('点击了设置按钮')
    },
  },
]

// 示例：自定义导航图标点击处理
const handleCustomNavClick = () => {
  console.log('自定义导航图标点击')
}
</script>

<template>
  <v-app>
    <!-- 演示页面使用默认头部 -->
    <AppHeader title="AppHeader 组件演示" />

    <!-- 主要内容区域 -->
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 mb-6">AppHeader 组件演示</h1>
            <p class="text-body-1 mb-6">
              这个页面展示了 AppHeader 组件的各种使用方式。每个示例都在不同的路由页面中展示。
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>演示页面列表</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item
                    v-for="(demo, index) in [
                      {
                        title: '默认配置',
                        path: '/header-demo/default',
                        description: '最基本的 AppHeader 使用方式',
                      },
                      {
                        title: '自定义标题和图标',
                        path: '/header-demo/custom-title',
                        description: '自定义标题和图标',
                      },
                      {
                        title: '自定义操作按钮',
                        path: '/header-demo/custom-actions',
                        description: '使用 actions prop 添加自定义按钮',
                      },
                      {
                        title: '自定义导航图标',
                        path: '/header-demo/custom-nav',
                        description: '自定义导航图标和点击处理',
                      },
                      {
                        title: '隐藏抽屉菜单',
                        path: '/header-demo/no-drawer',
                        description: '不显示抽屉菜单的版本',
                      },
                      {
                        title: '完整自定义',
                        path: '/header-demo/full-custom',
                        description: '完整的自定义配置',
                      },
                      {
                        title: '插槽方式',
                        path: '/header-demo/slot',
                        description: '使用插槽自定义内容',
                      },
                      {
                        title: '组件对象方式',
                        path: '/header-demo/component',
                        description: '直接传入组件对象',
                      },
                    ]"
                    :key="index"
                    :title="demo.title"
                    :subtitle="demo.description"
                    prepend-icon="mdi-arrow-right"
                    @click="$router.push(demo.path)"
                    link
                  >
                    <template v-slot:append>
                      <v-btn variant="text" color="primary"> 查看演示 </v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-alert type="info" variant="tonal" class="mt-4">
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          当前页面：AppHeader 演示 (/header-demo)
        </v-alert>
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
