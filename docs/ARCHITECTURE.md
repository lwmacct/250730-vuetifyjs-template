# 系统架构文档

## 整体架构图

```mermaid
graph TB
    Client[客户端/浏览器] --> GinRouter[Gin Router]

    GinRouter --> Middleware{中间件层}

    Middleware --> Recovery[异常恢复]
    Middleware --> Logger[日志记录]
    Middleware --> CORS[跨域处理]
    Middleware --> JWT[JWT认证]
    Middleware --> Casbin[Casbin权限]

    Middleware --> APILayer[API 处理器层]

    APILayer --> AuthAPI[认证 API]
    APILayer --> UserAPI[用户 API]
    APILayer --> RoleAPI[角色 API]
    APILayer --> PermAPI[权限 API]

    APILayer --> ServiceLayer[业务逻辑层]

    ServiceLayer --> UserService[用户服务]
    ServiceLayer --> RoleService[角色服务]
    ServiceLayer --> PermService[权限服务]

    ServiceLayer --> DataLayer[数据访问层]

    DataLayer --> GORM[GORM ORM]
    DataLayer --> RedisClient[Redis 客户端]

    GORM --> PostgreSQL[(PostgreSQL)]
    RedisClient --> Redis[(Redis)]

    Casbin --> CasbinDB[(Casbin 规则表)]
    CasbinDB --> PostgreSQL
```

## 请求处理流程

```mermaid
sequenceDiagram
    participant Client as 客户端
    participant Router as Gin Router
    participant MW as 中间件
    participant API as API Handler
    participant Service as Service Layer
    participant DB as Database

    Client->>Router: HTTP 请求
    Router->>MW: 路由匹配

    MW->>MW: 1. Recovery
    MW->>MW: 2. Logger
    MW->>MW: 3. CORS

    alt 需要认证的路由
        MW->>MW: 4. JWT 验证
        alt Token 无效
            MW-->>Client: 401 未授权
        end
    end

    alt 需要权限的路由
        MW->>MW: 5. Casbin 权限检查
        alt 权限不足
            MW-->>Client: 403 权限不足
        end
    end

    MW->>API: 调用处理器
    API->>Service: 调用服务层
    Service->>DB: 数据库操作
    DB-->>Service: 返回数据
    Service-->>API: 返回结果
    API-->>Router: 构建响应
    Router-->>Client: HTTP 响应
```

## 认证流程

```mermaid
sequenceDiagram
    participant User as 用户
    participant API as API Server
    participant DB as PostgreSQL
    participant JWT as JWT Service

    Note over User,JWT: 注册流程
    User->>API: POST /api/auth/register
    API->>API: 参数验证
    API->>DB: 检查用户是否存在
    API->>API: bcrypt 加密密码
    API->>DB: 创建用户记录
    API-->>User: 注册成功

    Note over User,JWT: 登录流程
    User->>API: POST /api/auth/login
    API->>DB: 查询用户
    API->>API: 验证密码
    API->>DB: 获取用户角色
    API->>JWT: 生成 JWT Token
    JWT-->>API: 返回 Token
    API-->>User: 返回 Token 和用户信息

    Note over User,JWT: 访问受保护资源
    User->>API: GET /api/users/profile<br/>Authorization: Bearer Token
    API->>JWT: 验证 Token
    JWT-->>API: 解析用户信息
    API->>DB: 查询用户数据
    DB-->>API: 返回数据
    API-->>User: 返回用户信息
```

## 权限控制流程

```mermaid
sequenceDiagram
    participant User as 用户
    participant API as API Server
    participant JWT as JWT Middleware
    participant Casbin as Casbin Middleware
    participant Enforcer as Casbin Enforcer
    participant DB as PostgreSQL

    User->>API: GET /api/users<br/>Authorization: Bearer Token
    API->>JWT: JWT 认证
    JWT->>JWT: 验证 Token
    JWT->>JWT: 提取角色信息
    JWT->>API: 将角色存入上下文

    API->>Casbin: Casbin 权限验证
    Casbin->>Casbin: 获取用户角色
    Casbin->>Casbin: 获取请求资源和操作
    Casbin->>Enforcer: 检查权限
    Enforcer->>DB: 查询权限策略
    DB-->>Enforcer: 返回策略
    Enforcer->>Enforcer: 匹配规则

    alt 有权限
        Enforcer-->>Casbin: 允许访问
        Casbin->>API: 继续处理
        API-->>User: 返回数据
    else 无权限
        Enforcer-->>Casbin: 拒绝访问
        Casbin-->>User: 403 无权限
    end
```

## 数据模型关系图

```mermaid
erDiagram
    User ||--o{ UserRole : has
    Role ||--o{ UserRole : belongs_to
    Role ||--o{ RolePermission : has
    Permission ||--o{ RolePermission : belongs_to

    User {
        uint id PK
        string username UK
        string email UK
        string password
        string nickname
        string avatar
        int status
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }

    Role {
        uint id PK
        string name UK
        string display_name
        string description
        int status
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }

    Permission {
        uint id PK
        string name UK
        string display_name
        string description
        string resource
        string action
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }

    UserRole {
        uint user_id FK
        uint role_id FK
    }

    RolePermission {
        uint role_id FK
        uint permission_id FK
    }

    CasbinRule {
        uint id PK
        string ptype
        string v0
        string v1
        string v2
        string v3
        string v4
        string v5
    }
```

