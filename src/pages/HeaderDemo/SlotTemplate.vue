<script setup lang="ts">
import { ref } from 'vue'

// 响应式数据
const notificationCount = ref(3)
const userStatus = ref('在线')
const isSettingsOpen = ref(false)

// 事件处理函数
const handleNotification = () => {
  console.log('点击了通知按钮')
  notificationCount.value = Math.max(0, notificationCount.value - 1)
  // 模拟通知处理
  if (notificationCount.value === 0) {
    setTimeout(() => {
      notificationCount.value = Math.floor(Math.random() * 5) + 1
    }, 1000)
  }
}

const handleUser = () => {
  console.log('点击了用户按钮')
  // 模拟用户管理操作
  userStatus.value = userStatus.value === '在线' ? '忙碌' : '在线'
}

const handleUserStatus = () => {
  console.log('切换用户状态')
  const statuses = ['在线', '忙碌', '离开', '勿扰']
  const currentIndex = statuses.indexOf(userStatus.value)
  const nextIndex = (currentIndex + 1) % statuses.length
  userStatus.value = statuses[nextIndex]
}

const handleSettings = () => {
  console.log('点击了设置按钮')
  isSettingsOpen.value = !isSettingsOpen.value
  // 模拟设置面板切换
  setTimeout(() => {
    isSettingsOpen.value = false
  }, 2000)
}
</script>

<template>
  <div class="d-flex align-center">
    <!-- 通知按钮 -->
    <v-btn icon="mdi-bell" variant="text" color="warning" class="mr-2" @click="handleNotification">
      <v-badge :content="notificationCount" color="error" offset-x="8" offset-y="-8">
        <v-icon>mdi-bell</v-icon>
      </v-badge>
      <v-tooltip activator="parent" location="bottom"> 通知 ({{ notificationCount }}) </v-tooltip>
    </v-btn>

    <!-- 用户按钮 -->
    <v-btn icon="mdi-account" variant="text" color="info" class="mr-2" @click="handleUser">
      <v-icon>mdi-account</v-icon>
      <v-tooltip activator="parent" location="bottom"> 用户管理 </v-tooltip>
    </v-btn>

    <!-- 分割线 -->
    <v-divider vertical class="mx-2" color="white"></v-divider>

    <!-- 用户状态芯片 -->
    <v-chip color="success" variant="outlined" size="small" class="mr-2" @click="handleUserStatus">
      <v-icon start>mdi-account-circle</v-icon>
      {{ userStatus }}
      <v-tooltip activator="parent" location="bottom"> 点击切换状态 </v-tooltip>
    </v-chip>

    <!-- 设置按钮 -->
    <v-btn icon="mdi-cog" variant="text" color="white" @click="handleSettings">
      <v-icon>mdi-cog</v-icon>
      <v-tooltip activator="parent" location="bottom"> 系统设置 </v-tooltip>
    </v-btn>
  </div>
</template>

<style scoped>
/* 插槽模板样式 */
</style>
