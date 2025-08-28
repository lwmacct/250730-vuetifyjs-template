/**
 * 日志过滤管理 Composable
 */

import { ref, computed } from 'vue'
import type { LogItem, LogFilter } from '../types'
import { LogLevel } from '../types'

export function useLogFilter() {
  // === 状态 ===
  const filter = ref<LogFilter>({
    level: [],
    category: [],
    source: [],
    keyword: '',
    timeRange: {},
  })

  const availableCategories = ref<Set<string>>(new Set())
  const availableSources = ref<Set<string>>(new Set())

  // === 计算属性 ===
  const isFilterActive = computed(() => {
    return (
      (filter.value.level && filter.value.level.length > 0) ||
      (filter.value.category && filter.value.category.length > 0) ||
      (filter.value.source && filter.value.source.length > 0) ||
      (filter.value.keyword && filter.value.keyword.trim().length > 0) ||
      (filter.value.timeRange && (filter.value.timeRange.start || filter.value.timeRange.end))
    )
  })

  const activeFilterCount = computed(() => {
    let count = 0
    if (filter.value.level && filter.value.level.length > 0) count++
    if (filter.value.category && filter.value.category.length > 0) count++
    if (filter.value.source && filter.value.source.length > 0) count++
    if (filter.value.keyword && filter.value.keyword.trim().length > 0) count++
    if (filter.value.timeRange && (filter.value.timeRange.start || filter.value.timeRange.end))
      count++
    return count
  })

  // === 过滤方法 ===

  /**
   * 应用过滤器到日志列表
   */
  const applyFilter = (logs: LogItem[]): LogItem[] => {
    return logs.filter((log) => {
      // 级别过滤
      if (filter.value.level && filter.value.level.length > 0) {
        if (!filter.value.level.includes(log.level)) {
          return false
        }
      }

      // 分类过滤
      if (filter.value.category && filter.value.category.length > 0) {
        if (!log.category || !filter.value.category.includes(log.category)) {
          return false
        }
      }

      // 来源过滤
      if (filter.value.source && filter.value.source.length > 0) {
        if (!log.source || !filter.value.source.includes(log.source)) {
          return false
        }
      }

      // 关键词过滤
      if (filter.value.keyword && filter.value.keyword.trim()) {
        const keyword = filter.value.keyword.toLowerCase()
        const searchText = `${log.message} ${log.category || ''} ${log.source || ''}`.toLowerCase()
        if (!searchText.includes(keyword)) {
          return false
        }
      }

      // 时间范围过滤
      if (filter.value.timeRange) {
        if (filter.value.timeRange.start && log.timestamp < filter.value.timeRange.start) {
          return false
        }
        if (filter.value.timeRange.end && log.timestamp > filter.value.timeRange.end) {
          return false
        }
      }

      return true
    })
  }

  /**
   * 更新可用的分类和来源列表
   */
  const updateAvailableOptions = (logs: LogItem[]) => {
    const categories = new Set<string>()
    const sources = new Set<string>()

    logs.forEach((log) => {
      if (log.category) categories.add(log.category)
      if (log.source) sources.add(log.source)
    })

    availableCategories.value = categories
    availableSources.value = sources
  }

  // === 过滤器操作方法 ===

  /**
   * 设置级别过滤
   */
  const setLevelFilter = (levels: LogLevel[]) => {
    filter.value.level = levels
  }

  /**
   * 添加级别过滤
   */
  const addLevelFilter = (level: LogLevel) => {
    if (!filter.value.level) filter.value.level = []
    if (!filter.value.level.includes(level)) {
      filter.value.level.push(level)
    }
  }

  /**
   * 移除级别过滤
   */
  const removeLevelFilter = (level: LogLevel) => {
    if (filter.value.level) {
      filter.value.level = filter.value.level.filter((l) => l !== level)
    }
  }

  /**
   * 设置分类过滤
   */
  const setCategoryFilter = (categories: string[]) => {
    filter.value.category = categories
  }

  /**
   * 设置来源过滤
   */
  const setSourceFilter = (sources: string[]) => {
    filter.value.source = sources
  }

  /**
   * 设置关键词过滤
   */
  const setKeywordFilter = (keyword: string) => {
    filter.value.keyword = keyword
  }

  /**
   * 设置时间范围过滤
   */
  const setTimeRangeFilter = (start?: number, end?: number) => {
    filter.value.timeRange = { start, end }
  }

  /**
   * 清空所有过滤器
   */
  const clearAllFilters = () => {
    filter.value = {
      level: [],
      category: [],
      source: [],
      keyword: '',
      timeRange: {},
    }
  }

  /**
   * 重置过滤器到默认状态
   */
  const resetFilters = () => {
    clearAllFilters()
  }

  /**
   * 获取预设过滤器
   */
  const getPresetFilters = () => {
    return {
      errorsOnly: () => setLevelFilter([LogLevel.ERROR]),
      warningsAndErrors: () => setLevelFilter([LogLevel.WARN, LogLevel.ERROR]),
      lastHour: () => setTimeRangeFilter(Date.now() - 60 * 60 * 1000),
      last24Hours: () => setTimeRangeFilter(Date.now() - 24 * 60 * 60 * 1000),
    }
  }

  return {
    // 状态
    filter: computed(() => filter.value),
    availableCategories: computed(() => Array.from(availableCategories.value)),
    availableSources: computed(() => Array.from(availableSources.value)),

    // 计算属性
    isFilterActive,
    activeFilterCount,

    // 方法
    applyFilter,
    updateAvailableOptions,
    setLevelFilter,
    addLevelFilter,
    removeLevelFilter,
    setCategoryFilter,
    setSourceFilter,
    setKeywordFilter,
    setTimeRangeFilter,
    clearAllFilters,
    resetFilters,
    getPresetFilters,
  }
}
