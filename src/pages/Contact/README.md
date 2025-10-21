# Contact 页面架构说明

## 📁 目录结构

```mermaid
graph TD
    A[pages/Contact/] --> B[index.vue]
    A --> C[types.ts]
    A --> D[stores/]
    A --> E[components/]
    D --> F[index.ts]
```

## 🎯 页面职责

展示联系方式和服务信息

## 📋 类型定义 (types.ts)

```mermaid
classDiagram
    class ContactItem {
        +string id
        +string icon
        +string title
        +string subtitle
    }

    class ContactPageData {
        +string pageTitle
        +string pageIcon
        +string description
        +ContactItem[] contacts
    }
```

## 📦 状态管理 (stores/index.ts)

```mermaid
stateDiagram-v2
    [*] --> 初始化
    初始化 --> 加载联系信息
    加载联系信息 --> 展示页面
```

## 🔄 数据流

```mermaid
sequenceDiagram
    participant U as User
    participant V as index.vue
    participant S as Store

    U->>V: 访问页面
    V->>S: 获取联系信息
    S-->>V: 返回数据
    V-->>U: 渲染页面
```
