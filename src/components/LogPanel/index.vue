<template>
  <!-- 简洁版日志面板 -->
  <Teleport to="body">
    <v-navigation-drawer
      v-model="logPanelStore.panelOpen"
      location="right"
      :width="width"
      :color="color"
      :elevation="elevation"
      class="log-drawer"
      permanent
      :rail="!logPanelStore.panelOpen"
      rail-width="0"
      hide-overlay
      disable-route-watcher
    >
      <!-- 内容区域 -->
      <div class="log-content">
        <!-- 头部 -->
        <div class="log-header">
          <div class="header-title">
            <v-icon class="mr-2">mdi-math-log</v-icon>
            日志面板
            <v-chip v-if="displayLogs.length > 0" size="small" color="primary" class="ml-2">
              {{ displayLogs.length }}
            </v-chip>
          </div>

          <!-- 操作按钮 -->
          <div class="header-actions">
            <v-btn
              icon="mdi-filter-variant"
              variant="text"
              size="small"
              @click="showFilterPanel = !showFilterPanel"
              :color="logPanelStore.isFilterActive ? 'primary' : 'default'"
            />

            <v-menu>
              <template v-slot:activator="{ props: menuProps }">
                <v-btn
                  icon="mdi-export"
                  variant="text"
                  size="small"
                  v-bind="menuProps"
                  :disabled="displayLogs.length === 0"
                />
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

            <v-btn
              icon="mdi-delete"
              variant="text"
              size="small"
              @click="handleClearLogs"
              :disabled="logPanelStore.logCount === 0"
            />

            <v-btn icon="mdi-close" variant="text" size="small" @click="handleClosePanel" />
          </div>
        </div>

        <!-- 过滤器面板 -->
        <v-expand-transition>
          <div v-show="showFilterPanel" class="filter-section">
            <!-- 搜索框 -->
            <v-text-field
              v-model="searchKeyword"
              label="搜索关键词"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              clearable
              hide-details
              class="mb-3"
            />

            <!-- 级别过滤 -->
            <div class="mb-3">
              <div class="text-caption mb-2">日志级别</div>
              <v-chip-group v-model="tempLevelFilter" multiple>
                <v-chip
                  v-for="level in logLevelOptions"
                  :key="level.value"
                  :value="level.value"
                  :color="level.color"
                  size="small"
                  variant="outlined"
                >
                  <v-icon start :icon="getLogLevelIcon(level.value)" size="small" />
                  {{ level.title }}
                </v-chip>
              </v-chip-group>
            </div>

            <!-- 分类和来源过滤 -->
            <v-select
              v-if="logPanelStore.availableCategories.length > 0"
              v-model="tempCategoryFilter"
              :items="logPanelStore.availableCategories"
              label="分类"
              multiple
              variant="outlined"
              density="compact"
              hide-details
              class="mb-3"
            />

            <v-select
              v-if="logPanelStore.availableSources.length > 0"
              v-model="tempSourceFilter"
              :items="logPanelStore.availableSources"
              label="来源"
              multiple
              variant="outlined"
              density="compact"
              hide-details
              class="mb-3"
            />

            <!-- 过滤器操作按钮 -->
            <div class="filter-actions">
              <v-btn size="small" color="primary" @click="handleApplyFilters"> 应用过滤 </v-btn>
              <v-btn size="small" variant="outlined" @click="handleClearFilters"> 清空过滤 </v-btn>
            </div>
          </div>
        </v-expand-transition>

        <!-- 日志统计 -->
        <div class="stats-section">
          <v-chip
            v-for="level in logLevelOptions"
            :key="level.value"
            :color="level.color"
            size="x-small"
            variant="outlined"
            class="mr-1"
          >
            <v-icon start :icon="getLogLevelIcon(level.value)" size="x-small" />
            {{ logPanelStore.logStats[level.value] }}
          </v-chip>
        </div>

        <!-- 日志列表 -->
        <div class="logs-section">
          <div v-if="displayLogs.length > 0" class="logs-list">
            <div
              v-for="log in displayLogs"
              :key="log.id"
              class="log-item"
              @click="handleShowLogDetail(log)"
            >
              <div class="log-icon">
                <v-icon
                  :icon="getLogLevelIcon(log.level)"
                  :color="getLogLevelColor(log.level)"
                  size="small"
                />
              </div>
              <div class="log-content-text">
                <div class="log-message">{{ truncateText(log.message, 100) }}</div>
                <div class="log-meta">
                  <span class="log-time">{{ formatTimestamp(log.timestamp, 'time') }}</span>
                  <v-chip
                    v-if="log.category"
                    size="x-small"
                    variant="outlined"
                    color="blue-grey"
                    class="ml-1"
                  >
                    {{ log.category }}
                  </v-chip>
                  <v-chip
                    v-if="log.source"
                    size="x-small"
                    variant="outlined"
                    color="blue-grey"
                    class="ml-1"
                  >
                    {{ log.source }}
                  </v-chip>
                </div>
              </div>
              <div class="log-actions">
                <v-btn
                  icon="mdi-content-copy"
                  variant="text"
                  size="x-small"
                  @click.stop="handleCopyLogMessage(log.message)"
                />
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-else class="empty-state">
            <v-icon size="64" color="grey-lighten-1">mdi-math-log</v-icon>
            <p class="text-grey-lighten-1 mt-4">暂无日志记录</p>
            <v-btn color="primary" size="small" @click="handleAddSampleLogs"> 添加示例日志 </v-btn>
          </div>
        </div>

        <!-- 底部操作 -->
        <div class="footer-section">
          <div class="text-caption text-grey-lighten-1 mb-2">快捷键: 按 <kbd>L</kbd> 切换面板</div>
          <div class="footer-actions">
            <v-btn size="x-small" color="success" @click="handleAddTestLog('info')">Info</v-btn>
            <v-btn size="x-small" color="warning" @click="handleAddTestLog('warn')">Warn</v-btn>
            <v-btn size="x-small" color="error" @click="handleAddTestLog('error')">Error</v-btn>
          </div>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- 日志详情对话框 -->
    <v-dialog v-model="showDetailDialog" max-width="800">
      <v-card v-if="selectedLog">
        <v-card-title class="d-flex align-center">
          <v-icon
            :icon="getLogLevelIcon(selectedLog.level)"
            :color="getLogLevelColor(selectedLog.level)"
            class="mr-2"
          />
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
                <pre class="details-content">{{
                  formatLogDetails(selectedLog.details, false)
                }}</pre>
              </v-card-text>
            </v-card>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="handleCopyLogMessage(JSON.stringify(selectedLog, null, 2))"
          >
            复制完整日志
          </v-btn>
          <v-btn @click="showDetailDialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
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
</script>

