/**
 * 日志数据管理 Composable
 */

import { ref, computed } from 'vue'
import type { LogItem, LogExportOptions } from '../types'
import { LogLevel } from '../types'

export function useLogStore() {
  // === 状态 ===
  const logs = ref<LogItem[]>([])
  const maxLogs = ref(1000)

  // === 计算属性 ===
  const logCount = computed(() => logs.value.length)
  const latestLog = computed(() => logs.value[logs.value.length - 1])

  // 按级别统计
  const logStats = computed(() => {
    const stats = {
      debug: 0,
      info: 0,
      warn: 0,
      error: 0,
    }

    logs.value.forEach((log) => {
      stats[log.level as keyof typeof stats]++
    })

    return stats
  })

  // === 日志操作方法 ===

  /**
   * 添加日志
   */
  const addLog = (
    level: LogLevel,
    message: string,
    options?: Partial<Pick<LogItem, 'category' | 'source' | 'details' | 'stack'>>,
  ) => {
    const logItem: LogItem = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      level,
      message,
      category: options?.category || 'General',
      source: options?.source || 'App',
      details: options?.details,
      stack: options?.stack,
    }

    logs.value.push(logItem)

    // 限制日志数量
    if (logs.value.length > maxLogs.value) {
      logs.value = logs.value.slice(-maxLogs.value)
    }

    return logItem
  }

  /**
   * 快捷方法：添加debug日志
   */
  const debug = (
    message: string,
    options?: Partial<Pick<LogItem, 'category' | 'source' | 'details' | 'stack'>>,
  ) => {
    return addLog(LogLevel.DEBUG, message, options)
  }

  /**
   * 快捷方法：添加info日志
   */
  const info = (
    message: string,
    options?: Partial<Pick<LogItem, 'category' | 'source' | 'details' | 'stack'>>,
  ) => {
    return addLog(LogLevel.INFO, message, options)
  }

  /**
   * 快捷方法：添加warn日志
   */
  const warn = (
    message: string,
    options?: Partial<Pick<LogItem, 'category' | 'source' | 'details' | 'stack'>>,
  ) => {
    return addLog(LogLevel.WARN, message, options)
  }

  /**
   * 快捷方法：添加error日志
   */
  const error = (
    message: string,
    options?: Partial<Pick<LogItem, 'category' | 'source' | 'details' | 'stack'>>,
  ) => {
    return addLog(LogLevel.ERROR, message, options)
  }

  /**
   * 清空所有日志
   */
  const clearLogs = () => {
    logs.value = []
  }

  /**
   * 删除指定日志
   */
  const removeLog = (logId: string) => {
    const index = logs.value.findIndex((log) => log.id === logId)
    if (index !== -1) {
      logs.value.splice(index, 1)
    }
  }

  /**
   * 获取指定数量的最新日志
   */
  const getLatestLogs = (count: number = 50) => {
    return logs.value.slice(-count)
  }

  /**
   * 根据级别过滤日志
   */
  const getLogsByLevel = (level: LogLevel) => {
    return logs.value.filter((log) => log.level === level)
  }

  /**
   * 根据分类过滤日志
   */
  const getLogsByCategory = (category: string) => {
    return logs.value.filter((log) => log.category === category)
  }

  /**
   * 搜索日志
   */
  const searchLogs = (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase()
    return logs.value.filter(
      (log) =>
        log.message.toLowerCase().includes(lowerKeyword) ||
        (log.category && log.category.toLowerCase().includes(lowerKeyword)) ||
        (log.source && log.source.toLowerCase().includes(lowerKeyword)),
    )
  }

  /**
   * 导出日志
   */
  const exportLogs = (options: LogExportOptions = { format: 'json', includeDetails: true }) => {
    let exportData = logs.value

    // 按级别过滤
    if (options.levels && options.levels.length > 0) {
      exportData = exportData.filter((log) => options.levels!.includes(log.level))
    }

    // 按时间范围过滤
    if (options.dateRange) {
      const start = options.dateRange.start.getTime()
      const end = options.dateRange.end.getTime()
      exportData = exportData.filter((log) => log.timestamp >= start && log.timestamp <= end)
    }

    switch (options.format) {
      case 'json':
        return JSON.stringify(exportData, null, 2)
      case 'csv':
        const headers = ['时间', '级别', '分类', '来源', '消息']
        if (options.includeDetails) headers.push('详情')

        const csvData = [
          headers.join(','),
          ...exportData.map((log) =>
            [
              new Date(log.timestamp).toLocaleString(),
              log.level,
              log.category || '',
              log.source || '',
              `"${log.message.replace(/"/g, '""')}"`,
              ...(options.includeDetails
                ? [`"${JSON.stringify(log.details || '').replace(/"/g, '""')}"`]
                : []),
            ].join(','),
          ),
        ]
        return csvData.join('\n')
      case 'txt':
        return exportData
          .map(
            (log) =>
              `[${new Date(log.timestamp).toLocaleString()}] ${log.level.toUpperCase()} [${log.category}/${log.source}] ${log.message}${options.includeDetails && log.details ? '\n  详情: ' + JSON.stringify(log.details) : ''}`,
          )
          .join('\n')
      default:
        return JSON.stringify(exportData, null, 2)
    }
  }

  /**
   * 更新最大日志数量
   */
  const updateMaxLogs = (max: number) => {
    maxLogs.value = max
    if (logs.value.length > max) {
      logs.value = logs.value.slice(-max)
    }
  }

  return {
    // 状态
    logs: computed(() => logs.value),
    maxLogs: computed(() => maxLogs.value),

    // 计算属性
    logCount,
    latestLog,
    logStats,

    // 方法
    addLog,
    debug,
    info,
    warn,
    error,
    clearLogs,
    removeLog,
    getLatestLogs,
    getLogsByLevel,
    getLogsByCategory,
    searchLogs,
    exportLogs,
    updateMaxLogs,
  }
}
