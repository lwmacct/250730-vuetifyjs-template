/**
 * MetaDemo 页面专用状态管理
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { MetaFieldItem } from '../types'

/**
 * MetaDemo 页面 Store
 * 管理Meta演示页面的字段信息和状态
 */
export const useMetaDemoStore = defineStore('metaDemo', () => {
  // === 状态 ===
  const metaFields = ref<MetaFieldItem[]>([
    {
      id: '1',
      name: 'title',
      description: '页面标题',
      icon: 'mdi-format-title',
      color: 'primary',
    },
    {
      id: '2',
      name: 'icon',
      description: '页面图标',
      icon: 'mdi-icon',
      color: 'secondary',
    },
    {
      id: '3',
      name: 'description',
      description: '页面描述',
      icon: 'mdi-text',
      color: 'success',
    },
    {
      id: '4',
      name: 'keywords',
      description: '关键词数组',
      icon: 'mdi-tag',
      color: 'warning',
    },
    {
      id: '5',
      name: 'category',
      description: '页面分类',
      icon: 'mdi-folder',
      color: 'info',
    },
    {
      id: '6',
      name: 'priority',
      description: '优先级',
      icon: 'mdi-priority-high',
      color: 'error',
    },
    {
      id: '7',
      name: 'showInMenu',
      description: '是否在菜单中显示',
      icon: 'mdi-menu',
      color: 'warning',
    },
    {
      id: '8',
      name: 'requireAuth',
      description: '是否需要认证',
      icon: 'mdi-shield',
      color: 'success',
    },
  ])

  // === 计算属性 ===
  const metaFieldCount = computed(() => metaFields.value.length)

  const basicFields = computed(() => metaFields.value.slice(0, 4))
  const advancedFields = computed(() => metaFields.value.slice(4))

  return {
    // 状态
    metaFields: computed(() => metaFields.value),

    // 计算属性
    metaFieldCount,
    basicFields,
    advancedFields,
  }
})