<style scoped>
/* 日志抽屉 - Teleport到body后的样式 */
.log-drawer {
  z-index: 2147483647 !important;
  position: fixed !important;
  top: 0 !important;
  right: 0 !important;
  height: 100vh !important;
}

.log-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* 头部 */
.log-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
}

.header-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 过滤器区域 */
.filter-section {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
}

.filter-actions {
  display: flex;
  gap: 8px;
}

/* 统计区域 */
.stats-section {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
}

/* 日志区域 */
.logs-section {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.logs-list {
  padding: 8px 0;
}

.log-item {
  display: flex;
  align-items: flex-start;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.log-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.log-icon {
  margin-right: 12px;
  margin-top: 2px;
  flex-shrink: 0;
}

.log-content-text {
  flex: 1;
  min-width: 0;
}

.log-message {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.4;
  word-break: break-all;
  margin-bottom: 4px;
}

.log-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.log-time {
  font-size: 0.75rem;
  color: #999;
}

.log-actions {
  margin-left: 8px;
  flex-shrink: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  text-align: center;
}

/* 底部区域 */
.footer-section {
  padding: 12px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
}

.footer-actions {
  display: flex;
  gap: 8px;
}

kbd {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: #333;
  display: inline-block;
  font-size: 11px;
  line-height: 1.4;
  margin: 0 0.1em;
  padding: 0.1em 0.6em;
}

/* 详情内容样式 */
.details-content {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 300px;
  overflow-y: auto;
}

/* 对话框确保在最顶层 */
:global(.v-dialog) {
  z-index: 2147483648 !important;
}
</style>
