<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted } from 'vue'
import { useLogPanelStore } from './stores'
import {
  formatTimestamp,
  getLogLevelColor,
  getLogLevelIcon,
  formatLogMessage,
  formatLogDetails,
  truncateText,
  downloadJsonFile,
  downloadCsvFile,
  downloadTextFile,
  generateTimestampedFilename,
  copyToClipboard,
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

const logPanelStore = useLogPanelStore()

// 组件内部状态
const searchKeyword = ref('')
const showDetailDialog = ref(false)
const selectedLog = ref<LogItem | null>(null)
const logContainer = ref<HTMLElement>()
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

// 方法
const showLogDetail = (log: LogItem) => {
  selectedLog.value = log
  showDetailDialog.value = true
}

const clearLogs = () => {
  logPanelStore.clearLogs()
}

const exportLogs = async (format: 'json' | 'csv' | 'txt') => {
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

const copyLogMessage = async (message: string) => {
  const success = await copyToClipboard(message)
  // 这里可以添加提示消息
  console.log(success ? '复制成功' : '复制失败')
}

const applyFilters = () => {
  logPanelStore.setLevelFilter(tempLevelFilter.value)
  logPanelStore.setCategoryFilter(tempCategoryFilter.value)
  logPanelStore.setSourceFilter(tempSourceFilter.value)
  showFilterPanel.value = false
}

const clearFilters = () => {
  tempLevelFilter.value = []
  tempCategoryFilter.value = []
  tempSourceFilter.value = []
  logPanelStore.clearAllFilters()
  searchKeyword.value = ''
}

// 添加一些示例日志用于演示
const addSampleLogs = () => {
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

// 监听面板打开状态，自动滚动到底部
watch(
  () => logPanelStore.panelOpen,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        if (logContainer.value && props.autoScroll) {
          logContainer.value.scrollTop = logContainer.value.scrollHeight
        }
      })
    }
  },
)

