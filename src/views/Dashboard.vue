<script setup lang="ts">
// 仪表板页面组件
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <v-app>
    <!-- 使用通用头部组件 -->
    <AppHeader title="仪表板" :show-navigation="true" />

    <!-- 主要内容区域 -->
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h4 mb-4">仪表板</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" lg="3">
            <v-card class="mx-auto" max-width="300">
              <v-card-title class="text-h6">
                <v-icon color="primary" class="mr-2">mdi-chart-line</v-icon>
                统计信息
              </v-card-title>
              <v-card-text>
                <div class="text-h4 font-weight-bold text-primary">1,234</div>
                <div class="text-body-2 text-grey">总用户数</div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <v-card class="mx-auto" max-width="300">
              <v-card-title class="text-h6">
                <v-icon color="success" class="mr-2">mdi-trending-up</v-icon>
                增长趋势
              </v-card-title>
              <v-card-text>
                <div class="text-h4 font-weight-bold text-success">+15%</div>
                <div class="text-body-2 text-grey">本月增长</div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <v-card class="mx-auto" max-width="300">
              <v-card-title class="text-h6">
                <v-icon color="warning" class="mr-2">mdi-clock</v-icon>
                在线时间
              </v-card-title>
              <v-card-text>
                <div class="text-h4 font-weight-bold text-warning">24/7</div>
                <div class="text-body-2 text-grey">系统运行</div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <v-card class="mx-auto" max-width="300">
              <v-card-title class="text-h6">
                <v-icon color="info" class="mr-2">mdi-shield-check</v-icon>
                安全状态
              </v-card-title>
              <v-card-text>
                <div class="text-h4 font-weight-bold text-info">100%</div>
                <div class="text-body-2 text-grey">安全防护</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title>最近活动</v-card-title>
              <v-card-text>
                <v-timeline density="compact" align="start">
                  <v-timeline-item dot-color="primary" size="small">
                    <div class="mb-4">
                      <div class="font-weight-bold">用户登录</div>
                      <div class="text-caption">用户 admin 登录系统</div>
                    </div>
                  </v-timeline-item>

                  <v-timeline-item dot-color="success" size="small">
                    <div class="mb-4">
                      <div class="font-weight-bold">数据更新</div>
                      <div class="text-caption">系统数据已更新</div>
                    </div>
                  </v-timeline-item>

                  <v-timeline-item dot-color="warning" size="small">
                    <div class="mb-4">
                      <div class="font-weight-bold">系统维护</div>
                      <div class="text-caption">系统维护完成</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>快速操作</v-card-title>
              <v-card-text>
                <v-btn
                  block
                  color="primary"
                  variant="elevated"
                  prepend-icon="mdi-plus"
                  class="mb-2"
                >
                  添加用户
                </v-btn>
                <v-btn
                  block
                  color="secondary"
                  variant="outlined"
                  prepend-icon="mdi-download"
                  class="mb-2"
                >
                  导出数据
                </v-btn>
                <v-btn block color="success" variant="outlined" prepend-icon="mdi-settings">
                  系统设置
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- 仪表板页面不显示页脚 -->
  </v-app>
</template>

<style scoped>
.v-card {
  border-radius: 12px;
}
</style>
