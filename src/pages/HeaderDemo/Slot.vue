<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
import AppFooter from '@/components/AppFooter.vue'
import SlotTemplate from './SlotTemplate.vue'
</script>

<template>
  <v-app>
    <!-- 使用自定义内容插槽 -->
    <AppHeader :use-custom-content="true" navIcon="mdi-menu" navIconColor="white" color="primary">
      <template #custom-content>
        <SlotTemplate />
      </template>
    </AppHeader>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 mb-6">插槽方式自定义内容</h1>
            <p class="text-body-1 mb-6">
              使用插槽方式可以完全自定义导航栏右侧的内容，支持完整的 Vue
              组件功能，包括响应式数据、事件处理、状态管理等。
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>代码示例</v-card-title>
              <v-card-text>
                <pre
                  class="bg-grey-lighten-4 pa-4 rounded"
                ><code>&lt;AppHeader :use-custom-content="true"&gt;
  &lt;template #custom-content&gt;
    &lt;SlotTemplate /&gt;
  &lt;/template&gt;
&lt;/AppHeader&gt;

// SlotTemplate.vue
const notificationCount = ref(3)
const userStatus = ref('在线')

const handleNotification = () => {
  notificationCount.value = Math.max(0, notificationCount.value - 1)
}</code></pre>
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
                  <li>✅ 组件化设计，易于复用</li>
                  <li>✅ 简单可靠，易于维护</li>
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
          当前页面：插槽方式演示 (/header-demo/slot)
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
