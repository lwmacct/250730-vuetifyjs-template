<script setup lang="ts">
// 主应用组件 - 路由入口
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menu'

const route = useRoute()
const menuStore = useMenuStore()

// 监听路由变化，更新页面访问时间
watch(
  () => route.path,
  (newPath) => {
    // 当路由变化时，记录访问时间
    menuStore.recordAccess(newPath)
  },
  { immediate: true }, // 立即执行一次，确保初始页面也被记录
)
</script>

<template>
  <v-app>
    <!-- 路由视图 -->
    <router-view />
  </v-app>
</template>

<style scoped>
.v-app {
  min-height: 100vh;
}
</style>
