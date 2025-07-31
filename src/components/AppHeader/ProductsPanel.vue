<script setup lang="ts">
import { useRouteMenuStore } from '@/stores/routeMenu'

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

const routeMenuStore = useRouteMenuStore()

// 处理收藏按钮点击
const handleFavoriteClick = (item: any) => {
  routeMenuStore.toggleFavorite(item.path)
}

// 检查是否已收藏
const isItemFavorite = (path: string) => {
  return routeMenuStore.isFavorite(path)
}
</script>

<template>
  <div class="all-products-panel">
    <!-- 产品分类列表 -->
    <div
      v-for="(items, category) in routeMenuStore.menuItemsByCategory"
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
      <div
        v-for="item in items"
        :key="item.path"
        @click="props.onNavigate(item.path)"
        class="product-item"
      >
        <div class="product-item-content">
          <v-icon size="small" color="grey-lighten-1" class="product-icon">
            {{ item.icon }}
          </v-icon>
          <div class="product-text">
            <div class="product-title text-white">
              {{ item.title }}
            </div>
            <div class="product-subtitle text-grey-lighten-2 text-caption">
              {{ item.path }}
            </div>
          </div>
          <v-btn
            icon
            size="small"
            @click.stop="handleFavoriteClick(item)"
            class="product-favorite-btn"
            :color="isItemFavorite(item.path) ? 'amber' : 'amber-lighten-1'"
            variant="text"
          >
            <v-icon size="small">
              {{ isItemFavorite(item.path) ? 'mdi-star' : 'mdi-star-outline' }}
            </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.all-products-panel {
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow-x: visible; /* 允许内容撑开宽度 */
  overflow-y: scroll;
  background-color: #424242;
  /* 确保滚动条始终显示 */
  scrollbar-width: thin;
  scrollbar-color: #757575 #424242;
  /* 强制允许内容撑开 */
  min-width: fit-content;
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
  margin-bottom: 15px;
}

.category-header {
  display: flex;
  align-items: center;
  padding: 5px 15px 5px 15px;
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
  cursor: pointer;
  padding: 8px 16px;
  /* 允许内容撑开宽度 */
  min-width: fit-content;
  width: auto;
  /* 强制撑开 */
  overflow: visible;
}

.product-item-content {
  display: flex;
  align-items: center; /* 修复对齐问题 */
  gap: 12px;
  width: 100%;
  min-width: 0;
  /* 强制撑开 */
  overflow: visible;
}

.product-icon {
  flex-shrink: 0;
  /* 移除 margin-top，让 icon 与文本中心对齐 */
}

.product-text {
  flex: 1;
  min-width: 0;
  overflow: visible;
}

.product-title {
  font-weight: 500;
  line-height: 1.4;
  white-space: normal;
  word-wrap: break-word;
  overflow: visible;
  margin-bottom: 2px;
}

.product-subtitle {
  line-height: 1.3;
  white-space: normal;
  word-wrap: break-word;
  overflow: visible;
  opacity: 0.8;
}

.product-favorite-btn {
  flex-shrink: 0;
  margin-left: 8px;
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
