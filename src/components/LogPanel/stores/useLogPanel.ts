/**
 * 日志面板状态管理 Composable
 */

import { ref, computed } from 'vue'
import type { LogPanelConfig } from '../types'

export function useLogPanel() {
  // === 状态 ===
  const panelOpen = ref(false)
  const panelConfig = ref<LogPanelConfig>({
    width: 400,
    temporary: true,
    color: 'grey-darken-4',
    dark: true,
    maxLogs: 1000,
    autoScroll: true,
    showTimestamp: true,
    showCategory: true,
    showSource: true,
  })

  // === 计算属性 ===
  const isPanelOpen = computed(() => panelOpen.value)

  // === 面板操作方法 ===
  const togglePanel = () => {
    panelOpen.value = !panelOpen.value
  }

  const openPanel = () => {
    panelOpen.value = true
  }

  const closePanel = () => {
    panelOpen.value = false
  }

  // === 配置更新方法 ===
  const updatePanelConfig = (config: Partial<LogPanelConfig>) => {
    panelConfig.value = { ...panelConfig.value, ...config }
  }

  return {
    // 状态
    panelOpen: computed(() => panelOpen.value),
    panelConfig: computed(() => panelConfig.value),

    // 计算属性
    isPanelOpen,

    // 方法
    togglePanel,
    openPanel,
    closePanel,
    updatePanelConfig,
  }
}
