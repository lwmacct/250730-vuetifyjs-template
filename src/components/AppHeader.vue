<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useMenuStore } from '@/stores/menu'
import FavoriteMenu from './FavoriteMenu.vue'
import RecentPagesPanel from './RecentPagesPanel.vue'
import AllProductsPanel from './AllProductsPanel.vue'

interface Props {
  // 标题相关
  title?: string
  titleIcon?: string
  showTitle?: boolean

  // 导航图标相关
  showNavIcon?: boolean
  navIcon?: string
  navIconColor?: string
  onNavIconClick?: () => void

  // 操作按钮相关
  actions?: Array<{
    icon?: string
    text?: string
    color?: string
    variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
    onClick: () => void
  }>

  // 抽屉菜单相关
  showDrawer?: boolean
  drawerWidth?: number | string

  // 其他
  elevation?: number | string
  color?: string
  height?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  title: '腾讯云',
  titleIcon: 'mdi-cloud',
  showTitle: true,
  showNavIcon: true,
  navIcon: 'mdi-menu',
  navIconColor: 'white',
  showDrawer: true,
  drawerWidth: 240,
  elevation: 2,
  color: 'grey-darken-4',
  height: 50,
  actions: () => [],
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

// 处理导航图标点击
const handleNavIconClick = () => {
  if (props.onNavIconClick) {
    props.onNavIconClick()
  } else if (props.showDrawer) {
    drawer.value = !drawer.value
  }
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
  <v-app-bar app :elevation="elevation" :color="color" dark :height="height">
    <!-- 导航图标 -->
    <v-app-bar-nav-icon
      v-if="showNavIcon"
      @click="handleNavIconClick"
      :color="navIconColor"
      variant="text"
      class="mr-2"
    >
      <v-icon>{{ drawer ? 'mdi-close' : navIcon }}</v-icon>
    </v-app-bar-nav-icon>

    <!-- 标题 -->
    <v-app-bar-title v-if="showTitle" class="text-h6">
      <v-icon v-if="titleIcon" class="mr-2" color="white">{{ titleIcon }}</v-icon>
      {{ title }}
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- 操作按钮 -->
    <v-app-bar-actions>
      <!-- 自定义操作按钮 -->
      <template v-for="(action, index) in actions" :key="index">
        <v-btn
          @click="action.onClick"
          :variant="action.variant || 'text'"
          :prepend-icon="action.icon"
          :color="action.color || 'white'"
          class="mx-1"
        >
          {{ action.text }}
        </v-btn>
      </template>
    </v-app-bar-actions>
  </v-app-bar>

  <!-- 抽屉菜单 -->
  <v-navigation-drawer
    v-if="showDrawer"
    v-model="drawer"
    app
    temporary
    color="grey-darken-4"
    dark
    class="drawer-container"
    :width="drawerWidth"
  >
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

    <!-- 悬停显示的二级菜单面板 -->
    <div
      v-if="hoveredItem && drawer"
      class="hover-panel"
      @mouseenter="handleMouseEnter(hoveredItem)"
    >
      <!-- 连接区域 - 确保鼠标可以移动到面板 -->
      <div class="connection-area"></div>
      <!-- 面板内容 -->
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
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
.drawer-container {
  position: relative;
}

:deep(.v-list-item__prepend) {
  width: 30px !important;
}

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
  position: absolute;
  left: 100%; /* 相对于抽屉的右边缘 */
  top: 0; /* 相对于抽屉的顶部 */
  width: 300px;
  height: 100%; /* 相对于抽屉的高度 */
  background-color: #424242;
  border-left: 1px solid #616161;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>
