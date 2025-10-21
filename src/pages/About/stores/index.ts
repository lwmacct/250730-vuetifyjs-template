/**
 * About 页面专用状态管理
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TechStackItem } from '../types'

/**
 * About 页面 Store
 * 管理关于页面的技术栈信息和状态
 */
export const useAboutStore = defineStore('about', () => {
  // === 状态 ===
  const techStack = ref<TechStackItem[]>([
    {
      id: '1',
      icon: 'mdi-vuejs',
      title: 'Vue 3',
      subtitle: '渐进式 JavaScript 框架',
    },
    {
      id: '2',
      icon: 'mdi-vuetify',
      title: 'Vuetify 3',
      subtitle: 'Material Design 组件库',
    },
    {
      id: '3',
      icon: 'mdi-router',
      title: 'Vue Router 4',
      subtitle: '官方路由管理器',
    },
    {
      id: '4',
      icon: 'mdi-language-typescript',
      title: 'TypeScript',
      subtitle: '类型安全的 JavaScript',
    },
  ])

  // === 计算属性 ===
  const techStackCount = computed(() => techStack.value.length)

  return {
    // 状态
    techStack: computed(() => techStack.value),

    // 计算属性
    techStackCount,
  }
})
