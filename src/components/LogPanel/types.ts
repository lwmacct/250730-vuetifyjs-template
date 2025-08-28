/**
 * LogPanel 组件相关的类型定义
 */

/**
 * 日志等级枚举
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * 日志项接口
 */
export interface LogItem {
  id: string
  timestamp: number
  level: LogLevel
  message: string
  category?: string
  source?: string
  details?: any
  stack?: string
}

/**
 * 日志面板组件属性
 */
export interface Props {
  // 面板显示控制
  showPanel?: boolean
  width?: number | string

  // 外观配置
  color?: string
  elevation?: number | string

  // 功能配置
  maxLogs?: number
  autoScroll?: boolean
  enableFilter?: boolean
  enableClear?: boolean
  enableExport?: boolean
}

/**
 * 外部使用的日志面板配置选项
 * 提供给页面级组件使用的配置接口
 */
export interface LogPanelOptions {
  // 面板外观
  width?: number | string
  color?: string
  elevation?: number | string

  // 功能开关
  maxLogs?: number
  autoScroll?: boolean
  enableFilter?: boolean
  enableClear?: boolean
  enableExport?: boolean

  // 显示选项
  showTimestamp?: boolean
  showCategory?: boolean
  showSource?: boolean
}

/**
 * 日志过滤器配置
 */
export interface LogFilter {
  level?: LogLevel[]
  category?: string[]
  source?: string[]
  keyword?: string
  timeRange?: {
    start?: number
    end?: number
  }
}

/**
 * 日志面板配置
 */
export interface LogPanelConfig {
  width: number | string
  temporary: boolean
  color: string
  dark: boolean
  maxLogs: number
  autoScroll: boolean
  showTimestamp: boolean
  showCategory: boolean
  showSource: boolean
}

/**
 * 日志导出选项
 */
export interface LogExportOptions {
  format: 'json' | 'csv' | 'txt'
  includeDetails: boolean
  dateRange?: {
    start: Date
    end: Date
  }
  levels?: LogLevel[]
}

/**
 * 外部创建日志的选项
 * 用于 logPanel.addLog() 等方法的参数类型
 */
export interface LogCreateOptions {
  category?: string
  source?: string
  details?: any
  stack?: string
}

/**
 * 日志搜索选项
 * 用于外部搜索日志的配置
 */
export interface LogSearchOptions {
  keyword?: string
  levels?: LogLevel[]
  categories?: string[]
  sources?: string[]
  timeRange?: {
    start?: number
    end?: number
  }
  limit?: number
  offset?: number
}

/**
 * 日志统计信息
 * 用于外部获取日志统计数据
 */
export interface LogStats {
  total: number
  debug: number
  info: number
  warn: number
  error: number
  categories: Record<string, number>
  sources: Record<string, number>
  latestTimestamp?: number
  oldestTimestamp?: number
}

/**
 * 日志面板状态
 * 用于外部监控面板状态
 */
export interface LogPanelState {
  isOpen: boolean
  logCount: number
  filteredCount: number
  isFilterActive: boolean
  activeFilterCount: number
  currentFilter: LogFilter
  config: LogPanelConfig
}

/**
 * 日志操作回调函数类型
 */
export type LogOperationCallback = (log: LogItem) => void
export type LogSearchCallback = (results: LogItem[]) => void
export type LogExportCallback = (data: string, format: string) => void

/**
 * 日志面板事件类型
 */
export interface LogPanelEvents {
  onLogAdded?: LogOperationCallback
  onLogRemoved?: LogOperationCallback
  onLogsCleared?: () => void
  onFilterChanged?: (filter: LogFilter) => void
  onPanelToggle?: (isOpen: boolean) => void
  onExport?: LogExportCallback
}
