<template>
  <!-- 日志面板主组件 -->
  <v-navigation-drawer v-model="logPanelStore.panelOpen" location="right" :width="width" temporary :color="color" dark
    :elevation="elevation" class="log-panel-drawer">
    <!-- 头部工具栏 -->
    <v-app-bar color="transparent" flat density="compact" class="log-panel-header">
      <v-app-bar-title class="text-h6">
        <v-icon class="mr-2">mdi-math-log</v-icon>
        日志面板
        <v-chip v-if="displayLogs.length > 0" size="small" color="primary" class="ml-2">
          {{ displayLogs.length }}
        </v-chip>
      </v-app-bar-title>

      <v-spacer />

      <!-- 工具按钮组 -->
      <div class="d-flex align-center ga-1">
        <!-- 过滤按钮 -->
        <v-btn variant="text" size="small" icon="mdi-filter-variant" @click="showFilterPanel = !showFilterPanel"
          :color="logPanelStore.isFilterActive ? 'primary' : 'white'">
          <v-icon>mdi-filter-variant</v-icon>
          <v-badge v-if="logPanelStore.activeFilterCount > 0" :content="logPanelStore.activeFilterCount" color="error"
            inline />
        </v-btn>

        <!-- 导出按钮 -->
        <v-menu>
          <template v-slot:activator="{ props: menuProps }">
            <v-btn icon="mdi-export" variant="text" size="small" v-bind="menuProps"
              :disabled="displayLogs.length === 0" />
          </template>
          <v-list>
            <v-list-item @click="handleExportLogs('json')">
              <v-list-item-title>导出 JSON</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleExportLogs('csv')">
              <v-list-item-title>导出 CSV</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleExportLogs('txt')">
              <v-list-item-title>导出 TXT</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- 清空按钮 -->
        <v-btn icon="mdi-delete" variant="text" size="small" @click="handleClearLogs"
          :disabled="logPanelStore.logCount === 0" />

        <!-- 关闭按钮 -->
        <v-btn icon="mdi-close" variant="text" size="small" @click="handleClosePanel" />
      </div>
    </v-app-bar>

    <!-- 过滤器面板 -->
    <v-expand-transition>
      <v-card v-show="showFilterPanel" flat color="grey-darken-3" class="filter-panel">
        <v-card-text>
          <!-- 搜索框 -->
          <v-text-field v-model="searchKeyword" label="搜索关键词" prepend-inner-icon="mdi-magnify" variant="outlined"
            density="compact" clearable hide-details class="mb-3" />

          <!-- 级别过滤 -->
          <div class="mb-3">
            <v-label class="text-caption mb-1">日志级别</v-label>
            <v-chip-group v-model="tempLevelFilter" multiple selected-class="text-primary">
              <v-chip v-for="level in logLevelOptions" :key="level.value" :value="level.value" :color="level.color"
                size="small" variant="outlined">
                <v-icon start :icon="getLogLevelIcon(level.value)" size="small" />
                {{ level.title }}
              </v-chip>
            </v-chip-group>
          </div>

          <!-- 分类过滤 -->
          <v-select v-if="logPanelStore.availableCategories.length > 0" v-model="tempCategoryFilter"
            :items="logPanelStore.availableCategories" label="分类" multiple variant="outlined" density="compact"
            hide-details class="mb-3" />

          <!-- 来源过滤 -->
          <v-select v-if="logPanelStore.availableSources.length > 0" v-model="tempSourceFilter"
            :items="logPanelStore.availableSources" label="来源" multiple variant="outlined" density="compact"
            hide-details class="mb-3" />

          <!-- 过滤器操作按钮 -->
          <div class="d-flex ga-2">
            <v-btn size="small" color="primary" @click="handleApplyFilters"> 应用过滤 </v-btn>
            <v-btn size="small" variant="outlined" @click="handleClearFilters"> 清空过滤 </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-expand-transition>

    <!-- 日志统计 -->
    <div class="log-stats pa-3">
      <div class="d-flex ga-2">
        <v-chip v-for="level in logLevelOptions" :key="level.value" :color="level.color" size="x-small"
          variant="outlined">
          <v-icon start :icon="getLogLevelIcon(level.value)" size="x-small" />
          {{ logPanelStore.logStats[level.value] }}
        </v-chip>
      </div>
    </div>

    <!-- 日志列表 -->
    <div ref="logContainer" class="log-list-container">
      <v-list v-if="displayLogs.length > 0" color="transparent" class="log-list">
        <v-list-item v-for="log in displayLogs" :key="log.id" class="log-item" @click="handleShowLogDetail(log)">
          <template v-slot:prepend>
            <v-icon :icon="getLogLevelIcon(log.level)" :color="getLogLevelColor(log.level)" size="small" />
          </template>

          <v-list-item-title class="log-message">
            {{ truncateText(log.message, 100) }}
          </v-list-item-title>

          <v-list-item-subtitle class="log-meta">
            <div class="d-flex align-center ga-2">
              <span class="log-time">{{ formatTimestamp(log.timestamp, 'time') }}</span>
              <v-chip v-if="log.category" size="x-small" variant="outlined" color="blue-grey">
                {{ log.category }}
              </v-chip>
              <v-chip v-if="log.source" size="x-small" variant="outlined" color="blue-grey">
                {{ log.source }}
              </v-chip>
            </div>
          </v-list-item-subtitle>

          <template v-slot:append>
            <v-btn icon="mdi-content-copy" variant="text" size="x-small"
              @click.stop="handleCopyLogMessage(log.message)" />
          </template>
        </v-list-item>
      </v-list>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <v-icon size="64" color="grey-lighten-1">mdi-math-log</v-icon>
        <p class="text-grey-lighten-1 mt-4">暂无日志记录</p>
        <v-btn color="primary" size="small" @click="handleAddSampleLogs"> 添加示例日志 </v-btn>
      </div>
    </div>

    <!-- 底部快捷操作 -->
    <div class="log-panel-footer">
      <v-divider />
      <div class="pa-3">
        <div class="text-caption text-grey-lighten-1 mb-2">快捷键: 按 <kbd>L</kbd> 切换面板</div>
        <div class="d-flex ga-1">
          <v-btn size="x-small" color="success" @click="handleAddTestLog('info')"> Info </v-btn>
          <v-btn size="x-small" color="warning" @click="handleAddTestLog('warn')"> Warn </v-btn>
          <v-btn size="x-small" color="error" @click="handleAddTestLog('error')"> Error </v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>

  <!-- 日志详情对话框 -->
  <v-dialog v-model="showDetailDialog" max-width="800" class="log-detail-dialog">
    <v-card v-if="selectedLog">
      <v-card-title class="d-flex align-center">
        <v-icon :icon="getLogLevelIcon(selectedLog.level)" :color="getLogLevelColor(selectedLog.level)" class="mr-2" />
        日志详情
        <v-spacer />
        <v-btn icon="mdi-close" variant="text" size="small" @click="showDetailDialog = false" />
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="6">
            <strong>时间:</strong> {{ formatTimestamp(selectedLog.timestamp) }}
          </v-col>
          <v-col cols="6">
            <strong>级别:</strong>
            <v-chip :color="getLogLevelColor(selectedLog.level)" size="small">
              {{ selectedLog.level.toUpperCase() }}
            </v-chip>
          </v-col>
          <v-col cols="6" v-if="selectedLog.category">
            <strong>分类:</strong> {{ selectedLog.category }}
          </v-col>
          <v-col cols="6" v-if="selectedLog.source">
            <strong>来源:</strong> {{ selectedLog.source }}
          </v-col>
        </v-row>

        <v-divider class="my-4" />

        <div class="mb-4">
          <strong>消息:</strong>
          <v-card variant="outlined" class="mt-2">
            <v-card-text>{{ selectedLog.message }}</v-card-text>
          </v-card>
        </div>

        <div v-if="selectedLog.details" class="mb-4">
          <strong>详情:</strong>
          <v-card variant="outlined" class="mt-2">
            <v-card-text>
              <pre class="details-content">{{ formatLogDetails(selectedLog.details, false) }}</pre>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="selectedLog.stack" class="mb-4">
          <strong>堆栈跟踪:</strong>
          <v-card variant="outlined" class="mt-2">
            <v-card-text>
              <pre class="stack-content">{{ selectedLog.stack }}</pre>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="handleCopyLogMessage(JSON.stringify(selectedLog, null, 2))">
          复制完整日志
        </v-btn>
        <v-btn @click="showDetailDialog = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { useLogPanelStore } from './stores'