## 项目分层架构

```mermaid
graph TD
    subgraph "表示层"
        A[Gin Router] --> B[API Handlers]
    end

    subgraph "中间件层"
        C[Recovery] --> D[Logger]
        D --> E[CORS]
        E --> F[JWT Auth]
        F --> G[Casbin Auth]
    end

    subgraph "业务逻辑层"
        H[User Service]
        I[Role Service]
        J[Permission Service]
    end

    subgraph "数据访问层"
        K[GORM] --> L[PostgreSQL]
        M[Redis Client] --> N[Redis]
    end

    subgraph "权限控制层"
        O[Casbin Enforcer] --> P[GORM Adapter]
        P --> L
    end

    B --> C
    G --> H
    G --> I
    G --> J
    H --> K
    I --> K
    J --> K
    H --> M
    F --> O
    G --> O
```

## 目录结构详解

```
app/server/
│
├── api/                      # API 处理器层
│   ├── auth.go              # 负责用户认证相关的 HTTP 请求处理
│   ├── user.go              # 负责用户管理相关的 HTTP 请求处理
│   ├── role.go              # 负责角色管理相关的 HTTP 请求处理
│   └── permission.go        # 负责权限管理相关的 HTTP 请求处理
│
├── config/                   # 配置管理
│   └── config.go            # 配置加载、环境变量读取
│
├── database/                 # 数据库层
│   ├── postgres.go          # PostgreSQL 连接和配置
│   ├── redis.go             # Redis 连接和配置
│   └── migrate.go           # 数据库迁移脚本
│
├── middleware/               # 中间件层
│   ├── jwt.go               # JWT Token 生成、验证
│   ├── casbin.go            # Casbin 权限验证
│   ├── cors.go              # CORS 跨域处理
│   ├── logger.go            # 请求日志记录
│   └── recovery.go          # Panic 异常恢复
│
├── model/                    # 数据模型
│   └── user.go              # User、Role、Permission 实体定义
│
├── rbac/                     # 权限控制
│   └── enforcer.go          # Casbin Enforcer 初始化和操作
│
├── router/                   # 路由配置
│   └── router.go            # 路由注册、中间件绑定
│
├── service/                  # 业务逻辑层
│   ├── user_service.go      # 用户相关业务逻辑
│   ├── role_service.go      # 角色相关业务逻辑
│   └── permission_service.go # 权限相关业务逻辑
│
└── command.go                # CLI 命令实现
```

## 核心组件说明

### 1. Gin Router

- **职责**: HTTP 路由和请求分发
- **特点**: 高性能、简洁的 API
- **配置**: 支持 debug/release 模式

### 2. JWT 认证

- **算法**: HS256
- **有效期**: 可配置（默认 24 小时）
- **存储**: Token 包含用户 ID、用户名、角色列表

### 3. Casbin RBAC

- **模型**: RBAC（基于角色的访问控制）
- **存储**: PostgreSQL（通过 GORM Adapter）
- **特点**: 支持动态权限更新

### 4. GORM

- **版本**: v1.31.0
- **特性**:
  - 自动迁移
  - 预加载
  - 软删除
  - 关联查询

### 5. Redis

- **用途**:
  - 缓存（预留）
  - Session 管理（预留）
  - 限流（预留）

## 安全机制

### 1. 密码安全

- bcrypt 加密（cost 14）
- 永不返回密码字段

### 2. Token 安全

- JWT 签名验证
- 过期时间控制
- Bearer Token 格式

### 3. 权限安全

- 路由级别权限控制
- 角色继承支持
- 细粒度资源访问

### 4. 数据安全

- GORM 防 SQL 注入
- 参数验证
- 软删除机制

## 性能优化

### 1. 数据库优化

- 连接池配置
- 索引优化
- 预加载关联数据
- 批量操作

### 2. 缓存策略

- Redis 连接池
- 查询结果缓存（预留）

### 3. 并发控制

- Goroutine 池（Gin 内置）
- 数据库连接池

## 可扩展性

### 横向扩展

- 无状态设计
- 支持负载均衡
- 支持分布式部署

### 垂直扩展

- 模块化设计
- 接口化编程
- 依赖注入

### 功能扩展

- 插件式中间件
- 可配置的权限模型
- 灵活的数据模型

## 监控和日志

### 日志系统

- 结构化日志（slog）
- 请求日志记录
- 错误日志记录

### 健康检查

- `/api/health` 端点
- 数据库连接检查
- Redis 连接检查

## 部署架构

```mermaid
graph LR
    subgraph "生产环境"
        LB[负载均衡器] --> API1[API 服务器 1]
        LB --> API2[API 服务器 2]
        LB --> API3[API 服务器 N]

        API1 --> PG[(PostgreSQL<br/>主从复制)]
        API2 --> PG
        API3 --> PG

        API1 --> RC[(Redis<br/>集群)]
        API2 --> RC
        API3 --> RC
    end

    Client[客户端] --> LB
```

## 总结

本架构设计具有以下特点：

✅ **清晰的分层结构**: 便于理解和维护  
✅ **高度模块化**: 各组件职责明确  
✅ **可扩展性强**: 支持水平和垂直扩展  
✅ **安全性高**: 多层安全防护  
✅ **性能优化**: 连接池、缓存等机制  
✅ **易于测试**: 接口化设计，便于 Mock

适合作为**企业级应用**的基础架构。
