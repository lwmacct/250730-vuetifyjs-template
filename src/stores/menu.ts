import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 定义菜单项的类型
export interface MenuItem {
  title: string
  path: string
  icon: string
  count?: string
  isFavorite?: boolean
  category?: string // 表示产品分类（如：计算、存储等）
  lastAccessed?: number // 记录最后访问时间
}

export const useMenuStore = defineStore('menu', () => {
  // 统一的产品数据源
  const allProducts = ref<MenuItem[]>([
    // 基础页面组
    {
      title: '首页',
      path: '/',
      icon: 'mdi-home',
      isFavorite: true,
      category: '基础页面',
      lastAccessed: Date.now() - 1000 * 60 * 1, // 1分钟前
    },
    {
      title: '仪表板',
      path: '/dashboard',
      icon: 'mdi-view-dashboard',
      isFavorite: true,
      category: '基础页面',
      lastAccessed: Date.now() - 1000 * 60 * 3, // 3分钟前
    },
    {
      title: '关于',
      path: '/about',
      icon: 'mdi-information',
      isFavorite: false,
      category: '基础页面',
    },
    {
      title: '联系',
      path: '/contact',
      icon: 'mdi-email',
      isFavorite: false,
      category: '基础页面',
    },
    {
      title: '登录',
      path: '/login',
      icon: 'mdi-login',
      isFavorite: false,
      category: '基础页面',
    },
    // Header Demo 组
    {
      title: 'AppHeader 演示',
      path: '/header-demo',
      icon: 'mdi-view-dashboard',
      isFavorite: true,
      category: 'Header Demo',
      lastAccessed: Date.now() - 1000 * 60 * 5, // 5分钟前
    },
    {
      title: '默认配置演示',
      path: '/header-demo/default',
      icon: 'mdi-cog',
      isFavorite: false,
      category: 'Header Demo',
    },
    {
      title: '自定义标题演示',
      path: '/header-demo/custom-title',
      icon: 'mdi-format-title',
      isFavorite: false,
      category: 'Header Demo',
    },
    {
      title: '自定义操作按钮演示',
      path: '/header-demo/custom-actions',
      icon: 'mdi-button-cursor',
      isFavorite: false,
      category: 'Header Demo',
    },
    {
      title: '插槽方式演示',
      path: '/header-demo/slot',
      icon: 'mdi-puzzle',
      isFavorite: false,
      category: 'Header Demo',
    },
    {
      title: '组件对象方式演示',
      path: '/header-demo/component',
      icon: 'mdi-cube-outline',
      isFavorite: false,
      category: 'Header Demo',
    },
    {
      title: '样式控制演示',
      path: '/header-demo/styles',
      icon: 'mdi-palette',
      isFavorite: false,
      category: 'Header Demo',
    },
    // Footer Demo 组
    {
      title: 'AppFooter 演示',
      path: '/footer-demo',
      icon: 'mdi-foot-print',
      isFavorite: true,
      category: 'Footer Demo',
      lastAccessed: Date.now() - 1000 * 60 * 2, // 2分钟前
    },
    {
      title: '默认页脚演示',
      path: '/footer-demo/default',
      icon: 'mdi-arrow-down',
      isFavorite: false,
      category: 'Footer Demo',
    },
    {
      title: '固定页脚演示',
      path: '/footer-demo/fixed',
      icon: 'mdi-pin',
      isFavorite: false,
      category: 'Footer Demo',
    },
    {
      title: '自定义页脚演示',
      path: '/footer-demo/custom',
      icon: 'mdi-cog',
      isFavorite: false,
      category: 'Footer Demo',
    },
  ])

  // 计算属性：最近访问的页面（基于 lastAccessed 时间排序）
  const recentPages = computed(() => {
    return allProducts.value
      .filter((item) => item.lastAccessed)
      .sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0))
      .slice(0, 10) // 只显示最近10个
  })

  // 计算属性：收藏的产品
  const favoriteProducts = computed(() => {
    return allProducts.value.filter((item) => item.isFavorite)
  })

  // 计算属性：按分类分组的产品
  const productsByCategory = computed(() => {
    const categories: { [key: string]: MenuItem[] } = {}
    allProducts.value.forEach((item) => {
      if (item.category) {
        if (!categories[item.category]) {
          categories[item.category] = []
        }
        categories[item.category].push(item)
      }
    })
    return categories
  })

  // 统一的收藏状态管理方法
  const toggleFavorite = (path: string) => {
    const item = allProducts.value.find((product) => product.path === path)
    if (item) {
      item.isFavorite = !item.isFavorite
    }
  }

  // 检查是否已收藏的方法
  const isFavorite = (path: string) => {
    const item = allProducts.value.find((product) => product.path === path)
    return item ? item.isFavorite : false
  }

  // 记录访问时间的方法
  const recordAccess = (path: string) => {
    const item = allProducts.value.find((product) => product.path === path)
    if (item) {
      item.lastAccessed = Date.now()
    }
  }

  // 移除收藏项的方法（保持兼容性）
  const removeFromFavorites = (path: string) => {
    toggleFavorite(path)
  }

  // 添加收藏项的方法（保持兼容性）
  const addToFavorites = (item: MenuItem) => {
    toggleFavorite(item.path)
  }

  // 移动收藏项顺序的方法
  const moveFavoriteItem = (fromIndex: number, toIndex: number) => {
    const favoriteItems = favoriteProducts.value
    const [movedItem] = favoriteItems.splice(fromIndex, 1)
    favoriteItems.splice(toIndex, 0, movedItem)

    // 重新排序所有产品
    const nonFavoriteItems = allProducts.value.filter((product) => !product.isFavorite)
    allProducts.value = [...favoriteItems, ...nonFavoriteItems]
  }

  // 根据分类获取产品
  const getProductsByCategory = (categoryName: string) => {
    return allProducts.value.filter((product) => product.category === categoryName)
  }

  return {
    allProducts,
    recentPages,
    favoriteProducts,
    productsByCategory,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    recordAccess,
    moveFavoriteItem,
    getProductsByCategory,
  }
})
