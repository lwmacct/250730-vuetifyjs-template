/**
 * Dashboard 页面专用状态管理
 * 管理仪表盘的统计数据和实时更新
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { StatCard, ActivityItem, QuickAction } from '../types'
import {
  mockStats,
  generateRandomStats,
  mockActivities,
  generateRandomActivity,
  getDefaultQuickActions,
  mockConfig,
} from '../mock'

/**
 * Dashboard 页面 Store
 * 管理仪表盘数据、实时更新和用户操作
 */
export const useDashboardStore = defineStore('dashboard', () => {
  // === 状态 ===
  const stats = ref<StatCard[]>([...mockStats])
  const activities = ref<ActivityItem[]>([...mockActivities])

  const isAutoRefresh = ref(mockConfig.autoRefreshDefault)
  const refreshInterval = ref(mockConfig.refreshInterval)
  const lastRefreshTime = ref<Date>(new Date())

  // === 计算属性 ===
  const totalUsers = computed(() => {
    const userStat = stats.value.find((s) => s.id === 'total-users')
    return userStat ? userStat.value : 0
  })

  const activeUsers = computed(() => {
    const activeStat = stats.value.find((s) => s.id === 'active-users')
    return activeStat ? activeStat.value : 0
  })

  const formattedLastRefresh = computed(() => {
    return lastRefreshTime.value.toLocaleTimeString('zh-CN')
  })

  const recentActivities = computed(() => {
    return activities.value.slice(0, 5)
  })

  // === 快速操作 ===
  const quickActions = computed<QuickAction[]>(() => getDefaultQuickActions())

  // === 方法 ===
  const refreshData = async () => {
    console.log('刷新仪表盘数据...')

    if (mockConfig.enableRandomGeneration) {
      const randomData = generateRandomStats()

      // 更新统计数据
      stats.value.forEach((stat) => {
        if (randomData[stat.id] !== undefined) {
          stat.value = randomData[stat.id]!
        }
      })

      // 添加随机活动记录
      if (Math.random() < 0.3) {
        // 30% 概率添加新活动
        const newActivity = generateRandomActivity()
        activities.value.unshift(newActivity)

        // 保持最大数量限制
        if (activities.value.length > mockConfig.maxActivities) {
          activities.value = activities.value.slice(0, mockConfig.maxActivities)
        }
      }
    }

    lastRefreshTime.value = new Date()
    console.log(`仪表盘数据已更新 - ${formattedLastRefresh.value}`)
  }

  const toggleAutoRefresh = () => {
    isAutoRefresh.value = !isAutoRefresh.value
    console.log(`自动刷新 ${isAutoRefresh.value ? '开启' : '关闭'}`)
  }

  const addActivity = (activity: Omit<ActivityItem, 'id'>) => {
    const newActivity: ActivityItem = {
      ...activity,
      id: Date.now().toString(),
    }
    activities.value.unshift(newActivity)

    // 保持最大数量限制
    if (activities.value.length > mockConfig.maxActivities) {
      activities.value = activities.value.slice(0, mockConfig.maxActivities)
    }
  }

  // === 数据持久化 ===
  const saveToLocalStorage = () => {
    const data = {
      stats: stats.value,
      isAutoRefresh: isAutoRefresh.value,
      refreshInterval: refreshInterval.value,
      lastRefreshTime: lastRefreshTime.value,
    }
    localStorage.setItem('dashboard-store-data', JSON.stringify(data))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('dashboard-store-data')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.stats) Object.assign(stats.value, data.stats)
        if (data.isAutoRefresh !== undefined) isAutoRefresh.value = data.isAutoRefresh
        if (data.refreshInterval) refreshInterval.value = data.refreshInterval
        if (data.lastRefreshTime) {
          lastRefreshTime.value = new Date(data.lastRefreshTime)
        }
      } catch (error) {
        console.error('加载 Dashboard Store 数据失败:', error)
      }
    }
  }

  // === 初始化 ===
  const initialize = () => {
    loadFromLocalStorage()
    refreshData()

    // 添加初始化活动记录
    addActivity({
      title: '仪表盘初始化',
      description: '仪表盘页面加载完成',
      timestamp: new Date(),
      icon: 'mdi-view-dashboard',
    })
  }

  return {
    // 状态
    stats: computed(() => stats.value),
    activities: computed(() => activities.value),
    isAutoRefresh: computed(() => isAutoRefresh.value),
    refreshInterval: computed(() => refreshInterval.value),
    lastRefreshTime: computed(() => lastRefreshTime.value),

    // 计算属性
    totalUsers,
    activeUsers,
    formattedLastRefresh,
    recentActivities,
    quickActions,

    // 方法
    refreshData,
    toggleAutoRefresh,
    addActivity,
    saveToLocalStorage,
    loadFromLocalStorage,
    initialize,
  }
})
