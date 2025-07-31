<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

// 自定义操作按钮
const customActions = [
  {
    icon: 'mdi-bell',
    text: '通知',
    color: 'warning',
    variant: 'text' as const,
    onClick: () => console.log('通知按钮点击'),
  },
  {
    icon: 'mdi-account',
    text: '用户',
    color: 'info',
    variant: 'text' as const,
    onClick: () => console.log('用户按钮点击'),
  },
]
</script>

<template>
  <v-app>
    <!-- 演示：不同颜色的 AppHeader -->
    <AppHeader
      title="样式控制演示"
      titleIcon="mdi-palette"
      :actions="customActions"
      color="primary"
      :elevation="4"
      :height="60"
    />

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 mb-6">AppHeader 样式控制演示</h1>
            <p class="text-body-1 mb-6">
              AppHeader 组件提供了丰富的颜色和样式控制选项，可以完全自定义外观。
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>可控制的样式属性</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-palette</v-icon>
                    </template>
                    <v-list-item-title>color</v-list-item-title>
                    <v-list-item-subtitle
                      >应用栏背景颜色（支持 Vuetify 所有颜色）</v-list-item-subtitle
                    >
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="secondary">mdi-elevation</v-icon>
                    </template>
                    <v-list-item-title>elevation</v-list-item-title>
                    <v-list-item-subtitle>阴影深度（0-24）</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="success">mdi-arrow-expand-vertical</v-icon>
                    </template>
                    <v-list-item-title>height</v-list-item-title>
                    <v-list-item-subtitle>应用栏高度（数字或字符串）</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="warning">mdi-format-color-fill</v-icon>
                    </template>
                    <v-list-item-title>navIconColor</v-list-item-title>
                    <v-list-item-subtitle>导航图标颜色</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-6">
          <v-col cols="12">
            <h2 class="text-h4 mb-4">颜色示例</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>代码示例</v-card-title>
              <v-card-text>
                <pre class="bg-grey-lighten-4 pa-4 rounded"><code>&lt;AppHeader 
  title="样式控制演示"
  titleIcon="mdi-palette"
  :actions="customActions"
  color="primary"
  :elevation="4"
  :height="60"
/&gt;</code></pre>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>支持的颜色值</v-card-title>
              <v-card-text>
                <v-chip-group>
                  <v-chip color="primary" variant="outlined">primary</v-chip>
                  <v-chip color="secondary" variant="outlined">secondary</v-chip>
                  <v-chip color="success" variant="outlined">success</v-chip>
                  <v-chip color="warning" variant="outlined">warning</v-chip>
                  <v-chip color="error" variant="outlined">error</v-chip>
                  <v-chip color="info" variant="outlined">info</v-chip>
                </v-chip-group>
                <v-divider class="my-3"></v-divider>
                <p class="text-caption">
                  还支持所有 Vuetify 颜色系统，包括： grey-darken-4, blue, green, orange, red,
                  purple 等
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-6">
          <v-col cols="12">
            <h2 class="text-h4 mb-4">更多样式示例</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>深色主题</v-card-title>
              <v-card-text>
                <pre class="bg-grey-lighten-4 pa-2 rounded text-caption"><code>color="grey-darken-4"
elevation="2"
height="50"</code></pre>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>高亮主题</v-card-title>
              <v-card-text>
                <pre class="bg-grey-lighten-4 pa-2 rounded text-caption"><code>color="success"
elevation="8"
height="70"</code></pre>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>渐变主题</v-card-title>
              <v-card-text>
                <pre class="bg-grey-lighten-4 pa-2 rounded text-caption"><code>color="primary"
elevation="12"
height="80"</code></pre>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-alert type="info" variant="tonal" class="mt-4">
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          当前页面：样式控制演示 (/header-demo/styles)
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
