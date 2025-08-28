/**
 * LogPanelDemo 页面相关的类型定义
 * 复用 LogPanel 组件的类型，只定义演示页面特有的类型
 */

// 直接从 LogPanel 组件导入可复用的类型用于内部使用
import type { LogPanelOptions } from '@/components/LogPanel/types'

// 重新导出所有需要的类型供外部使用
export type {
  LogLevel,
  LogItem,
  LogFilter,
  LogPanelConfig,
  LogPanelOptions,
  LogExportOptions,
  LogCreateOptions,
  LogSearchOptions,
  LogStats,
  LogPanelState,
  LogPanelEvents,
  LogOperationCallback,
  LogSearchCallback,
  LogExportCallback,
  Props as LogPanelProps,
} from '@/components/LogPanel/types'

/**
 * 演示模式类型
 */
export type DemoMode = 'basic' | 'advanced' | 'integration'

/**
 * 日志样本类型 - 演示页面特有
 */
export interface LogSample {
  id: string
  name: string
  description: string
  icon: string
  color: string
  generateLogs: () => void
}

/**
 * 演示场景接口 - 演示页面特有
 */
export interface DemoScenario {
  id: string
  title: string
  description: string
  icon: string
  color: string
  config: LogPanelOptions // 使用专门的外部配置类型
  samples: LogSample[]
  codeExample: string
}

/**
 * API 模拟配置 - 演示页面特有
 */
export interface ApiMockConfig {
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  successRate: number
  responseTime: number
  enabled: boolean
}

/**
 * 实时监控配置 - 演示页面特有
 */
export interface MonitoringConfig {
  enabled: boolean
  interval: number
  metrics: string[]
  alertThreshold: number
}

/**
 * LogPanelDemo 页面数据 - 演示页面特有
 */
export interface LogPanelDemoData {
  currentMode: DemoMode
  currentScenario: DemoScenario | null
  panelConfig: LogPanelOptions // 使用专门的外部配置类型
  apiMockConfig: ApiMockConfig
  monitoringConfig: MonitoringConfig
  isLogPanelOpen: boolean
}
