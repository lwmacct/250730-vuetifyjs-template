# HeaderDemo 文件夹

这个文件夹包含了所有 AppHeader 组件的演示页面。

## 文件结构

```
src/views/HeaderDemo/
├── index.vue              # 入口文件，重定向到主演示页面
├── Main.vue               # 主演示页面，展示所有演示选项
├── Default.vue            # 默认配置演示
├── CustomTitle.vue        # 自定义标题和图标演示
├── CustomActions.vue      # 自定义操作按钮演示
├── Slot.vue               # 插槽方式演示
├── Component.vue          # 组件对象方式演示
├── Styles.vue             # 样式控制演示
└── README.md             # 本说明文件
```

## 演示页面说明

### Main.vue

- **路径**: `/header-demo`
- **功能**: 主演示页面，列出所有演示选项
- **特点**: 提供导航到各个具体演示页面的链接

### Default.vue

- **路径**: `/header-demo/default`
- **功能**: 展示最基本的 AppHeader 使用方式
- **特点**: 只传入 title 属性

### CustomTitle.vue

- **路径**: `/header-demo/custom-title`
- **功能**: 展示自定义标题和图标功能
- **特点**: 自定义标题文本和图标

### CustomActions.vue

- **路径**: `/header-demo/custom-actions`
- **功能**: 展示使用 actions prop 添加自定义按钮
- **特点**: 支持多个自定义按钮配置

### Slot.vue

- **路径**: `/header-demo/slot`
- **功能**: 展示插槽方式自定义内容
- **特点**: 提供最大的自由度

### Component.vue

- **路径**: `/header-demo/component`
- **功能**: 展示直接传入组件对象的方式
- **特点**: 最简洁的使用方式

### Styles.vue

- **路径**: `/header-demo/styles`
- **功能**: 展示颜色、阴影、高度等样式控制
- **特点**: 展示所有可控制的样式属性

## 访问方式

1. **通过菜单访问**：
   - 抽屉菜单 → 全部云产品 → Header Demo → 选择具体演示

2. **直接访问**：
   - 主演示页面：`/header-demo`
   - 具体演示页面：`/header-demo/[具体页面]`

## 路由配置

所有演示页面都使用动态导入，支持代码分割和懒加载：

```typescript
{
  path: '/header-demo',
  component: () => import('@/views/HeaderDemo/Main.vue')
}
```

## 维护说明

- 新增演示页面时，请同时更新路由配置和菜单配置
- 保持文件命名的一致性（简洁明了，避免重复前缀）
- 每个演示页面都应该有清晰的代码示例和特性说明
