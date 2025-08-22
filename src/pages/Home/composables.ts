/**
 * Home 页面的组合式函数
 * 用于处理页面特定的逻辑和状态
 */

import { ref, computed } from 'vue'
import type { FeatureItem, HeaderAction } from './types'

/**
 * 首页数据管理
 */
export function useHomeData() {
  // 功能特性数据
  const features = ref<FeatureItem[]>([
    {
      id: 'responsive',
      title: '响应式设计',
      icon: 'mdi-devices',
      description: ['适配各种设备尺寸', '流畅的移动端体验'],
      color: 'success'
    },
    {
      id: 'modern',
      title: '现代化 UI',
      icon: 'mdi-palette',
      description: ['Material Design 3', '美观的视觉设计'],
      color: 'info'
    },
    {
      id: 'typescript',
      title: '类型安全',
      icon: 'mdi-shield-check',
      description: ['TypeScript 支持', '编译时错误检查'],
      color: 'warning'
    },
    {
      id: 'component',
      title: '组件化架构',
      icon: 'mdi-view-module',
      description: ['可复用组件', '模块化设计'],
      color: 'error'
    }
  ])

  // 技术栈数据
  const techStack = ref<FeatureItem[]>([
    {
      id: 'vue3',
      title: 'Vue 3 Composition API',
      icon: 'mdi-vuejs',
      description: ['最新的 Vue 3 特性', '组合式 API'],
      color: 'success'
    },
    {
      id: 'vuetify',
      title: 'Vuetify 3',
      icon: 'mdi-material-design',
      description: ['Material Design', '丰富的组件库'],
      color: 'info'
    },
    {
      id: 'ts',
      title: 'TypeScript',
      icon: 'mdi-language-typescript',
      description: ['类型安全', '更好的开发体验'],
      color: 'primary'
    },
    {
      id: 'router',
      title: 'Vue Router 4',
      icon: 'mdi-router',
      description: ['现代化路由', '动态路由管理'],
      color: 'secondary'
    }
  ])

  // 头部操作按钮
  const headerActions = computed<HeaderAction[]>(() => [
    {
      icon: 'mdi-bell',
      text: '通知',
      color: 'warning',
      variant: 'text',
      onClick: () => {
        console.log('通知按钮点击')
        // TODO: 实现通知功能
      }
    },
    {
      icon: 'mdi-account',
      text: '用户',
      color: 'info',
      variant: 'text',
      onClick: () => {
        console.log('用户按钮点击')
        // TODO: 跳转到用户中心
      }
    }
  ])

  return {
    features: computed(() => features.value),
    techStack: computed(() => techStack.value),
    headerActions
  }
}

/**
 * 首页统计数据
 */
export function useHomeStats() {
  const visitCount = ref(0)
  const lastVisitTime = ref<Date | null>(null)

  // 模拟访问统计
  const updateVisitStats = () => {
    visitCount.value++
    lastVisitTime.value = new Date()
  }

  // 格式化访问时间
  const formattedLastVisit = computed(() => {
    if (!lastVisitTime.value) return '首次访问'
    return lastVisitTime.value.toLocaleString('zh-CN')
  })

  return {
    visitCount: computed(() => visitCount.value),
    lastVisitTime: computed(() => lastVisitTime.value),
    formattedLastVisit,
    updateVisitStats
  }
}
