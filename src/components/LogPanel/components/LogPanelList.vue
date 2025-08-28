<template>
  <!-- 日志列表 -->
  <div ref="logContainer" class="log-list-container">
    <v-list v-if="displayLogs.length > 0" color="transparent" class="log-list">
      <v-list-item v-for="log in displayLogs" :key="log.id" class="log-item" @click="$emit('showLogDetail', log)">
        <template v-slot:prepend>
          <v-icon :icon="getLogLevelIcon(log.level)" :color="getLogLevelColor(log.level)" size="small" />
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
          <v-btn icon="mdi-content-copy" variant="text" size="x-small"
            @click.stop="$emit('copyLogMessage', log.message)" />
        </template>
      </v-list-item>
    </v-list>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <v-icon size="64" color="grey-lighten-1">mdi-math-log</v-icon>
      <p class="text-grey-lighten-1 mt-4">暂无日志记录</p>
      <v-btn color="primary" size="small" @click="$emit('addSampleLogs')"> 添加示例日志 </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { formatTimestamp, getLogLevelColor, getLogLevelIcon, truncateText } from '../utils'
import type { LogItem } from '../types'

interface Props {
  displayLogs: LogItem[]
  autoScroll: boolean
}

interface Emits {
  showLogDetail: [log: LogItem]
  copyLogMessage: [message: string]
  addSampleLogs: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const logContainer = ref<HTMLElement>()

// 向外暴露 scrollToBottom 方法
const scrollToBottom = () => {
  if (logContainer.value && props.autoScroll) {
    logContainer.value.scrollTop = logContainer.value.scrollHeight
  }
}

// 监听日志变化，自动滚动
watch(
  () => props.displayLogs.length,
  () => {
    if (props.autoScroll && logContainer.value) {
      nextTick(() => {
        scrollToBottom()
      })
    }
  },
)

// 向父组件暴露滚动方法和容器引用
defineExpose({
  scrollToBottom,
  logContainer,
})
</script>

<style scoped>
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
</style>
