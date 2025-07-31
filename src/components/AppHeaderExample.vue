<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './AppHeader.vue'
import CustomHeaderContent from './CustomHeaderContent.vue'

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
  <div>
    <!-- 示例 1: 默认配置 -->
    <h3>默认配置</h3>
    <AppHeader title="默认标题" />

    <!-- 示例 2: 自定义标题和图标 -->
    <h3>自定义标题和图标</h3>
    <AppHeader title="我的应用" titleIcon="mdi-application" />

    <!-- 示例 3: 自定义操作按钮 -->
    <h3>自定义操作按钮</h3>
    <AppHeader title="带操作按钮的应用" :actions="customActions" />

    <!-- 示例 4: 自定义导航图标 -->
    <h3>自定义导航图标</h3>
    <AppHeader
      title="自定义导航"
      navIcon="mdi-dots-vertical"
      navIconColor="primary"
      :onNavIconClick="handleCustomNavClick"
    />

    <!-- 示例 5: 隐藏抽屉菜单 -->
    <h3>隐藏抽屉菜单</h3>
    <AppHeader title="无抽屉菜单" :showDrawer="false" />

    <!-- 示例 6: 完整自定义 -->
    <h3>完整自定义</h3>
    <AppHeader
      title="完整自定义"
      titleIcon="mdi-star"
      navIcon="mdi-menu-open"
      navIconColor="success"
      :actions="customActions"
      color="primary"
      :elevation="4"
      :height="60"
    />

    <!-- 示例 7: 使用自定义内容插槽 -->
    <h3>自定义内容插槽</h3>
    <AppHeader :use-custom-content="true" navIcon="mdi-menu" navIconColor="white" color="primary">
      <template #custom-content>
        <CustomHeaderContent />
      </template>
    </AppHeader>
  </div>
</template>

<style scoped>
h3 {
  margin: 20px 0 10px 0;
  color: #333;
}
</style>
