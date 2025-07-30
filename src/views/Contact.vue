<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const message = ref('')

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
        variant="text"
        prepend-icon="mdi-information"
        class="mx-1"
      >
        关于
      </v-btn>

      <v-btn
        @click="navigateTo('/contact')"
        variant="elevated"
        prepend-icon="mdi-email"
        class="mx-1"
      >
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
                <v-icon size="large" color="info" class="mr-3">mdi-email</v-icon>
                联系我们
              </v-card-title>
              <v-card-text class="text-body-1">
                <p class="mb-4">
                  如果你有任何问题或建议，请随时联系我们。 我们很乐意听取你的反馈。
                </p>
                <v-form>
                  <v-text-field
                    v-model="name"
                    label="姓名"
                    prepend-icon="mdi-account"
                    variant="outlined"
                    class="mb-3"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    label="邮箱"
                    prepend-icon="mdi-email"
                    variant="outlined"
                    type="email"
                    class="mb-3"
                  ></v-text-field>
                  <v-textarea
                    v-model="message"
                    label="消息"
                    prepend-icon="mdi-message"
                    variant="outlined"
                    rows="4"
                    class="mb-4"
                  ></v-textarea>
                  <v-btn
                    color="primary"
                    variant="elevated"
                    prepend-icon="mdi-send"
                    block
                    size="large"
                  >
                    发送消息
                  </v-btn>
                </v-form>
                <v-alert type="warning" variant="tonal" class="mt-4">
                  <template v-slot:prepend>
                    <v-icon>mdi-alert</v-icon>
                  </template>
                  当前页面：联系 (/contact)
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
