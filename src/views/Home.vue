<script setup lang="ts">
// 首页组件
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <v-app>
    <!-- 使用通用头部组件 -->
    <AppHeader
      title="Vue + Vuetify 应用"
      titleIcon="mdi-home"
      :actions="[
        {
          icon: 'mdi-bell',
          text: '通知',
          color: 'warning',
          variant: 'text',
          onClick: () => console.log('通知按钮点击'),
        },
        {
          icon: 'mdi-account',
          text: '用户',
          color: 'info',
          variant: 'text',
          onClick: () => console.log('用户按钮点击'),
        },
      ]"
    />

    <!-- 主要内容区域 -->
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="mx-auto" max-width="800">
              <v-card-title class="text-h4 text-center pa-6">
                <v-icon size="large" color="primary" class="mr-3">mdi-home</v-icon>
                欢迎使用
              </v-card-title>
              <v-card-text class="text-body-1">
                <p class="mb-4">
                  这是一个基于 Vue 3、Vuetify 3 和 TypeScript 构建的现代化 Web 应用程序。
                  它展示了如何使用这些技术构建功能丰富、用户友好的界面。
                </p>
                <v-divider class="my-4"></v-divider>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-card variant="outlined" class="mb-3">
                      <v-card-title class="text-h6">
                        <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
                        功能特性
                      </v-card-title>
                      <v-card-text>
                        <ul class="text-body-2">
                          <li>响应式设计</li>
                          <li>现代化 UI</li>
                          <li>类型安全</li>
                          <li>组件化架构</li>
                        </ul>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-card variant="outlined" class="mb-3">
                      <v-card-title class="text-h6">
                        <v-icon color="info" class="mr-2">mdi-information</v-icon>
                        技术栈
                      </v-card-title>
                      <v-card-text>
                        <ul class="text-body-2">
                          <li>Vue 3 Composition API</li>
                          <li>Vuetify 3 Material Design</li>
                          <li>TypeScript</li>
                          <li>Vue Router 4</li>
                        </ul>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-alert type="info" variant="tonal" class="mt-4 mb-6">
                  <template v-slot:prepend>
                    <v-icon>mdi-information</v-icon>
                  </template>
                  当前页面：首页 (/)
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- 使用通用页脚组件 -->
    <AppFooter />
  </v-app>
</template>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
