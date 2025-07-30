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
    // 计算组
    {
      title: '云服务器',
      path: '/server',
      icon: 'mdi-server',
      isFavorite: true,
      category: '计算',
      lastAccessed: Date.now() - 1000 * 60 * 30, // 30分钟前
    },
    {
      title: '轻量应用服务器',
      path: '/lightweight',
      icon: 'mdi-server-network',
      isFavorite: true,
      category: '计算',
      lastAccessed: Date.now() - 1000 * 60 * 60, // 1小时前
    },
    {
      title: 'GPU 云服务器',
      path: '/gpu-server',
      icon: 'mdi-gpu',
      isFavorite: false,
      category: '计算',
    },
    {
      title: '裸金属云服务器',
      path: '/bare-metal',
      icon: 'mdi-server',
      isFavorite: false,
      category: '计算',
    },
    {
      title: '弹性伸缩',
      path: '/auto-scaling',
      icon: 'mdi-arrow-expand',
      isFavorite: false,
      category: '计算',
    },
    // 高性能计算组
    {
      title: '批量计算',
      path: '/batch-compute',
      icon: 'mdi-cube',
      isFavorite: false,
      category: '高性能计算',
    },
    {
      title: '高性能计算平台',
      path: '/hpc-platform',
      icon: 'mdi-chart-line',
      isFavorite: false,
      category: '高性能计算',
    },
    {
      title: '高性能应用服务',
      path: '/hpc-app',
      icon: 'mdi-application',
      isFavorite: false,
      category: '高性能计算',
      lastAccessed: Date.now() - 1000 * 60 * 45, // 45分钟前
    },
    // 分布式云组
    {
      title: '本地专用集群',
      path: '/local-cluster',
      icon: 'mdi-server-network',
      isFavorite: false,
      category: '分布式云',
    },
    {
      title: '专属可用区',
      path: '/dedicated-zone',
      icon: 'mdi-map-marker',
      isFavorite: false,
      category: '分布式云',
    },
    // 人工智能与机器学习组
    {
      title: '图像识别',
      path: '/image-recognition',
      icon: 'mdi-image',
      isFavorite: false,
      category: '人工智能与机器学习',
    },
    {
      title: '人脸识别',
      path: '/face-recognition',
      icon: 'mdi-account',
      isFavorite: false,
      category: '人工智能与机器学习',
    },
    {
      title: '人脸融合',
      path: '/face-fusion',
      icon: 'mdi-account-multiple',
      isFavorite: false,
      category: '人工智能与机器学习',
    },
    {
      title: '语音识别',
      path: '/speech-recognition',
      icon: 'mdi-microphone',
      isFavorite: false,
      category: '人工智能与机器学习',
    },
    // 存储组
    {
      title: '对象存储',
      path: '/object-storage',
      icon: 'mdi-cloud',
      isFavorite: false,
      category: '存储',
    },
    {
      title: '文件存储',
      path: '/file-storage',
      icon: 'mdi-folder',
      isFavorite: false,
      category: '存储',
    },
    {
      title: '归档存储',
      path: '/archive-storage',
      icon: 'mdi-archive',
      isFavorite: false,
      category: '存储',
    },
    {
      title: '云硬盘',
      path: '/cloud-disk',
      icon: 'mdi-harddisk',
      isFavorite: false,
      category: '存储',
      lastAccessed: Date.now() - 1000 * 60 * 20, // 20分钟前
    },
    // 网络组
    {
      title: '负载均衡',
      path: '/loadbalancer',
      icon: 'mdi-scale-balance',
      isFavorite: false,
      category: '网络',
    },
    {
      title: '私有网络',
      path: '/vpc',
      icon: 'mdi-network',
      isFavorite: false,
      category: '网络',
    },
    {
      title: '弹性网卡',
      path: '/elastic-nic',
      icon: 'mdi-ethernet',
      isFavorite: false,
      category: '网络',
    },
    {
      title: 'NAT 网关',
      path: '/nat-gateway',
      icon: 'mdi-gateway',
      isFavorite: false,
      category: '网络',
    },
    // 容器与中间件组
    {
      title: '容器服务',
      path: '/container',
      icon: 'mdi-docker',
      isFavorite: true,
      category: '容器与中间件',
      lastAccessed: Date.now() - 1000 * 60 * 15, // 15分钟前
    },
    {
      title: '容器镜像服务',
      path: '/container-registry',
      icon: 'mdi-package-variant',
      isFavorite: false,
      category: '容器与中间件',
      lastAccessed: Date.now() - 1000 * 60 * 10, // 10分钟前
    },
    {
      title: '云函数',
      path: '/cloud-function',
      icon: 'mdi-function',
      isFavorite: false,
      category: '容器与中间件',
    },
    {
      title: 'Serverless 应用中心',
      path: '/serverless-app',
      icon: 'mdi-application',
      isFavorite: false,
      category: '容器与中间件',
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
