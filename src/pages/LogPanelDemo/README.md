# LogPanelDemo 页面架构说明

## 📁 目录结构

```
pages/LogPanelDemo/
├── index.vue              # 主页面组件
├── types.ts              # 📋 类型定义
├── stores/
│   └── index.ts          # 📦 状态管理
├── components/           # 🧩 页面专用组件
└── README.md             # 📖 文档说明
```

## 🎯 页面功能概述

### 🚀 核心功能

- **演示控制面板**: 切换不同的演示模式（基础、高级、集成）
- **日志样本生成**: 一键生成各种类型的测试日志
- **高级功能演示**: API 模拟和系统监控的实时演示
- **统计信息展示**: 实时显示各级别日志的统计数据
- **代码示例**: 展示当前演示模式的使用代码
- **配置信息**: 显示当前日志面板的配置参数

### 🛠️ 技术特性

- **按需导入**: LogPanel 组件按页面需要导入，不占用全局资源
- **类型复用**: 智能复用 LogPanel 组件的类型定义，避免重复
- **状态管理**: 使用 Pinia Store 管理演示页面的复杂状态
- **数据持久化**: 支持演示配置的本地存储
- **响应式设计**: 适配桌面和移动端设备

## 🏗️ 各文件职责分工

### 📋 types.ts - 类型定义

- **作用**: 定义演示页面专用的数据结构，复用 LogPanel 组件类型
- **设计亮点**:

  ```typescript
  // 智能复用，避免重复定义
  import type { LogPanelOptions } from '@/components/LogPanel/types'
  export type { LogLevel, LogItem, ... } from '@/components/LogPanel/types'

  // 只定义页面特有的类型
  export interface DemoScenario {
    id: string
    title: string
    config: LogPanelOptions  // 直接使用组件类型
  }
  ```

### 📦 stores/index.ts - 状态管理

- **作用**: 管理演示页面的状态、配置和业务逻辑
- **核心功能**:
  ```typescript
  export const useLogPanelDemoStore = defineStore('logPanelDemo', () => {
    // 演示模式管理
    const switchMode = (mode: DemoMode) => { ... }

    // 日志样本生成
    const generateSampleLogs = (sampleId: string) => { ... }

    // 高级功能控制
    const startApiMocking = () => { ... }
    const startMonitoring = () => { ... }

    // 配置管理
    const updatePanelOptions = (options: Partial<LogPanelOptions>) => { ... }
  })
  ```

### 🧩 index.vue - 主页面组件

- **作用**: 完整的演示页面界面和交互逻辑
- **布局结构**:
  - **头部**: 使用 AppHeader，提供快捷操作按钮
  - **左侧**: 控制面板（8/12 列）- 演示控制、样本生成、统计信息
  - **右侧**: 代码示例和配置信息（4/12 列）
  - **底部**: LogPanel 组件集成
  - **页脚**: 使用 AppFooter

## 🎨 设计亮点

### 📱 响应式布局

```vue
<v-row>
  <!-- 左侧控制面板 - 桌面端占 8 列，移动端占 12 列 -->
  <v-col cols="12" lg="8">
    <!-- 演示控制区域 -->
  </v-col>
  
  <!-- 右侧信息面板 - 桌面端占 4 列，移动端占 12 列 -->
  <v-col cols="12" lg="4">
    <!-- 代码示例和配置信息 -->
  </v-col>
</v-row>
```

### 🎛️ 演示模式切换

```vue
<v-chip-group
  v-model="demoStore.currentMode"
  @update:model-value="(value) => demoStore.switchMode(value)"
>
  <v-chip v-for="scenario in demoStore.scenarios" ...>
    {{ scenario.title }}
  </v-chip>
</v-chip-group>
```

### 📊 实时统计展示

```vue
<v-card v-for="stat in stats" variant="outlined" :color="stat.color">
  <v-icon :color="stat.color">{{ stat.icon }}</v-icon>
  <div class="text-h4">{{ stat.value }}</div>
  <div class="text-body-2">{{ stat.label }}</div>
</v-card>
```

## 🔧 与 LogPanel 组件的集成

### 按需导入使用

```vue
<script setup lang="ts">
// 按页面需要导入，不影响其他页面
import LogPanel from '@/components/LogPanel/index.vue'
import { useLogPanelDemoStore } from './stores/index'

const demoStore = useLogPanelDemoStore()
</script>

<template>
  <!-- 按需渲染 LogPanel 组件 -->
  <LogPanel v-bind="demoStore.panelConfig" :showPanel="demoStore.isLogPanelOpen" />
</template>
```

### 类型安全的配置管理

```typescript
// 使用 LogPanelOptions 确保配置类型安全
const panelConfig = ref<LogPanelOptions>({
  width: 400,
  maxLogs: 1000,
  autoScroll: true,
  enableFilter: true,
  enableExport: true,
})

// 类型安全的配置更新
const updatePanelOptions = (newOptions: Partial<LogPanelOptions>) => {
  Object.assign(panelConfig.value, newOptions)
}
```

## 💡 使用场景

### 🎯 适用于以下场景

- ✅ **组件功能演示**: 完整展示 LogPanel 组件的所有功能
- ✅ **开发调试**: 在开发环境中测试和调试日志组件
- ✅ **用户培训**: 帮助用户了解如何使用日志面板
- ✅ **功能测试**: 验证不同配置下的组件行为

### 🔄 扩展建议

如需扩展功能，建议在以下位置添加：

- **components/**: 添加专用的演示组件
- **stores/index.ts**: 扩展演示逻辑和状态管理
- **types.ts**: 添加新的演示场景类型定义

## 🚀 快速开始

1. **访问页面**: 导航到 `/log-panel-demo`
2. **选择模式**: 点击演示模式切换按钮
3. **生成日志**: 点击日志样本按钮生成测试数据
4. **查看面板**: 按 `L` 键或点击头部按钮打开日志面板
5. **体验功能**: 尝试过滤、搜索、导出等功能

## 📚 相关文档

- [LogPanel 组件文档](../../components/LogPanel/README.md)
- [页面级架构说明](../Home/README.md)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia 状态管理](https://pinia.vuejs.org/)
