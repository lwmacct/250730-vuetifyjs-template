<script setup lang="ts">
import { useMenuStore, type MenuItem } from '@/stores/menu'
import { ref } from 'vue'

interface Props {
  onMouseEnter?: (itemId: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  onMouseEnter: () => {},
})

const menuStore = useMenuStore()
const draggedItem = ref<MenuItem | null>(null)
const dragOverItem = ref<MenuItem | null>(null)

const handleMouseEnter = (itemId: string) => {
  props.onMouseEnter(itemId)
}

const handleDragStart = (event: DragEvent, item: MenuItem) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', item.path)
    draggedItem.value = item
  }
}

const handleDragOver = (event: DragEvent, item: MenuItem) => {
  event.preventDefault()
  event.dataTransfer!.dropEffect = 'move'
  dragOverItem.value = item
}

const handleDrop = (event: DragEvent, targetItem: MenuItem) => {
  event.preventDefault()

  if (draggedItem.value && draggedItem.value.path !== targetItem.path) {
    const favoriteItems = menuStore.getFavoriteProducts()
    const fromIndex = favoriteItems.findIndex((item) => item.path === draggedItem.value!.path)
    const toIndex = favoriteItems.findIndex((item) => item.path === targetItem.path)

    if (fromIndex !== -1 && toIndex !== -1) {
      menuStore.moveFavoriteItem(fromIndex, toIndex)
    }
  }

  draggedItem.value = null
  dragOverItem.value = null
}

const handleDragEnd = () => {
  draggedItem.value = null
  dragOverItem.value = null
}

const removeFromFavorites = (path: string) => {
  menuStore.removeFromFavorites(path)
}
</script>

<template>
  <div class="favorite-menu">
    <!-- 分割线 -->
    <v-divider class="my-4" color="grey-lighten-1"></v-divider>

    <!-- 收藏的产品作为独立的一级菜单项 -->
    <div
      v-for="(product, index) in menuStore.getFavoriteProducts()"
      :key="product.path"
      class="menu-item-container"
      draggable="true"
      :class="{
        dragging: draggedItem?.path === product.path,
        'drag-over': dragOverItem?.path === product.path,
      }"
      @mouseenter="handleMouseEnter(product.path)"
      @dragstart="handleDragStart($event, product)"
      @dragover="handleDragOver($event, product)"
      @drop="handleDrop($event, product)"
      @dragend="handleDragEnd"
    >
      <v-list-item
        :active="false"
        active-color="transparent"
        color="white"
        variant="text"
        class="menu-item"
        link
      >
        <template v-slot:prepend>
          <v-icon color="white">{{ product.icon }}</v-icon>
        </template>
        <v-list-item-title class="text-white">
          {{ product.title }}
        </v-list-item-title>
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
          <v-icon color="white" class="chevron-icon">mdi-chevron-right</v-icon>
        </template>
      </v-list-item>
    </div>
  </div>
</template>

<style scoped>
.favorite-menu {
  margin-top: 8px;
}

.menu-item-container {
  position: relative;
  cursor: grab;
  transition: all 0.2s ease-in-out;
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
  border-radius: 4px;
  margin: 2px 8px;
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

/* 右箭头图标对齐 */
.chevron-icon {
  display: flex;
  align-items: center;
  justify-content: center;
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
