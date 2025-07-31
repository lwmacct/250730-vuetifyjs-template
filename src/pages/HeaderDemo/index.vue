<script setup lang="ts">
// HeaderDemo 文件夹的入口文件
// 重定向到主演示页面
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // 重定向到插槽演示页面
  router.replace('/header-demo/slot')
})
</script>

<template>
  <div>
    <!-- 加载中提示 -->
    <v-container class="d-flex align-center justify-center" style="height: 100vh">
      <v-card class="pa-6 text-center">
        <v-progress-circular indeterminate color="primary" class="mb-4"></v-progress-circular>
        <div class="text-h6">正在加载演示页面...</div>
      </v-card>
    </v-container>
  </div>
</template>
