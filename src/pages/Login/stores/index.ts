/**
 * Login 页面专用状态管理
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LoginForm, LoginResponse } from '../types'

/**
 * Login 页面 Store
 * 管理登录状态和用户信息
 */
export const useLoginStore = defineStore('login', () => {
  // === 状态 ===
  const isLoading = ref(false)
  const errorMessage = ref('')
  const loginForm = ref<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  })

  // === 计算属性 ===
  const isFormValid = computed(() => {
    return loginForm.value.email.length > 0 && loginForm.value.password.length > 0
  })

  // === 方法 ===
  const login = async (form: LoginForm): Promise<LoginResponse> => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      // 模拟登录请求
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 这里应该调用实际的登录 API
      const response: LoginResponse = {
        success: true,
        token: 'mock-token-' + Date.now(),
        user: {
          id: '1',
          email: form.email,
          name: '用户',
        },
      }

      if (form.rememberMe) {
        // 保存登录信息到 localStorage
        localStorage.setItem('login-token', response.token || '')
      }

      return response
    } catch (error) {
      errorMessage.value = '登录失败，请重试'
      return {
        success: false,
        message: errorMessage.value,
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    localStorage.removeItem('login-token')
    loginForm.value = {
      email: '',
      password: '',
      rememberMe: false,
    }
  }

  return {
    // 状态
    isLoading: computed(() => isLoading.value),
    errorMessage: computed(() => errorMessage.value),
    loginForm: computed(() => loginForm.value),

    // 计算属性
    isFormValid,

    // 方法
    login,
    logout,
  }
})
