<script setup lang="ts">
// 主应用组件 - 路由入口
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppHeaderStore } from '@/components/AppHeader/stores'
import { useLoadingBar } from '@/stores'

const route = useRoute()
const routeMenuStore = useAppHeaderStore()
const loadingBar = useLoadingBar()

// 监听路由变化，更新页面访问时间
watch(
  () => route.path,
  (newPath) => {
    // 当路由变化时，记录访问时间
    routeMenuStore.recordAccess(newPath)
  },
  { immediate: true }, // 立即执行一次，确保初始页面也被记录
)
</script>

<template>
  <v-app>
    <!-- 顶部路由加载进度条 -->
    <v-progress-linear
      :active="loadingBar.isLoading"
      :model-value="loadingBar.progress"
      :color="loadingBar.color"
      :height="3"
      absolute
      :indeterminate="false"
      style="z-index: 9999"
    />

    <!-- 路由视图 -->
    <router-view />
  </v-app>
</template>

<style scoped>
.v-app {
  min-height: 100vh;
}
</style>