// 监听日志变化，自动滚动
watch(
  () => displayLogs.value.length,
  () => {
    if (props.autoScroll && logContainer.value) {
      nextTick(() => {
        logContainer.value!.scrollTop = logContainer.value!.scrollHeight
      })
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
  // 添加一些示例日志
  addSampleLogs()
})
</script>

<template>
  <!-- 日志面板抽屉 -->
  <v-navigation-drawer
    v-model="logPanelStore.panelOpen"
    location="right"
    :width="width"
    temporary
    :color="color"
    dark
    :elevation="elevation"
    :style="{ zIndex: 99999 }"
    class="log-panel-drawer"
  >
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

      <!-- 工具按钮 -->
      <v-btn
        icon="mdi-filter-variant"
        variant="text"
        size="small"
        @click="showFilterPanel = !showFilterPanel"
        :color="logPanelStore.isFilterActive ? 'primary' : 'white'"
      >
        <v-icon>mdi-filter-variant</v-icon>
        <v-badge
          v-if="logPanelStore.activeFilterCount > 0"
          :content="logPanelStore.activeFilterCount"
          color="error"
          inline
        />
      </v-btn>

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
          <v-list-item @click="exportLogs('json')">
            <v-list-item-title>导出 JSON</v-list-item-title>
          </v-list-item>
          <v-list-item @click="exportLogs('csv')">
            <v-list-item-title>导出 CSV</v-list-item-title>
          </v-list-item>
          <v-list-item @click="exportLogs('txt')">
            <v-list-item-title>导出 TXT</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        icon="mdi-delete"
        variant="text"
        size="small"
        @click="clearLogs"
        :disabled="logPanelStore.logCount === 0"
      />

      <v-btn icon="mdi-close" variant="text" size="small" @click="logPanelStore.closePanel" />
    </v-app-bar>

    <!-- 过滤器面板 -->
    <v-expand-transition>
      <v-card v-show="showFilterPanel" flat color="grey-darken-3" class="filter-panel">
        <v-card-text>
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
            <v-label class="text-caption mb-1">日志级别</v-label>
            <v-chip-group v-model="tempLevelFilter" multiple selected-class="text-primary">
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

          <!-- 分类过滤 -->
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

          <!-- 来源过滤 -->
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
          <div class="d-flex gap-2">
            <v-btn size="small" color="primary" @click="applyFilters"> 应用过滤 </v-btn>
            <v-btn size="small" variant="outlined" @click="clearFilters"> 清空过滤 </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-expand-transition>

    <!-- 日志统计 -->
    <div class="log-stats px-4 py-2">
      <div class="d-flex gap-2">
        <v-chip
          v-for="level in logLevelOptions"
          :key="level.value"
          :color="level.color"
          size="x-small"
          variant="outlined"
        >
          <v-icon start :icon="getLogLevelIcon(level.value)" size="x-small" />
          {{ logPanelStore.logStats[level.value] }}
        </v-chip>
      </div>
    </div>

    <!-- 日志列表 -->
    <div ref="logContainer" class="log-list-container">
      <v-list v-if="displayLogs.length > 0" color="transparent" class="log-list">
        <v-list-item
          v-for="log in displayLogs"
          :key="log.id"
          class="log-item"
          @click="showLogDetail(log)"
        >
          <template v-slot:prepend>
            <v-icon
              :icon="getLogLevelIcon(log.level)"
              :color="getLogLevelColor(log.level)"
              size="small"
            />
          </template>

          <v-list-item-title class="log-message">
            {{ truncateText(log.message, 100) }}
          </v-list-item-title>

          <v-list-item-subtitle class="log-meta">
            <div class="d-flex align-center gap-2">
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
            <v-btn
              icon="mdi-content-copy"
              variant="text"
              size="x-small"
              @click.stop="copyLogMessage(log.message)"
            />
          </template>
        </v-list-item>
      </v-list>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <v-icon size="64" color="grey-lighten-1">mdi-math-log</v-icon>
        <p class="text-grey-lighten-1 mt-4">暂无日志记录</p>
        <v-btn color="primary" size="small" @click="addSampleLogs"> 添加示例日志 </v-btn>
      </div>
    </div>

    <!-- 底部快捷操作 -->
    <div class="log-panel-footer">
      <v-divider />
      <div class="px-4 py-2">
        <div class="text-caption text-grey-lighten-1 mb-2">快捷键: 按 <kbd>L</kbd> 切换面板</div>
        <div class="d-flex gap-1">
          <v-btn
            size="x-small"
            color="success"
            @click="logPanelStore.info('测试信息日志', { category: 'Test' })"
          >
            Info
          </v-btn>
          <v-btn
            size="x-small"
            color="warning"
            @click="logPanelStore.warn('测试警告日志', { category: 'Test' })"
          >
            Warn
          </v-btn>
          <v-btn
            size="x-small"
            color="error"
            @click="logPanelStore.error('测试错误日志', { category: 'Test' })"
          >
            Error
          </v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>

  <!-- 日志详情对话框 -->
  <v-dialog
    v-model="showDetailDialog"
    max-width="800"
    :style="{ zIndex: 999999 }"
    class="log-detail-dialog"
  >
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
        <v-btn color="primary" @click="copyLogMessage(JSON.stringify(selectedLog, null, 2))">
          复制完整日志
        </v-btn>
        <v-btn @click="showDetailDialog = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.log-panel-drawer {
  z-index: 99999 !important;
}

.log-detail-dialog {
  z-index: 999999 !important;
}

/* 确保对话框覆盖层也有足够高的层级 */
:deep(.v-dialog__content) {
  z-index: 999999 !important;
}

:deep(.v-overlay--active) {
  z-index: 999998 !important;
}

.log-panel-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.filter-panel {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.log-stats {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.log-list-container {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 240px);
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

.log-panel-footer {
  margin-top: auto;
}

.details-content,
.stack-content {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 300px;
  overflow-y: auto;
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
</style>
