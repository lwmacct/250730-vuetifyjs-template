# HeaderDemo 文件夹

这个文件夹包含了 AppHeader 组件的演示页面。

## 文件结构

```
src/pages/HeaderDemo/
├── index.vue              # 入口文件，重定向到插槽演示页面
├── Slot.vue               # 插槽方式演示
├── SlotTemplate.vue       # 插槽模板组件
├── Styles.vue             # 样式控制演示
└── README.md             # 本说明文件
```

## 演示页面说明

### Slot.vue

- **路径**: `/header-demo/slot`
- **功能**: 展示插槽方式自定义内容
- **特点**: 提供最大的自由度，支持完整的 Vue 组件功能

### Styles.vue

- **路径**: `/header-demo/styles`
- **功能**: 展示颜色、阴影、高度等样式控制
- **特点**: 展示所有可控制的样式属性

## 访问方式

1. **通过菜单访问**：
   - 抽屉菜单 → 全部云产品 → Header Demo → 选择具体演示

2. **直接访问**：
   - 插槽演示：`/header-demo/slot`
   - 样式演示：`/header-demo/styles`

## 路由配置

所有演示页面都使用动态导入，支持代码分割和懒加载：

```typescript
{
  path: '/header-demo/slot',
  component: () => import('@/pages/HeaderDemo/Slot.vue')
},
{
  path: '/header-demo/styles',
  component: () => import('@/pages/HeaderDemo/Styles.vue')
}
```

## 维护说明

- 新增演示页面时，请同时更新路由配置和菜单配置
- 保持文件命名的一致性（简洁明了，避免重复前缀）
- 每个演示页面都应该有清晰的代码示例和特性说明
