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
  <div class="recent-pages-panel">
    <!-- 最近访问页面列表 -->
    <v-list-item
      v-for="page in menuStore.recentPages"
      :key="page.path"
      @click="props.onNavigate(page.path)"
      class="page-item"
      color="transparent"
      variant="text"
      hover
    >
      <template v-slot:prepend>
        <v-icon size="small" color="grey-lighten-1">{{ page.icon }}</v-icon>
      </template>
      <v-list-item-title class="text-white">
        {{ page.title }}
        <span v-if="page.count" class="text-grey-lighten-2 ml-2 font-weight-medium">
          {{ page.count }}
        </span>
      </v-list-item-title>
      <v-list-item-subtitle class="text-grey-lighten-2 text-caption">
        {{ page.category || '最近访问' }}
      </v-list-item-subtitle>
      <template v-slot:append>
        <v-btn
          icon
          size="small"
          @click.stop="handleFavoriteClick(page)"
          class="ml-2"
          :color="isItemFavorite(page.path) ? 'amber' : 'amber-lighten-1'"
          variant="text"
        >
          <v-icon size="small">
            {{ isItemFavorite(page.path) ? 'mdi-star' : 'mdi-star-outline' }}
          </v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </div>
</template>

<style scoped>
.recent-pages-panel {
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
.recent-pages-panel::-webkit-scrollbar {
  width: 12px;
}

.recent-pages-panel::-webkit-scrollbar-track {
  background: #424242;
  border-radius: 6px;
}

.recent-pages-panel::-webkit-scrollbar-thumb {
  background: #757575;
  border-radius: 6px;
  border: 2px solid #424242;
}

.recent-pages-panel::-webkit-scrollbar-thumb:hover {
  background: #9e9e9e;
}

.recent-pages-panel::-webkit-scrollbar-corner {
  background: #424242;
}

.page-item {
  margin: 2px 0;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

.page-item:hover {
  background-color: #616161 !important;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.page-item:active {
  background-color: #757575 !important;
  transform: translateX(2px);
}

/* 增强收藏按钮的悬浮效果 */
.page-item:hover .v-btn {
  background-color: rgba(255, 193, 7, 0.2) !important;
}

.page-item:hover .v-btn:hover {
  background-color: rgba(255, 193, 7, 0.3) !important;
  transform: scale(1.1);
}

/* 确保在 Firefox 中滚动条可见 */
@supports (scrollbar-color: auto) {
  .recent-pages-panel {
    scrollbar-color: #757575 #424242;
  }
}

/* 确保在 Edge 中滚动条可见 */
@supports (-ms-ime-align: auto) {
  .recent-pages-panel {
    scrollbar-width: thin;
  }
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
