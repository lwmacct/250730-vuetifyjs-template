<script setup lang="ts">
interface Props {
  showLinks?: boolean
  customText?: string
  fixed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLinks: true,
  customText: '© 2024 Vue + Vuetify 演示应用',
  fixed: false, // 默认使用正常文档流模式，避免滚动条问题
})
</script>

<template>
  <v-footer
    :app="false"
    color="grey-darken-3"
    class="text-center"
    :class="{ 'footer-sticky': fixed, 'footer-normal': !fixed }"
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
.footer-sticky {
  /* Sticky footer 样式 */
  /* 当内容不足时，页脚固定在视口底部 */
  /* 当内容超出时，页脚跟随在内容底部 */
  margin-top: auto;
  min-height: 64px; /* 页脚最小高度 */
}

.footer-normal {
  /* 正常文档流页脚样式 */
  margin-top: auto;
}

/* 确保父容器支持 flexbox 布局 */
:deep(.v-application) {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 主内容区域自动填充剩余空间 */
:deep(.v-main) {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}

/* 当使用 sticky footer 时，确保内容区域正确布局 */
.footer-sticky ~ .v-main {
  flex: 1 0 auto;
}

/* 确保页脚在 sticky 模式下正确显示 */
.footer-sticky {
  flex-shrink: 0;
}
</style>