import {
  formatTimestamp,
  getLogLevelColor,
  getLogLevelIcon,
  generateTimestampedFilename,
  copyToClipboard,
  formatLogDetails,
  truncateText,
} from './utils'
import { LogLevel, type Props, type LogItem } from './types'

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
const logContainer = ref<HTMLElement>()

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
const handleExportLogs = async (format: 'json' | 'csv' | 'txt') => {
  const logs = displayLogs.value
  if (logs.length === 0) return

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
  document.body.style.paddingRight = '0px'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

// 滚动到底部
const scrollToBottom = () => {
  if (logContainer.value && props.autoScroll) {
    nextTick(() => {
      logContainer.value!.scrollTop = logContainer.value!.scrollHeight
    })
  }
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
    if (isOpen !== props.showPanel) {
      emit('update:showPanel', isOpen)
    }

    if (isOpen) {
      lockBodyScroll()
      scrollToBottom()
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

// 监听日志变化，自动滚动
watch(
  () => displayLogs.value.length,
  () => {
    if (props.autoScroll) {
      scrollToBottom()
    }
  },
)

onMounted(() => {
  // 清理函数
  const cleanup = () => {
    unlockBodyScroll()
  }

  onUnmounted(cleanup)

  // 添加一些示例日志
  handleAddSampleLogs()
})
</script>

<style scoped>
/* 日志面板抽屉样式 */
.log-panel-drawer {
  z-index: 2147483647 !important;
  position: fixed !important;
  top: 0 !important;
  right: 0 !important;
  height: 100vh !important;
}

/* 头部工具栏 */
.log-panel-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
}

/* 过滤器面板 */
.filter-panel {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
}

/* 日志统计 */
.log-stats {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
}

/* 日志列表容器 */
.log-list-container {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.log-list {
  padding: 0;
}

.log-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.log-item:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

.log-message {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.4;
  word-break: break-all;
}

.log-meta {
  margin-top: 4px;
}

.log-time {
  font-size: 0.75rem;
  color: #bbb;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
}

/* 底部操作区 */
.log-panel-footer {
  margin-top: auto;
  flex-shrink: 0;
}

kbd {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow:
    0 1px 0 rgba(0, 0, 0, 0.2),
    0 0 0 2px #fff inset;
  color: #333;
  display: inline-block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  line-height: 1.4;
  margin: 0 0.1em;
  padding: 0.1em 0.6em;
  text-shadow: 0 1px 0 #fff;
}

/* 日志详情对话框 */
.details-content,
.stack-content {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 300px;
  overflow-y: auto;
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

/* Drawer内部布局 */
:global(.log-panel-drawer .v-navigation-drawer__content) {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  overflow: hidden !important;
}
</style>