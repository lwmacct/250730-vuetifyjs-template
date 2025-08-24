/**
 * Dashboard 页面相关的类型定义
 */

/**
 * 统计卡片接口
 */
export interface StatCard {
  id: string
  title: string
  value: number | string
  icon: string
  color: string
  format?: 'number' | 'text'
}

/**
 * 活动项接口
 */
export interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: Date
  icon?: string
}

/**
 * 快速操作接口
 */
export interface QuickAction {
  id: string
  title: string
  icon: string
  color?: string
  variant?: string
  onClick: () => void
}

/**
 * 仪表盘数据接口
 */
export interface DashboardData {
  stats: StatCard[]
  activities: ActivityItem[]
  quickActions: QuickAction[]
  refreshInterval: number
}

/**
 * 头部操作按钮接口
 */
export interface HeaderAction {
  icon: string
  text: string
  color: string
  variant: string
  onClick: () => void
}
