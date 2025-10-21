# MetaDemo 页面架构说明

## 📁 目录结构

```mermaid
graph TD
    A[pages/MetaDemo/] --> B[index.vue]
    A --> C[types.ts]
    A --> D[stores/]
    A --> E[components/]
    D --> F[index.ts]
```

## 🎯 页面职责

演示路由 Meta 自定义字段的使用方法

## 📋 类型定义 (types.ts)

```mermaid
classDiagram
    class MetaFieldItem {
        +string id
        +string name
        +string description
        +string icon
        +string color
    }

    class RouteMeta {
        +string title
        +string icon
        +string description
        +string[] keywords
        +string category
        +number priority
        +boolean showInMenu
        +boolean requireAuth
    }

    class MetaDemoPageData {
        +string pageTitle
        +string pageIcon
        +MetaFieldItem[] metaFields
    }
```

## 📦 状态管理 (stores/index.ts)

```mermaid
stateDiagram-v2
    [*] --> 初始化
    初始化 --> 加载Meta字段
    加载Meta字段 --> 展示基础字段
    展示基础字段 --> 展示高级字段
```

## 🔄 数据流

```mermaid
sequenceDiagram
    participant U as User
    participant V as index.vue
    participant R as Router
    participant S as Store

    U->>V: 访问页面
    V->>R: 获取路由Meta
    R-->>V: 返回Meta对象
    V->>S: 获取字段配置
    S-->>V: 返回字段列表
    V-->>U: 渲染页面
```

## 💡 Meta字段说明

### 基础字段

- `title`: 页面标题
- `icon`: 页面图标
- `description`: 页面描述
- `keywords`: 关键词数组

### 高级字段

- `category`: 页面分类
- `priority`: 优先级
- `showInMenu`: 是否在菜单中显示
- `requireAuth`: 是否需要认证
