<script setup lang="ts">
// 插槽模板组件 - 用于演示自定义头部内容
</script>

<template>
  <div class="d-flex align-center">
    <v-btn icon="mdi-bell" variant="text" color="white" class="mr-2"></v-btn>
    <v-btn icon="mdi-account" variant="text" color="white" class="mr-2"></v-btn>
    <v-divider vertical class="mx-2" color="white"></v-divider>
    <v-chip color="white" variant="outlined" size="small">
      <v-icon start>mdi-account-circle</v-icon>
      用户
    </v-chip>
  </div>
</template>

<style scoped>
/* 插槽模板样式 */
</style>
