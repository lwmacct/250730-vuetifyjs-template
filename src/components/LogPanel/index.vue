<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { useLogPanelStore } from './stores'
import {
  formatTimestamp,
  getLogLevelColor,
  getLogLevelIcon,
  generateTimestampedFilename,
  copyToClipboard,
} from './utils'
import { LogLevel, type Props, type LogItem } from './types'
import {
  LogPanelHeader,
  LogPanelFilter,
  LogPanelStats,
  LogPanelList,
  LogPanelFooter,
  LogDetailDialog,
} from './components'

const props = withDefaults(defineProps<Props>(), {
  showPanel: false,
  width: 400,
  color: 'grey-darken-4',
  elevation: 4,
  maxLogs: 1000,
  autoScroll: true,
  enableFilter: true,
  enableClear: true,
  enableExport: true,
})

const emit = defineEmits<{
  'update:showPanel': [value: boolean]
}>()

const logPanelStore = useLogPanelStore()

// 组件内部状态
const searchKeyword = ref('')
const showDetailDialog = ref(false)
const selectedLog = ref<LogItem | null>(null)
const showFilterPanel = ref(false)
const logListRef = ref<InstanceType<typeof LogPanelList>>()

// 临时过滤状态
const tempLevelFilter = ref<LogLevel[]>([])
const tempCategoryFilter = ref<string[]>([])
const tempSourceFilter = ref<string[]>([])

// 计算属性
const displayLogs = computed(() => {
  let logs = logPanelStore.filteredLogs

  // 应用搜索关键词
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    logs = logs.filter(
      (log) =>
        log.message.toLowerCase().includes(keyword) ||
        (log.category && log.category.toLowerCase().includes(keyword)) ||
        (log.source && log.source.toLowerCase().includes(keyword)),
    )
  }

  return logs.slice().reverse() // 最新的在前面
})

const logLevelOptions = [
  { value: LogLevel.DEBUG, title: 'Debug', color: 'grey-lighten-1' },
  { value: LogLevel.INFO, title: 'Info', color: 'blue' },
  { value: LogLevel.WARN, title: 'Warn', color: 'orange' },
  { value: LogLevel.ERROR, title: 'Error', color: 'red' },
]

// 事件处理器
const handleToggleFilter = () => {
  showFilterPanel.value = !showFilterPanel.value
}

const handleExportLogs = async (format: 'json' | 'csv' | 'txt') => {
  const logs = displayLogs.value
  if (logs.length === 0) {
    return
  }

  const filename = generateTimestampedFilename('logs', format)
  const exportData = logPanelStore.exportLogs({
    format,
    includeDetails: true,
    levels: logPanelStore.filter.level?.length ? logPanelStore.filter.level : undefined,
  })

  const { downloadJsonFile, downloadCsvFile, downloadTextFile } = await import('./utils')

  switch (format) {
    case 'json':
      downloadJsonFile(JSON.parse(exportData), filename)
      break
    case 'csv':
      downloadCsvFile(exportData, filename)
      break
    case 'txt':
      downloadTextFile(exportData, filename)
      break
  }
}

const handleClearLogs = () => {
  logPanelStore.clearLogs()
}

const handleClosePanel = () => {
  logPanelStore.closePanel()
}

const handleApplyFilters = () => {
  logPanelStore.setLevelFilter(tempLevelFilter.value)
  logPanelStore.setCategoryFilter(tempCategoryFilter.value)
  logPanelStore.setSourceFilter(tempSourceFilter.value)
  showFilterPanel.value = false
}

const handleClearFilters = () => {
  tempLevelFilter.value = []
  tempCategoryFilter.value = []
  tempSourceFilter.value = []
  logPanelStore.clearAllFilters()
  searchKeyword.value = ''
}

const handleShowLogDetail = (log: LogItem) => {
  selectedLog.value = log
  showDetailDialog.value = true
}

const handleCopyLogMessage = async (message: string) => {
  const success = await copyToClipboard(message)
  // 这里可以添加提示消息
  console.log(success ? '复制成功' : '复制失败')
}

const handleAddSampleLogs = () => {
  logPanelStore.info('应用程序启动', { category: 'System', source: 'Main' })
  logPanelStore.debug('调试信息：用户点击按钮', { category: 'UI', source: 'Button' })
  logPanelStore.warn('警告：网络连接缓慢', { category: 'Network', source: 'API' })
  logPanelStore.error('错误：数据库连接失败', {
    category: 'Database',
    source: 'Connection',
    details: { error: 'Connection timeout', retry: 3 },
  })
  logPanelStore.info('用户登录成功', { category: 'Auth', source: 'Login' })
  logPanelStore.debug('组件渲染完成', { category: 'Vue', source: 'Component' })
}

const handleAddTestLog = (level: 'info' | 'warn' | 'error') => {
  switch (level) {
    case 'info':
      logPanelStore.info('测试信息日志', { category: 'Test' })
      break
    case 'warn':
      logPanelStore.warn('测试警告日志', { category: 'Test' })
      break
    case 'error':
      logPanelStore.error('测试错误日志', { category: 'Test' })
      break
  }
}

// 滚动锁定功能
const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = '0px' // 防止滚动条消失导致的抖动
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

