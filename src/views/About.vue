<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <v-app>
    <!-- 导航栏 -->
    <v-app-bar app elevation="2" color="primary" dark>
      <v-app-bar-title class="text-h6">
        <v-icon class="mr-2">mdi-vuejs</v-icon>
        Vue + Vuetify 应用
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- 导航菜单 -->
      <v-btn @click="navigateTo('/')" variant="text" prepend-icon="mdi-home" class="mx-1">
        首页
      </v-btn>

      <v-btn
        @click="navigateTo('/about')"
        variant="elevated"
        prepend-icon="mdi-information"
        class="mx-1"
      >
        关于
      </v-btn>

      <v-btn @click="navigateTo('/contact')" variant="text" prepend-icon="mdi-email" class="mx-1">
        联系
      </v-btn>
    </v-app-bar>

    <!-- 主要内容区域 -->
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="mx-auto" max-width="800">
              <v-card-title class="text-h4 text-center pa-6">
                <v-icon size="large" color="secondary" class="mr-3">mdi-information</v-icon>
                关于我们
              </v-card-title>
              <v-card-text class="text-body-1">
                <p class="mb-4">
                  这是一个演示项目，展示了如何使用 Vue 3、Vuetify 3 和 Vue Router 4 构建现代化的 Web
                  应用程序。
                </p>
                <v-divider class="my-4"></v-divider>
                <v-list>
                  <v-list-item
                    prepend-icon="mdi-vuejs"
                    title="Vue 3"
                    subtitle="渐进式 JavaScript 框架"
                  ></v-list-item>
                  <v-list-item
                    prepend-icon="mdi-vuetify"
                    title="Vuetify 3"
                    subtitle="Material Design 组件库"
                  ></v-list-item>
                  <v-list-item
                    prepend-icon="mdi-router"
                    title="Vue Router 4"
                    subtitle="官方路由管理器"
                  ></v-list-item>
                  <v-list-item
                    prepend-icon="mdi-language-typescript"
                    title="TypeScript"
                    subtitle="类型安全的 JavaScript"
                  ></v-list-item>
                </v-list>
                <v-alert type="success" variant="tonal" class="mt-4">
                  <template v-slot:prepend>
                    <v-icon>mdi-check-circle</v-icon>
                  </template>
                  当前页面：关于 (/about)
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- 页脚 -->
    <v-footer app color="grey-darken-3" class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <p class="text-body-2 text-grey-lighten-1">
              © 2024 Vue + Vuetify 演示应用 |
              <v-btn
                href="https://vuejs.org/"
                target="_blank"
                variant="text"
                size="small"
                color="grey-lighten-1"
              >
                Vue.js
              </v-btn>
              |
              <v-btn
                href="https://vuetifyjs.com/"
                target="_blank"
                variant="text"
                size="small"
                color="grey-lighten-1"
              >
                Vuetify
              </v-btn>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
