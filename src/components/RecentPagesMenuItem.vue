<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'

interface Props {
  onNavigate: (path: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  onNavigate: () => {},
})

const menuStore = useMenuStore()
</script>

<template>
  <div class="recent-pages-section">
    <v-list-subheader class="text-white text-caption px-4 py-2"> 最近访问 </v-list-subheader>
    <div v-if="menuStore.recentPages.length > 0">
      <v-list-item
        v-for="page in menuStore.recentPages.slice(0, 5)"
        :key="page.path"
        :title="page.title"
        :subtitle="page.category"
        :prepend-icon="page.icon"
        color="white"
        variant="text"
        class="recent-page-item"
        @click="onNavigate(page.path)"
        link
      >
        <template v-slot:append>
          <v-btn
            icon="mdi-star"
            variant="text"
            size="small"
            color="white"
            :class="{ 'favorite-active': page.isFavorite }"
            @click.stop="menuStore.toggleFavorite(page.path)"
          ></v-btn>
        </template>
      </v-list-item>
    </div>
    <div v-else class="px-4 py-2">
      <v-chip color="grey" variant="outlined" size="small"> 暂无最近访问记录 </v-chip>
    </div>
  </div>
</template>

<style scoped>
.recent-pages-section {
  margin-top: 0px;
}

.recent-page-item {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.recent-page-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.favorite-active {
  color: #ffd700 !important;
}
</style>
