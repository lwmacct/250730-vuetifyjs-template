<script setup lang="ts">
import { ref } from 'vue'

// 搜索相关
const searchQuery = ref('')
const showSearch = ref(false)

// 用户相关
const userMenu = ref(false)

// 通知相关
const notifications = ref([
  { id: 1, title: '系统更新', message: '系统将在今晚进行维护', time: '2小时前' },
  { id: 2, title: '新消息', message: '您有一条新的消息', time: '1小时前' },
])

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchQuery.value = ''
  }
}

const handleSearch = () => {
  console.log('搜索:', searchQuery.value)
}

const handleNotification = (id: number) => {
  console.log('查看通知:', id)
}

const handleUserAction = (action: string) => {
  console.log('用户操作:', action)
}
</script>

<template>
  <div class="custom-header-content">
    <!-- 左侧：标题和搜索 -->
    <div class="left-section">
      <v-app-bar-title class="text-h6">
        <v-icon class="mr-2" color="white">mdi-application</v-icon>
        我的应用
      </v-app-bar-title>

      <!-- 搜索框 -->
      <div class="search-container">
        <v-text-field
          v-if="showSearch"
          v-model="searchQuery"
          placeholder="搜索..."
          variant="outlined"
          density="compact"
          hide-details
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template v-slot:append>
            <v-btn icon size="small" @click="toggleSearch">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-text-field>
        <v-btn v-else icon @click="toggleSearch" color="white" variant="text">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>

    <v-spacer></v-spacer>

    <!-- 右侧：操作按钮 -->
    <div class="right-section">
      <!-- 通知按钮 -->
      <v-menu v-model="userMenu" :close-on-content-click="false" location="bottom end">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon color="white" variant="text" class="mx-1">
            <v-badge
              :content="notifications.length"
              :model-value="notifications.length > 0"
              color="error"
            >
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-card min-width="300">
          <v-list>
            <v-list-subheader>通知</v-list-subheader>
            <v-list-item
              v-for="notification in notifications"
              :key="notification.id"
              @click="handleNotification(notification.id)"
            >
              <template v-slot:prepend>
                <v-icon color="primary">mdi-information</v-icon>
              </template>
              <v-list-item-title>{{ notification.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ notification.message }}</v-list-item-subtitle>
              <template v-slot:append>
                <v-chip size="small" variant="tonal">{{ notification.time }}</v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <!-- 用户菜单 -->
      <v-menu v-model="userMenu" :close-on-content-click="false" location="bottom end">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon color="white" variant="text" class="mx-1">
            <v-avatar size="32">
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-card min-width="200">
          <v-list>
            <v-list-item @click="handleUserAction('profile')">
              <template v-slot:prepend>
                <v-icon>mdi-account</v-icon>
              </template>
              <v-list-item-title>个人资料</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleUserAction('settings')">
              <template v-slot:prepend>
                <v-icon>mdi-cog</v-icon>
              </template>
              <v-list-item-title>设置</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="handleUserAction('logout')">
              <template v-slot:prepend>
                <v-icon>mdi-logout</v-icon>
              </template>
              <v-list-item-title>退出登录</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<style scoped>
.custom-header-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  width: 300px;
  margin-left: 16px;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
