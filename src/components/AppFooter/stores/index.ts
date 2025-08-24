/**
 * AppFooter 组件专用状态管理
 * 管理页脚的配置和行为状态
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { FooterConfig, FooterLink } from '../types'

/**
 * AppFooter 组件 Store
 * 管理页脚的配置信息和状态
 */
export const useAppFooterStore = defineStore('appFooter', () => {
  // === 状态 ===
  const config = ref<FooterConfig>({
    defaultText: '© 2024 Vue + Vuetify 演示应用',
    defaultLinks: [
      {
        href: 'https://vuejs.org/',
        text: 'Vue.js',
        target: '_blank',
      },
      {
        href: 'https://vuetifyjs.com/',
        text: 'Vuetify',
        target: '_blank',
      },
    ],
    defaultHeight: 48,
  })

  const customConfig = ref<Partial<FooterConfig>>({})

  // === 计算属性 ===
  const finalConfig = computed(() => ({
    ...config.value,
    ...customConfig.value,
  }))

  const footerText = computed(() => finalConfig.value.defaultText)

  const footerLinks = computed(() => finalConfig.value.defaultLinks)

  // === 方法 ===
  const updateConfig = (newConfig: Partial<FooterConfig>) => {
    customConfig.value = { ...customConfig.value, ...newConfig }
  }

  const resetConfig = () => {
    customConfig.value = {}
  }

  const addLink = (link: FooterLink) => {
    const currentLinks = [...finalConfig.value.defaultLinks]
    currentLinks.push(link)
    updateConfig({ defaultLinks: currentLinks })
  }

  const removeLink = (href: string) => {
    const currentLinks = finalConfig.value.defaultLinks.filter((link) => link.href !== href)
    updateConfig({ defaultLinks: currentLinks })
  }

  return {
    // 状态
    config: computed(() => config.value),
    customConfig: computed(() => customConfig.value),

    // 计算属性
    finalConfig,
    footerText,
    footerLinks,

    // 方法
    updateConfig,
    resetConfig,
    addLink,
    removeLink,
  }
})
