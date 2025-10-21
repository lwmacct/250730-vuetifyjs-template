/**
 * 全局路由加载进度条 Store
 * 用于控制顶部线性进度条的显示和进度
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * 路由加载进度条 Store
 */
export const useLoadingBar = defineStore('loadingBar', () => {
  // === 状态 ===
  const isLoading = ref(false)
  const progress = ref(0)
  const color = ref('primary')

  // 定时器引用
  let progressTimer: ReturnType<typeof setInterval> | null = null
  let completeTimer: ReturnType<typeof setTimeout> | null = null

  // === 计算属性 ===
  const isVisible = computed(() => isLoading.value)

  // === 方法 ===

  /**
   * 开始加载
   */
  const start = () => {
    // 清除之前的定时器
    if (progressTimer) clearInterval(progressTimer)
    if (completeTimer) clearTimeout(completeTimer)

    isLoading.value = true
    progress.value = 0
    color.value = 'primary'

    // 模拟进度增长
    progressTimer = setInterval(() => {
      if (progress.value < 90) {
        // 进度条到 90% 后减慢速度
        const increment = Math.random() * 10 + 5
        progress.value = Math.min(progress.value + increment, 90)
      }
    }, 200)
  }

  /**
   * 完成加载
   */
  const finish = () => {
    if (progressTimer) {
      clearInterval(progressTimer)
      progressTimer = null
    }

    // 快速完成到 100%
    progress.value = 100

    // 延迟隐藏，让用户看到完成动画
    completeTimer = setTimeout(() => {
      isLoading.value = false
      progress.value = 0
    }, 300)
  }

  /**
   * 加载失败
   */
  const fail = () => {
    if (progressTimer) {
      clearInterval(progressTimer)
      progressTimer = null
    }

    color.value = 'error'
    progress.value = 100

    // 延迟隐藏
    completeTimer = setTimeout(() => {
      isLoading.value = false
      progress.value = 0
      color.value = 'primary'
    }, 500)
  }

  /**
   * 重置进度条
   */
  const reset = () => {
    if (progressTimer) clearInterval(progressTimer)
    if (completeTimer) clearTimeout(completeTimer)

    isLoading.value = false
    progress.value = 0
    color.value = 'primary'
  }

  return {
    // 状态
    isLoading: computed(() => isLoading.value),
    progress: computed(() => progress.value),
    color: computed(() => color.value),

    // 计算属性
    isVisible,

    // 方法
    start,
    finish,
    fail,
    reset,
  }
})
