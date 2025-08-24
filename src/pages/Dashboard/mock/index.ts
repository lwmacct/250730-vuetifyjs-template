/**
 * Dashboard Mock 数据统一导出
 */

import { mockStats, generateRandomStats } from './stats'
import { mockActivities, generateRandomActivity, generateActivities } from './activities'
import {
  mockQuickActions,
  createQuickActions,
  getDefaultQuickActions,
  getAllQuickActions,
} from './actions'

// 统计数据
export { mockStats, generateRandomStats } from './stats'

// 活动记录
export { mockActivities, generateRandomActivity, generateActivities } from './activities'

// 快速操作
export {
  mockQuickActions,
  createQuickActions,
  getDefaultQuickActions,
  getAllQuickActions,
} from './actions'

// 导出所有数据的聚合对象
export const mockDashboardData = {
  get stats() {
    return mockStats
  },
  get activities() {
    return mockActivities
  },
  get quickActions() {
    return getDefaultQuickActions()
  },
}

/**
 * Mock 数据配置
 */
export const mockConfig = {
  // 数据刷新间隔（秒）
  refreshInterval: 30,

  // 活动记录最大数量
  maxActivities: 20,

  // 是否启用随机数据生成
  enableRandomGeneration: true,

  // 自动刷新默认状态
  autoRefreshDefault: true,
}
