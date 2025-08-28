/**
 * LogPanel Stores 主模块
 * 简化版本，组合各功能模块
 */

import { defineStore } from 'pinia'
import { computed, watch } from 'vue'
import { useLogPanel } from './useLogPanel'
import { useLogStore } from './useLogStore'
import { useLogFilter } from './useLogFilter'

// 主 Store - 组合各个功能模块
export const useLogPanelStore = defineStore('logPanel', () => {
  // 组合各个功能模块
  const panel = useLogPanel()
  const logStore = useLogStore()
  const logFilter = useLogFilter()

  // === 键盘快捷键处理 ===
  let keyboardListenerAdded = false

  const setupKeyboardShortcut = () => {
    if (keyboardListenerAdded) return

    const handleKeyPress = (event: KeyboardEvent) => {
      // 检查是否按下了L键（不区分大小写）
      if (event.key.toLowerCase() === 'l' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        // 确保焦点不在输入框上
        const activeElement = document.activeElement
        if (
          activeElement &&
          (activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            (activeElement as HTMLElement).contentEditable === 'true')
        ) {
          return
        }

        event.preventDefault()
        togglePanel()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    keyboardListenerAdded = true
  }

  // === 综合功能方法 ===

  /**
   * 切换面板显示状态
   */
  const togglePanel = () => {
    panel.togglePanel()

    // 面板打开时更新过滤器选项
    if (panel.isPanelOpen.value) {
      logFilter.updateAvailableOptions(logStore.logs.value)
    }
  }

  /**
   * 打开面板
   */
  const openPanel = () => {
    panel.openPanel()
    logFilter.updateAvailableOptions(logStore.logs.value)
  }

  /**
   * 关闭面板
   */
  const closePanel = () => {
    panel.closePanel()
  }

  // === 过滤后的日志 ===
  const filteredLogs = computed(() => {
    return logFilter.applyFilter(logStore.logs.value)
  })

  // === 监听日志变化，自动更新过滤器选项 ===
  watch(
    () => logStore.logs.value,
    (newLogs) => {
      logFilter.updateAvailableOptions(newLogs)
    },
    { deep: true },
  )

  // === 便捷的日志记录方法 ===
  const log = {
    debug: logStore.debug,
    info: logStore.info,
    warn: logStore.warn,
    error: logStore.error,
    add: logStore.addLog,
  }

  // 初始化键盘监听
  setupKeyboardShortcut()

  return {
    // 面板状态和方法
    ...panel,

    // 日志存储和方法
    ...logStore,

    // 过滤器状态和方法
    ...logFilter,

    // 组合方法
    togglePanel,
    openPanel,
    closePanel,

    // 便捷访问
    log,
    filteredLogs,

    // 键盘快捷键设置
    setupKeyboardShortcut,
  }
})

// 导出各个功能模块 Composables（可按需使用）
export { useLogPanel } from './useLogPanel'
export { useLogStore } from './useLogStore'
export { useLogFilter } from './useLogFilter'
