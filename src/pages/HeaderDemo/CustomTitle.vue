<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <v-app>
    <!-- 自定义标题和图标 -->
    <AppHeader title="我的应用" titleIcon="mdi-application" />

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 mb-6">自定义标题和图标</h1>
            <p class="text-body-1 mb-6">自定义标题文本和图标，让应用更具个性化。</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>代码示例</v-card-title>
              <v-card-text>
                <pre class="bg-grey-lighten-4 pa-4 rounded"><code>&lt;AppHeader 
  title="我的应用" 
  titleIcon="mdi-application"
/&gt;</code></pre>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>特性说明</v-card-title>
              <v-card-text>
                <ul>
                  <li>自定义标题文本</li>
                  <li>自定义标题图标</li>
                  <li>保持其他默认配置</li>
                  <li>图标使用 Material Design Icons</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-alert type="info" variant="tonal" class="mt-4 mb-6">
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          当前页面：自定义标题演示 (/header-demo/custom-title)
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
