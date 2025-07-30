<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'

interface Props {
  onNavigate: (path: string) => void
  onAddToFavorites: (item: any) => void
}

const props = withDefaults(defineProps<Props>(), {
  onNavigate: () => {},
  onAddToFavorites: () => {},
})

const menuStore = useMenuStore()

// 产品分类数据
const productCategories = [
  {
    title: '计算',
    icon: 'mdi-server',
    items: [
      { title: '云服务器', path: '/server', icon: 'mdi-server' },
      { title: '轻量应用服务器', path: '/lightweight', icon: 'mdi-server-network' },
      { title: 'GPU 云服务器', path: '/gpu-server', icon: 'mdi-gpu' },
      { title: '裸金属云服务器', path: '/bare-metal', icon: 'mdi-server' },
      { title: '弹性伸缩', path: '/auto-scaling', icon: 'mdi-arrow-expand' },
    ],
  },
  {
    title: '高性能计算',
    icon: 'mdi-calculator',
    items: [
      { title: '批量计算', path: '/batch-compute', icon: 'mdi-cube' },
      { title: '高性能计算平台', path: '/hpc-platform', icon: 'mdi-chart-line' },
      { title: '高性能应用服务', path: '/hpc-app', icon: 'mdi-application' },
    ],
  },
  {
    title: '分布式云',
    icon: 'mdi-cloud',
    items: [
      { title: '本地专用集群', path: '/local-cluster', icon: 'mdi-server-network' },
      { title: '专属可用区', path: '/dedicated-zone', icon: 'mdi-map-marker' },
    ],
  },
  {
    title: '人工智能与机器学习',
    icon: 'mdi-brain',
    items: [
      { title: '图像识别', path: '/image-recognition', icon: 'mdi-image' },
      { title: '人脸识别', path: '/face-recognition', icon: 'mdi-account' },
      { title: '人脸融合', path: '/face-fusion', icon: 'mdi-account-multiple' },
      { title: '语音识别', path: '/speech-recognition', icon: 'mdi-microphone' },
    ],
  },
  {
    title: '存储',
    icon: 'mdi-harddisk',
    items: [
      { title: '对象存储', path: '/object-storage', icon: 'mdi-cloud' },
      { title: '文件存储', path: '/file-storage', icon: 'mdi-folder' },
      { title: '归档存储', path: '/archive-storage', icon: 'mdi-archive' },
      { title: '云硬盘', path: '/cloud-disk', icon: 'mdi-harddisk' },
    ],
  },
  {
    title: '网络',
    icon: 'mdi-network',
    items: [
      { title: '负载均衡', path: '/loadbalancer', icon: 'mdi-scale-balance' },
      { title: '私有网络', path: '/vpc', icon: 'mdi-network' },
      { title: '弹性网卡', path: '/elastic-nic', icon: 'mdi-ethernet' },
      { title: 'NAT 网关', path: '/nat-gateway', icon: 'mdi-gateway' },
    ],
  },
  {
    title: '容器与中间件',
    icon: 'mdi-docker',
    items: [
      { title: '容器服务', path: '/container', icon: 'mdi-docker' },
      { title: '容器镜像服务', path: '/container-registry', icon: 'mdi-package-variant' },
      { title: '云函数', path: '/cloud-function', icon: 'mdi-function' },
      { title: 'Serverless 应用中心', path: '/serverless-app', icon: 'mdi-application' },
    ],
  },
]
</script>

<template>
  <div class="all-products-panel">
    <!-- 产品分类列表 -->
    <div v-for="category in productCategories" :key="category.title" class="category-section">
      <!-- 分类标题 -->
      <div class="category-header">
        <v-icon size="small" color="grey-lighten-1" class="mr-2">{{ category.icon }}</v-icon>
        <h4 class="category-title">{{ category.title }}</h4>
      </div>

      <!-- 分类产品列表 -->
      <div class="category-items">
        <v-list-item
          v-for="item in category.items"
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
          </v-list-item-title>
          <template v-slot:append>
            <v-btn
              icon
              size="small"
              @click.stop="props.onAddToFavorites(item)"
              class="ml-2"
              color="amber-lighten-1"
              variant="text"
            >
              <v-icon size="small">mdi-star-outline</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </div>
    </div>
  </div>
</template>

<style scoped>
.all-products-panel {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #424242;
}

.all-products-panel::-webkit-scrollbar {
  width: 8px;
}

.all-products-panel::-webkit-scrollbar-track {
  background: #424242;
}

.all-products-panel::-webkit-scrollbar-thumb {
  background: #616161;
  border-radius: 4px;
}

.all-products-panel::-webkit-scrollbar-thumb:hover {
  background: #757575;
}

.category-header {
  display: flex;
  align-items: center;
  padding: 12px 20px 10px 20px;
  border: 1px solid #616161;
  margin-bottom: 12px;
  background-color: #424242;
  border-radius: 4px;
}

.category-title {
  margin: 0;
  color: #64b5f6;
  display: flex;
  align-items: center;
  font-weight: 600;
}

.category-items {
  padding-bottom: 30px;
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
</style>
