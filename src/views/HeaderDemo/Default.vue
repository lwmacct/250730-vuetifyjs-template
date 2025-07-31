<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <v-app>
    <!-- 默认配置 -->
    <AppHeader title="默认配置演示" />

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 mb-6">默认配置</h1>
            <p class="text-body-1 mb-6">这是最基本的 AppHeader 使用方式，只传入 title 属性。</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>代码示例</v-card-title>
              <v-card-text>
                <pre
                  class="bg-grey-lighten-4 pa-4 rounded"
                ><code>&lt;AppHeader title="默认配置演示" /&gt;</code></pre>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>特性说明</v-card-title>
              <v-card-text>
                <ul>
                  <li>显示默认的菜单图标</li>
                  <li>显示传入的标题</li>
                  <li>显示抽屉菜单</li>
                  <li>使用默认的颜色和样式</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-alert type="info" variant="tonal" class="mt-4 mb-6">
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          当前页面：默认配置演示 (/header-demo/default)
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
