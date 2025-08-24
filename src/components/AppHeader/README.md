# AppHeader 组件架构说明

## 📁 目录结构

```
components/AppHeader/
├── index.vue                    # 主组件文件
├── types.ts                     # 📋 类型定义
├── stores/
│   └── index.ts                # 📦 状态管理
└── components/                 # 🧩 子组件目录
    ├── AllPagesMenuItem.vue    # 所有页面菜单项
    ├── FavoriteMenu.vue        # 收藏菜单组件
    ├── ProductsPanel.vue       # 产品面板组件
    └── RecentPagesMenuItem.vue # 最近访问菜单项
```

## 🎯 各文件职责分工

### 📋 types.ts - 类型定义

- **作用**: 定义组件属性和数据结构
- **内容**:
  ```typescript
  interface Props {
    title?: string
    showDrawer?: boolean
    drawerWidth?: number | string
    // ...
  }
  ```

### 📦 stores/index.ts - 状态管理

- **作用**: 管理头部导航、抽屉菜单和悬停状态
- **内容**:
  ```typescript
  export const useAppHeaderStore = defineStore('appHeader', () => {
    const drawerOpen = ref(false)
    const hoveredItem = ref<string | null>(null)
    // ...
  })
  ```

### 🧩 子组件说明

#### AllPagesMenuItem.vue

- 显示"所有页面"菜单项
- 支持悬停效果和图标动画
- 触发产品面板显示

#### FavoriteMenu.vue

- 管理收藏的页面列表
- 支持拖拽排序功能
- 提供收藏/取消收藏操作

#### ProductsPanel.vue

- 显示所有页面的分类视图
- 支持按分类组织页面
- 提供快速导航和收藏功能

#### RecentPagesMenuItem.vue

- 显示最近访问的页面
- 自动记录访问历史
- 提供快速跳转功能

## 💡 组件特性

### ✅ 功能特点

- 🎨 响应式头部导航栏
- 📱 可折叠的抽屉菜单
- 🌟 页面收藏功能
- 📝 最近访问记录
- 🎯 悬停展开的产品面板
- ⚙️ 高度可配置的外观

### 🎛️ 配置选项

| 属性          | 类型             | 默认值            | 说明             |
| ------------- | ---------------- | ----------------- | ---------------- |
| `title`       | `string`         | `'控制台'`        | 头部标题文本     |
| `titleIcon`   | `string`         | `'mdi-console'`   | 头部标题图标     |
| `showTitle`   | `boolean`        | `true`            | 是否显示标题     |
| `showNavIcon` | `boolean`        | `true`            | 是否显示导航图标 |
| `navIcon`     | `string`         | `'mdi-menu'`      | 导航图标         |
| `showDrawer`  | `boolean`        | `true`            | 是否启用抽屉菜单 |
| `drawerWidth` | `number\|string` | `240`             | 抽屉宽度         |
| `elevation`   | `number\|string` | `2`               | 头部阴影级别     |
| `color`       | `string`         | `'grey-darken-4'` | 头部背景色       |
| `height`      | `number\|string` | `50`              | 头部高度         |

## 🚀 使用方式

### 基础用法

```vue
<template>
  <AppHeader />
</template>
```

### 高级配置

```vue
<template>
  <AppHeader
    title="我的应用"
    title-icon="mdi-application"
    :drawer-width="280"
    color="primary"
    :height="60"
  />
</template>
```

### 自定义内容

```vue
<template>
  <AppHeader :use-custom-content="true">
    <template #custom-content>
      <v-spacer />
      <v-btn color="white" variant="text"> 自定义按钮 </v-btn>
    </template>
  </AppHeader>
</template>
```

### 使用 Store 管理状态

```typescript
import { useAppHeaderStore } from '@/components/AppHeader/stores'

const headerStore = useAppHeaderStore()

// 控制抽屉
headerStore.toggleDrawer()

// 设置悬停项
headerStore.setHoveredItem('all-products')

// 更新配置
headerStore.updateDrawerConfig({ width: 300 })

// 页面标题管理
headerStore.setCurrentPageTitle('自定义标题')
headerStore.setPageTitleByPath('/dashboard')

// 路由菜单操作
headerStore.toggleFavorite('/dashboard')
const recentPages = headerStore.recentItems
```

### 页面标题管理

AppHeader Store 集成了页面标题管理功能，可以方便地控制浏览器标题栏显示：

```typescript
import { useAppHeaderStore } from '@/components/AppHeader/stores'

const headerStore = useAppHeaderStore()

// 设置当前页面标题
headerStore.setCurrentPageTitle('自定义标题')

// 根据路由路径设置标题
headerStore.setPageTitleByPath('/dashboard')

// 使用临时配置设置标题
headerStore.setCurrentPageTitle('无后缀标题', {
  showAppName: false,
})
```

页面标题会自动根据路由变化更新，默认格式为：`页面标题 - Vue + Vuetify Console`

## 🔧 开发指南

### 添加新的菜单项

1. 在 `components/` 目录创建新的菜单项组件
2. 在 `index.vue` 中引入并注册
3. 在 `types.ts` 中添加相应的类型定义
4. 在 Store 中添加相关状态管理逻辑

### 自定义悬停面板

1. 在 `components/` 目录创建面板组件
2. 在 `index.vue` 的悬停面板区域添加条件渲染
3. 在 Store 中添加面板状态管理

### 样式自定义

组件使用 Vuetify 的主题系统，可以通过以下方式自定义：

```vue
<style scoped>
/* 自定义抽屉样式 */
:deep(.v-navigation-drawer) {
  /* 你的样式 */
}

/* 自定义悬停面板 */
.hover-panel {
  /* 你的样式 */
}
</style>
```
