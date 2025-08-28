/**
 * LogPanelDemo 页面专用状态管理
 * 管理日志面板演示的状态和配置
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLogPanelStore } from '@/components/LogPanel/stores'
import { LogLevel } from '@/components/LogPanel/types'
import type {
  DemoMode,
  DemoScenario,
  LogSample,
  LogPanelOptions,
  ApiMockConfig,
  MonitoringConfig,
} from '../types'

/**
 * LogPanelDemo 页面 Store
 */
export const useLogPanelDemoStore = defineStore('logPanelDemo', () => {
  const logPanel = useLogPanelStore()

  // === 状态 ===
  const currentMode = ref<DemoMode>('basic')
  const isLogPanelOpen = ref(false)
  const panelConfig = ref<LogPanelOptions>({
    width: 400,
    maxLogs: 1000,
    autoScroll: true,
    enableFilter: true,
    enableExport: true,
  })

  const apiMockConfig = ref<ApiMockConfig>({
    endpoint: '/api/users',
    method: 'GET',
    successRate: 0.8,
    responseTime: 1000,
    enabled: false,
  })

  const monitoringConfig = ref<MonitoringConfig>({
    enabled: false,
    interval: 3000,
    metrics: ['cpu', 'memory', 'network'],
    alertThreshold: 80,
  })

  // === 演示场景数据 ===
  const scenarios = ref<DemoScenario[]>([
    {
      id: 'basic',
      title: '基础演示',
      description: '展示日志面板的基本功能：记录、显示、过滤、导出',
      icon: 'mdi-play-circle',
      color: 'primary',
      config: {
        width: 400,
        maxLogs: 100,
        autoScroll: true,
        enableFilter: true,
        enableExport: true,
      },
      samples: [],
      codeExample: `import { useLogPanelStore } from '@/components/LogPanel/stores'

const logPanel = useLogPanelStore()

// 记录日志
logPanel.info('应用启动成功')
logPanel.warn('配置文件过期')
logPanel.error('数据库连接失败')

// 控制面板
logPanel.openPanel()`,
    },
    {
      id: 'advanced',
      title: '高级功能',
      description: '演示高级功能：分类管理、详情查看、快捷键操作',
      icon: 'mdi-cog',
      color: 'success',
      config: {
        width: 500,
        maxLogs: 500,
        autoScroll: true,
        enableFilter: true,
        enableExport: true,
      },
      samples: [],
      codeExample: `// 高级日志记录
logPanel.debug('调试信息', { 
  category: 'Debug', 
  source: 'Component',
  details: { userId: 123, action: 'click' }
})

// 过滤和搜索
logPanel.setLevelFilter([LogLevel.ERROR, LogLevel.WARN])
logPanel.setCategoryFilter(['Auth', 'Database'])`,
    },
    {
      id: 'integration',
      title: '集成演示',
      description: '展示与其他系统的集成：API 监控、实时告警、性能跟踪',
      icon: 'mdi-network',
      color: 'warning',
      config: {
        width: 600,
        maxLogs: 2000,
        autoScroll: false,
        enableFilter: true,
        enableExport: true,
      },
      samples: [],
      codeExample: `// 系统集成示例
router.beforeEach((to, from, next) => {
  logPanel.info(\`导航: \${from.path} -> \${to.path}\`, {
    category: 'Navigation',
    source: 'Router'
  })
  next()
})

// API 请求监控
const api = {
  async request(url) {
    logPanel.debug(\`API请求: \${url}\`)
    // ... 处理请求
  }
}`,
    },
  ])

  // 日志样本数据
  const logSamples = ref<LogSample[]>([
    {
      id: 'system',
      name: '系统日志',
      description: '模拟系统启动和运行日志',
      icon: 'mdi-server',
      color: 'blue',
      generateLogs: () => {
        logPanel.info('系统启动完成', { category: 'System', source: 'Main' })
        logPanel.debug('加载配置文件', { category: 'System', source: 'Config' })
        logPanel.info('数据库连接成功', { category: 'Database', source: 'Connection' })
        logPanel.warn('内存使用率较高 (78%)', { category: 'System', source: 'Monitor' })
      },
    },
    {
      id: 'user',
      name: '用户操作',
      description: '模拟用户操作和交互日志',
      icon: 'mdi-account',
      color: 'green',
      generateLogs: () => {
        logPanel.info('用户登录成功', {
          category: 'Auth',
          source: 'Login',
          details: { userId: 123 },
        })
        logPanel.debug('页面访问: /dashboard', { category: 'Navigation', source: 'Router' })
        logPanel.info('用户点击按钮', { category: 'UI', source: 'Button' })
        logPanel.debug('表单提交成功', { category: 'Form', source: 'Submit' })
      },
    },
    {
      id: 'api',
      name: 'API 调用',
      description: '模拟 API 请求和响应日志',
      icon: 'mdi-api',
      color: 'purple',
      generateLogs: () => {
        logPanel.info('GET /api/users - 200 OK', { category: 'HTTP', source: 'API' })
        logPanel.warn('POST /api/data - 429 Too Many Requests', { category: 'HTTP', source: 'API' })
        logPanel.error('GET /api/profile - 500 Internal Server Error', {
          category: 'HTTP',
          source: 'API',
          details: { endpoint: '/api/profile', status: 500 },
        })
        logPanel.info('PUT /api/settings - 200 OK', { category: 'HTTP', source: 'API' })
      },
    },
    {
      id: 'error',
      name: '错误调试',
      description: '模拟各种错误和异常日志',
      icon: 'mdi-bug',
      color: 'red',
      generateLogs: () => {
        logPanel.error('未捕获的异常', {
          category: 'Error',
          source: 'Runtime',
          stack: 'Error: Uncaught exception\n  at Component.render\n  at VueComponent.update',
        })
        logPanel.error('网络请求失败', {
          category: 'Network',
          source: 'Fetch',
          details: { error: 'NETWORK_ERROR', timeout: true },
        })
        logPanel.warn('废弃的 API 调用', { category: 'Deprecated', source: 'API' })
        logPanel.error('验证失败', { category: 'Validation', source: 'Form' })
      },
    },
  ])

  // === 计算属性 ===
  const currentScenario = computed(() => {
    return scenarios.value.find((s) => s.id === currentMode.value) || scenarios.value[0]
  })

  const logStats = computed(() => {
    return logPanel.logStats
  })

  // === 方法 ===
  const switchMode = (mode: DemoMode) => {
    currentMode.value = mode
    const scenario = scenarios.value.find((s) => s.id === mode)
    if (scenario) {
      panelConfig.value = { ...scenario.config }
    }
    console.log(`切换到 ${mode} 演示模式`)
  }

  const toggleLogPanel = () => {
    isLogPanelOpen.value = !isLogPanelOpen.value
    // LogPanel 组件现在会自动同步状态，无需手动管理 logPanel store
    // v-model:showPanel 会处理内部状态同步
  }

  const updatePanelOptions = (newOptions: Partial<LogPanelOptions>) => {
    Object.assign(panelConfig.value, newOptions)
    // 这里可以应用到实际的 LogPanel 配置
  }

  const generateSampleLogs = (sampleId: string) => {
    const sample = logSamples.value.find((s) => s.id === sampleId)
    if (sample) {
      sample.generateLogs()
      // 移除自动打开面板的逻辑，让用户手动控制面板显示
      // 只生成日志，不强制打开面板
    }
  }

  const clearAllLogs = () => {
    logPanel.clearLogs()
  }

  const startApiMocking = () => {
    if (!apiMockConfig.value.enabled) {
      apiMockConfig.value.enabled = true
      logPanel.info('API 模拟已开启', { category: 'Mock', source: 'API' })

      // 模拟 API 调用
      const mockApiCalls = () => {
        if (!apiMockConfig.value.enabled) return

        const isSuccess = Math.random() < apiMockConfig.value.successRate
        const endpoint = apiMockConfig.value.endpoint
        const method = apiMockConfig.value.method

        setTimeout(() => {
          if (isSuccess) {
            logPanel.info(`${method} ${endpoint} - 200 OK`, {
              category: 'HTTP',
              source: 'Mock API',
              details: { method, endpoint, status: 200 },
            })
          } else {
            logPanel.error(`${method} ${endpoint} - 500 Error`, {
              category: 'HTTP',
              source: 'Mock API',
              details: { method, endpoint, status: 500, error: 'Internal Server Error' },
            })
          }

          // 继续下一次调用
          setTimeout(mockApiCalls, apiMockConfig.value.responseTime + Math.random() * 2000)
        }, apiMockConfig.value.responseTime)
      }

      mockApiCalls()
    }
  }

  const stopApiMocking = () => {
    apiMockConfig.value.enabled = false
    logPanel.info('API 模拟已关闭', { category: 'Mock', source: 'API' })
  }

  const startMonitoring = () => {
    if (!monitoringConfig.value.enabled) {
      monitoringConfig.value.enabled = true
      logPanel.info('系统监控已开启', { category: 'Monitor', source: 'System' })

      const monitorMetrics = () => {
        if (!monitoringConfig.value.enabled) return

        monitoringConfig.value.metrics.forEach((metric) => {
          const value = Math.floor(Math.random() * 100)
          const isAlert = value > monitoringConfig.value.alertThreshold

          const level = isAlert ? LogLevel.WARN : LogLevel.INFO
          const message = `${metric.toUpperCase()} 使用率: ${value}%`

          logPanel.addLog(level, message, {
            category: 'Monitor',
            source: 'System',
            details: { metric, value, threshold: monitoringConfig.value.alertThreshold },
          })
        })

        setTimeout(monitorMetrics, monitoringConfig.value.interval)
      }

      monitorMetrics()
    }
  }

  const stopMonitoring = () => {
    monitoringConfig.value.enabled = false
    logPanel.info('系统监控已关闭', { category: 'Monitor', source: 'System' })
  }

  // === 数据持久化 ===
  const saveToLocalStorage = () => {
    const data = {
      currentMode: currentMode.value,
      panelConfig: panelConfig.value,
      apiMockConfig: apiMockConfig.value,
      monitoringConfig: monitoringConfig.value,
      isLogPanelOpen: isLogPanelOpen.value,
    }
    localStorage.setItem('log-panel-demo-data', JSON.stringify(data))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('log-panel-demo-data')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.currentMode) currentMode.value = data.currentMode
        if (data.panelConfig) Object.assign(panelConfig.value, data.panelConfig)
        if (data.apiMockConfig) Object.assign(apiMockConfig.value, data.apiMockConfig)
        if (data.monitoringConfig) Object.assign(monitoringConfig.value, data.monitoringConfig)
        if (data.isLogPanelOpen !== undefined) isLogPanelOpen.value = data.isLogPanelOpen
      } catch (error) {
        console.error('加载 LogPanelDemo Store 数据失败:', error)
      }
    }
  }

  // === 初始化 ===
  const initialize = () => {
    loadFromLocalStorage()
    logPanel.info('LogPanel 演示页面已加载', { category: 'Demo', source: 'Page' })
  }

  return {
    // 状态
    currentMode: computed(() => currentMode.value),
    isLogPanelOpen, // 直接返回 ref，支持 v-model
    panelConfig: computed(() => panelConfig.value),
    apiMockConfig: computed(() => apiMockConfig.value),
    monitoringConfig: computed(() => monitoringConfig.value),
    scenarios: computed(() => scenarios.value),
    logSamples: computed(() => logSamples.value),

    // 计算属性
    currentScenario,
    logStats,

    // 方法
    switchMode,
    toggleLogPanel,
    updatePanelOptions,
    generateSampleLogs,
    clearAllLogs,
    startApiMocking,
    stopApiMocking,
    startMonitoring,
    stopMonitoring,
    saveToLocalStorage,
    loadFromLocalStorage,
    initialize,

    // 访问原始 LogPanel Store
    logPanel,
  }
})