// 同步外部showPanel属性和内部store状态
watch(
  () => props.showPanel,
  (newShowPanel) => {
    if (newShowPanel !== logPanelStore.panelOpen) {
      if (newShowPanel) {
        logPanelStore.openPanel()
      } else {
        logPanelStore.closePanel()
      }
    }
  },
  { immediate: true },
)

// 监听面板开关状态
watch(
  () => logPanelStore.panelOpen,
  (isOpen) => {
    // 发射状态变化事件，保持与外部同步
    if (isOpen !== props.showPanel) {
      emit('update:showPanel', isOpen)
    }

    if (isOpen) {
      lockBodyScroll()
      // 面板打开时自动滚动到底部
      nextTick(() => {
        if (logListRef.value && !!props.autoScroll) {
          logListRef.value.scrollToBottom()
        }
      })
    } else {
      unlockBodyScroll()
    }
  },
)

// 初始化临时过滤器状态
watch(
  () => logPanelStore.filter,
  (newFilter) => {
    tempLevelFilter.value = [...(newFilter.level || [])]
    tempCategoryFilter.value = [...(newFilter.category || [])]
    tempSourceFilter.value = [...(newFilter.source || [])]
  },
  { immediate: true },
)

onMounted(() => {
  // 键盘快捷键监听 - 移除，由 LogPanel store 统一处理
  // 避免重复监听导致的冲突

  // 清理函数
  const cleanup = () => {
    // 确保组件卸载时恢复页面滚动
    unlockBodyScroll()
  }

  onUnmounted(cleanup)

  // 添加一些示例日志
  handleAddSampleLogs()
})
</script>

<template>
  <!-- 测试：移除 Teleport，看看是否仍能正常工作 -->
  <div class="log-panel-container">
    <!-- 日志面板抽屉 -->
    <v-navigation-drawer v-model="logPanelStore.panelOpen" location="right" :width="width" temporary :color="color" dark
      :elevation="elevation" :style="{ zIndex: 2147483647 }" class="log-panel-drawer">
      <!-- 头部工具栏 -->
      <LogPanelHeader :display-logs-count="displayLogs.length" :is-filter-active="!!logPanelStore.isFilterActive"
        :active-filter-count="logPanelStore.activeFilterCount" :log-count="logPanelStore.logCount"
        @toggle-filter="handleToggleFilter" @export-logs="handleExportLogs" @clear-logs="handleClearLogs"
        @close-panel="handleClosePanel" />

      <!-- 过滤器面板 -->
      <LogPanelFilter :show-filter-panel="showFilterPanel" v-model:search-keyword="searchKeyword"
        v-model:temp-level-filter="tempLevelFilter" v-model:temp-category-filter="tempCategoryFilter"
        v-model:temp-source-filter="tempSourceFilter" :log-level-options="logLevelOptions"
        :available-categories="logPanelStore.availableCategories" :available-sources="logPanelStore.availableSources"
        @apply-filters="handleApplyFilters" @clear-filters="handleClearFilters" />

      <!-- 日志统计 -->
      <LogPanelStats :log-level-options="logLevelOptions" :log-stats="logPanelStore.logStats" />

      <!-- 日志列表 -->
      <LogPanelList ref="logListRef" :display-logs="displayLogs" :auto-scroll="!!autoScroll"
        @show-log-detail="handleShowLogDetail" @copy-log-message="handleCopyLogMessage"
        @add-sample-logs="handleAddSampleLogs" />

      <!-- 底部快捷操作 -->
      <LogPanelFooter @add-test-log="handleAddTestLog" />
    </v-navigation-drawer>

    <!-- 日志详情对话框 -->
    <LogDetailDialog v-model:show-detail-dialog="showDetailDialog" :selected-log="selectedLog"
      @copy-log-message="handleCopyLogMessage" />
  </div>
</template>

<style scoped>
/* 日志面板容器 */
.log-panel-container {
  position: relative;
}

/* v-navigation-drawer 内部布局修复 */
:global(.log-panel-drawer .v-navigation-drawer__content) {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  overflow: hidden !important;
}

/* 确保子组件在drawer内的正确定位 */
:global(.log-panel-drawer .v-navigation-drawer__content > *) {
  position: relative !important;
  flex-shrink: 0 !important;
  z-index: auto !important;
}

/* 日志列表容器需要可滚动 */
:global(.log-panel-drawer .log-list-container) {
  flex: 1 !important;
  overflow-y: auto !important;
}

/* 日志面板抽屉样式 - 恢复关键定位样式 */
:global(.log-panel-drawer.v-navigation-drawer) {
  z-index: 2147483647 !important;
  position: fixed !important;
  top: 0 !important;
  right: 0 !important;
  height: 100vh !important;
  transform: translateX(0) !important;
}

/* 当抽屉关闭时的样式 - 保持滑动动画 */
:global(.log-panel-drawer.v-navigation-drawer:not(.v-navigation-drawer--active)) {
  transform: translateX(100%) !important;
}

/* 遮罩层模糊效果 */
:global(.v-navigation-drawer--temporary + .v-overlay .v-overlay__scrim) {
  backdrop-filter: blur(8px) !important;
  background: rgba(0, 0, 0, 0.6) !important;
}

/* 日志详情对话框层级 */
:global(.log-detail-dialog) {
  z-index: 2147483647 !important;
}
</style>
