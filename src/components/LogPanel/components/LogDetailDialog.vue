<template>
  <!-- 日志详情对话框 -->
  <v-dialog
    :model-value="showDetailDialog"
    @update:model-value="$emit('update:showDetailDialog', $event)"
    max-width="800"
    :style="{ zIndex: 2147483647 }"
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
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="$emit('update:showDetailDialog', false)"
        />
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
        <v-btn
          color="primary"
          @click="$emit('copyLogMessage', JSON.stringify(selectedLog, null, 2))"
        >
          复制完整日志
        </v-btn>
        <v-btn @click="$emit('update:showDetailDialog', false)">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { formatTimestamp, getLogLevelColor, getLogLevelIcon, formatLogDetails } from '../utils'
import type { LogItem } from '../types'

interface Props {
  showDetailDialog: boolean
  selectedLog: LogItem | null
}

interface Emits {
  'update:showDetailDialog': [value: boolean]
  copyLogMessage: [message: string]
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
:global(.log-detail-dialog) {
  z-index: 2147483647 !important;
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
</style>
