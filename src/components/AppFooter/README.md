# AppFooter 组件架构说明

## 📁 目录结构

```
components/AppFooter/
├── index.vue         # 主组件文件
├── types.ts          # 📋 类型定义
├── stores/
│   └── index.ts      # 📦 状态管理
└── components/       # 🧩 子组件目录
```

## 🎯 各文件职责分工

### 📋 types.ts - 类型定义

- **作用**: 定义组件属性和数据结构
- **时机**: 编译时静态检查
- **内容**:
  ```typescript
  interface Props {
    showLinks?: boolean
    customText?: string
    fixed?: boolean
  }
  ```

### 📦 stores/index.ts - 状态管理

- **作用**: 管理页脚配置和行为状态
- **时机**: 运行时动态管理
- **内容**:
  ```typescript
  export const useAppFooterStore = defineStore('appFooter', () => {
    const config = ref({ ... })
    const updateConfig = () => { ... }
    return { config, updateConfig }
  })
  ```

## 💡 组件特性

### ✅ 功能特点

- 🎨 支持固定和正常两种显示模式
- 🔗 可配置是否显示外部链接
- 📝 支持自定义文本内容
- 📱 响应式设计，适配不同屏幕
- ⚙️ 通过 Store 管理配置状态

### 🎛️ 配置选项

| 属性         | 类型      | 默认值                             | 说明               |
| ------------ | --------- | ---------------------------------- | ------------------ |
| `showLinks`  | `boolean` | `true`                             | 是否显示外部链接   |
| `customText` | `string`  | `'© 2024 Vue + Vuetify 演示应用'` | 自定义文本内容     |
| `fixed`      | `boolean` | `false`                            | 是否固定在页面底部 |
| `centered`   | `boolean` | `true`                             | 是否居中对齐       |

## 🚀 使用方式

### 基础用法

```vue
<template>
  <AppFooter />
</template>
```

### 高级配置

```vue
<template>
  <AppFooter :show-links="true" custom-text="© 2024 我的应用" :fixed="false" />
</template>
```

### 使用 Store 管理配置

```typescript
import { useAppFooterStore } from '@/components/AppFooter/stores'

const footerStore = useAppFooterStore()
footerStore.updateConfig({
  defaultText: '© 2024 自定义应用',
  defaultHeight: 60,
})
```

### 居中对齐控制

```vue
<template>
  <!-- 默认居中对齐 -->
  <AppFooter />

  <!-- 强制居中对齐 -->
  <AppFooter :centered="true" />

  <!-- 左对齐 -->
  <AppFooter :centered="false" />
</template>
```
