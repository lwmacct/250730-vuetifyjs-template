import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义菜单项的类型
export interface MenuItem {
  title: string
  path: string
  icon: string
  count?: string
  isFavorite?: boolean
  children?: MenuItem[] // 新增 children 属性
}

export interface MenuGroup {
  id: string
  title: string
  icon: string
  children: MenuItem[]
}

export const useMenuStore = defineStore('menu', () => {
  // 固定的菜单项
  const fixedMenuItems = ref<MenuGroup[]>([
    {
      id: 'all-products',
      title: '全部云产品',
      icon: 'mdi-view-grid',
      children: [
        { title: '云服务器', path: '/server', icon: 'mdi-server' },
        { title: '轻量应用服务器', path: '/lightweight', icon: 'mdi-server-network' },
        { title: '容器服务', path: '/container', icon: 'mdi-docker' },
        { title: '数据库', path: '/database', icon: 'mdi-database' },
        { title: '存储', path: '/storage', icon: 'mdi-harddisk' },
        { title: '网络', path: '/network', icon: 'mdi-network' },
        { title: '安全', path: '/security', icon: 'mdi-shield' },
        { title: '监控', path: '/monitor', icon: 'mdi-chart-line' },
      ],
    },
    {
      id: 'recent',
      title: '最近访问页面',
      icon: 'mdi-clock',
      children: [
        { title: '工单系统 / 腾讯云安灯 / 提交工单', path: '/ticket', icon: 'mdi-ticket' },
        { title: 'ICP备案 / 我的备案', path: '/icp', icon: 'mdi-file-document' },
        { title: '轻量云 / 云硬盘', path: '/disk', icon: 'mdi-harddisk' },
        { title: '轻量云 / 数据备份', path: '/backup', icon: 'mdi-backup-restore' },
        { title: '轻量云 / 镜像', path: '/image', icon: 'mdi-image' },
        { title: '轻量云 / 服务器', path: '/server', icon: 'mdi-server' },
        { title: '高性能应用服务 / 应用管理', path: '/app-management', icon: 'mdi-application' },
        { title: '高性能应用服务 / 算力管理', path: '/computing', icon: 'mdi-calculator' },
        { title: '消息中心 / 站内信', path: '/messages', icon: 'mdi-message' },
        { title: '容器镜像服务 / 镜像仓库', path: '/container', icon: 'mdi-docker' },
      ],
    },
  ])

  // 所有可收藏的产品作为独立的一级菜单项
  const allProducts = ref<MenuItem[]>([
    {
      title: '工单系统',
      path: '/ticket',
      icon: 'mdi-ticket',
      isFavorite: true,
      children: [
        { title: '提交工单', path: '/ticket/submit', icon: 'mdi-plus' },
        { title: '我的工单', path: '/ticket/my', icon: 'mdi-format-list-bulleted' },
        { title: '工单统计', path: '/ticket/stats', icon: 'mdi-chart-bar' },
      ],
    },
    {
      title: '腾讯云可观测平台',
      path: '/observability',
      icon: 'mdi-chart-line',
      isFavorite: true,
      children: [
        { title: '监控大盘', path: '/observability/dashboard', icon: 'mdi-view-dashboard' },
        { title: '告警规则', path: '/observability/alerts', icon: 'mdi-bell' },
        { title: '日志查询', path: '/observability/logs', icon: 'mdi-file-document' },
      ],
    },
    {
      title: '云服务器',
      path: '/server',
      icon: 'mdi-server',
      isFavorite: true,
      children: [
        { title: '实例列表', path: '/server/instances', icon: 'mdi-format-list-bulleted' },
        { title: '镜像管理', path: '/server/images', icon: 'mdi-image' },
        { title: '安全组', path: '/server/security', icon: 'mdi-shield' },
      ],
    },
    {
      title: '轻量应用服务器',
      path: '/lightweight',
      icon: 'mdi-server-network',
      isFavorite: true,
      children: [
        { title: '服务器列表', path: '/lightweight/servers', icon: 'mdi-format-list-bulleted' },
        { title: '云硬盘', path: '/lightweight/disks', icon: 'mdi-harddisk' },
        { title: '数据备份', path: '/lightweight/backup', icon: 'mdi-backup-restore' },
      ],
    },
    {
      title: '容器服务',
      path: '/container',
      icon: 'mdi-docker',
      isFavorite: true,
      children: [
        { title: '集群管理', path: '/container/clusters', icon: 'mdi-server-network' },
        { title: '工作负载', path: '/container/workloads', icon: 'mdi-cube' },
        { title: '镜像仓库', path: '/container/registry', icon: 'mdi-package-variant' },
      ],
    },
    {
      title: '费用中心',
      path: '/cost',
      icon: 'mdi-currency-usd',
      isFavorite: false,
      children: [
        { title: '费用概览', path: '/cost/overview', icon: 'mdi-chart-pie' },
        { title: '账单明细', path: '/cost/bills', icon: 'mdi-receipt' },
        { title: '成本优化', path: '/cost/optimization', icon: 'mdi-trending-down' },
      ],
    },
    {
      title: 'ICP备案',
      path: '/icp',
      icon: 'mdi-file-document',
      isFavorite: false,
      children: [
        { title: '我的备案', path: '/icp/my', icon: 'mdi-format-list-bulleted' },
        { title: '备案申请', path: '/icp/apply', icon: 'mdi-plus' },
        { title: '备案查询', path: '/icp/query', icon: 'mdi-magnify' },
      ],
    },
    {
      title: '高性能应用服务',
      path: '/app-service',
      icon: 'mdi-application',
      isFavorite: false,
      children: [
        { title: '应用管理', path: '/app-service/apps', icon: 'mdi-format-list-bulleted' },
        { title: '算力管理', path: '/app-service/computing', icon: 'mdi-calculator' },
        { title: '监控告警', path: '/app-service/monitor', icon: 'mdi-monitor' },
      ],
    },
    {
      title: '消息中心',
      path: '/messages',
      icon: 'mdi-message',
      isFavorite: false,
      children: [
        { title: '站内信', path: '/messages/internal', icon: 'mdi-email' },
        { title: '系统通知', path: '/messages/system', icon: 'mdi-bell' },
        { title: '消息设置', path: '/messages/settings', icon: 'mdi-cog' },
      ],
    },
    {
      title: '对象存储',
      path: '/object-storage',
      icon: 'mdi-cloud',
      isFavorite: false,
      children: [
        { title: '存储桶', path: '/object-storage/buckets', icon: 'mdi-folder' },
        { title: '文件管理', path: '/object-storage/files', icon: 'mdi-file' },
        { title: '访问控制', path: '/object-storage/acl', icon: 'mdi-shield' },
      ],
    },
    {
      title: '文件存储',
      path: '/file-storage',
      icon: 'mdi-folder',
      isFavorite: false,
      children: [
        { title: '文件系统', path: '/file-storage/systems', icon: 'mdi-folder-network' },
        { title: '挂载点', path: '/file-storage/mounts', icon: 'mdi-connection' },
        { title: '快照管理', path: '/file-storage/snapshots', icon: 'mdi-camera' },
      ],
    },
    {
      title: '负载均衡',
      path: '/loadbalancer',
      icon: 'mdi-scale-balance',
      isFavorite: false,
      children: [
        { title: '负载均衡器', path: '/loadbalancer/instances', icon: 'mdi-format-list-bulleted' },
        { title: '监听器', path: '/loadbalancer/listeners', icon: 'mdi-ear' },
        { title: '后端服务', path: '/loadbalancer/backends', icon: 'mdi-server' },
      ],
    },
    {
      title: '私有网络',
      path: '/vpc',
      icon: 'mdi-network',
      isFavorite: false,
      children: [
        { title: 'VPC列表', path: '/vpc/list', icon: 'mdi-format-list-bulleted' },
        { title: '子网管理', path: '/vpc/subnets', icon: 'mdi-network' },
        { title: '路由表', path: '/vpc/routes', icon: 'mdi-routes' },
      ],
    },
    {
      title: '云函数',
      path: '/cloud-function',
      icon: 'mdi-function',
      isFavorite: false,
      children: [
        { title: '函数列表', path: '/cloud-function/list', icon: 'mdi-format-list-bulleted' },
        { title: '触发器', path: '/cloud-function/triggers', icon: 'mdi-lightning-bolt' },
        { title: '版本管理', path: '/cloud-function/versions', icon: 'mdi-tag' },
      ],
    },
    {
      title: '数据库',
      path: '/database',
      icon: 'mdi-database',
      isFavorite: false,
      children: [
        { title: '实例列表', path: '/database/instances', icon: 'mdi-format-list-bulleted' },
        { title: '备份管理', path: '/database/backups', icon: 'mdi-backup-restore' },
        { title: '监控告警', path: '/database/monitor', icon: 'mdi-monitor' },
      ],
    },
    {
      title: 'CDN',
      path: '/cdn',
      icon: 'mdi-web',
      isFavorite: false,
      children: [
        { title: '域名管理', path: '/cdn/domains', icon: 'mdi-format-list-bulleted' },
        { title: '缓存配置', path: '/cdn/cache', icon: 'mdi-cached' },
        { title: '统计分析', path: '/cdn/stats', icon: 'mdi-chart-line' },
      ],
    },
    {
      title: '安全组',
      path: '/security-group',
      icon: 'mdi-shield',
      isFavorite: false,
      children: [
        { title: '安全组列表', path: '/security-group/list', icon: 'mdi-format-list-bulleted' },
        { title: '规则配置', path: '/security-group/rules', icon: 'mdi-cog' },
        { title: '关联实例', path: '/security-group/instances', icon: 'mdi-server' },
      ],
    },
    {
      title: '域名注册',
      path: '/domain',
      icon: 'mdi-web',
      isFavorite: false,
      children: [
        { title: '我的域名', path: '/domain/my', icon: 'mdi-format-list-bulleted' },
        { title: '域名注册', path: '/domain/register', icon: 'mdi-plus' },
        { title: '域名解析', path: '/domain/resolve', icon: 'mdi-dns' },
      ],
    },
    {
      title: 'SSL证书',
      path: '/ssl',
      icon: 'mdi-certificate',
      isFavorite: false,
      children: [
        { title: '证书列表', path: '/ssl/list', icon: 'mdi-format-list-bulleted' },
        { title: '证书申请', path: '/ssl/apply', icon: 'mdi-plus' },
        { title: '证书部署', path: '/ssl/deploy', icon: 'mdi-download' },
      ],
    },
    {
      title: '云监控',
      path: '/monitor',
      icon: 'mdi-monitor',
      isFavorite: false,
      children: [
        { title: '监控大盘', path: '/monitor/dashboard', icon: 'mdi-view-dashboard' },
        { title: '告警规则', path: '/monitor/alerts', icon: 'mdi-bell' },
        { title: '日志查询', path: '/monitor/logs', icon: 'mdi-file-document' },
      ],
    },
  ])

  // 获取收藏的产品
  const getFavoriteProducts = () => {
    return allProducts.value.filter((product) => product.isFavorite)
  }

  // 添加收藏项的方法
  const addToFavorites = (item: MenuItem) => {
    const existingItem = allProducts.value.find((product) => product.path === item.path)
    if (existingItem) {
      existingItem.isFavorite = true
    } else {
      allProducts.value.push({ ...item, isFavorite: true })
    }
  }

  // 移除收藏项的方法
  const removeFromFavorites = (path: string) => {
    const item = allProducts.value.find((product) => product.path === path)
    if (item) {
      item.isFavorite = false
    }
  }

  // 移动收藏项顺序的方法
  const moveFavoriteItem = (fromIndex: number, toIndex: number) => {
    const favoriteItems = getFavoriteProducts()
    const [movedItem] = favoriteItems.splice(fromIndex, 1)
    favoriteItems.splice(toIndex, 0, movedItem)

    // 重新排序所有产品
    const nonFavoriteItems = allProducts.value.filter((product) => !product.isFavorite)
    allProducts.value = [...favoriteItems, ...nonFavoriteItems]
  }

  return {
    fixedMenuItems,
    allProducts,
    getFavoriteProducts,
    addToFavorites,
    removeFromFavorites,
    moveFavoriteItem,
  }
})
