<template>
  <!-- 头部工具栏 -->
  <v-app-bar color="transparent" flat density="compact" class="log-panel-header">
    <v-app-bar-title class="text-h6">
      <v-icon class="mr-2">mdi-math-log</v-icon>
      日志面板
      <v-chip v-if="displayLogsCount > 0" size="small" color="primary" class="ml-2">
        {{ displayLogsCount }}
      </v-chip>
    </v-app-bar-title>

    <v-spacer />

    <!-- 工具按钮组 -->
    <div class="d-flex align-center">
      <!-- 过滤按钮 -->
      <v-btn
        variant="text"
        size="small"
        @click="$emit('toggleFilter')"
        :color="isFilterActive ? 'primary' : 'white'"
        class="mr-1"
      >
        <v-badge v-if="activeFilterCount > 0" :content="activeFilterCount" color="error" inline>
          <v-icon>mdi-filter-variant</v-icon>
        </v-badge>
        <v-icon v-else>mdi-filter-variant</v-icon>
      </v-btn>

      <!-- 导出按钮菜单 -->
      <v-menu>
        <template v-slot:activator="{ props: menuProps }">
          <v-btn
            icon="mdi-export"
            variant="text"
            size="small"
            v-bind="menuProps"
            :disabled="displayLogsCount === 0"
            class="mr-1"
          />
        </template>
        <v-list>
          <v-list-item @click="$emit('exportLogs', 'json')">
            <v-list-item-title>导出 JSON</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$emit('exportLogs', 'csv')">
            <v-list-item-title>导出 CSV</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$emit('exportLogs', 'txt')">
            <v-list-item-title>导出 TXT</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- 清空按钮 -->
      <v-btn
        icon="mdi-delete"
        variant="text"
        size="small"
        @click="$emit('clearLogs')"
        :disabled="logCount === 0"
        class="mr-1"
      />

      <!-- 关闭按钮 -->
      <v-btn icon="mdi-close" variant="text" size="small" @click="$emit('closePanel')" />
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
interface Props {
  displayLogsCount: number
  isFilterActive: boolean
  activeFilterCount: number
  logCount: number
}

interface Emits {
  toggleFilter: []
  exportLogs: [format: 'json' | 'csv' | 'txt']
  clearLogs: []
  closePanel: []
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.log-panel-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

/* 工具按钮组样式优化 */
.d-flex.align-center {
  gap: 2px;
  /* 按钮间距 */
  flex-wrap: nowrap;
  /* 防止换行 */
}

/* 确保按钮在窄宽度下不会变形 */
.v-btn--size-small {
  min-width: 32px !important;
  width: 32px;
  height: 32px;
}

/* 优化badge显示 */
.v-badge {
  line-height: 1;
}
</style>
