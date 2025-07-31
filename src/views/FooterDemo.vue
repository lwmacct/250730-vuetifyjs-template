<script setup lang="ts">
// 页脚演示页面
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { ref } from 'vue'

const footerFixed = ref(false)
const showLongContent = ref(false)
</script>

<template>
  <v-app>
    <!-- 使用通用头部组件 -->
    <AppHeader title="页脚演示" titleIcon="mdi-foot-print" />

    <!-- 主要内容区域 -->
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="mx-auto">
              <v-card-title class="text-h4 text-center pa-6">
                <v-icon size="large" color="primary" class="mr-3">mdi-foot-print</v-icon>
                页脚演示页面
              </v-card-title>

              <v-card-text>
                <v-alert type="info" variant="tonal" class="mb-6">
                  <template v-slot:prepend>
                    <v-icon>mdi-information</v-icon>
                  </template>
                  这个页面演示了页脚组件的不同模式
                </v-alert>

                <!-- 控制面板 -->
                <v-card variant="outlined" class="mb-6">
                  <v-card-title>页脚设置</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-switch
                          v-model="footerFixed"
                          label="固定页脚模式"
                          color="primary"
                          hide-details
                        ></v-switch>
                        <v-chip
                          :color="footerFixed ? 'success' : 'default'"
                          class="mt-2"
                          size="small"
                        >
                          {{ footerFixed ? '固定模式' : '正常模式' }}
                        </v-chip>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-switch
                          v-model="showLongContent"
                          label="显示长内容"
                          color="primary"
                          hide-details
                        ></v-switch>
                        <v-chip
                          :color="showLongContent ? 'warning' : 'default'"
                          class="mt-2"
                          size="small"
                        >
                          {{ showLongContent ? '长内容模式' : '短内容模式' }}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <!-- 模式说明 -->
                <v-card variant="outlined" class="mb-6">
                  <v-card-title>模式说明</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-card variant="tonal" color="info">
                          <v-card-title class="text-h6">
                            <v-icon color="info" class="mr-2">mdi-arrow-down</v-icon>
                            正常模式 (fixed: false)
                          </v-card-title>
                          <v-card-text class="text-body-2">
                            <ul>
                              <li>页脚跟随内容自然流动</li>
                              <li>内容少时页脚在底部</li>
                              <li>内容多时需要滚动才能看到页脚</li>
                              <li>适合大多数页面布局</li>
                            </ul>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-card variant="tonal" color="success">
                          <v-card-title class="text-h6">
                            <v-icon color="success" class="mr-2">mdi-pin</v-icon>
                            固定模式 (fixed: true)
                          </v-card-title>
                          <v-card-text class="text-body-2">
                            <ul>
                              <li>页脚始终固定在视口底部</li>
                              <li>内容少时页脚在视口底部</li>
                              <li>内容多时页脚在内容底部</li>
                              <li>适合需要始终可见页脚的场景</li>
                            </ul>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <!-- 长内容区域 -->
                <v-card v-if="showLongContent" variant="outlined" class="mb-6">
                  <v-card-title>长内容区域</v-card-title>
                  <v-card-text>
                    <p class="text-body-2 mb-4">
                      这个区域包含大量内容，用于演示页脚在不同内容长度下的表现。
                    </p>
                    <v-list>
                      <v-list-item
                        v-for="i in 20"
                        :key="i"
                        :title="`内容项目 ${i}`"
                        :subtitle="`这是第 ${i} 个内容项目的详细描述，用于增加页面高度`"
                        prepend-icon="mdi-circle-small"
                      ></v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>

                <v-alert type="success" variant="tonal" class="mt-4">
                  <template v-slot:prepend>
                    <v-icon>mdi-check-circle</v-icon>
                  </template>
                  当前页面：页脚演示 (/footer-demo)
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- 使用通用页脚组件 -->
    <AppFooter :fixed="footerFixed" />
  </v-app>
</template>

<style scoped>
.v-card {
  border-radius: 12px;
}
</style>
