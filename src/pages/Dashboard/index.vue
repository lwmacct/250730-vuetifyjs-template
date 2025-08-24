<script setup lang="ts">
// 仪表盘页面组件
import { onMounted, onUnmounted } from 'vue'
import AppHeader from '@/components/AppHeader/index.vue'
import AppFooter from '@/components/AppFooter/index.vue'
import { useAppHeaderStore } from '@/components/AppHeader/stores'
import { useDashboardStore } from './stores/index'

const routeMenuStore = useAppHeaderStore()
const dashboardStore = useDashboardStore()

// 从路由meta中获取信息
const pageIcon = routeMenuStore.useRouteIcon('mdi-view-dashboard')
const pageTitle = routeMenuStore.useRouteTitle('仪表盘')

// 页面生命周期
onMounted(() => {
  dashboardStore.initialize()
})

onUnmounted(() => {
  dashboardStore.saveToLocalStorage()
})
</script>

<template>
  <!-- 使用通用头部组件 -->
  <AppHeader
    :title="pageTitle"
    :titleIcon="pageIcon"
    :actions="[
      {
        icon: dashboardStore.isAutoRefresh ? 'mdi-pause' : 'mdi-play',
        text: dashboardStore.isAutoRefresh ? '暂停刷新' : '开始刷新',
        color: dashboardStore.isAutoRefresh ? 'warning' : 'success',
        variant: 'text',
        onClick: () => dashboardStore.toggleAutoRefresh(),
      },
      {
        icon: 'mdi-refresh',
        text: '手动刷新',
        color: 'primary',
        variant: 'text',
        onClick: () => dashboardStore.refreshData(),
      },
    ]"
  />

  <!-- 主要内容区域 -->
  <v-main>
    <v-container>
      <!-- 页面标题 -->
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">
            <v-icon size="large" color="primary" class="mr-3">{{ pageIcon }}</v-icon>
            仪表盘概览
          </h1>
        </v-col>
      </v-row>

      <!-- 统计卡片 -->
      <v-row>
        <v-col v-for="stat in dashboardStore.stats" :key="stat.id" cols="12" sm="6" md="4" lg="3">
          <v-card class="mx-auto" max-width="300" :elevation="2">
            <v-card-text class="text-center pa-4">
              <v-icon size="x-large" :color="stat.color" class="mb-3">
                {{ stat.icon }}
              </v-icon>
              <div class="text-h4 font-weight-bold mb-1">
                {{ stat.format === 'number' ? stat.value.toLocaleString() : stat.value }}
              </div>
              <div class="text-subtitle-1 text-medium-emphasis">
                {{ stat.title }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 主要内容区域 -->
      <v-row class="mt-6">
        <!-- 最近活动 -->
        <v-col cols="12" md="8">
          <v-card :elevation="2">
            <v-card-title class="d-flex align-center">
              <v-icon color="info" class="mr-2">mdi-history</v-icon>
              最近活动
            </v-card-title>
            <v-card-text>
              <v-list v-if="dashboardStore.recentActivities.length > 0">
                <v-list-item
                  v-for="activity in dashboardStore.recentActivities"
                  :key="activity.id"
                  :title="activity.title"
                  :subtitle="activity.description"
                  class="px-0"
                >
                  <template v-slot:prepend>
                    <v-icon :color="activity.icon ? 'primary' : 'grey'">
                      {{ activity.icon || 'mdi-circle-small' }}
                    </v-icon>
                  </template>
                  <template v-slot:append>
                    <span class="text-caption text-medium-emphasis">
                      {{
                        activity.timestamp.toLocaleTimeString('zh-CN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      }}
                    </span>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert
                v-else
                type="info"
                variant="tonal"
                text="暂无活动记录"
                class="ma-0"
              ></v-alert>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- 快速操作 -->
        <v-col cols="12" md="4">
          <v-card :elevation="2">
            <v-card-title class="d-flex align-center">
              <v-icon color="success" class="mr-2">mdi-lightning-bolt</v-icon>
              快速操作
            </v-card-title>
            <v-card-text>
              <v-btn
                v-for="action in dashboardStore.quickActions"
                :key="action.id"
                block
                :variant="(action.variant as any) || 'outlined'"
                :color="action.color"
                class="mb-2"
                :prepend-icon="action.icon"
                @click="action.onClick"
              >
                {{ action.title }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 系统状态信息 -->
      <v-row class="mt-6">
        <v-col cols="12">
          <v-alert type="info" variant="tonal" :elevation="1">
            <template v-slot:prepend>
              <v-icon>mdi-information</v-icon>
            </template>
            <div class="text-body-2">
              <div class="d-flex flex-wrap gap-4">
                <div><strong>🏠 页面架构:</strong> pages/Dashboard/</div>
                <div><strong>📊 Mock 数据:</strong> {{ dashboardStore.stats.length }} 项统计</div>
                <div><strong>📝 活动记录:</strong> {{ dashboardStore.activities.length }} 条</div>
                <div><strong>🔄 最后更新:</strong> {{ dashboardStore.formattedLastRefresh }}</div>
                <div>
                  <strong>⚡ 自动刷新:</strong>
                  <v-chip
                    size="small"
                    :color="dashboardStore.isAutoRefresh ? 'success' : 'grey'"
                    variant="flat"
                  >
                    {{ dashboardStore.isAutoRefresh ? '开启' : '关闭' }}
                  </v-chip>
                </div>
              </div>
              <div class="text-caption mt-2 text-medium-emphasis">
                💡 这个仪表盘展示了页面级架构模式，使用 Mock 数据和 Pinia Store 管理状态
              </div>
            </div>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <!-- 使用通用页脚组件 -->
  <AppFooter />
</template>

<style scoped>
.v-card {
  border-radius: 16px;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.text-h4 {
  line-height: 1.2;
}

.v-list-item {
  border-radius: 8px;
  margin-bottom: 4px;
}

.v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.04);
}

.gap-4 {
  gap: 1rem;
}
</style>
