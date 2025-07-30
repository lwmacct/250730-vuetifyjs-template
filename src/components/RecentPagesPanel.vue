<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'

interface Props {
  onNavigate: (path: string) => void
  onAddToFavorites: (item: any) => void
  onRemoveFromFavorites: (path: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  onNavigate: () => {},
  onAddToFavorites: () => {},
  onRemoveFromFavorites: () => {},
})

const menuStore = useMenuStore()
</script>

<template>
  <div class="recent-pages-panel">
    <!-- 最近访问页面列表 -->
    <v-list-item
      v-for="child in menuStore.fixedMenuItems.find((item) => item.id === 'recent')?.children"
      :key="child.path"
      @click="props.onNavigate(child.path)"
      class="panel-item"
      color="blue-lighten-5"
      variant="text"
      hover
    >
      <template v-slot:prepend>
        <v-icon size="small" color="grey-darken-2">{{ child.icon }}</v-icon>
      </template>
      <v-list-item-title class="text-grey-darken-1">
        {{ child.title }}
        <span v-if="child.count" class="text-grey-darken-2 ml-2 font-weight-medium">
          {{ child.count }}
        </span>
      </v-list-item-title>
      <template v-slot:append>
        <v-btn
          icon
          size="small"
          @click.stop="props.onAddToFavorites(child)"
          class="ml-2"
          color="amber-darken-2"
          variant="text"
        >
          <v-icon size="small">mdi-star-outline</v-icon>
        </v-btn>
      </template>
    </v-list-item>

    <!-- 分割线 -->
    <v-divider class="my-4"></v-divider>

    <!-- 我的收藏标题 -->
    <div class="favorites-header">
      <h4 class="favorites-title">我的收藏</h4>
    </div>

    <!-- 收藏的产品列表 -->
    <v-list-item
      v-for="product in menuStore.getFavoriteProducts()"
      :key="product.path"
      @click="props.onNavigate(product.path)"
      class="panel-item"
      color="blue-lighten-5"
      variant="text"
      hover
    >
      <template v-slot:prepend>
        <v-icon size="small" color="grey-darken-2">{{ product.icon }}</v-icon>
      </template>
      <v-list-item-title class="text-grey-darken-1">
        {{ product.title }}
      </v-list-item-title>
      <template v-slot:append>
        <v-btn
          icon
          size="small"
          @click.stop="props.onRemoveFromFavorites(product.path)"
          class="ml-2"
          color="red-darken-2"
          variant="text"
        >
          <v-icon size="small">mdi-star</v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </div>
</template>

<style scoped>
.recent-pages-panel {
  width: 100%;
}

.panel-item {
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease-in-out;
  margin: 0;
  padding: 12px 20px;
}

.panel-item:hover {
  background-color: #f8f9fa !important;
  transform: translateX(2px);
}

.panel-item:last-child {
  border-bottom: none;
}

/* 我的收藏标题样式 */
.favorites-header {
  padding: 12px 20px 8px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.favorites-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 修复prepend区域过宽的问题 */
:deep(.v-list-item__prepend) {
  min-width: auto !important;
  width: auto !important;
  margin-right: 8px !important;
}

:deep(.v-list-item__append) {
  min-width: auto !important;
  width: auto !important;
}
</style>
