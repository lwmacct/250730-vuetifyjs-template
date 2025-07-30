<script setup lang="ts">
// 首页组件
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <v-app>
    <!-- 使用通用头部组件 -->
    <AppHeader title="Vue + Vuetify 应用" :show-navigation="true" />

    <!-- 主要内容区域 -->
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="mx-auto" max-width="800">
              <v-card-title class="text-h4 text-center pa-6">
                <v-icon size="large" color="primary" class="mr-3">mdi-home</v-icon>
                欢迎来到首页
              </v-card-title>
              <v-card-text class="text-body-1">
                <p class="mb-4">
                  这是一个使用 Vuetify 和 Vue Router 构建的应用程序。
                  你可以通过导航菜单访问不同的页面。
                </p>
                <v-alert type="info" variant="tonal" class="mb-4">
                  <template v-slot:prepend>
                    <v-icon>mdi-information</v-icon>
                  </template>
                  当前页面：首页 (/)
                </v-alert>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn color="primary" variant="elevated" prepend-icon="mdi-arrow-right">
                  开始探索
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- 使用通用页脚组件 -->
    <AppFooter />
  </v-app>
</template>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
