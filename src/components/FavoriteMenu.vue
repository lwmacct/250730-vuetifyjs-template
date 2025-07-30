<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

interface Props {
  onRemoveFromFavorites: (path: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  onRemoveFromFavorites: () => {},
})

const menuStore = useMenuStore()
const router = useRouter()
const draggedItem = ref<any>(null)
const dragOverItem = ref<any>(null)

// 处理点击事件
const handleClick = (product: any) => {
  router.push(product.path)
}

// 移除收藏项
const removeFromFavorites = (path: string) => {
  menuStore.removeFromFavorites(path)
}

// 拖拽开始
const handleDragStart = (event: DragEvent, item: any) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', item.path)
    draggedItem.value = item
  }
}

// 拖拽悬停
const handleDragOver = (event: DragEvent, item: any) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
  dragOverItem.value = item
}

// 拖拽放置
const handleDrop = (event: DragEvent, targetItem: any) => {
  event.preventDefault()

  if (draggedItem.value && draggedItem.value.path !== targetItem.path) {
    const favoriteItems = menuStore.favoriteProducts
    const fromIndex = favoriteItems.findIndex((item) => item.path === draggedItem.value!.path)
    const toIndex = favoriteItems.findIndex((item) => item.path === targetItem.path)

    if (fromIndex !== -1 && toIndex !== -1) {
      menuStore.moveFavoriteItem(fromIndex, toIndex)
    }
  }

  draggedItem.value = null
  dragOverItem.value = null
}

// 拖拽结束
const handleDragEnd = () => {
  draggedItem.value = null
  dragOverItem.value = null
}
</script>

<template>
  <div class="favorite-menu">
    <!-- 收藏的产品列表 -->
    <div
      v-for="(product, index) in menuStore.favoriteProducts"
      :key="product.path"
      class="menu-item-container"
      :class="{
        dragging: draggedItem?.path === product.path,
        'drag-over': dragOverItem?.path === product.path,
      }"
      draggable="true"
      @dragstart="handleDragStart($event, product)"
      @dragover="handleDragOver($event, product)"
      @drop="handleDrop($event, product)"
      @dragend="handleDragEnd"
    >
      <v-list-item
        @click="handleClick(product)"
        class="menu-item"
        color="transparent"
        variant="text"
        hover
      >
        <template v-slot:prepend>
          <v-icon size="small" color="grey-lighten-1">{{ product.icon }}</v-icon>
        </template>
        <v-list-item-title class="text-white">
          {{ product.title }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-grey-lighten-2 text-caption">
          {{ product.category || '收藏项目' }}
        </v-list-item-subtitle>
        <template v-slot:append>
          <v-btn
            icon
            size="x-small"
            @click.stop="removeFromFavorites(product.path)"
            color="red-lighten-2"
            variant="text"
            class="remove-btn"
          >
            <v-icon size="small">mdi-close</v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </div>
  </div>
</template>

<style scoped>
.favorite-menu {
  margin-top: 8px;
}

.favorites-header {
  padding: 12px 20px 8px 20px;
  border-bottom: 1px solid #616161;
}

.favorites-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #64b5f6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.menu-item-container {
  position: relative;
  cursor: grab;
  transition: all 0.2s ease-in-out;
  margin: 0;
  padding: 0;
}

.menu-item-container:active {
  cursor: grabbing;
}

.menu-item-container.dragging {
  opacity: 0.5;
  transform: rotate(5deg);
}

.menu-item-container.drag-over {
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.3);
}

.menu-item {
  transition: all 0.2s ease-in-out;
  border-radius: 0;
  margin: 0;
  padding: 0;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.remove-btn {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  margin-right: 4px;
}

.menu-item:hover .remove-btn {
  opacity: 1;
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

:deep(.v-list-item) {
  margin: 0;
  padding: 0;
  min-height: 48px;
}

:deep(.v-list-item__content) {
  padding: 0 16px;
}
</style>
