<script setup lang="ts">
// 固定页脚演示页面
import AppHeader from '@/components/AppHeader/index.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <!-- 使用通用头部组件 -->
  <AppHeader title="固定页脚演示" titleIcon="mdi-foot-print" />

  <!-- 主要内容区域 -->
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="mx-auto">
            <v-card-title class="text-h4 text-center pa-6">
              <v-icon size="large" color="primary" class="mr-3">mdi-foot-print</v-icon>
              固定页脚模式
            </v-card-title>

            <v-card-text>
              <v-alert type="info" variant="tonal" class="mb-6">
                <template v-slot:prepend>
                  <v-icon>mdi-information</v-icon>
                </template>
                这个页面演示了固定页脚模式 (fixed: true)
              </v-alert>

              <v-card variant="outlined" class="mb-6">
                <v-card-title>固定模式说明</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
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
                            <li>使用 Vuetify 的 app 属性</li>
                          </ul>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card variant="outlined" class="mb-6">
                <v-card-title>代码示例</v-card-title>
                <v-card-text>
                  <pre
                    class="bg-grey-lighten-4 pa-4 rounded"
                  ><code>&lt;AppFooter :fixed="true" /&gt;</code></pre>
                </v-card-text>
              </v-card>

              <v-alert type="success" variant="tonal" class="mt-4">
                <template v-slot:prepend>
                  <v-icon>mdi-check-circle</v-icon>
                </template>
                当前页面：固定页脚演示 (/footer-demo/fixed)
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <!-- 使用固定页脚组件 -->
  <AppFooter :fixed="true" />
</template>

<style scoped>
.v-card {
  border-radius: 12px;
}
</style>
