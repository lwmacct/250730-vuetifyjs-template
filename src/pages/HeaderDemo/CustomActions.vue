<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
import AppFooter from '@/components/AppFooter.vue'

// 自定义操作按钮组件
const CustomActions = {
  template: `
    <div class="d-flex align-center">
      <v-btn
        icon
        color="warning"
        variant="text"
        @click="handleNotification"
        class="mr-2"
      >
        <v-icon>mdi-bell</v-icon>
        <v-tooltip activator="parent" location="bottom">通知</v-tooltip>
      </v-btn>
      
      <v-btn
        icon
        color="info"
        variant="text"
        @click="handleUser"
        class="mr-2"
      >
        <v-icon>mdi-account</v-icon>
        <v-tooltip activator="parent" location="bottom">用户</v-tooltip>
      </v-btn>
      
      <v-btn
        icon
        color="white"
        variant="text"
        @click="handleSettings"
      >
        <v-icon>mdi-cog</v-icon>
        <v-tooltip activator="parent" location="bottom">设置</v-tooltip>
      </v-btn>
    </div>
  `,
  methods: {
    handleNotification() {
      console.log('点击了通知按钮')
    },
    handleUser() {
      console.log('点击了用户按钮')
    },
    handleSettings() {
      console.log('点击了设置按钮')
    },
  },
}
</script>

<template>
  <v-app>
    <!-- 使用自定义组件实现操作按钮 -->
    <AppHeader
      title="带操作按钮的应用"
      :use-custom-content="true"
      :custom-content="CustomActions"
    />

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 mb-6">自定义操作按钮</h1>
            <p class="text-body-1 mb-6">
              使用自定义组件的方式添加操作按钮，可以实现更复杂的功能和更好的交互体验。
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
  :use-custom-content="true"
  :custom-content="CustomActions"
/&gt;

const CustomActions = {
  template: \`
    &lt;div class="d-flex align-center"&gt;
      &lt;v-btn icon color="warning" @click="handleNotification"&gt;
        &lt;v-icon&gt;mdi-bell&lt;/v-icon&gt;
        &lt;v-tooltip activator="parent"&gt;通知&lt;/v-tooltip&gt;
      &lt;/v-btn&gt;
    &lt;/div&gt;
  \`,
  methods: {
    handleNotification() {
      console.log('通知')
    }
  }
}</code></pre>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>特性说明</v-card-title>
              <v-card-text>
                <ul>
                  <li>支持完整的 Vue 组件功能</li>
                  <li>可以使用 v-tooltip 等高级组件</li>
                  <li>支持复杂的状态管理和事件处理</li>
                  <li>可以实现更丰富的交互效果</li>
                  <li>支持插槽和动态内容</li>
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
