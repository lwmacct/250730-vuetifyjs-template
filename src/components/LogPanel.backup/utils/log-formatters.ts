/**
 * 日志格式化工具函数
 */

import type { LogItem } from '../types'
import { LogLevel } from '../types'

/**
 * 格式化时间戳
 * @param timestamp - 时间戳
 * @param format - 格式化选项
 */
export function formatTimestamp(
  timestamp: number,
  format: 'full' | 'time' | 'relative' = 'full',
): string {
  const date = new Date(timestamp)

  switch (format) {
    case 'full':
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
    case 'time':
      return date.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
    case 'relative':
      return getRelativeTime(timestamp)
    default:
      return date.toLocaleString()
  }
}

/**
 * 获取相对时间
 * @param timestamp - 时间戳
 */
export function getRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp

  if (diff < 1000) return '刚刚'
  if (diff < 60 * 1000) return `${Math.floor(diff / 1000)}秒前`
  if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}分钟前`
  if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}小时前`
  if (diff < 7 * 24 * 60 * 60 * 1000) return `${Math.floor(diff / (24 * 60 * 60 * 1000))}天前`

  return formatTimestamp(timestamp, 'full')
}

/**
 * 根据日志级别获取颜色
 * @param level - 日志级别
 */
export function getLogLevelColor(level: LogLevel): string {
  const colorMap: Record<LogLevel, string> = {
    [LogLevel.DEBUG]: 'grey-lighten-1',
    [LogLevel.INFO]: 'blue',
    [LogLevel.WARN]: 'orange',
    [LogLevel.ERROR]: 'red',
  }
  return colorMap[level] || 'grey'
}

/**
 * 根据日志级别获取图标
 * @param level - 日志级别
 */
export function getLogLevelIcon(level: LogLevel): string {
  const iconMap: Record<LogLevel, string> = {
    [LogLevel.DEBUG]: 'mdi-bug',
    [LogLevel.INFO]: 'mdi-information',
    [LogLevel.WARN]: 'mdi-alert',
    [LogLevel.ERROR]: 'mdi-alert-circle',
  }
  return iconMap[level] || 'mdi-circle'
}

/**
 * 格式化日志消息，处理特殊字符和长文本
 * @param message - 日志消息
 * @param maxLength - 最大长度
 */
export function formatLogMessage(message: string, maxLength?: number): string {
  let formatted = message.replace(/\n/g, '\\n').replace(/\t/g, '\\t')

  if (maxLength && formatted.length > maxLength) {
    formatted = formatted.substring(0, maxLength - 3) + '...'
  }

  return formatted
}

/**
 * 格式化日志详情数据
 * @param details - 详情数据
 * @param compact - 是否使用紧凑格式
 */
export function formatLogDetails(details: any, compact: boolean = false): string {
  if (!details) return ''

  try {
    if (typeof details === 'string') return details
    if (typeof details === 'number' || typeof details === 'boolean') return String(details)

    return JSON.stringify(details, null, compact ? 0 : 2)
  } catch (error) {
    return String(details)
  }
}

/**
 * 生成日志项的唯一键
 * @param log - 日志项
 */
export function getLogItemKey(log: LogItem): string {
  return `${log.id}_${log.timestamp}`
}

/**
 * 截断长文本
 * @param text - 文本
 * @param maxLength - 最大长度
 * @param ellipsis - 省略号
 */
export function truncateText(
  text: string,
  maxLength: number = 100,
  ellipsis: string = '...',
): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - ellipsis.length) + ellipsis
}

/**
 * 高亮关键词
 * @param text - 文本
 * @param keyword - 关键词
 * @param className - CSS类名
 */
export function highlightKeyword(
  text: string,
  keyword: string,
  className: string = 'highlight',
): string {
  if (!keyword.trim()) return text

  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, `<span class="${className}">$1</span>`)
}
