<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
import AppFooter from '@/components/AppFooter.vue'

// 自定义操作按钮
const customActions = [
  {
    icon: 'mdi-bell',
    text: '通知',
    color: 'warning',
    variant: 'text' as const,
    onClick: () => {
      console.log('点击了通知按钮')
    },
  },
  {
    icon: 'mdi-account',
    text: '用户',
    color: 'info',
    variant: 'text' as const,
    onClick: () => {
      console.log('点击了用户按钮')
    },
  },
  {
    icon: 'mdi-cog',
    text: '设置',
    color: 'white',
    variant: 'text' as const,
    onClick: () => {
      console.log('点击了设置按钮')
    },
  },
]
</script>

<template>
  <v-app>
    <!-- 自定义操作按钮 -->
    <AppHeader title="带操作按钮的应用" :actions="customActions" />

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 mb-6">自定义操作按钮</h1>
            <p class="text-body-1 mb-6">
              使用 actions prop 添加自定义操作按钮，每个按钮都可以配置图标、文本、颜色和点击事件。
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>代码示例</v-card-title>
              <v-card-text>
                <pre class="bg-grey-lighten-4 pa-4 rounded"><code>&lt;AppHeader 
  title="带操作按钮的应用"
  :actions="customActions"
/&gt;

const customActions = [
  {
    icon: 'mdi-bell',
    text: '通知',
    color: 'warning',
    variant: 'text',
    onClick: () => console.log('通知')
  },
  // ... 更多按钮
]</code></pre>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>特性说明</v-card-title>
              <v-card-text>
                <ul>
                  <li>支持多个自定义按钮</li>
                  <li>每个按钮可配置图标、文本、颜色</li>
                  <li>支持不同的按钮样式变体</li>
                  <li>每个按钮都有独立的点击事件</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-alert type="info" variant="tonal" class="mt-4 mb-6">
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          当前页面：自定义操作按钮演示 (/header-demo/custom-actions)
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
