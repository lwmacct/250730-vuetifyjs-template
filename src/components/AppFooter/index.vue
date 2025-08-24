<script setup lang="ts">
import type { Props } from './types'

const props = withDefaults(defineProps<Props>(), {
  showLinks: true,
  customText: '© 2024 Vue + Vuetify 演示应用',
  fixed: false, // 默认使用正常文档流模式
})
</script>

<template>
  <v-footer
    :app="fixed"
    color="grey-darken-3"
    class="text-center"
    :class="{ 'footer-sticky': fixed, 'footer-normal': !fixed }"
  >
    <div class="d-flex justify-center align-center py-2">
      <span class="text-body-2 text-grey-lighten-1">
        {{ customText }}
        <template v-if="showLinks">
          |
          <v-btn
            href="https://vuejs.org/"
            target="_blank"
            variant="text"
            size="small"
            color="grey-lighten-1"
            density="compact"
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
            density="compact"
          >
            Vuetify
          </v-btn>
        </template>
      </span>
    </div>
  </v-footer>
</template>

<style scoped>
.footer-sticky {
  /* Sticky footer 样式 */
  /* 当内容不足时，页脚固定在视口底部 */
  /* 当内容超出时，页脚跟随在内容底部 */
  margin-top: auto;
  min-height: 48px;
}

.footer-normal {
  /* 正常文档流页脚样式 */
  margin-top: auto;
  min-height: 48px;
}

/* 确保页脚高度设置生效 */
:deep(.v-footer) {
  height: 48px !important;
  min-height: 48px !important;
  max-height: 48px !important;
}

/* 优化页脚内容布局 */
.v-footer {
  padding: 0;
  height: 48px !important;
  min-height: 48px !important;
  max-height: 48px !important;
}

/* 减少按钮间距 */
.v-btn {
  margin: 0 2px;
}
</style>
