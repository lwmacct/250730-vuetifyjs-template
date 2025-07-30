<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useMenuStore } from '@/stores/menu'
import FavoriteMenu from './FavoriteMenu.vue'
import RecentPagesPanel from './RecentPagesPanel.vue'
import AllProductsPanel from './AllProductsPanel.vue'

interface Props {
  title?: string
  showNavigation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '腾讯云',
  showNavigation: true,
})

const router = useRouter()
const menuStore = useMenuStore()
const drawer = ref(false)
const hoveredItem = ref<string | null>(null)

// 监听抽屉状态，关闭时隐藏二级菜单
watch(drawer, (newValue) => {
  if (!newValue) {
    hoveredItem.value = null
  }
})

const navigateTo = (path: string) => {
  router.push(path)
  drawer.value = false // Close drawer on navigation
  hoveredItem.value = null // Hide hover panel
}

// 添加收藏项的方法
const addToFavorites = (item: any) => {
  menuStore.addToFavorites(item)
}

// 移除收藏项的方法
const removeFromFavorites = (path: string) => {
  menuStore.removeFromFavorites(path)
}

const handleMouseEnter = (itemId: string) => {
  hoveredItem.value = itemId
}
</script>

<template>
  <!-- 头部导航栏 -->
  <v-app-bar app elevation="2" color="grey-darken-4" dark height="50">
    <!-- 抽屉菜单按钮 -->
    <v-btn icon @click="drawer = !drawer" class="mr-2" color="white" variant="text">
      <v-icon>{{ drawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
    </v-btn>

    <v-app-bar-title class="text-h6">
      <v-icon class="mr-2" color="white">mdi-cloud</v-icon>
      {{ title }}
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- 导航菜单 -->
    <template v-if="showNavigation">
      <v-btn
        @click="navigateTo('/')"
        variant="text"
        prepend-icon="mdi-home"
        class="mx-1"
        color="white"
      >
        控制台
      </v-btn>
    </template>
  </v-app-bar>

  <!-- 抽屉菜单 -->
  <v-navigation-drawer v-model="drawer" app temporary color="grey-darken-4" dark>
    <v-list color="transparent" nav class="drawer-list">
      <!-- 最近访问页面 -->
      <div class="menu-item-container" @mouseenter="handleMouseEnter('recent')">
        <v-list-item
          :active="hoveredItem === 'recent'"
          color="white"
          variant="text"
          class="menu-item"
          link
        >
          <template v-slot:prepend>
            <v-icon color="white">mdi-clock</v-icon>
          </template>
          <v-list-item-title class="text-white"> 最近访问页面 </v-list-item-title>
          <template v-slot:append>
            <v-icon color="white" class="chevron-icon">mdi-chevron-right</v-icon>
          </template>
        </v-list-item>
      </div>

      <!-- 全部云产品 -->
      <div class="menu-item-container" @mouseenter="handleMouseEnter('all-products')">
        <v-list-item
          :active="hoveredItem === 'all-products'"
          color="white"
          variant="text"
          class="menu-item"
          link
        >
          <template v-slot:prepend>
            <v-icon color="white">mdi-view-grid</v-icon>
          </template>
          <v-list-item-title class="text-white"> 全部云产品 </v-list-item-title>
          <template v-slot:append>
            <v-icon color="white" class="chevron-icon">mdi-chevron-right</v-icon>
          </template>
        </v-list-item>
      </div>

      <!-- 分割线 -->
      <v-divider class="my-2" color="grey-lighten-1"></v-divider>

      <!-- 收藏菜单组件 -->
      <FavoriteMenu :on-remove-from-favorites="removeFromFavorites" />
    </v-list>
  </v-navigation-drawer>

  <!-- 悬停显示的二级菜单面板 -->
  <div v-if="hoveredItem && drawer" class="hover-panel" @mouseenter="handleMouseEnter(hoveredItem)">
    <!-- 连接区域 - 确保鼠标可以移动到面板 -->
    <div class="connection-area"></div>
    <div class="panel-content">
      <!-- 面板内容 -->
      <div class="panel-body">
        <v-list color="transparent" class="panel-list">
          <!-- 全部云产品专用组件 -->
          <template v-if="hoveredItem === 'all-products'">
            <AllProductsPanel
              :on-navigate="navigateTo"
              :on-add-to-favorites="addToFavorites"
              :on-remove-from-favorites="removeFromFavorites"
            />
          </template>

          <!-- 最近访问页面专用组件 -->
          <template v-else-if="hoveredItem === 'recent'">
            <RecentPagesPanel
              :on-navigate="navigateTo"
              :on-add-to-favorites="addToFavorites"
              :on-remove-from-favorites="removeFromFavorites"
            />
          </template>
        </v-list>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drawer-list {
  padding-top: 0;
}

.menu-item-container {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
}

.menu-item {
  border-radius: 0;
  transition: all 0.3s ease;
  margin: 0;
  padding: 0;
  width: 100%;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.active-menu-item {
  background-color: #616161 !important;
  color: #ffffff !important;
}

.active-menu-item:hover {
  background-color: #757575 !important;
}

.chevron-icon {
  transition: transform 0.3s ease;
}

.menu-item:hover .chevron-icon {
  transform: translateX(4px);
}

/* 悬停面板样式 */
.hover-panel {
  position: fixed;
  left: 255px; /* 抽屉宽度 */
  top: 50px; /* 头部高度 */
  width: 320px;
  height: calc(100vh - 50px);
  background-color: #424242;
  border-left: 1px solid #616161;
  z-index: 1000;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.panel-list {
  flex: 1;
  overflow: hidden;
  padding: 0;
}
</style>
