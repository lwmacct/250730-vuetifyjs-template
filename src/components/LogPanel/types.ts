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
