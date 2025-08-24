<script setup lang="ts">
// 仪表板页面组件
import AppHeader from '@/components/AppHeader/index.vue'
import AppFooter from '@/components/AppFooter/index.vue'
</script>

<template>
  <!-- 使用通用头部组件 -->
  <AppHeader title="仪表板" />

  <!-- 主要内容区域 -->
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">仪表板</h1>
        </v-col>
      </v-row>

      <v-row>
        <!-- 统计卡片 -->
        <v-col cols="12" sm="6" md="3">
          <v-card class="mx-auto" max-width="300">
            <v-card-text class="text-center">
              <v-icon size="large" color="primary" class="mb-2">mdi-account-group</v-icon>
              <div class="text-h4 font-weight-bold">1,234</div>
              <div class="text-subtitle-1">总用户数</div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card class="mx-auto" max-width="300">
            <v-card-text class="text-center">
              <v-icon size="large" color="success" class="mb-2">mdi-chart-line</v-icon>
              <div class="text-h4 font-weight-bold">567</div>
              <div class="text-subtitle-1">活跃用户</div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card class="mx-auto" max-width="300">
            <v-card-text class="text-center">
              <v-icon size="large" color="warning" class="mb-2">mdi-clock</v-icon>
              <div class="text-h4 font-weight-bold">89</div>
              <div class="text-subtitle-1">今日访问</div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card class="mx-auto" max-width="300">
            <v-card-text class="text-center">
              <v-icon size="large" color="info" class="mb-2">mdi-database</v-icon>
              <div class="text-h4 font-weight-bold">456</div>
              <div class="text-subtitle-1">数据记录</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-6">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>最近活动</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="i in 5"
                  :key="i"
                  :title="`活动 ${i}`"
                  :subtitle="`这是第 ${i} 个活动描述`"
                  prepend-icon="mdi-circle-small"
                ></v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>快速操作</v-card-title>
            <v-card-text>
              <v-btn
                v-for="action in ['添加用户', '查看报告', '设置', '帮助']"
                :key="action"
                block
                variant="outlined"
                class="mb-2"
                prepend-icon="mdi-plus"
              >
                {{ action }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-alert type="success" variant="tonal" class="mt-4 mb-6">
        <template v-slot:prepend>
          <v-icon>mdi-check-circle</v-icon>
        </template>
        当前页面：仪表板 (/dashboard)
      </v-alert>
    </v-container>
  </v-main>

  <!-- 使用通用页脚组件 -->
  <AppFooter />
</template>

<style scoped>
.v-card {
  border-radius: 12px;
}
</style>
