<template>
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
        {{ logStats[level.value] }}
      </v-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLogLevelIcon } from '../utils'
import type { LogLevel } from '../types'

interface LogLevelOption {
  value: LogLevel
  title: string
  color: string
}

interface LogStats {
  [LogLevel.DEBUG]: number
  [LogLevel.INFO]: number
  [LogLevel.WARN]: number
  [LogLevel.ERROR]: number
}

interface Props {
  logLevelOptions: LogLevelOption[]
  logStats: LogStats
}

defineProps<Props>()
</script>

<style scoped>
.log-stats {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
