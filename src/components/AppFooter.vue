<script setup lang="ts">
interface Props {
  showLinks?: boolean
  customText?: string
}

const props = withDefaults(defineProps<Props>(), {
  showLinks: true,
  customText: '© 2024 Vue + Vuetify 演示应用',
})
</script>

<template>
  <v-footer app color="grey-darken-3" class="text-center">
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
