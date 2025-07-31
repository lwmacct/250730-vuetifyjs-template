<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
import AppFooter from '@/components/AppFooter.vue'
import { ref } from 'vue'

// 响应式数据
const notificationCount = ref(3)
const userStatus = ref('在线')
const isSettingsOpen = ref(false)

// 定义自定义内容组件
const CustomHeaderContent = {
  template: `
    <div class="d-flex align-center">
      <!-- 通知按钮 -->
      <v-btn 
        icon="mdi-bell" 
        variant="text" 
        color="warning" 
        class="mr-2"
        @click="handleNotification"
      >
        <v-badge :content="notificationCount" color="error" offset-x="8" offset-y="-8">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
        <v-tooltip activator="parent" location="bottom">
          通知 ({{ notificationCount }})
        </v-tooltip>
      </v-btn>
      
      <!-- 用户按钮 -->
      <v-btn 
        icon="mdi-account" 
        variant="text" 
        color="info" 
        class="mr-2"
        @click="handleUser"
      >
        <v-icon>mdi-account</v-icon>
        <v-tooltip activator="parent" location="bottom">
          用户管理
        </v-tooltip>
      </v-btn>
      
      <!-- 分割线 -->
      <v-divider vertical class="mx-2" color="white"></v-divider>
      
      <!-- 用户状态芯片 -->
      <v-chip 
        color="success" 
        variant="outlined" 
        size="small"
        class="mr-2"
        @click="handleUserStatus"
      >
        <v-icon start>mdi-account-circle</v-icon>
        {{ userStatus }}
        <v-tooltip activator="parent" location="bottom">
          点击切换状态
        </v-tooltip>
      </v-chip>
      
      <!-- 设置按钮 -->
      <v-btn 
        icon="mdi-cog" 
        variant="text" 
        color="white"
        @click="handleSettings"
      >
        <v-icon>mdi-cog</v-icon>
        <v-tooltip activator="parent" location="bottom">
          系统设置
        </v-tooltip>
      </v-btn>
    </div>
  `,
  setup() {
    return {
      notificationCount,
      userStatus,
      isSettingsOpen,
    }
  },
  methods: {
    handleNotification() {
      console.log('点击了通知按钮')
      notificationCount.value = Math.max(0, notificationCount.value - 1)
      // 模拟通知处理
      if (notificationCount.value === 0) {
        setTimeout(() => {
          notificationCount.value = Math.floor(Math.random() * 5) + 1
        }, 1000)
      }
    },
    handleUser() {
      console.log('点击了用户按钮')
      // 模拟用户管理操作
      userStatus.value = userStatus.value === '在线' ? '忙碌' : '在线'
    },
    handleUserStatus() {
      console.log('切换用户状态')
      const statuses = ['在线', '忙碌', '离开', '勿扰']
      const currentIndex = statuses.indexOf(userStatus.value)
      const nextIndex = (currentIndex + 1) % statuses.length
      userStatus.value = statuses[nextIndex]
    },
    handleSettings() {
      console.log('点击了设置按钮')
      isSettingsOpen.value = !isSettingsOpen.value
      // 模拟设置面板切换
      setTimeout(() => {
        isSettingsOpen.value = false
      }, 2000)
    },
  },
}
</script>

<template>
  <v-app>
    <!-- 直接传入组件对象 -->
    <AppHeader
      :custom-content="CustomHeaderContent"
      navIcon="mdi-menu"
      navIconColor="white"
      color="success"
    />

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 mb-6">组件对象方式</h1>
            <p class="text-body-1 mb-6">
              直接传入组件对象是最简洁的使用方式，支持完整的 Vue
              组件功能，包括响应式数据、事件处理、状态管理等。
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>代码示例</v-card-title>
              <v-card-text>
                <pre class="bg-grey-lighten-4 pa-4 rounded"><code>const CustomHeaderContent = {
  template: \`
    &lt;div class="d-flex align-center"&gt;
      &lt;v-btn icon="mdi-bell" @click="handleNotification"&gt;
        &lt;v-badge :content="notificationCount"&gt;
          &lt;v-icon&gt;mdi-bell&lt;/v-icon&gt;
        &lt;/v-badge&gt;
        &lt;v-tooltip activator="parent"&gt;通知&lt;/v-tooltip&gt;
      &lt;/v-btn&gt;
    &lt;/div&gt;
  \`,
  data() {
    return {
      notificationCount: ref(3),
      userStatus: ref('在线')
    }
  },
  methods: {
    handleNotification() {
      console.log('通知处理')
    }
  }
}

&lt;AppHeader 
  :custom-content="CustomHeaderContent"
  color="success"
/&gt;</code></pre>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>特性说明</v-card-title>
              <v-card-text>
                <ul>
                  <li>✅ 支持完整的 Vue 组件功能</li>
                  <li>✅ 响应式数据绑定</li>
                  <li>✅ 事件处理和状态管理</li>
                  <li>✅ 可以使用 v-badge、v-tooltip 等高级组件</li>
                  <li>✅ 支持复杂的交互逻辑</li>
                  <li>✅ 动态内容更新</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-alert type="success" variant="tonal" class="mt-4">
              <template v-slot:prepend>
                <v-icon>mdi-check-circle</v-icon>
              </template>
              <strong>功能演示：</strong>
              <ul class="mt-2">
                <li>点击通知按钮：减少通知数量，数量为0时会自动重置</li>
                <li>点击用户按钮：切换用户状态（在线/忙碌）</li>
                <li>点击用户状态芯片：循环切换状态（在线→忙碌→离开→勿扰）</li>
                <li>点击设置按钮：模拟设置面板切换</li>
              </ul>
            </v-alert>
          </v-col>
        </v-row>

        <v-alert type="info" variant="tonal" class="mt-4 mb-6">
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          当前页面：组件对象方式演示 (/header-demo/component)
        </v-alert>
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
