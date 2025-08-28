<template>
  <!-- 底部快捷操作 -->
  <div class="log-panel-footer">
    <v-divider />
    <div class="px-4 py-2">
      <div class="text-caption text-grey-lighten-1 mb-2">快捷键: 按 <kbd>L</kbd> 切换面板</div>
      <div class="d-flex gap-1">
        <v-btn size="x-small" color="success" @click="$emit('addTestLog', 'info')"> Info </v-btn>
        <v-btn size="x-small" color="warning" @click="$emit('addTestLog', 'warn')"> Warn </v-btn>
        <v-btn size="x-small" color="error" @click="$emit('addTestLog', 'error')"> Error </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  addTestLog: [level: 'info' | 'warn' | 'error']
}

defineEmits<Emits>()
</script>

<style scoped>
.log-panel-footer {
  margin-top: auto;
}

kbd {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow:
    0 1px 0 rgba(0, 0, 0, 0.2),
    0 0 0 2px #fff inset;
  color: #333;
  display: inline-block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  line-height: 1.4;
  margin: 0 0.1em;
  padding: 0.1em 0.6em;
  text-shadow: 0 1px 0 #fff;
}
</style>
