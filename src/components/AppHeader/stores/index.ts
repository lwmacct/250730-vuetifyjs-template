/**
 * AppHeader 组件专用状态管理
 * 管理头部导航、抽屉菜单和悬停状态
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { DrawerConfig, HoverPanelConfig } from '../types'

/**
 * AppHeader 组件 Store
 * 管理头部组件的交互状态和配置
 */
export const useAppHeaderStore = defineStore('appHeader', () => {
  // === 状态 ===
  const drawerOpen = ref(false)
  const hoveredItem = ref<string | null>(null)
  const drawerConfig = ref<DrawerConfig>({
    width: 240,
    temporary: true,
    color: 'grey-darken-4',
    dark: true,
  })

  const hoverPanelConfig = ref<HoverPanelConfig>({
    minWidth: 300,
    maxWidth: 800,
    backgroundColor: '#424242',
    borderColor: '#616161',
    showAnimation: true,
  })

  // === 计算属性 ===
  const isDrawerOpen = computed(() => drawerOpen.value)

  const currentHoveredItem = computed(() => hoveredItem.value)

  const shouldShowHoverPanel = computed(() => hoveredItem.value && drawerOpen.value)

  // === 抽屉操作方法 ===
  const toggleDrawer = () => {
    drawerOpen.value = !drawerOpen.value
    if (!drawerOpen.value) {
      hoveredItem.value = null
    }
  }

  const openDrawer = () => {
    drawerOpen.value = true
  }

  const closeDrawer = () => {
    drawerOpen.value = false
    hoveredItem.value = null
  }

  // === 悬停操作方法 ===
  const setHoveredItem = (itemId: string | null) => {
    hoveredItem.value = itemId
  }

  const clearHover = () => {
    hoveredItem.value = null
  }

  // === 配置更新方法 ===
  const updateDrawerConfig = (config: Partial<DrawerConfig>) => {
    drawerConfig.value = { ...drawerConfig.value, ...config }
  }

  const updateHoverPanelConfig = (config: Partial<HoverPanelConfig>) => {
    hoverPanelConfig.value = { ...hoverPanelConfig.value, ...config }
  }

  // === 导航方法 ===
  const handleNavigation = (path: string) => {
    closeDrawer()
    // 这里可以添加路由导航逻辑
    console.log(`导航到: ${path}`)
  }

  return {
    // 状态
    drawerOpen: computed(() => drawerOpen.value),
    hoveredItem: computed(() => hoveredItem.value),
    drawerConfig: computed(() => drawerConfig.value),
    hoverPanelConfig: computed(() => hoverPanelConfig.value),

    // 计算属性
    isDrawerOpen,
    currentHoveredItem,
    shouldShowHoverPanel,

    // 方法
    toggleDrawer,
    openDrawer,
    closeDrawer,
    setHoveredItem,
    clearHover,
    updateDrawerConfig,
    updateHoverPanelConfig,
    handleNavigation,
  }
})
