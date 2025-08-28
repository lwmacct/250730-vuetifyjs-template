<template>
  <!-- 过滤器面板 -->
  <div v-show="showFilterPanel" class="filter-panel">
    <v-card flat color="grey-darken-3">
      <v-card-text>
        <!-- 搜索框 -->
        <v-text-field :model-value="searchKeyword" @update:model-value="$emit('update:searchKeyword', $event)"
          label="搜索关键词" prepend-inner-icon="mdi-magnify" variant="outlined" density="compact" clearable hide-details
          class="mb-3" />

        <!-- 级别过滤 -->
        <div class="mb-3">
          <v-label class="text-caption mb-1">日志级别</v-label>
          <v-chip-group :model-value="tempLevelFilter" @update:model-value="$emit('update:tempLevelFilter', $event)"
            multiple selected-class="text-primary">
            <v-chip v-for="level in logLevelOptions" :key="level.value" :value="level.value" :color="level.color"
              size="small" variant="outlined">
              <v-icon start :icon="getLogLevelIcon(level.value)" size="small" />
              {{ level.title }}
            </v-chip>
          </v-chip-group>
        </div>

        <!-- 分类过滤 -->
        <v-select v-if="availableCategories.length > 0" :model-value="tempCategoryFilter"
          @update:model-value="$emit('update:tempCategoryFilter', $event)" :items="availableCategories" label="分类"
          multiple variant="outlined" density="compact" hide-details class="mb-3" />

        <!-- 来源过滤 -->
        <v-select v-if="availableSources.length > 0" :model-value="tempSourceFilter"
          @update:model-value="$emit('update:tempSourceFilter', $event)" :items="availableSources" label="来源" multiple
          variant="outlined" density="compact" hide-details class="mb-3" />

        <!-- 过滤器操作按钮 -->
        <div class="d-flex gap-2">
          <v-btn size="small" color="primary" @click="$emit('applyFilters')"> 应用过滤 </v-btn>
          <v-btn size="small" variant="outlined" @click="$emit('clearFilters')"> 清空过滤 </v-btn>
        </div>
      </v-card-text>
    </v-card>
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

interface Props {
  showFilterPanel: boolean
  searchKeyword: string
  tempLevelFilter: LogLevel[]
  tempCategoryFilter: string[]
  tempSourceFilter: string[]
  logLevelOptions: LogLevelOption[]
  availableCategories: string[]
  availableSources: string[]
}

interface Emits {
  'update:searchKeyword': [value: string]
  'update:tempLevelFilter': [value: LogLevel[]]
  'update:tempCategoryFilter': [value: string[]]
  'update:tempSourceFilter': [value: string[]]
  applyFilters: []
  clearFilters: []
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.filter-panel {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
}

/* 确保过滤面板内容不会脱离正常文档流 */
.filter-panel .v-card {
  position: relative;
}
</style>
