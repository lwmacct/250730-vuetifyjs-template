<script setup lang="ts">
// LogPanel 演示页面
import { onMounted, onUnmounted } from 'vue'
import AppHeader from '@/components/AppHeader/index.vue'
import AppFooter from '@/components/AppFooter/index.vue'
import LogPanel from '@/components/LogPanel/index.vue'
import { useAppHeaderStore } from '@/components/AppHeader/stores'
import { useLogPanelDemoStore } from './stores/index'

const routeMenuStore = useAppHeaderStore()
const demoStore = useLogPanelDemoStore()

// 从路由meta中获取信息
const pageIcon = routeMenuStore.useRouteIcon('mdi-console')
const pageTitle = routeMenuStore.useRouteTitle('LogPanel 演示')

// 页面生命周期
onMounted(() => {
  demoStore.initialize()
})

onUnmounted(() => {
  demoStore.saveToLocalStorage()
})
</script>

<template>
  <!-- 使用通用头部组件 -->
  <AppHeader
    :title="pageTitle"
    :titleIcon="pageIcon"
    :actions="[
      {
        icon: demoStore.isLogPanelOpen ? 'mdi-console' : 'mdi-console-line',
        text: '日志面板',
        color: demoStore.isLogPanelOpen ? 'success' : 'grey',
        variant: 'text',
        onClick: () => demoStore.toggleLogPanel(),
      },
      {
        icon: 'mdi-delete',
        text: '清空日志',
        color: 'error',
        variant: 'text',
        onClick: () => demoStore.clearAllLogs(),
      },
    ]"
  />

  <!-- 主要内容区域 -->
  <v-main>
    <v-container fluid>
      <v-row>
        <!-- 左侧控制面板 -->
        <v-col cols="12" lg="8">
          <v-card class="mb-4">
            <v-card-title class="text-h5">
              <v-icon color="primary" class="mr-3">mdi-cog</v-icon>
              演示控制面板
            </v-card-title>
            <v-card-text>
              <!-- 演示模式切换 -->
              <v-card variant="outlined" class="mb-4">
                <v-card-title class="text-h6">
                  <v-icon color="info" class="mr-2">mdi-play-box-multiple</v-icon>
                  演示模式
                </v-card-title>
                <v-card-text>
                  <v-chip-group
                    v-model="demoStore.currentMode"
                    mandatory
                    variant="outlined"
                    @update:model-value="(value) => demoStore.switchMode(value)"
                  >
                    <v-chip
                      v-for="scenario in demoStore.scenarios"
                      :key="scenario.id"
                      :value="scenario.id"
                      :color="scenario.color"
                      :prepend-icon="scenario.icon"
                      size="large"
                    >
                      {{ scenario.title }}
                    </v-chip>
                  </v-chip-group>

                  <v-alert
                    v-if="demoStore.currentScenario"
                    :type="demoStore.currentScenario.color === 'warning' ? 'warning' : 'info'"
                    variant="tonal"
                    class="mt-3"
                  >
                    {{ demoStore.currentScenario.description }}
                  </v-alert>
                </v-card-text>
              </v-card>

              <!-- 日志样本生成 -->
              <v-card variant="outlined" class="mb-4">
                <v-card-title class="text-h6">
                  <v-icon color="success" class="mr-2">mdi-database-plus</v-icon>
                  日志样本生成
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col
                      v-for="sample in demoStore.logSamples"
                      :key="sample.id"
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-btn
                        :color="sample.color"
                        :prepend-icon="sample.icon"
                        variant="outlined"
                        block
                        @click="demoStore.generateSampleLogs(sample.id)"
                      >
                        {{ sample.name }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- 高级功能 -->
              <v-card variant="outlined" class="mb-4">
                <v-card-title class="text-h6">
                  <v-icon color="purple" class="mr-2">mdi-tools</v-icon>
                  高级功能演示
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <!-- API 模拟 -->
                    <v-col cols="12" md="6">
                      <v-card variant="flat" color="surface-variant">
                        <v-card-title class="text-subtitle-1">
                          <v-icon class="mr-2">mdi-api</v-icon>
                          API 模拟
                        </v-card-title>
                        <v-card-text>
                          <v-switch
                            v-model="demoStore.apiMockConfig.enabled"
                            :label="
                              demoStore.apiMockConfig.enabled ? 'API 模拟已开启' : 'API 模拟已关闭'
                            "
                            color="primary"
                            @change="
                              demoStore.apiMockConfig.enabled
                                ? demoStore.startApiMocking()
                                : demoStore.stopApiMocking()
                            "
                          />
                          <div class="text-caption text-medium-emphasis">
                            模拟 {{ demoStore.apiMockConfig.endpoint }}
                            {{ demoStore.apiMockConfig.method }} 请求
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-col>

                    <!-- 系统监控 -->
                    <v-col cols="12" md="6">
                      <v-card variant="flat" color="surface-variant">
                        <v-card-title class="text-subtitle-1">
                          <v-icon class="mr-2">mdi-monitor</v-icon>
                          系统监控
                        </v-card-title>
                        <v-card-text>
                          <v-switch
                            v-model="demoStore.monitoringConfig.enabled"
                            :label="
                              demoStore.monitoringConfig.enabled ? '监控已开启' : '监控已关闭'
                            "
                            color="success"
                            @change="
                              demoStore.monitoringConfig.enabled
                                ? demoStore.startMonitoring()
                                : demoStore.stopMonitoring()
                            "
                          />
                          <div class="text-caption text-medium-emphasis">
                            监控频率: {{ demoStore.monitoringConfig.interval / 1000 }}秒
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>

          <!-- 统计信息 -->
          <v-card>
            <v-card-title class="text-h5">
              <v-icon color="info" class="mr-3">mdi-chart-line</v-icon>
              日志统计
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" sm="3">
                  <v-card variant="outlined" color="primary">
                    <v-card-text class="text-center">
                      <v-icon size="large" color="primary">mdi-information</v-icon>
                      <div class="text-h4 mt-2">{{ demoStore.logStats.info }}</div>
                      <div class="text-body-2">信息</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-card variant="outlined" color="warning">
                    <v-card-text class="text-center">
                      <v-icon size="large" color="warning">mdi-alert</v-icon>
                      <div class="text-h4 mt-2">{{ demoStore.logStats.warn }}</div>
                      <div class="text-body-2">警告</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-card variant="outlined" color="error">
                    <v-card-text class="text-center">
                      <v-icon size="large" color="error">mdi-close-circle</v-icon>
                      <div class="text-h4 mt-2">{{ demoStore.logStats.error }}</div>
                      <div class="text-body-2">错误</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-card variant="outlined" color="success">
                    <v-card-text class="text-center">
                      <v-icon size="large" color="success">mdi-sigma</v-icon>
                      <div class="text-h4 mt-2">
                        {{
                          demoStore.logStats.debug +
                          demoStore.logStats.info +
                          demoStore.logStats.warn +
                          demoStore.logStats.error
                        }}
                      </div>
                      <div class="text-body-2">总计</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- 右侧代码示例 -->
        <v-col cols="12" lg="4">
          <v-card class="mb-4">
            <v-card-title class="text-h5">
              <v-icon color="orange" class="mr-3">mdi-code-tags</v-icon>
              代码示例
            </v-card-title>
            <v-card-text>
              <v-alert type="info" variant="tonal" class="mb-3">
                <template v-slot:prepend>
                  <v-icon>mdi-lightbulb</v-icon>
                </template>
                <div class="text-body-2">
                  <strong>💡 当前演示模式: {{ demoStore.currentScenario?.title }}</strong>
                </div>
              </v-alert>

              <v-code v-if="demoStore.currentScenario" class="text-body-2">
                {{ demoStore.currentScenario.codeExample }}
              </v-code>
            </v-card-text>
          </v-card>

          <!-- 配置信息 -->
          <v-card>
            <v-card-title class="text-h5">
              <v-icon color="purple" class="mr-3">mdi-cog</v-icon>
              面板配置
            </v-card-title>
            <v-card-text>
              <div class="text-body-2">
                <v-list density="compact">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon size="small">mdi-resize-bottom-right</v-icon>
                    </template>
                    <v-list-item-title>宽度: {{ demoStore.panelConfig.width }}px</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon size="small">mdi-database</v-icon>
                    </template>
                    <v-list-item-title
                      >最大日志数: {{ demoStore.panelConfig.maxLogs }}</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon size="small">mdi-arrow-down</v-icon>
                    </template>
                    <v-list-item-title
                      >自动滚动:
                      {{ demoStore.panelConfig.autoScroll ? '是' : '否' }}</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon size="small">mdi-filter</v-icon>
                    </template>
                    <v-list-item-title
                      >过滤功能:
                      {{ demoStore.panelConfig.enableFilter ? '开启' : '关闭' }}</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon size="small">mdi-download</v-icon>
                    </template>
                    <v-list-item-title
                      >导出功能:
                      {{ demoStore.panelConfig.enableExport ? '开启' : '关闭' }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 使用说明 -->
      <v-card class="mt-4">
        <v-card-title class="text-h5">
          <v-icon color="info" class="mr-3">mdi-information</v-icon>
          使用说明
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-alert type="success" variant="tonal">
                <template v-slot:prepend>
                  <v-icon>mdi-keyboard</v-icon>
                </template>
                <div class="text-body-2">
                  <div><strong>⌨️ 快捷键操作:</strong></div>
                  <div>• 按 <kbd>L</kbd> 键快速切换日志面板</div>
                  <div>• 支持键盘导航和快捷操作</div>
                </div>
              </v-alert>
            </v-col>
            <v-col cols="12" md="6">
              <v-alert type="info" variant="tonal">
                <template v-slot:prepend>
                  <v-icon>mdi-mouse</v-icon>
                </template>
                <div class="text-body-2">
                  <div><strong>🖱️ 鼠标操作:</strong></div>
                  <div>• 点击头部"日志面板"按钮打开面板</div>
                  <div>• 支持拖拽调整面板大小</div>
                </div>
              </v-alert>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>

  <!-- 使用通用页脚组件 -->
  <AppFooter />

  <!-- LogPanel 组件 - 按页面需要使用 -->
  <LogPanel v-bind="demoStore.panelConfig" v-model:showPanel="demoStore.isLogPanelOpen" />
</template>

<style scoped>
.v-card {
  border-radius: 16px;
}

kbd {
  background-color: rgb(var(--v-theme-surface-variant));
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85em;
}

.v-code {
  background: rgb(var(--v-theme-surface-variant));
  padding: 16px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  white-space: pre-line;
  overflow-x: auto;
  line-height: 1.4;
}
</style>
