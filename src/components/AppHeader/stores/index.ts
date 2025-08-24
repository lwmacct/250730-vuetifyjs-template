/**
 * AppHeader 组件专用状态管理
 * 管理头部导航、抽屉菜单、路由菜单和悬停状态
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { DrawerConfig, HoverPanelConfig, MenuItem } from '../types'
import { setPageTitle, type TitleConfig } from '@/utils'

// 扩展Vue Router的RouteMeta接口
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    // 自定义字段
    description?: string
    keywords?: string[]
    category?: string
    priority?: number
    showInMenu?: boolean
    requireAuth?: boolean
    [key: string]: any
  }
}

// 定义菜单项的类型
export interface RouteMenuItem {
  title: string
  path: string
  icon: string
  description?: string
  category?: string
  priority?: number
  showInMenu?: boolean
  requireAuth?: boolean
  isFavorite?: boolean
  lastAccessed?: number
  children?: RouteMenuItem[]
}

/**
 * AppHeader 组件 Store
 * 管理头部组件的交互状态和配置
 */
export const useAppHeaderStore = defineStore('appHeader', () => {
  const router = useRouter()

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

  // === 路由菜单状态 ===
  // 用户状态存储（持久化）
  const userFavorites = ref<string[]>(['/', '/dashboard', '/header-demo', '/footer-demo'])
  const userAccessHistory = ref<Map<string, number>>(
    new Map([
      ['/', Date.now() - 1000 * 60 * 1], // 1分钟前
      ['/dashboard', Date.now() - 1000 * 60 * 3], // 3分钟前
      ['/header-demo', Date.now() - 1000 * 60 * 5], // 5分钟前
      ['/footer-demo', Date.now() - 1000 * 60 * 2], // 2分钟前
    ]),
  )

  // === 计算属性 ===
  const isDrawerOpen = computed(() => drawerOpen.value)

  const currentHoveredItem = computed(() => hoveredItem.value)

  const shouldShowHoverPanel = computed(() => hoveredItem.value && drawerOpen.value)

  // === 路由菜单计算属性 ===

  // 从路由配置生成菜单项
  const generateMenuFromRoutes = (routes: RouteRecordRaw[]): RouteMenuItem[] => {
    const menuItems: RouteMenuItem[] = []

    routes.forEach((route) => {
      // 跳过404和重定向路由
      if (route.path === '/:pathMatch(.*)*' || route.redirect) {
        return
      }

      const meta = (route.meta as any) || {}
      const menuItem: RouteMenuItem = {
        title: (meta.title as string) || (route.name as string) || '未命名页面',
        path: route.path,
        icon: (meta.icon as string) || 'mdi-help',
        description: meta.description as string,
        category: (meta.category as string) || '其他',
        priority: (meta.priority as number) || 999,
        showInMenu: (meta.showInMenu as boolean) !== false, // 默认显示
        requireAuth: (meta.requireAuth as boolean) === true,
        isFavorite: userFavorites.value.includes(route.path), // 从用户状态获取
        lastAccessed: userAccessHistory.value.get(route.path), // 从用户状态获取
      }

      // 如果有子路由，递归处理
      if (route.children && route.children.length > 0) {
        menuItem.children = generateMenuFromRoutes(route.children)
      }

      // 只添加配置了showInMenu的路由
      if (menuItem.showInMenu) {
        menuItems.push(menuItem)
      }
    })

    // 按优先级排序
    return menuItems.sort((a, b) => (a.priority || 999) - (b.priority || 999))
  }

  // 生成所有菜单项
  const allMenuItems = computed(() => {
    return generateMenuFromRoutes(router.getRoutes())
  })

  // 按分类分组的菜单项
  const menuItemsByCategory = computed(() => {
    const categories: { [key: string]: RouteMenuItem[] } = {}

    allMenuItems.value.forEach((item) => {
      const category = item.category || '其他'
      if (!categories[category]) {
        categories[category] = []
      }
      categories[category].push(item)
    })

    return categories
  })

  // 收藏的菜单项
  const favoriteItems = computed(() => {
    const allFavorites = allMenuItems.value.filter((item) => item.isFavorite)

    // 按照userFavorites的顺序返回收藏项
    return userFavorites.value
      .map((path) => allFavorites.find((item) => item.path === path))
      .filter((item) => item !== undefined) as RouteMenuItem[]
  })

  // 最近访问的菜单项
  const recentItems = computed(() => {
    return allMenuItems.value
      .filter((item) => item.lastAccessed)
      .sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0))
      .slice(0, 10)
  })

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
    recordAccess(path) // 记录访问时间
    router.push(path)
  }

  // === 路由菜单操作方法 ===

  // 切换收藏状态
  const toggleFavorite = (path: string) => {
    if (userFavorites.value.includes(path)) {
      userFavorites.value = userFavorites.value.filter((p) => p !== path)
    } else {
      userFavorites.value.push(path)
    }
  }

  // 检查是否已收藏
  const isFavorite = (path: string) => {
    return userFavorites.value.includes(path)
  }

  // 重新排序收藏项
  const reorderFavorites = (fromIndex: number, toIndex: number) => {
    const items = favoriteItems.value

    if (fromIndex < 0 || fromIndex >= items.length || toIndex < 0 || toIndex >= items.length) {
      return
    }

    // 直接操作favoriteOrder数组
    const [movedPath] = userFavorites.value.splice(fromIndex, 1)
    if (movedPath) {
      userFavorites.value.splice(toIndex, 0, movedPath)
    }
  }

  // 记录访问时间
  const recordAccess = (path: string) => {
    userAccessHistory.value.set(path, Date.now())
  }

  // 根据路径获取菜单项
  const getMenuItemByPath = (path: string) => {
    return allMenuItems.value.find((item) => item.path === path)
  }

  // 根据分类获取菜单项
  const getMenuItemsByCategory = (category: string) => {
    return allMenuItems.value.filter((item) => item.category === category)
  }

  // 获取当前路由的菜单项
  const getCurrentMenuItem = () => {
    const currentRoute = router.currentRoute.value
    return getMenuItemByPath(currentRoute.path)
  }

  // === 路由工具函数 ===

  /**
   * 获取当前路由的icon
   * @param defaultIcon 默认icon，如果路由meta中没有配置icon则使用此值
   * @returns 当前路由的icon
   */
  const useRouteIcon = (defaultIcon: string = 'mdi-help') => {
    const route = useRoute()

    return computed(() => {
      return (route.meta?.icon as string) || defaultIcon
    })
  }

  /**
   * 获取当前路由的title
   * @param defaultTitle 默认title，如果路由meta中没有配置title则使用此值
   * @returns 当前路由的title
   */
  const useRouteTitle = (defaultTitle: string = '页面') => {
    const route = useRoute()

    return computed(() => {
      return (route.meta?.title as string) || defaultTitle
    })
  }

  /**
   * 获取当前路由的description
   * @param defaultDescription 默认description，如果路由meta中没有配置description则使用此值
   * @returns 当前路由的description
   */
  const useRouteDescription = (defaultDescription: string = '') => {
    const route = useRoute()

    return computed(() => {
      return (route.meta?.description as string) || defaultDescription
    })
  }

  /**
   * 获取当前路由的category
   * @param defaultCategory 默认category，如果路由meta中没有配置category则使用此值
   * @returns 当前路由的category
   */
  const useRouteCategory = (defaultCategory: string = '') => {
    const route = useRoute()

    return computed(() => {
      return (route.meta?.category as string) || defaultCategory
    })
  }

  /**
   * 获取当前路由的所有meta信息
   * @returns 当前路由的完整meta对象
   */
  const useRouteMeta = () => {
    const route = useRoute()

    return computed(() => {
      return route.meta
    })
  }

  // === 页面标题管理方法 ===

  /**
   * 设置页面标题
   * @param title - 页面标题，如果不传则使用当前路由的标题
   * @param options - 临时配置选项
   */
  const setCurrentPageTitle = (title?: string, options?: Partial<TitleConfig>) => {
    const route = useRoute()
    const finalTitle = title || (route.meta?.title as string)
    return setPageTitle(finalTitle, options)
  }

  /**
   * 根据路由路径设置页面标题
   * @param path - 路由路径
   * @param options - 临时配置选项
   */
  const setPageTitleByPath = (path: string, options?: Partial<TitleConfig>) => {
    const menuItem = getMenuItemByPath(path)
    if (menuItem) {
      return setPageTitle(menuItem.title, options)
    }
    return setPageTitle(undefined, options)
  }

  return {
    // 抽屉状态
    drawerOpen: computed(() => drawerOpen.value),
    hoveredItem: computed(() => hoveredItem.value),
    drawerConfig: computed(() => drawerConfig.value),
    hoverPanelConfig: computed(() => hoverPanelConfig.value),

    // 抽屉计算属性
    isDrawerOpen,
    currentHoveredItem,
    shouldShowHoverPanel,

    // 路由菜单数据
    allMenuItems,
    menuItemsByCategory,
    favoriteItems,
    recentItems,

    // 抽屉操作方法
    toggleDrawer,
    openDrawer,
    closeDrawer,
    setHoveredItem,
    clearHover,
    updateDrawerConfig,
    updateHoverPanelConfig,
    handleNavigation,

    // 路由菜单操作方法
    toggleFavorite,
    isFavorite,
    reorderFavorites,
    recordAccess,
    getMenuItemByPath,
    getMenuItemsByCategory,
    getCurrentMenuItem,

    // 路由工具函数
    useRouteIcon,
    useRouteTitle,
    useRouteDescription,
    useRouteCategory,
    useRouteMeta,

    // 页面标题管理方法
    setCurrentPageTitle,
    setPageTitleByPath,
  }
})
