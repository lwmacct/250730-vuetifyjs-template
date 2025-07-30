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

const handleMouseEnter = (itemId: string) => {
  hoveredItem.value = itemId
}

// 添加收藏项的方法
const addToFavorites = (item: any) => {
  menuStore.addToFavorites(item)
}

// 移除收藏项的方法
const removeFromFavorites = (path: string) => {
  menuStore.removeFromFavorites(path)
}

// 获取收藏产品的子项
const getProductChildren = (productPath: string) => {
  const product = menuStore.allProducts.find((p) => p.path === productPath)
  if (product && product.children) {
    return product.children
  }
  return []
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
      <!-- 固定的菜单项 -->
      <div
        v-for="(item, index) in menuStore.fixedMenuItems"
        :key="item.id"
        class="menu-item-container"
        @mouseenter="handleMouseEnter(item.id)"
      >
        <v-list-item
          :active="hoveredItem === item.id"
          active-color="transparent"
          color="white"
          variant="text"
          class="menu-item"
          :class="{ 'active-menu-item': hoveredItem === item.id }"
          link
        >
          <template v-slot:prepend>
            <v-icon :color="hoveredItem === item.id ? 'grey-darken-3' : 'white'">{{
              item.icon
            }}</v-icon>
          </template>
          <v-list-item-title
            :class="{
              'text-grey-darken-3': hoveredItem === item.id,
              'text-white': hoveredItem !== item.id,
            }"
          >
            {{ item.title }}
          </v-list-item-title>
          <template v-slot:append>
            <v-icon color="white" class="chevron-icon">mdi-chevron-right</v-icon>
          </template>
        </v-list-item>
      </div>

      <!-- 收藏菜单组件 -->
      <FavoriteMenu :on-mouse-enter="handleMouseEnter" />
    </v-list>
  </v-navigation-drawer>

  <!-- 悬停显示的二级菜单面板 -->
  <div v-if="hoveredItem && drawer" class="hover-panel" @mouseenter="handleMouseEnter(hoveredItem)">
    <!-- 连接区域 - 确保鼠标可以移动到面板 -->
    <div class="connection-area"></div>

    <div class="panel-content">
      <!-- 面板标题 -->
      <div class="panel-header">
        <h3 class="panel-title">
          {{
            menuStore.allProducts.find((product) => product.path === hoveredItem)?.title ||
            [...menuStore.fixedMenuItems].find((item) => item.id === hoveredItem)?.title
          }}
        </h3>
        <v-btn icon size="small" color="grey-darken-1" variant="text">
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </div>

      <!-- 面板内容 -->
      <div class="panel-body">
        <v-list color="transparent" class="panel-list">
          <!-- 全部云产品专用组件 -->
          <template v-if="hoveredItem === 'all-products'">
            <AllProductsPanel :on-navigate="navigateTo" :on-add-to-favorites="addToFavorites" />
          </template>

          <!-- 最近访问页面专用组件 -->
          <template v-else-if="hoveredItem === 'recent'">
            <RecentPagesPanel
              :on-navigate="navigateTo"
              :on-add-to-favorites="addToFavorites"
              :on-remove-from-favorites="removeFromFavorites"
            />
          </template>

          <!-- 收藏产品的二级菜单 -->
          <template
            v-else-if="menuStore.allProducts.find((product) => product.path === hoveredItem)"
          >
            <v-list-item
              v-for="child in getProductChildren(hoveredItem)"
              :key="child.path"
              @click="navigateTo(child.path)"
              class="panel-item"
              color="blue-lighten-5"
              variant="text"
              hover
            >
              <template v-slot:prepend>
                <v-icon size="small" color="grey-darken-2">{{ child.icon }}</v-icon>
              </template>
              <v-list-item-title class="text-grey-darken-1">
                {{ child.title }}
                <span v-if="child.count" class="text-grey-darken-2 ml-2 font-weight-medium">
                  {{ child.count }}
                </span>
              </v-list-item-title>
              <template v-slot:append>
                <v-btn
                  icon
                  size="small"
                  @click.stop="addToFavorites(child)"
                  class="ml-2"
                  color="amber-darken-2"
                  variant="text"
                >
                  <v-icon size="small">mdi-star-outline</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </template>

          <!-- 其他固定菜单项的子项 -->
          <template v-else>
            <v-list-item
              v-for="child in [...menuStore.fixedMenuItems].find((item) => item.id === hoveredItem)
                ?.children"
              :key="child.path"
              @click="navigateTo(child.path)"
              class="panel-item"
              color="blue-lighten-5"
              variant="text"
              hover
            >
              <template v-slot:prepend>
                <v-icon size="small" color="grey-darken-2">{{ child.icon }}</v-icon>
              </template>
              <v-list-item-title class="text-grey-darken-1">
                {{ child.title }}
                <span v-if="child.count" class="text-grey-darken-2 ml-2 font-weight-medium">
                  {{ child.count }}
                </span>
              </v-list-item-title>
              <template v-slot:append>
                <v-btn
                  icon
                  size="small"
                  @click.stop="addToFavorites(child)"
                  class="ml-2"
                  color="amber-darken-2"
                  variant="text"
                >
                  <v-icon size="small">mdi-star-outline</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </template>
        </v-list>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item-container {
  position: relative;
}

.menu-item {
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  margin: 2px 8px;
}

.active-menu-item {
  background-color: #f5f5f5 !important;
  color: #424242 !important;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.active-menu-item:hover {
  background-color: #eeeeee !important;
}

.drawer-list {
  padding: 8px 0;
}

.hover-panel {
  position: fixed;
  left: 250px; /* 抽屉菜单宽度 */
  top: 50px; /* 头部高度 */
  width: 320px;
  height: calc(100vh - 50px);
  background-color: white;
  color: black;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  z-index: 1000; /* 提高z-index确保在最上层 */
  border-radius: 0 8px 8px 0;
  overflow: hidden;
}

/* 连接区域 - 确保鼠标可以移动到面板 */
.connection-area {
  position: absolute;
  left: -20px; /* 向左延伸20px */
  top: 0;
  width: 20px;
  height: 100%;
  background: transparent;
}

.panel-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #424242;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-top: 1px solid #616161;
  border-bottom: 1px solid #616161;
  background-color: #424242;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #64b5f6;
}

.panel-body {
  flex: 1;
  overflow: hidden;
  background-color: #424242;
}

.panel-list {
  padding: 0;
  height: 100%;
  overflow: hidden;
  background-color: #424242;
}

.panel-item {
  border-bottom: 1px solid #616161;
  transition: all 0.2s ease-in-out;
  margin: 0;
  padding: 12px 20px 12px 24px;
}

.panel-item:hover {
  background-color: #616161 !important;
  transform: translateX(2px);
}

.panel-item:last-child {
  border-bottom: none;
}

/* 确保抽屉菜单有足够的宽度 */
.v-navigation-drawer {
  min-width: 250px;
}

/* 右箭头图标对齐 */
.chevron-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 我的收藏标题样式 */
.favorites-header {
  padding: 12px 20px 8px 20px;
  border-top: 1px solid #616161;
  border-bottom: 1px solid #616161;
}

.favorites-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #64b5f6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 修复prepend区域过宽的问题 */
:deep(.v-list-item__prepend) {
  min-width: auto !important;
  width: auto !important;
  margin-right: 8px !important;
}

:deep(.v-list-item__append) {
  min-width: auto !important;
  width: auto !important;
}
</style>
