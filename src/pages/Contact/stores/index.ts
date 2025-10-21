/**
 * Contact 页面专用状态管理
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ContactItem } from '../types'

/**
 * Contact 页面 Store
 * 管理联系页面的联系信息和状态
 */
export const useContactStore = defineStore('contact', () => {
  // === 状态 ===
  const contacts = ref<ContactItem[]>([
    {
      id: '1',
      icon: 'mdi-email',
      title: '邮箱',
      subtitle: 'contact@example.com',
    },
    {
      id: '2',
      icon: 'mdi-phone',
      title: '电话',
      subtitle: '+86 123 4567 8900',
    },
    {
      id: '3',
      icon: 'mdi-map-marker',
      title: '地址',
      subtitle: '北京市朝阳区某某街道123号',
    },
    {
      id: '4',
      icon: 'mdi-clock',
      title: '工作时间',
      subtitle: '周一至周五 9:00-18:00',
    },
  ])

  // === 计算属性 ===
  const contactCount = computed(() => contacts.value.length)

  return {
    // 状态
    contacts: computed(() => contacts.value),

    // 计算属性
    contactCount,
  }
})
