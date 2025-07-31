# AppHeader 组件使用文档

## 概述

重新设计的 AppHeader 组件提供了更灵活的配置选项，支持自定义标题、导航图标和操作按钮，同时保持默认的抽屉菜单功能。

## Props 配置

### 标题相关
- `title?: string` - 应用标题，默认值：'腾讯云'
- `titleIcon?: string` - 标题图标，默认值：'mdi-cloud'
- `showTitle?: boolean` - 是否显示标题，默认值：true

### 导航图标相关
- `showNavIcon?: boolean` - 是否显示导航图标，默认值：true
- `navIcon?: string` - 导航图标，默认值：'mdi-menu'
- `navIconColor?: string` - 导航图标颜色，默认值：'white'
- `onNavIconClick?: () => void` - 导航图标点击回调，默认打开/关闭抽屉菜单

### 操作按钮相关
- `actions?: Array<ActionButton>` - 自定义操作按钮数组
  - `icon?: string` - 按钮图标
  - `text?: string` - 按钮文本
  - `color?: string` - 按钮颜色
  - `variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'` - 按钮样式
  - `onClick: () => void` - 点击回调函数

### 抽屉菜单相关
- `showDrawer?: boolean` - 是否显示抽屉菜单，默认值：true
- `drawerWidth?: number | string` - 抽屉宽度，默认值：240

### 其他配置
- `showNavigation?: boolean` - 是否显示默认导航按钮，默认值：true
- `elevation?: number | string` - 应用栏阴影，默认值：2
- `color?: string` - 应用栏颜色，默认值：'grey-darken-4'
- `height?: number | string` - 应用栏高度，默认值：50

## 使用示例

### 1. 默认配置
```vue
<AppHeader title="我的应用" />
```

### 2. 自定义标题和图标
```vue
<AppHeader 
  title="我的应用" 
  titleIcon="mdi-application"
  :showNavigation="false"
/>
```

### 3. 自定义操作按钮
```vue
<AppHeader 
  title="带操作按钮的应用"
  :actions="[
    {
      icon: 'mdi-bell',
      text: '通知',
      color: 'warning',
      variant: 'text',
      onClick: () => console.log('通知按钮点击')
    },
    {
      icon: 'mdi-account',
      text: '用户',
      color: 'info',
      variant: 'text',
      onClick: () => console.log('用户按钮点击')
    }
  ]"
  :showNavigation="false"
/>
```

### 4. 自定义导航图标
```vue
<AppHeader 
  title="自定义导航"
  navIcon="mdi-dots-vertical"
  navIconColor="primary"
  :onNavIconClick="handleCustomNavClick"
/>
```

### 5. 隐藏抽屉菜单
```vue
<AppHeader 
  title="无抽屉菜单"
  :showDrawer="false"
  :showNavigation="false"
/>
```

### 6. 完整自定义
```vue
<AppHeader 
  title="完整自定义"
  titleIcon="mdi-star"
  navIcon="mdi-menu-open"
  navIconColor="success"
  :actions="customActions"
  color="primary"
  :elevation="4"
  :height="60"
/>
```

## 组件特性

1. **灵活性**：支持通过 props 自定义所有主要元素
2. **默认值**：提供合理的默认配置，开箱即用
3. **类型安全**：完整的 TypeScript 类型定义
4. **向后兼容**：保持原有功能的同时扩展新功能
5. **Material Design**：遵循 Vuetify 3 的设计规范

## 注意事项

- 当 `showDrawer` 为 false 时，导航图标不会显示抽屉菜单功能
- 自定义 `onNavIconClick` 会覆盖默认的抽屉菜单切换功能
- `actions` 数组中的按钮会显示在默认导航按钮之后
- 所有颜色值都支持 Vuetify 的颜色系统 