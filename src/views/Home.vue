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
      <v-btn @click="navigateTo('/')" variant="elevated" prepend-icon="mdi-home" class="mx-1">
        首页
      </v-btn>

      <v-btn
        @click="navigateTo('/about')"
        variant="text"
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
