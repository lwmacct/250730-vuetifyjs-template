<script setup lang="ts">
interface Props {
  showLinks?: boolean
  customText?: string
  fixed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLinks: true,
  customText: '© 2024 Vue + Vuetify 演示应用',
  fixed: false,
})
</script>

<template>
  <v-footer
    :app="fixed"
    color="grey-darken-3"
    class="text-center"
    :class="{ 'footer-fixed': fixed, 'footer-normal': !fixed }"
  >
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <p class="text-body-2 text-grey-lighten-1">
            {{ customText }}
            <template v-if="showLinks">
              |
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
            </template>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.footer-fixed {
  /* 固定页脚样式 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.footer-normal {
  /* 正常文档流页脚样式 */
  margin-top: auto;
}

/* 确保主内容区域有足够的下边距，避免被固定页脚遮挡 */
:deep(.v-main) {
  padding-bottom: 0;
}

/* 当使用固定页脚时，为主内容添加底部边距 */
.footer-fixed ~ .v-main {
  padding-bottom: 64px; /* 页脚高度 */
}
</style>
