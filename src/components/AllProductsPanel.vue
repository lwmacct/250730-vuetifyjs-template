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

// 处理收藏按钮点击
const handleFavoriteClick = (item: any) => {
  menuStore.toggleFavorite(item.path)
}

// 检查是否已收藏
const isItemFavorite = (path: string) => {
  return menuStore.isFavorite(path)
}
</script>

<template>
  <div class="all-products-panel">
    <!-- 产品分类列表 -->
    <div
      v-for="(items, category) in menuStore.productsByCategory"
      :key="category"
      class="category-section"
    >
      <!-- 分类标题 -->
      <div class="category-header">
        <v-icon size="small" color="blue-lighten-2" class="mr-2">
          {{ items[0]?.icon || 'mdi-folder' }}
        </v-icon>
        <span class="category-title">{{ category }}</span>
      </div>

      <!-- 该分类下的产品列表 -->
      <v-list-item
        v-for="item in items"
        :key="item.path"
        @click="props.onNavigate(item.path)"
        class="product-item"
        color="transparent"
        variant="text"
        hover
      >
        <template v-slot:prepend>
          <v-icon size="small" color="grey-lighten-1">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title class="text-white">
          {{ item.title }}
          <span v-if="item.count" class="text-grey-lighten-2 ml-2 font-weight-medium">
            {{ item.count }}
          </span>
        </v-list-item-title>
        <template v-slot:append>
          <v-btn
            icon
            size="small"
            @click.stop="handleFavoriteClick(item)"
            class="ml-2"
            :color="isItemFavorite(item.path) ? 'amber' : 'amber-lighten-1'"
            variant="text"
          >
            <v-icon size="small">
              {{ isItemFavorite(item.path) ? 'mdi-star' : 'mdi-star-outline' }}
            </v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </div>
  </div>
</template>

<style scoped>
.all-products-panel {
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #424242;
  /* 确保滚动条始终显示 */
  scrollbar-width: thin;
  scrollbar-color: #757575 #424242;
}

/* WebKit 浏览器滚动条样式 */
.all-products-panel::-webkit-scrollbar {
  width: 12px;
}

.all-products-panel::-webkit-scrollbar-track {
  background: #424242;
  border-radius: 6px;
}

.all-products-panel::-webkit-scrollbar-thumb {
  background: #757575;
  border-radius: 6px;
  border: 2px solid #424242;
}

.all-products-panel::-webkit-scrollbar-thumb:hover {
  background: #9e9e9e;
}

.all-products-panel::-webkit-scrollbar-corner {
  background: #424242;
}

.category-section {
  margin-bottom: 16px;
}

.category-header {
  display: flex;
  align-items: center;
  padding: 12px 20px 10px 20px;
  border-top: 1px solid #616161;
  border-bottom: 1px solid #616161;
  background-color: #424242;
}

.category-title {
  margin: 0;
  color: #64b5f6;
  display: flex;
  align-items: center;
  font-weight: 600;
}

.product-item {
  margin: 2px 0;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

.product-item:hover {
  background-color: #616161 !important;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.product-item:active {
  background-color: #757575 !important;
  transform: translateX(2px);
}

/* 增强收藏按钮的悬浮效果 */
.product-item:hover .v-btn {
  background-color: rgba(255, 193, 7, 0.2) !important;
}

.product-item:hover .v-btn:hover {
  background-color: rgba(255, 193, 7, 0.3) !important;
  transform: scale(1.1);
}

/* 确保在 Firefox 中滚动条可见 */
@supports (scrollbar-color: auto) {
  .all-products-panel {
    scrollbar-color: #757575 #424242;
  }
}

/* 确保在 Edge 中滚动条可见 */
@supports (-ms-ime-align: auto) {
  .all-products-panel {
    scrollbar-width: thin;
  }
}
</style>
