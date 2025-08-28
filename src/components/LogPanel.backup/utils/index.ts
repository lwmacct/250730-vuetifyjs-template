/**
 * LogPanel 组件专用工具函数库
 */

// 导出日志格式化相关工具
export {
  formatTimestamp,
  getRelativeTime,
  getLogLevelColor,
  getLogLevelIcon,
  formatLogMessage,
  formatLogDetails,
  getLogItemKey,
  truncateText,
  highlightKeyword,
} from './log-formatters'

// 导出文件下载相关工具
export {
  downloadTextFile,
  downloadJsonFile,
  downloadCsvFile,
  generateTimestampedFilename,
  copyToClipboard,
  formatFileSize,
} from './download-helpers'
